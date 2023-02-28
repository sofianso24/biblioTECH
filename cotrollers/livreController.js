import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import {livreModel} from "../models/livreModel.js"


export const livreController = ()=>{}

// create livre categorie

export const createBookCategory = async (req, res) => {
    try {
      const { titre } = req.body;
  
      const existingCategory = await BookCategory.findOne({ titre });
  
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
  
      const newCategory = new BookCategory({ titre });
  
      await newCategory.save();
  
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };