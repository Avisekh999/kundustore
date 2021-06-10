import Products from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import products from "../data/products.js";

//@desc Fetch all Products
//@route GET /api/products
//@ccess PUBLIC

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  //res.status(401)
  //throw new Error('Not Authorized')
  res.json(products);
});

//@desc Fetch single Product
//@route DELETE /api/products/:id
//@ccess PUBLIC

const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.json(product);
    //console.log(product)
  } else {
    res.status(404).json({ message: "Product not found" });
    console.log("error");
  }
});

//@desc Delete a Product
//@route DELETE /api/products/:id
//@ccess Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
    console.log("error");
  }
});

//@desc Create a Product
//@route POST /api/products/
//@ccess Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(product);
});

//@desc Update a Product
//@route PUT /api/products/:id
//@ccess Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { 
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock } = req.body;
   
  const product = await Product.findById(req.params.id)

  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }else{
      res.status(404)
      throw new Error('Product not found')
  }
});



//@desc Create new review
//@route POST /api/products/:id/reviews
//@ccess Private

const createdProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
   
  const product = await Product.findById(req.params.id)

  if(product){
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    
    if(alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review ={
      name: req.user.name, 
      rating:Number(rating),
      comment,
      user:req.user._id
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)
    /product.reviews.length

    await product.save()
    res.status(201).json({message: 'Review added'})
  }else{
      res.status(404)
      throw new Error('Product not found')
  }
});



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createdProductReview };
