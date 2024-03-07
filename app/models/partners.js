const mongoose= require("mongoose")


PartnerSchema= new mongoose.Schema({
    name: {type:String,required: true},
    order: {type:Number,required: true},
    description:{type:String,required: true},
    short_description: {type:String,required: true},
    image: {type:String}, 
})


const Partner= mongoose.model("partner",PartnerSchema)

module.exports= Partner