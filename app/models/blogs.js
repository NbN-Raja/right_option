const mongoose= require("mongoose")


BlogsSchema= new mongoose.Schema({
         title: { type: String, required: true },
         date: { type: Date, default: Date.now },
         description: { type: String, required: true },
         short_description: { type: String, required: true },
         image:{type: String},
         banner_image:{type: String},
         seo_title:{type: String},
         meta_description:{type: String},
         seo_schema:{type:String},
         meta_keywords:{type:String},
         created_by: {type: String},
          
})


const Blog= mongoose.model("blogs",BlogsSchema)

module.exports= Blog