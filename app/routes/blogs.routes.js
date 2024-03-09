module.exports = (app) => {
  const path = require("path");
  const sharp = require("sharp");

  const Blog = require("../models/blogs");


  var router = require("express").Router();


  const multer = require('multer');
  const memoryStorage = multer.memoryStorage();
  const imageUpload = multer({ storage: memoryStorage });



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


  const imageFields = [
    { name: 'image', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
];

  // Post Courses
  router.post("/blog", imageUpload.fields(imageFields), async (req, res) => {
    if (!req.files || !req.files['image'] || !req.files['banner_image']) {
      return res.status(400).json({ success: false, message: "No image provided." });
    }

    try {

      // get all fields

      const {image: [imageFile], banner_image: [BannerFie]}= req.files;

      const [imageName, BannerName] = ["image", "banner_image"].map(prefix => `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`);

      const [ImageOutput, BannerOutput] =  ["image", "banner_image"].map(prefix => path.join("./public/images/blog", `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`));

      await Promise.all([
                  sharp(imageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(ImageOutput),
                  sharp(BannerFie.buffer).resize(500).jpeg({ quality: 70 }).toFile(BannerOutput),
      ])


      const { title, date, description, created_by, short_description, seo_title, meta_description, seo_schema, meta_keyword } = req.body;

      if (!title || !date || !description || !short_description || !seo_title || !meta_description || !seo_schema || !meta_keyword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const imagePath = `/images/blog/${imageName}`; // Construct the image path
      const BannerPath = `/images/blog/${BannerName}`; // Construct the image path


      const result = new Blog({
        title,
        seo_title,
        meta_description,
        seo_schema,
        meta_keyword,
        description,
        short_description,
        image: imagePath,
        banner_image: BannerPath,
        created_by
      });

      // Save the new blog to the database
      await result.save();
      res.status(200).json({ message: "Blog saved successfully",result });
    } catch (error) {
      console.error("Error saving blog:", error);
      return res.status(500).json({ error: "Internal Server Error" });
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

  router.put("/blog/:id", imageUpload.fields(imageFields), async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).send("No file was uploaded.");
      }



      // get files

      const {image: [imageFile], banner_image: [BannerFie]}= req.files;

      const [imageName, BannerName] = ["image", "banner_image"].map(prefix => `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`);

      const [ImageOutput, BannerOutput] =  ["image", "banner_image"].map(prefix => path.join("./public/images/blog", `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`));

      await Promise.all([
                  sharp(imageFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(ImageOutput),
                  sharp(BannerFie.buffer).resize(500).jpeg({ quality: 70 }).toFile(BannerOutput),
      ])

      const imagePath = `/images/blog/${imageName}`; // Construct the image path
      const BannerPath = `/images/blog/${BannerName}`; // Construct the image path


      const id = req.params.id;
      const updatedData = {
        ...req.body,
        image: imagePath,
        banner_image: BannerPath
      };

      // Update the country document with the new data
      const result = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

      if (!result) {
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



  router.delete("/blog/:id", async (req, res) => {
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
