const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        min: 0 // Assuming order should be a positive number
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
});

const Pages = mongoose.model("page", PageSchema);

module.exports = Pages;
