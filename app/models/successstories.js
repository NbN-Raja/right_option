const mongoose= require("mongoose")


SuccessSchema= new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    order: { type: Number, min: 0 },
    description: { type: String, maxlength: 1000 },
    image: { type: String }   
})


const Success= mongoose.model("success",SuccessSchema )

module.exports= Success