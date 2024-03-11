module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { PagesImage } = require("../middleware/multer/imageauth");
  
    const Pages = require("../models/pages");

    // Get All Countries
    router.get("/page", async function (req, res, next) {
      try {
        const result= await Pages.find()
          
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
    router.post("/page",PagesImage.single("image"),async function (req, res, next) {
      if (!req.file) {
        return res  .status(400)  .json({ success: false, message: "No image provided." });
         }
      try {

        const filename = "Pages-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;


        const outputPath = path.join("./public/images/pages", filename);

        await sharp(req.file.buffer) .resize(500) .jpeg({ quality: 70 }) .toFile(outputPath);

        const { title, order,description } = req.body;

        if ( !title || !description || !order) {
          return res.status(400).json({ message: "All fields are required" });
        }


        const imagePath = `/images/pages/${filename}`; 

        const result = new Pages({
          
          title,
          order,
          description,
          image: imagePath,
        });
        // Save the new country to the database
        await result.save();
        res.status(200).json({
          success: true,
          message: "Country saved successfully",
          data: result
        });
      } catch (error) {
        console.error("Error saving country:", error);
        return res.status(500).json({ error: "Internal Server Error",error });
      }
      }
    );
  
    // Getting Single Country only
    router.get("/page/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Pages.findById({ _id: id });
  
        if (!result) {
         return res.status(301).json({ message: "Data Not found" });
        }
  
        return res.status(200).json({ message: "Data Not saved", result });
      } catch (error) {
        console.error("Error saving Data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/page/:id", PagesImage.single("image"), async function (req, res, next) {
      try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
        const filename = "Pages-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

        const output = path.join("./public/images/pages", filename);
  
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(output);
  
        const imagePath= `/images/pages/${filename}`;
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Pages.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            success: false,
            message: `Success update  with id=${id}.`
          });
        }
    
        return res.status(200).json({
            message: "Success updated successfully.",  data: result
       });
      } catch (error) {
        console.error("Error updating Country:", error);
        return res.status(500).json({ message: "Error updating Country", error: error.message });
      }
    });
    
  
    //   delete countries
  
    router.delete("/page/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Pages.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!result) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({ message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting Data:", error);
        res.status(500).json({ message: "Error deleting Data", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  