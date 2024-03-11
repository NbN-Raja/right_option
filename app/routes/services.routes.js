module.exports = (app) => {
    const path = require("path");
    const sharp = require("sharp");

    const Service = require("../models/services");

    const { ServiceUpload } = require("../middleware/multer/imageauth");

    var router = require("express").Router();

    // Get All countries Detaills

    router.get("/service", async (req, res) => {
      try {
        const result = await Service.find();
        if (result.length === 0) {
          return res.status(404).send({
            message: `There is no any data available !! please Update`,
          });
        }
        res.status(200).json({ success: true, statusCode: 200, message: "service Data found", data: result });
      } catch (err) {
        console.error("Error retrieving Services:", err);
        res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    });


    // Post Service
    router.post("/service", ServiceUpload.single("image"), async (req, res) => {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image provided." });
      }
      try {
        const filename = "Services-" + req.file.originalname;
        const outputPath = path.join("./public/images/services", filename);
  
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);
  
        const { name, order, description, short_description } = req.body;
  
        if (!name || !order || !description || !short_description) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        const imagePath = `/images/services/${filename}`; // Construct the image path
        const result = new Service({
          name,
          order,
          description,
          short_description,
          image: imagePath,
        });
        // Save the new Courses to the database
        await result.save();
        res.status(200).json({
          success: true, message: "Service Data saved successfully", data:result // Save image path
        });
      } catch (error) {
        console.error("Error saving Service Data:", error);
        return res.status(500).json({ error: "Internal Server Error", error });
      }
    });


    // Get Single  Courses Here

    router.get("/service/:id", async (req, res) => {
        try {
            const id = req.params.id;
    
            const result = await Service.findById({ _id: id });
            if (!result) {
                return res.status(301).json({ message: "No Services found related to this id" });
            }
            return res.status(200).json({ message: "Data Found", data:result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error Occurred", error });
        }
    });
    

    // Update The Courses

    router.put("/service/:id", ServiceUpload.single("image"), async function (req, res, next) {
        
    try {
      if (!req.file) {
        return res.status(400).send("No file was uploaded.");
      }

      const filename = "Courses-" +  req.file.originalname;
      const outputPath = path.join("./public/images/services", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const imagePath = `/images/services/${filename}`; // Construct the image path

      const id = req.params.id;
      const updatedData = {
        ...req.body,
        image: imagePath, // Set the image field to the new filename
      };

      // Update the Courses document with the new data
      const result = await Service.findByIdAndUpdate(id, updatedData, { new: true });

      if (!result) {
        return res.status(404).send({ message: `Cannot update services with id=${id}.`, });
      }

      return res.status(200).json({
        message: "services updated successfully.", data: result
      });
    } catch (error) {
      console.error("Error updating services:", error);
      return res.status(500).json({
        success: true, message: "Error updating services", error: error.message,
      });
    }
      });




      // Delete Specific Routes HERE

      router.delete("/service/:id", async (req,res)=>{
        try {
          const id = req.params.id;
          const result = await Service.findByIdAndDelete(id, { useFindAndModify: false });
    
          if (!result) {
            return res.status(404).json({ message: "Services not found" });
          }
    
          res.status(200).json({ message: "Services deleted successfully" });
        } catch (error) {
          console.error("Error deleting Services:", error);
          return res.status(500).json({ message: "Error deleting Services", error: error.message });
        }
      });

    app.use("/api", router);
};
