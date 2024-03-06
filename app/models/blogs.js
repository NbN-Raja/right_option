const mongoose= require("mongoose")


BlogsSchema= new mongoose.Schema({
         name: String,
         title: String,
         date: { type: Date, default: Date.now },
         created_by: String,
          
})


const Blog= mongoose.model("blogs",BlogsSchema)

module.exports= Blog