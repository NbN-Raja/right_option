const mongoose= require("mongoose")


TeamsSchema= new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    order: { type: Number, required: true, min: 0 },
    short_description: { type: String, required: true, maxlength: 500 },
    image: { type: String, required: true }   
})


const Teams= mongoose.model("teams",TeamsSchema)

module.exports= Teams