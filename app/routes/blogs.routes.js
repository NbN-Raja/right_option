module.exports = (app) => {
    const path = require("path");
    const sharp = require("sharp");

    const Blog = require("../models/blogs");


    var router = require("express").Router();
  

    const multer = require('multer');
const memoryStorage = multer.memoryStorage();
const imageUpload = multer({ storage: memoryStorage });

// Post Courses
router.post("/blog", imageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), async (req, res) => {
    if (!req.files || !req.files['image'] || !req.files['banner_image']) {
        return res.status(400).json({ success: false, message: "No image provided." });
    }
    
    try {
        const imageFile = req.files['image'][0];
        const bannerImageFile = req.files['banner_image'][0];

        const imageFilename = "course-" + new Date().toISOString().replace(/:/g, "-") + path.extname(imageFile.originalname);
        const bannerImageFilename = "course-banner-" + new Date().toISOString().replace(/:/g, "-") + path.extname(bannerImageFile.originalname);

        const imageOutputPath = path.join("./app/public/images/blog", imageFilename);
        const bannerImageOutputPath = path.join("./app/public/images/blog", bannerImageFilename);

        await sharp(imageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(imageOutputPath);
        await sharp(bannerImageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(bannerImageOutputPath);

        const { title,date, description, created_by, short_description, seo_title, meta_description, seo_schema, meta_keyword } = req.body;

        if (!title  || !date || !description || !short_description || !seo_title || !meta_description || !seo_schema || !meta_keyword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBlog = new Blog({
            title,
            seo_title,
            meta_description,
            seo_schema,
            meta_keyword,
            description,
            short_description,
            image: imageFilename,
            banner_image: bannerImageFilename,
            created_by
        });

        // Save the new blog to the database
        await newBlog.save();
        res.status(200).json({ message: "Blog saved successfully" });
    } catch (error) {
        console.error("Error saving blog:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


    // Get All countries Detaills

    router.get("/blog", async (req, res) => {
        try {
            const blogs = await Blog.find({});

            if (blogs.length === 0) {
                res.status(301).json({ message: "No data in database! Add Data" });
            }
            res
                .status(201)
                .json({ message: "Getting All data from database", blogs });
        } catch (error) {
            console.error();
            res.status(500).json({ error: "Error Occured", error });
        }
    });

    // Get Single  Courses Here 

    router.get("/blog/:id", async (req, res) => {
        try {
            const id = req.params.id;
    
            const result = await Blog.findById({ _id: id });
            if (!result) {
                return res.status(301).json({ message: "No Blogs found related to this id" });
            }
            return res.status(200).json({ message: "Data Found", result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error Occurred", error });
        }
    });
    

    // Update The Courses

    router.put("/blog/:id", imageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), async (req, res) => {
      try {
          if (!req.files) {
            return res.status(400).send("No file was uploaded.");
          }
      
          const imageFile = req.files['image'][0];
          const bannerImageFile = req.files['banner_image'][0];
  
          const imageFilename = "course-" + new Date().toISOString().replace(/:/g, "-") + path.extname(imageFile.originalname);
          const bannerImageFilename = "course-banner-" + new Date().toISOString().replace(/:/g, "-") + path.extname(bannerImageFile.originalname);
  
          const imageOutputPath = path.join("./app/public/images/blog", imageFilename);
          const bannerImageOutputPath = path.join("./app/public/images/blog", bannerImageFilename);
  
          await sharp(imageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(imageOutputPath);
          await sharp(bannerImageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(bannerImageOutputPath);
      
          const id = req.params.id;
          const updatedData = {
            ...req.body,
            image: imageFilename ,
            banner_image: bannerImageFilename 
          };
      
          // Update the country document with the new data
          const updatedCountry = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
      
          if (!updatedCountry) {
            return res.status(404).send({
              message: `Cannot update Country with id=${id}.`
            });
          }
      
          return res.status(200).json({
            message: "Country updated successfully.",
            data: updatedCountry
          });
        } catch (error) {
          console.error("Error updating Country:", error);
          return res.status(500).json({
            message: "Error updating Country",
            error: error.message
          });
        }
      });



      router.delete("/blog/:id", async (req,res)=>{
        try {
            const id = req.params.id;
            const deletedCountry = await Blog.findByIdAndDelete(id, {
              useFindAndModify: false,
            });
      
            if (!deletedCountry) {
              res.status(404).json({ message: "Courses not found" });
            }
      
            res.status(200).json({ message: "Courses deleted successfully" });
          } catch (error) {
            console.error("Error deleting Courses:", error);
            res
              .status(500)
              .json({ message: "Error deleting Courses", error: error.message });
          }
        });

    app.use("/api", router);
};
