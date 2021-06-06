import Products from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch all Products
//@route GET /api/products
//@ccess PUBLIC

 const getProducts = asyncHandler(async(req, res) => {
    const products = await Products.find({})
    //res.status(401)
    //throw new Error('Not Authorized')
   res.json(products)
})


 const getProductById = asyncHandler(async(req, res) => {
    const product = await Products.findById(req.params.id)
    if (product){
        res.json(product)
        //console.log(product)
    }
    else{
        res.status(404).json({message: 'Product not found'})
        console.log("error");
    }
})

export {
    getProducts,
    getProductById
}
