const mongoose= require("mongoose")


TestimonialsSchema= new mongoose.Schema({
         name: {type:String, require: true},
         order: {type:Number, require: true},
         description: {type:String, require: true},
         short_description: {type:String, require: true},
        image: {type:String, require: true},
         date: { type: Date, default: Date.now },
        
          
})


const Testimonial= mongoose.model("testimonial",TestimonialsSchema)

module.exports= Testimonial