module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { TestimonialImage } = require("../middleware/multer/imageauth");
  
    const Testimonial = require("../models/testimonials");
  
    // Get All Countries
    router.get("/testimonial", async function (req, res, next) {
      try {
       const result= await Testimonial.find()
         
            if (result.length === 0) {
              res.status(404).send({
                message: `There is no any data available !! please Update`,
              });
            } else {
              res.status(201).json({ message: "Testimonial Data found", result });
            }
        
      } catch (error) {
        console.error("Error saving country:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


  
    // Post All  countries Including Images of countries
    router.post("/testimonial",TestimonialImage.single("image"),async function (req, res, next) {
        if (!req.file) {
          return res .status(400) .json({ success: false, message: "No image provided." }); 
        }
        try {
          const filename = "Testimonials-" + req.file.originalname;
          const outputPath = path.join("./public/images/testimonials", filename);
  
          await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);
  
          const { name, order, description, short_description } = req.body;
  
          if (!name || !order || !description || !short_description) {
            return res.status(400).json({ message: "All fields are required" });
          }

          const imagePath = `/images/testimonials/${filename}`; // Construct the image path
  
          const testimonial = new Testimonial({
            name,
            order,
            description,
            short_description,
            image: imagePath,
          });
          // Save the new country to the database
          await testimonial.save();
           res.status(200).json({ success:true, message: "Country saved successfully",testimonial,   imagePath: imagePath});
        } catch (error) {
          console.error("Error saving country:", error);
          return res.status(500).json({ error: true, error: "Internal Server Error" });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/testimonial/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Country.findById({ _id: id });
  
        if (!result) {
          res.status(301).json({ message: "Country Not found" });
        }
  
        res.status(200).json({ message: "Country Name saved", result });
      } catch (error) {
        console.error("Error saving country:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/testimonial/:id", TestimonialImage.single("image"), async function (req, res, next) {
      try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
    
        const filename = "Testimonials-" + req.file.originalname;
          const outputPath = path.join("./public/images/testimonials", filename);
  
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

        const imagePath = `/images/testimonials/${filename}`; 

    
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({  message: `testimonial update  with id=${id}.` });
        }
    
        return res.status(200).json({  message: "testimonial updated successfully.",  data: result
        });
      } catch (error) {
        console.error("Error updating Data:", error);
        return res.status(500).json({   message: "Error updating Data",   error: error.message
        });
      }
    });
    
  
    //   delete countries
  
    router.delete("/testimonial/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Testimonial.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!result) {
          res.status(404).json({ message: "testimonial not found" });
        }
  
        res.status(200).json({ message: "testimonial deleted successfully" });
      } catch (error) {
        console.error("Error deleting :", error);
        res
          .status(500)
          .json({ message: "Error deleting ", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  