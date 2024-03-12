module.exports = (app) => {
  var router = require("express").Router();
  const path = require("path");
  const sharp = require("sharp");

  const { CoursesUpload } = require("../middleware/multer/imageauth");

  const Courses = require("../models/courses");
  const {isSuperAdmin} = require("../middleware/auth/tokenverify")

  // router.use(isSuperAdmin);
  

  // Get All Countries
  router.get("/courses", async (req, res) => {
    try {
      const result = await Courses.find();
      if (result.length === 0) {
        return res.status(404).send({
          message: `There is no any data available !! please Update`,
        });
      }
      res.status(200).json({ success: true, message:"Data found", data: result });
    } catch (err) {
      console.error("Error retrieving Data:", err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  });


  // Post All  countries Including Images of countries
 
  
  router.post("/courses", CoursesUpload.single("image"), async function (req, res, next) {
    try {
      let imagePath = null; // Initialize image path
  
      if (req.file) {
        // If image is provided
        const filename = "Courses-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

        const outputPath = path.join("./public/images/courses", filename);
  
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);
  
        imagePath = `/images/courses/${filename}`; // Construct the image path
      }
  
      const { name, order, description, short_description } = req.body;
  
  
      const result = new Courses({
        name,
        order,
        description,
        short_description,
        image: imagePath, // Assign image path (null if no image provided)
      });
  
      // Save the new Courses to the database
      await result.save();
      
      res.status(200).json({
        success: true, message: "Data saved successfully", data: result // Save image path
      });
    } catch (error) {
      console.error("Error saving Courses:", error);
      return res.status(500).json({ error: "Internal Server Error", error });
    }
  });
  

  // Getting Single Courses only
  router.get("/courses/:id", async function name(req, res, next) {
    try {
      const id = req.params.id;

      const result = await Courses.findById({ _id: id });

      if (!result) {
        return res.status(301).json({ success: false, message: "Courses  Not found" });
      }

      res.status(200).json({ success: true, message: "Courses Name saved", data:result });
    } catch (error) {
      console.error("Error saving Courses:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });



  // Update Courses according to ID
  router.put("/courses/:id", CoursesUpload.single("image"), async function (req, res, next) {

    try {
      if (!req.file) {
        return res.status(400).send("No file was uploaded.");
      }

      const filename = "Courses-" + req.file.originalname;
      const outputPath = path.join("./public/images/courses", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const imagePath = `/images/courses/${filename}`; // Construct the image path

      const id = req.params.id;
      const updatedData = {
        ...req.body,
        image: imagePath, // Set the image field to the new filename
      };

      // Update the Courses document with the new data
      const result = await Courses.findByIdAndUpdate(id, updatedData, { new: true });

      if (!result) {
        return res.status(404).send({ message: `Cannot update Courses with id=${id}.`, });
      }

      return res.status(200).json({ success: true,
        message: "Courses updated successfully.", data: result,
      });
    } catch (error) {
      console.error("Error updating Courses:", error);
      return res.status(500).json({
        success: true, message: "Error updating Courses", error: error.message,
      });
    }
  }
  );

  //   delete countries

  router.delete("/courses/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Courses.findByIdAndDelete(id, { useFindAndModify: false });

      if (!result) {
        return res.status(404).json({ message: "Courses not found" });
      }

      res.status(200).json({ message: "Courses deleted successfully" });
    } catch (error) {
      console.error("Error deleting Courses:", error);
      return res.status(500).json({ message: "Error deleting Courses", error: error.message });
    }
  });

  app.use("/api", router);
};
