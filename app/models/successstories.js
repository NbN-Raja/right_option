const mongoose= require("mongoose")


SuccessSchema= new mongoose.Schema({
         name: String,
         order: String,
         image: String   
})


const Success= mongoose.model("success",Success )

module.exports= Success