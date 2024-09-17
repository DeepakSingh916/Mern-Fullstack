import { product } from "../Models/Product.js";


// add product

export const addProduct = async (req,res) => {
    const {title,category,description,price,qty,imgSrc} = req.body;
    try {
       let prod = await product.create({title,category,description,price,qty,imgSrc});
       res.json({message:"product added successfully",success:true,prod})
    } catch (error) {
        res.json(error.message);
    }
}


// add multiple products

export const addListsOfProducts = async (req, res) => {
    const products = req.body; // Assuming req.body is an array of products
    try {
        // Use insertMany to insert multiple products at once
        let insertedProducts = await product.insertMany(products);
        res.json({
            message: "Products added successfully",
            success: true,
            products: insertedProducts
        });
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        });
    }
}


// get product

export const getAllProduct = async (req,res) => {
    try {
       let prod = await product.find().sort({createdAt:-1});
       res.json(prod)
    } catch (error) {
        res.json(error.message);
    }
}

// get product by id

export const getProductById = async (req,res) => {
    const id = req.params.id;
    try {
       let prod = await product.findById(id);
       if(!prod)
            return res.json({message:`product with id ${id} does not exist`,success:false})
       res.json({prod,success:true});
    } catch (error) {
        res.json(error.message);
    }
}

// update product by id
export const updateProductById = async (req,res) => {
    const id = req.params.id;
    try {
       let prod = await product.findByIdAndUpdate(id,req.body,{new:true});
       if(!prod)
            return res.json({message:`product with id ${id} does not exist, update failed`,success:false})
       res.json({message:"product updated successfully",prod,success:true});
    } catch (error) {
        res.json(error.message);
    }
}


// delete product by id
export const deleteProductById = async (req,res) => {
    const id = req.params.id;
    try {
       let prod = await product.findByIdAndDelete(id,req.body,{new:true});
       if(!prod)
            return res.json({message:`product with id ${id} does not exist, delete failed`,success:false})
       res.json({message:"product deleted successfully",prod,success:true});
    } catch (error) {
        res.json(error.message);
    }
}