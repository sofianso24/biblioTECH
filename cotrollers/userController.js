import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken"
import {User} from "../models/userModel.js"
import {Livre} from "../models/livreModel.js"
import {Categorie} from "../models/categorieModel.js"

const {sign,verify} = Jwt


export const userController = ()=>{}


// register : 

export const register = async (req, res) => {
    try {
      const newUser = new User(req.body);
      newUser.password = await bcrypt.hash(req.body.password, 10);
      const user = await newUser.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  // sign in : 

  export const sign_in = async (req, res) => {

    try {
      const user = await User.findOne({ email: req.body.email });
      
        if (!user) {
            res.json("user not found")
        } else {
          const token = await bcrypt.compare(req.body.password,user.password).then((err, result) => {
                result = sign({ email: user.email, fullName: user.fullName, _id: user._id, role:user.role }, 'RESTFULAPIs')
                return result
            })
            res.cookie("token", { token, role: user.role }, { maxAge: 60 * 60 * 24 * 1000 }); // maxAge: 30 days
            res.json("you're loged in")
        }

    } catch (error) {
        res.json(err);
    }
  };


   //verify role of the user :

  export const roleValidation = (requiredRole) => async (req, res, next) => {
    try {
      const role = req.cookies["token"].role;
      if (role === requiredRole) {
         verify(req.cookies["token"].token,'RESTFULAPIs')
        return next();
      } else {
        res.status(401).json({ message: "Unauthorized user!!" });
      }
    } catch (err) {
      res.json(err);
    }
  };


// log_out : 

export const log_out = (req, res) => {
    try {
      res.clearCookie('token');
      res.json({ message: 'User logged out successfully' });
    } catch (err) {
      res.json(err);
    }
  };

// middleware to verify user role

// export const verifyRole = (roles) => {
//   return (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//     try {
//       const decoded = verify(token.token, "RESTFULAPIs");
//       if (!roles.includes(decoded.role)) {
//         return res.status(403).json({ message: "Unauthorized" });
//       }
//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//   };
// };

// // API endpoint to borrow a book
// export const borrowBook = async (req, res) => {
//   try {
//     // check if user is an employee
//     if (req.user.role !== "employee") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to perform this action" });
//     }
//     // borrow book logic here
//     // ...
//     res.json({ message: "Book borrowed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // API endpoint to return a book
// export const returnBook = async (req, res) => {
//   try {
//     // check if user is an employee
//     if (req.user.role !== "employee") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to perform this action" });
//     }
//     // return book logic here
//     // ...
//     res.json({ message: "Book returned successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

  // voir tous les livres disponibles : 

  export const getAllBooks = async (req, res) => {
    try {
      const books = await Livre.find({ copies_disponibles: { $gt: 0 } }).populate('categorie', 'titre');
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  