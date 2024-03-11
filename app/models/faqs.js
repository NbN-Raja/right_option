const mongoose= require("mongoose")


FaqSchema= new mongoose.Schema({
    title: {type:String,required: true, minlength:1},
    order: {type:Number,required: true, minlength: 0},
    description:{type:String,required: true, minlength:1},

    
})


const Faq= mongoose.model("faq",FaqSchema)

module.exports= Faq