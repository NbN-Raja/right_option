const mongoose= require("mongoose")


FaqSchema= new mongoose.Schema({
         title: String,
         image: String   
})


const Faq= mongoose.model("faq",FaqSchema)

module.exports= Faq