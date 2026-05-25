import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();

export async function createUser(req,res){

    try{

        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password,10);

        const user = new User(
            {
                email : req.body.email,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                password : passwordHash
            }
        );

        await user.save();

        res.json({
            message : "User created successfully"
        })

    }catch(error){
        console.error("Error creating user:", error);
        return res.json({message : "Internal Server Error"})
    }
}

export async function loginUser(req,res){
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email : email});

        if(!user){
            res.status(404).json({message : "User does not exist"});
            return;
        }

        const isPasswordMatching = bcrypt.compareSync(password, user.password);

        if(isPasswordMatching){
           // res.json({message : "Login successful"});

            const userInfo = {
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                emailVerified : user.isEmailVerified,
                image : user.image,
                isAdmin : user.isAdmin,
                isBlocked : user.isBlocked
            }

            const token = jwt.sign(userInfo , process.env.JWT_SECRET);

            res.json({token : token})

        }else{
            res.status(401).json({message : "Invalid password"});
        }

    }catch(error){
        console.error("Error logging in user:", error);
        return res.status(500).json({message : "Internal Server Error"})
    }
    
}

export function isAdmin(req){
    if (req.user == null){
        
        return false;

    }

    if(!req.user.isAdmin){
    
        return false;
    }
    return true;
}