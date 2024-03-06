const mongoose= require("mongoose")


SocialMediasSchema= new mongoose.Schema({
         title: String,
         image: String,
         link:String,
         order:Number
          
})


const Slider= mongoose.model("slider",SocialMediasSchema )

module.exports= Slider