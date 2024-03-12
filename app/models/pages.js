const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    order: {
        type: Number,
        min: 0 // Assuming order should be a positive number
    },
    description: {
        type: String
    },
    image: {
        type: String,
    }
});

const Pages = mongoose.model("page", PageSchema);

module.exports = Pages;
