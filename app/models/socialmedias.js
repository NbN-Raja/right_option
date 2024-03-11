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
    },
    order: {
        type: Number,
        required: true,
        min: 1 // Assuming order should be a positive number
    }
});

const Social = mongoose.model("social", SocialMediasSchema);

module.exports = Social;
