const mongoose= require("mongoose")


TeamsSchema= new mongoose.Schema({
    name: { type: String, required: true},
    order: { type: Number },
    short_description: { type: String},
    image: { type: String, required: true }   
})


const Teams= mongoose.model("teams",TeamsSchema)

module.exports= Teams