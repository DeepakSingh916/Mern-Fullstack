import { json } from "express";
import { User } from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// user register
export const register = async (req,res) => {
    const {name, email, password} =  req.body;
    try {
        let user = await User.findOne({email});
        if(user) 
            return res.json({message:"user already exist...",success:false});
        const hashPass =  await bcrypt.hash(password,10);
        user = await User.create({name, email, password:hashPass});
        res.json({message:"user created successfully...",user,success:true});
    } catch (error) {
        res.json({Message:error.Message});
    }
}

// user login
export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        let user =  await User.findOne({email});
        if (!user) {
            return res.json({message:"user does not exist",success:false});
        } else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.json({message:"invalid credentials",success:false});
            } else {
                // if credentials are valid
                // Set the expiration time of the token
                // Examples:
                // expiresIn: '1h'  // 1 hour
                // expiresIn: '15m' // 15 minutes
                // expiresIn: '30d' // 30 days
                // expiresIn: '365d' // 365 days
                // expiresIn: 3600 // 3600 seconds (1 hour)
                const token = jwt.sign({userId:user._id},'@$#%&hkjkhj465)(^%%^%#',{expiresIn:"1d"})
                res.json({message:`welcome ${user.name}`, token, success:true});
            }
        }
    } catch (error) {
        res.json({message:error.message});
    }
    
}

//getAllUser

export const getAllUser = async (req,res) => {
    try {
        let user = await User.find().sort({createdAt:-1});
        res.json(user);
    } catch (error) {
        res.json({message:error.message});
    }
}

//get user profile
export const getUserProfile = async (req,res) => {
    res.json({user:req.user});
}