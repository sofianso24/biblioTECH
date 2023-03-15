import express from "express"
import mongoose from "mongoose"
import{addBook,searchBooks,addComment,
       getCommentById, updateComment,
       deleteComment,getLibraryStatistics} 
       from "../cotrollers/livreController.js"


export const livreRouter = express.Router()


livreRouter.post("/book",addBook);
livreRouter.get("/filtre",searchBooks);
livreRouter.post("/comment",addComment);
livreRouter.get("/comment/:id",getCommentById);
livreRouter.put("/comment/:id", updateComment);
livreRouter.delete("/comment/:id", deleteComment);
livreRouter.get("/statistiques", getLibraryStatistics);



