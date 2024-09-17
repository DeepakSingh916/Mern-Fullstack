import express from 'express'
import { addToCart, getAllCartItems, getCartItemsByUserId, removeItemByProductId, clearCartByUserId, decreaseProductQty } from '../Controllers/Cart.js';
import { Authenticated } from '../Middlewares/Auth.js';


//router initialization
const router = express.Router();

// add item to cart
router.post("/add", Authenticated, addToCart)

// get all cart items
router.get("/getAll", Authenticated, getAllCartItems)

// get cart items by userId
router.get("/user", Authenticated, getCartItemsByUserId)

// remove cart items by productId
router.delete("/remove/:productId", Authenticated, removeItemByProductId)

// clear cart
router.delete("/clear", Authenticated, clearCartByUserId)

// decrease qty
router.put("/:productId/:qty", Authenticated, decreaseProductQty)

export default router;