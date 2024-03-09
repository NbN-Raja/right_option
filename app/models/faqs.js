const mongoose= require("mongoose")


FaqSchema= new mongoose.Schema({
    title: {type:String,required: true},
    order: {type:Number,required: true},
    description:{type:String,required: true},
})


const Faq= mongoose.model("faq",FaqSchema)

module.exports= Faq