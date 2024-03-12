module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { SliderImage } = require("../middleware/multer/imageauth");
  
    const Slider = require("../models/sliders");

    // Get All Countries
    router.get("/slider", async function (req, res, next) {
      try {
        const result= await Slider.find()
          
             if (result.length === 0) {
               res.status(404).send({
                 message: `There is no any data available !! please Update`,
               });
             } else {
               res.status(201).json({success: true, message: "Data found", result });
             }
         
       } catch (error) {
         console.error("Error saving Data:", error);
         res.status(500).json({ error: "Internal Server Error" });
       } 
    });
  
    // Post All  countries Including Images of countries
    router.post("/slider",SliderImage.single("image"),async function (req, res, next) {
        
        try {

          let imagePath= null;
          if (req.file) {
            const filename = "Slider-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

            const outputPath = path.join("./public/images/slider", filename);
    
            await sharp(req.file.buffer) .resize(500) .jpeg({ quality: 70 }) .toFile(outputPath);
    
    
           
   
             imagePath = `/images/slider/${filename}`; 
          }

          const { slogan, title, order,description } = req.body;


          const result = new Slider({
            slogan,
            title,
            order,
            description,
            image: imagePath,
          });
          // Save the new country to the database
          await result.save();
          res.status(200).json({
            success: true,
            message: "Data saved successfully",
            data: result
          });
        } catch (error) {
          console.error("Error saving Data:", error);
          return res.status(500).json({ error: "Internal Server Error",error });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/slider/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Slider.findById({ _id: id });
  
        if (!result) {
         return res.status(301).json({ message: "Data  Not found" });
        }
  
         return res.status(200).json({ message: "Data  saved", data:result });
      } catch (error) {
        console.error("Error saving Data:", error);
       return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/slider/:id", SliderImage.single("image"), async function (req, res, next) {
      try {
        let imagePath= null;
        if (req.file) {
          const filename = "Slider-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

          const outputPath = path.join("./public/images/slider", filename);
  
          await sharp(req.file.buffer) .resize(500) .jpeg({ quality: 70 }) .toFile(outputPath);
  
  
         
 
           imagePath = `/images/slider/${filename}`; 
        }

        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Slider.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `Not Fount Data   with id=${id}.` });
        }
    
        return res.status(200).json({
          message: "Data updated successfully.",
          data: result
        });
      } catch (error) {
        console.error("Error Data Data:", error);
        return res.status(500).json({  errror: true,  message: "Error Data Failed",  error: error.message
        });
      }
    });
    
  
    //   delete countries
  
    router.delete("/slider/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const deletedCountry = await Slider.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!deletedCountry) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({ message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting Data:", error);
        res
          .status(500)
          .json({ message: "Error deleting Data", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  