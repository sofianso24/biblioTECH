import express from "express"
import mongoose from "mongoose"

import {livreEmprunteController,borrowBook,returnBook} from "../cotrollers/livreEmprunteController.js"


export const livreEmprunteRouter = express.Router()

livreEmprunteRouter.post("/emprunte",borrowBook)
livreEmprunteRouter.post("/emprunte/return",returnBook)