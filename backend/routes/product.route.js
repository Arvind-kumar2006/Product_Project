const route = require('express').Router()

const {createProduct , deleteProduct , allProduct , getProduct, updateProduct} = require('../controllers/Product')


route.post('/products' , createProduct)
route.delete('/products/:id' , deleteProduct)
route.get('/products' , allProduct)
route.get('/products/:id' , getProduct)
route.put('/products/:id' , updateProduct)

module.exports = route