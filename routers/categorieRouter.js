import express from "express"
import mongoose from "mongoose"

import {createBookCategory} from "../cotrollers/categorieController.js"


export const categorieRouter = express.Router()

categorieRouter.post("/category",createBookCategory)