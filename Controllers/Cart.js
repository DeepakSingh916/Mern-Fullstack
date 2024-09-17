import { cart } from "../Models/Cart.js";
import mongoose from "mongoose";


//add item in cart
export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user;

    try {
        // Find the cart of the user
        let existingUsersCart = await cart.findOne({ userId });

        if (existingUsersCart) {
            // Find the index of the item if it already exists in the cart
            let itemIndex = existingUsersCart.items.findIndex((item) => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If the product exists, update its quantity and price
                existingUsersCart.items[itemIndex].qty += qty;
                existingUsersCart.items[itemIndex].price += price * qty;
            } else {
                // If the product doesn't exist, add it to the cart
                existingUsersCart.items.push({ productId, title, price, qty, imgSrc });
            }
        } else {
            // If the cart doesn't exist, create a new one for the user
            existingUsersCart = new cart({ userId, items: [{ productId, title, price, qty, imgSrc }] });
        }

        // Save the cart
        await existingUsersCart.save();
        let itemCounts = existingUsersCart.items.length;

        //total qty
        let totalQty = existingUsersCart.items.reduce((total, item) => total + item.qty, 0);

        res.json({ message: "Item added to cart successfully", success: true,total_qty: totalQty, item_count:itemCounts, cart: existingUsersCart });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

// get all cart items

export const getAllCartItems = async (req, res) => {
    try {
        let cartItem = await cart.find().sort({ createdAt: -1 });
        res.json({ cartItem, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// get cart items by userId

export const getCartItemsByUserId = async (req, res) => {
    const userId = req.user;
    try {
        let cartItem = await cart.findOne({userId});
        if(!cartItem)
            return res.json({message:`cart for userId ${userId} does not exist`})
        //total qty
        let totalQty = cartItem.items.reduce((total, item) => total + item.qty, 0);
        res.json({ cartItem,totalQty:totalQty, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}


// remove product from cart by productId
export const removeItemByProductId = async (req,res) => {
    const userId = req.user;
    const productId = req.params.productId;

    try {
        let cartItem = await cart.findOne({userId});
        //console.log("cartItem = ", cartItem)
        if(!cartItem)
            return res.json({message:`cart for userId ${userId} does not exist`})
        let prod = cartItem.items.filter((item) => item.productId.toString() == productId)
        console.log("prod = ",prod)
        if(prod.length === 0) 
            return res.json({message:"product not found"})
        cartItem.items = cartItem.items.filter((item) => item.productId.toString() !== productId);
        await cartItem.save(); // Save the updated cart
        res.json({message:"product successfully removed",success:true});
    } catch (error) {
        res.json({ message: error.message });
    }
}

// clear cart by userId
export const clearCartByUserId = async (req,res) => {
    const userId = req.user;

    try {
        let cartItem = await cart.findOne({userId});
        if(!cartItem)
            return res.json({message:`cart for userId ${userId} does not exist`})
        cartItem.items = [];
        await cartItem.save(); // Save the updated cart
        res.json({message:"your cart is empty",success:true});
    } catch (error) {
        res.json({ message: error.message });
    }
}
 

// decrease product qty by user Id
export const decreaseProductQty = async (req, res) => {
    const productId = req.params.productId;
    const qty = req.params.qty;
    const userId = req.user;

    try {
        // Find the cart of the user
        let existingUsersCart = await cart.findOne({ userId });

        if (existingUsersCart) {
            // Find the index of the item if it already exists in the cart
            let itemIndex = existingUsersCart.items.findIndex((item) => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If the product exists, update its quantity
                let oneItemPrice = existingUsersCart.items[itemIndex].price / existingUsersCart.items[itemIndex].qty
                existingUsersCart.items[itemIndex].qty -= qty;
                existingUsersCart.items[itemIndex].price -= qty*oneItemPrice;

                if(existingUsersCart.items[itemIndex].qty == 0){
                    existingUsersCart.items = existingUsersCart.items.filter((item) => item.productId.toString() !== productId);
                }
            } else {
                res.json({message:"producr does not exist",success:false});
            }
        } else {
            res.json({message:"user does not exist",success:false});
        }

        // Save the cart
        await existingUsersCart.save();
        let itemCounts = existingUsersCart.items.length;
        res.json({ message: "qty updated successfully", success: true, item_count:itemCounts, cart: existingUsersCart });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};