import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import {Categorie, categorieModel} from "../models/categorieModel.js"


export const categorieController = ()=>{}

// create livre categorie

export const createBookCategory = async (req, res) => {
    try {
      const { titre } = req.body;

  
      const newCategory = new Categorie({ titre });
  
      await newCategory.save();
  
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };