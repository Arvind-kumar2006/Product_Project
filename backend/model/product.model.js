const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
      name : {
            type : String , 
            required : true
      },
        price : {
            type : String , 
            required : true
      },
        image : {
            type : String , 
            required : true
      },
},{timestamps : true}
)

const product = mongoose.model('Product' , productSchema)

module.exports = product