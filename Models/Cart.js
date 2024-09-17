import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        reqquire:true
    },
    title:{type:String,require:true},
    price:{type:Number,require:true},
    qty:{type:Number,require:true},
    imgSrc:{type:String,require:true},
    createdAt:{type:Date,default:Date.now}
})

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqquire:true
    },
    items: [cartItemSchema]
})

export const cart = mongoose.model("Cart", cartSchema); 