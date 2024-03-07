const mongoose= require("mongoose")


CoursesSchema= new mongoose.Schema({
         name: {type:String,required: true},
         order: {type:Number,required: true},
         description:{type:String,required: true},
         short_description: {type:String,required: true},
         image: {type:String},  
})


const Courses= mongoose.model("courses",CoursesSchema)

module.exports= Courses