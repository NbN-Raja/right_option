const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    course_title: {
        type: String,
        trim: true,
    },
    country_title: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    team_title: {
        type: String,
        required: true
    },
    testimonial_title: {
        type: String,
        required: true
    },
    faq_title: {
        type: String,
        required: true
    },
    faq_description: {
        type: String, 
    },
    home_seotitle: {
        type: String,
        required: true
    },
    home_seokeyword: {
        type: String,
        
    },
    home_description: {
        type: String,
       
    }
});

const Homepage = mongoose.model("homepage", HomeSchema);

module.exports = Homepage;
