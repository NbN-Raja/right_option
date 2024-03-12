const mongoose= require("mongoose")


TestimonialsSchema= new mongoose.Schema({
         name: {type:String, require: true},
         order: {type:Number},
         description: {type:String},
         short_description: {type:String},
         image: {type:String},
         date: { type: Date, default: Date.now },
        
          
})


const Testimonial= mongoose.model("testimonial",TestimonialsSchema)

module.exports= Testimonial