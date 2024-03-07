const mongoose = require("mongoose");

const SocialMediasSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regular expression to check URL format
                return /^(https?:\/\/)?([\w\d\-]+\.)+[\w\d]{2,}(\/[\w\d\-]+)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    order: {
        type: Number,
        required: true,
        min: 1 // Assuming order should be a positive number
    }
});

const Social = mongoose.model("social", SocialMediasSchema);

module.exports = Social;
