const mongoose = require("mongoose");

const SlidersSchema = new mongoose.Schema({
    slogan: {
        type: String,
        required: true,
        minlength:1
    },
    title: {
        type: String,
        required: true,
        minlength:1
    },
    description: {
        type:String,
        require:true,
        minlength:1
    },
  
    image: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        
    }
});

const Slider = mongoose.model("Slider", SlidersSchema);

module.exports = Slider;
