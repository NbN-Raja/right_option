const mongoose= require("mongoose")


SuccessSchema= new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    order: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxlength: 1000 },
    image: { type: String, required: true }   
})


const Success= mongoose.model("success",SuccessSchema )

module.exports= Success