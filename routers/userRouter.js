import express from "express"
import mongoose from "mongoose"

import {log_out, register, sign_in, userController} from "../cotrollers/userController.js"


export const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/signin",sign_in)
userRouter.get("/logout",log_out)
