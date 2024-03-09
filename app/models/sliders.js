const mongoose = require("mongoose");

const SlidersSchema = new mongoose.Schema({
    slogan: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        require:true
    },
  
    image: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        // Validate that order is a positive integer
        validate: {
            validator: function(v) {
                return Number.isInteger(v) && v > 0;
            },
            message: props => `${props.value} is not a valid order value!`
        }
    }
});

const Slider = mongoose.model("Slider", SlidersSchema);

module.exports = Slider;
