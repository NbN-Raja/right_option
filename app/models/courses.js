const mongoose= require("mongoose")


CoursesSchema= new mongoose.Schema({
    name: { type: String },
    order: { type: Number },
    description: { type: String },
    short_description: { type: String },
    image: { type: String}  
})


const Courses= mongoose.model("courses",CoursesSchema)

module.exports= Courses