const express = require('express')
const app = express()
const PORT = 5555
require('dotenv').config()
const productRoute = require('./routes/product.route')
const db = require('./config/db')
app.get('/' , (req ,res)=>{
      res.send("Hello world")
})
app.use(express.json())
app.use('/api' , productRoute)
db()
app.listen(PORT , ()=>{
      console.log(`server is running on http://localhost:${PORT}`)
})