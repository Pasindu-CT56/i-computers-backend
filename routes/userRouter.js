import express from 'express';
import { createUser, getAllUsers, getCurrentUser, loginUser, updateUserPassword, updateUserProfile, updateUserRole, updateUserStatus } from '../controllers/userController.js';
import e from 'express';


const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.post("/login",loginUser)

userRouter.get("/:pageSize/:pageNumber", getAllUsers)
userRouter.get("/me" , getCurrentUser)


userRouter.put("/status" , updateUserStatus)
userRouter.put("/role" , updateUserRole)
userRouter.put("/update" , updateUserProfile)
userRouter.put("/password" , updateUserPassword)

export default userRouter;