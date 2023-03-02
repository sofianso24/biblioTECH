import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { LivreEmprunte } from "../models/livreEmprunteModel.js"
import { Livre } from "../models/livreModel.js"
import { User } from "../models/userModel.js"



export const livreEmprunteController = ()=>{}

// borrow a book : 

export const borrowBook = async (req, res) => {
    try {
      const { userId, bookId } = req.body;

  
      // Check if user has already borrowed 3 books this month

      const date = new Date();
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const count = await LivreEmprunte.countDocuments({
        utilisateur: userId,
        date_emprunt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
      });

      if (count >= 3) {
        return res.status(400).json({ message: 'Vous avez déjà emprunté 3 livres ce mois-ci' });
      } else{

          // Check if book is available

          const book = await Livre.findOne({ _id: bookId });

          if (!book) {
            return res.status(400).json({ message: 'Livre non trouvé' });
        }else{
            
            if (book.copies_disponibles <= 0) {
              return res.status(400).json({ message: 'Le livre n\'est pas disponible' });
            }else{
                // Create new borrow

                const date_emprunt = new Date();
                const date_echeance = new Date(date_emprunt.getTime() + 7 * 24 * 60 * 60 * 1000); // Due date is 7 days from now
                const newBorrow = new LivreEmprunte({ utilisateur: userId, livre: bookId, date_emprunt, date_echeance });

                await newBorrow.save();
            
                // Update book availability

                book.copies_disponibles--;
                await book.save();
            
                res.status(201).json(newBorrow);
            }
        
        }
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


  
// return book :  

  export const returnBook = async (req, res) => {
    try {
      const { borrowId, bookId } = req.body;
  
      // Check if borrow exists

      const borrow = await LivreEmprunte.findOne({ utilisateur: borrowId, livre: bookId });
      if (!borrow) {
        return res.status(400).json({ message: 'Emprunt non trouvé' });
      }
  
      // Update book availability

      const book = await Livre.findOne({ _id: borrow.livre });
      book.copies_disponibles++;
      await book.save();
  
      // Update borrow return date

      borrow.date_retour = new Date();
      await borrow.save();
  
      res.status(200).json({ message: 'Le livre a été rendu avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };