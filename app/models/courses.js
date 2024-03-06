const mongoose= require("mongoose")


CoursesSchema= new mongoose.Schema({
         name: String,
         order: String,
         description: String,
         short_description: String,
         image: String   
})


const Blog= mongoose.model("blogs",CoursesSchema)

module.exports= Blog