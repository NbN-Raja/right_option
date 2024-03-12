const mongoose= require("mongoose")


ServiceSchema= new mongoose.Schema({
    name: {type:String,required: true},
    order: {type:Number},
    description:{type:String},
    short_description: {type:String},
    image: {type:String}, 
})


const Service= mongoose.model("service",ServiceSchema)

module.exports= Service