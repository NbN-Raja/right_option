const mongoose= require("mongoose")


ServiceSchema= new mongoose.Schema({
    name: {type:String,required: true},
    order: {type:Number,required: true},
    description:{type:String,required: true},
    short_description: {type:String,required: true},
    image: {type:String}, 
})


const Service= mongoose.model("service",ServiceSchema)

module.exports= Service