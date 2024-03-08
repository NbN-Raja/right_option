const mongoose= require("mongoose")


GlobalSchema= new mongoose.Schema({
    logo: {type:String,required: true},
    footer: {type:String,required: true},
    icon:{type:String,required: true},
    info:{type:String,required: true},
    copyright:{type:String,required: true},
})


const Global= mongoose.model("global",GlobalSchema)

module.exports= Global