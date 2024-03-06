const mongoose= require("mongoose")


SlidersSchema= new mongoose.Schema({
         title: String,
         image: String,
          
})


const Slider= mongoose.model("slider",SlidersSchema )

module.exports= Slider