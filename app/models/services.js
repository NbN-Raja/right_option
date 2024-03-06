const mongoose= require("mongoose")


ServiceSchema= new mongoose.Schema({
         name: String,
         image: String   
})


const Service= mongoose.model("service",ServiceSchema)

module.exports= Service