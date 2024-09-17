import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import userRouter from './Routes/User.js';
import prodRouter from './Routes/Product.js';
import cartRouter from './Routes/Cart.js';
import userAddress from './Routes/Address.js'
import cors from 'cors'

const app = express();

//bodyparser intialization
app.use(bodyParser.json());

app.use(cors({
    origin:true, //allows all origins
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//Routes

// home testing route
app.get("/",(req,res)=>res.json({message:"this is my home route"}));

//user router
app.use("/api/user",userRouter);

// product router
app.use("/api/product",prodRouter);

// cart router
app.use("/api/cart",cartRouter);

// address router
app.use("/api/address",userAddress);



//DB Connection details
mongoose.connect("mongodb+srv://ds248776:z7oL5H5s2DvUtVvg@md-cluster-mern-proj.ihxyo.mongodb.net/",{
    dbName:"MERN_DB"
})
        .then(()=>console.log("mongodb connected successfully"))
        .catch((err)=>console.log(err))
 
const port = 1000;
app.listen(port, ()=>console.log(`server is running on ${port}`))