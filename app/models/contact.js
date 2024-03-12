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
    },
    location: {
        type: String,
    },
    seo_title: {
        type: String,
    },
    seo_keyword: {
        type: String,
    },
    seo_description: {
        type: String,
    },
    banner_image: {
        type: String,
    }
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;
