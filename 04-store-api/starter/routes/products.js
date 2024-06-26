const express = require('express')
const router = express.Router()

const {getAllproductsStatic, getAllProducts, getAllProductsStatic} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router