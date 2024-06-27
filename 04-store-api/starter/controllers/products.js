const { query } = require('express')
const Product = require('../models/product')


const getAllProductsStatic = async (req,res) => {
    
    const products = await Product.find({}).select('name price')
    
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {
    // De esta manera filtramos solamente por featured..
    const {featured, company, name, sort, fields} = req.query

    const queryObject = {}

    // esto es una expresion ternaria en la que su syntax es la siguiente:
    // condicion ? valorSiVerdadero : valorSiFalso
    // y seria equivalente a if (featured === 'true') {
    //queryObject.featured = true;
    // } else {
    // queryObject.featured = false;
    // }

    // ya que queryObject es un objeto vacio, se le pueden añadir propiedades con la syntax de queryObject."propiedad"

    if (featured) {
        queryObject.featured = featured === 'true'? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    
    console.log(queryObject);
    let result = Product.find(queryObject)
    
    // sort

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else{
        result = result.sort('createAt')
    }
    
    if(fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }


    const products = await result
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProductsStatic, 
    getAllProducts
}