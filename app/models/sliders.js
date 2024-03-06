const mongoose= require("mongoose")


SlidersSchema= new mongoose.Schema({
         slogan: String,
         title: String,
         link: String,
         image: String,
         order: String   
})


const Slider= mongoose.model("slider",SlidersSchema )

module.exports= Slider