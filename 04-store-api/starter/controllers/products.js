const { query } = require('express')
const Product = require('../models/product')


const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({
        name: "vase table"
    
    })
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {
    // De esta manera filtramos solamente por featured..
    const {featured} = req.query

    const queryObject = {}

    // esto es una expresion ternaria en la que su syntax es la siguiente:
    // queryObject.featured = featured === 'true' ? true : false;
    // y seria equivalente a if (featured === 'true') {
    //queryObject.featured = true;
    // } else {
    // queryObject.featured = false;
    // }

    if (featured) {
        queryObject.featured = featured === 'true'? true : false
    }
    
    console.log(queryObject);
    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProductsStatic, 
    getAllProducts
}