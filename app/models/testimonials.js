const mongoose= require("mongoose")


TestimonialsSchema= new mongoose.Schema({
         name: String,
         image: String,
         date: { type: Date, default: Date.now },
        
          
})


const Testimonial= mongoose.model("testimonial",TestimonialsSchema)

module.exports= Testimonial