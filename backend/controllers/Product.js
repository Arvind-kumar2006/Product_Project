const Product = require('../model/product.model')

const createProduct = async(req , res )=>{
      try {
            
      const {name , price , image } = req.body;

      if(!name || !price || !image){
          return res.status(400).json({success : false , message : "Please provide all fields"})  
      }
      const newProduct = new Product({
            name , price , image 
      })
      await newProduct.save();

      return res.status(201).json({success: true , message :
            "product created successfully"
      })

      } catch (error) {
            return res.status(500).json({success : false , message : "server error"})
      }
}


const deleteProduct = async(req , res) =>{
      try {
           const {id} = await req.params;
           await Product.findByIdAndDelete(id);

           return res.status(200).json({success : false , message : "Product is successfully deleted"})

      } catch (error) {
            return res.status(404).json({success : false , message : "Product is not found"})
      }
}


const allProduct = async(req ,res )=>{
      try {
            const product = await Product.find({})

            return res.status(200).json({success : true , message : product})

      } catch (error) {
            return res.status(500).json({success : false , message : "server error"})
      }
}

const updateProduct = async(req , res)=>{
      try {
          const {id} = req.params;
          
          const product = req.body;

          await Product.findByIdAndUpdate(id , product)
          return res.status(200).json({success : true , message : "succesfully update product"})

      } catch (error) {
              return res.status(404).json({success : false , message : "Product is not found"})
      }
}
module.exports = {createProduct , deleteProduct , allProduct , updateProduct}