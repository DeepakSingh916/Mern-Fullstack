import express from 'express'
import { addListsOfProducts, addProduct, deleteProductById, getAllProduct, getProductById, updateProductById } from '../Controllers/Product.js';

const router = express.Router();

// add product
router.post("/add",addProduct)

// add list of product
router.post("/addAll",addListsOfProducts)

// get all product
router.get("/all",getAllProduct)

//get product by id
router.get("/:id", getProductById)

// update product by id
router.put("/:id", updateProductById)

// delete product by id
router.delete("/:id", deleteProductById)




export default router;