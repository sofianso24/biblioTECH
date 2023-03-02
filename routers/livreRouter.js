import express from "express"
import mongoose from "mongoose"
import{addBook,searchBooks} from "../cotrollers/livreController.js"


export const livreRouter = express.Router()


livreRouter.post("/book",addBook);
livreRouter.get("/filtre",searchBooks);



