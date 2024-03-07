const mongoose = require("mongoose");

const SeoSchema = new mongoose.Schema({
    seo_title: {
        type: String,
        required: true
    },
    seo_keywords: {
        type: String,
        required: true
    },
    seo_description: {
        type: String,
        required: true,
       
    },
    course_title: {
        type: String,
        required: true
    },
    course_keywords: {
        type: String,
        required: true
    },
    course_Description: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    blog_keywords: {
        type: String,
        required: true
    },
    blog_Description: {
        type: String,
        required: true
    },
    service_title: {
        type: String,
        required: true
    },
    service_keywords: {
        type: String,
        required: true
    },
    service_Description: {
        type: String,
        required: true
    },
   
});

const Seo = mongoose.model("seo", SeoSchema);

module.exports = Seo;
