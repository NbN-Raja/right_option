module.exports = (app) => {
    var router = require("express").Router();

    const Country = require("../models/countries");
    const Courses = require("../models/courses");
    const Service = require("../models/services");
    const Blog = require("../models/blogs");
    const Testimonials = require("../models/testimonials");
    const Partner = require("../models/partners");
    const Teams = require("../models/teams");
    const Faq = require("../models/faqs");
    const Pages = require("../models/pages");
    const Slider = require("../models/sliders");
    const Success = require("../models/successstories");
    const Social = require("../models/socialmedias");

    // Get counts for all models
    router.get("/count", async (req, res) => {
        try {
            const countryCount = await Country.countDocuments();
            const coursesCount = await Courses.countDocuments();
            const serviceCount = await Service.countDocuments();
            const BlogCount = await Blog.countDocuments();
            const TestimonialsCount = await Testimonials.countDocuments();
            const PartnerCount = await Partner.countDocuments();
            const TeamsCount = await Teams.countDocuments();
            const FaqCount = await Faq.countDocuments();
            const PagesCount = await Pages.countDocuments();
            const SliderCount = await Slider.countDocuments();
            const SuccessCount = await Success.countDocuments();
            const SocialCount = await Social.countDocuments();

            res.json({
                message: "Counts for all models",
                countryCount,
                coursesCount,
                serviceCount,
                BlogCount,
                TestimonialsCount,
                PartnerCount,
                TeamsCount,
                FaqCount,
                PagesCount,
                SliderCount,
                SuccessCount,
                SocialCount


            });
        } catch (err) {
            console.error("Error counting documents:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.use("/api/", router);
};
