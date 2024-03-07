const mongoose= require("mongoose")


SuccessSchema= new mongoose.Schema({
    name: {type:String,required: true},
    description:{type:String,required: true},
    order: {type:Number,required: true},
    image: {type:String}, 
})


const Success= mongoose.model("success",SuccessSchema )

module.exports= Success