const route = require('express').Router()

const {createProduct , deleteProduct , allProduct , updateProduct} = require('../controllers/Product')


route.post('/products' , createProduct)
route.delete('/products/:id' , deleteProduct)
route.get('/products' , allProduct)
route.put('/products/:id' , updateProduct)

module.exports = route