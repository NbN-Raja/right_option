const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    map: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // Validate email format
        validate: {
            validator: function(v) {
                // Regular expression to validate email format
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    seo_title: {
        type: String,
        required: true
    },
    seo_keyword: {
        type: String,
        required: true
    },
    seo_description: {
        type: String,
        required: true
    },
    banner_image: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
