import express from 'express'
import { Authenticated } from '../Middlewares/Auth.js';
import { addAddress, getAddress } from '../Controllers/Address.js';


//router initialization
const router = express.Router();

// add user address
router.post("/add", Authenticated, addAddress)

// get user address
router.get("/get", Authenticated, getAddress)


export default router;