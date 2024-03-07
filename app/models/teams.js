const mongoose= require("mongoose")


TeamsSchema= new mongoose.Schema({
    name: {type:String,required: true},
    order: {type:Number,required: true},
    short_description: {type:String,required: true},
    image: {type:String}, 
})


const Teams= mongoose.model("teams",TeamsSchema)

module.exports= Teams