import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken"
import {User} from "../models/userModel.js"

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
            res.cookie("token", { token }, { maxAge: 60 * 60 * 24 * 1000 }); // maxAge: 30 days
            res.json("you're loged in")
        }

    } catch (error) {
        res.json(err);
    }
  };


  // verify role of the user :

  export const roleValidation = (requiredRole) => async (req, res, next) => {
    try {
      const role = req.cookies["token"].role;
      if (role === requiredRole) {
        return next();
      } else {
        res.status(401).json({ message: "Unauthorized user!!" });
      }
    } catch (err) {
      res.json(err);
    }
  };

  // loginRequired:

//   export const loginRequired = async (req, res, next) => {
//     try {
//       if (req.user) {
//         next();
//       } else {
//         res.status(401).json({ message: 'Unauthorized user!!' });
//       }
//     } catch (err) {
//       res.json(err);
//     }
//   };

// profile : 

//   export const profile = async (req, res, next) => {
//     try {
//       if (req.user) {
//         res.json(req.user);
//       } else {
//         res.status(401).json({ message: 'Invalid token' });
//       }
//     } catch (err) {
//       res.json(err);
//     }
//   };

// log_out : 

export const log_out = (req, res) => {
    try {
      res.clearCookie('token');
      res.json({ message: 'User logged out successfully' });
    } catch (err) {
      res.json(err);
    }
  };