const mongoose = require("mongoose");

const SocialMediasSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    order: {
        type: Number,
      
    }
});

const Social = mongoose.model("social", SocialMediasSchema);

module.exports = Social;
