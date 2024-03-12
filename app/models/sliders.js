const mongoose = require("mongoose");

const SlidersSchema = new mongoose.Schema({
    slogan: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type:String,
       
    },
  
    image: {
        type: String,
    },
    order: {
        type: Number,
        
    }
});

const Slider = mongoose.model("Slider", SlidersSchema);

module.exports = Slider;
