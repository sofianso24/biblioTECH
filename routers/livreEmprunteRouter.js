import express from "express"
import mongoose from "mongoose"

import {borrowBook,returnBook,
        getBorrowingHistory,renewBorrowedBook} 
        from "../cotrollers/livreEmprunteController.js"


export const livreEmprunteRouter = express.Router()

livreEmprunteRouter.post("/emprunte",borrowBook)
livreEmprunteRouter.post("/emprunte/return",returnBook)
livreEmprunteRouter.get("/emprunte/history/:id",getBorrowingHistory)
livreEmprunteRouter.post("/emprunte/renew/:id",renewBorrowedBook)
