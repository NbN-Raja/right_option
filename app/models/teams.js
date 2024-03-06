const mongoose= require("mongoose")


TeamsSchema= new mongoose.Schema({
         name: String,
         image: String   
})


const Teams= mongoose.model("teams",TeamsSchema)

module.exports= Teams