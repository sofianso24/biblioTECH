import express from "express"
import mongoose from "mongoose"
import {Livre} from "../models/livreModel.js"
import { Categorie } from "../models/categorieModel.js";


// add books :

export const addBook = async (req, res) => {
    try {
      const { titre, auteur, copies_disponibles, categorie } = req.body;
  
            // Check if category exists

      const existingCategory = await Categorie.findOne({ titre: categorie });
      if (!existingCategory) {
        return res.status(400).json({ message: 'Category does not exist' });
      }else {
        // Create new book
  
        const newBook = new Livre({ titre, auteur, copies_disponibles, categorie: existingCategory._id });
    
        await newBook.save();
    
        res.status(201).json(newBook);
              
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

 
// reserch books by filtring : 

export const searchBooks = async (req, res) => {
  try {
    const { titre, author, category, availableCopies } = req.query;

    let filters = {};
    if (titre) {
      filters.titre = { $regex: titre, $options: 'i' };
    }
    if (author) {
      filters.auteur = { $regex: author, $options: 'i' };
    }
    if (category) {
      const categoryId = await Categorie.findOne({ titre: category });
      if (categoryId) {
        filters.category = categoryId._id;
      } else {
        return res.status(400).json({ message: 'Category not found' });
      }
    }
    if (availableCopies) {
      filters.copies_disponibles = { $gte: availableCopies };
    }

    const books = await Livre.find(filters).populate('categorie', 'titre');

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
