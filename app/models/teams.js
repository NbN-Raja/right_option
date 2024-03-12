const mongoose= require("mongoose")


TeamsSchema= new mongoose.Schema({
    name: { type: String},
    order: { type: Number },
    short_description: { type: String},
    image: { type: String }   
})


const Teams= mongoose.model("teams",TeamsSchema)

module.exports= Teams