const mongoose = require("mongoose");

const SeoSchema = new mongoose.Schema({
    seo_title: {
        type: String,
        required: true
    },
    seo_keywords: {
        type: String,
    },
    seo_description: {
        type: String,       
    },
    course_title: {
        type: String,
    },
    course_keywords: {
        type: String,
    },
    course_Description: {
        type: String,
    },
    blog_title: {
        type: String,
    },
    blog_keywords: {
        type: String,
    },
    blog_Description: {
        type: String,
    },
    service_title: {
        type: String,
    },
    service_keywords: {
        type: String,
    },
    service_Description: {
        type: String,
    },
   
});

const Seo = mongoose.model("seo", SeoSchema);

module.exports = Seo;
