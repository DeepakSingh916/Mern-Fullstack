import express from 'express'
import { getAllUser, login, register, getUserProfile } from '../Controllers/User.js';
import { Authenticated } from '../Middlewares/Auth.js';
 
const router = express.Router();

//register
router.post("/register",register)

//login
router.post("/login",login)

//get all users
router.get("/all",getAllUser)

//get user profile
router.get("/profile", Authenticated, getUserProfile)

export default router;