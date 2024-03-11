module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { SocialImage } = require("../middleware/multer/imageauth");
  
    const Social = require("../models/socialmedias");

    // Get All Countries
    router.get("/social", async function (req, res, next) {
      try {
        const result= await Social.find()
          
             if (result.length === 0) {
               res.status(404).send({
                 message: `There is no any data available !! please Update`,
               });
             } else {
               res.status(201).json({success: true, message: "Data found", data: result });
             }
         
       } catch (error) {
         console.error("Error saving Data:", error);
         res.status(500).json({ error: "Internal Server Error" });
       } 
    });
  
    // Post All  countries Including Images of countries
    router.post("/social",SocialImage.single("image"),async function (req, res, next) {
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No image provided." });
        }
        try {
          const filename = "Social-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

          const outputPath = path.join("./public/images/social", filename);

          await sharp(req.file.buffer) .resize(500) .jpeg({ quality: 70 }) .toFile(outputPath);

  
          const { title, link, order } = req.body;
  
          if (!title || !link || !order) {
            return res.status(400).json({ message: "All fields are required" });
          }

          const imagePath= `/images/social/${filename}`;  
          const result = new Social({
            title,
            link,
            order,
            image: imagePath,
          });
          // Save the new country to the database
          await result.save();
          res.status(200).json({ success: true,  message: "Social saved successfully", data:result  });
        } catch (error) {
          console.error("Error saving Social:", error);
          return res.status(500).json({ error: true, error: "Internal Server Error" });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/social/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Social.findById({ _id: id });
  
        if (!result) {
         return res.status(301).json({ message: "Data Not found" });
        }
  
         return res.status(200).json({ message: "Data Name saved", result });
      } catch (error) {
        console.error("Error saving Data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/social/:id", SocialImage.single("image"), async function (req, res, next) {
      try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
    
        const filename = "Social-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

        const outputPath = path.join("./public/images/social", filename);

        await sharp(req.file.buffer) .resize(500) .jpeg({ quality: 70 }) .toFile(outputPath);

        const imagePath= `/images/social/${filename}`;
    
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Social.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `Cannot Get Data  with id=${id}.`
          });
        }
    
        return res.status(200).json({
          message: "Success updated successfully.",
          data: result
        });
      } catch (error) {
        console.error("Error updating Data:", error);
        return res.status(500).json({
          message: "Error updating Data",
          error: error.message
        });
      }
    });
    
  
    //   delete countries
  
    router.delete("/social/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Social.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!result) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({success: true, message: "Deleted Data successfully" });
      } catch (error) {
        console.error("Error deleting Data:", error);
        res
          .status(500)
          .json({ message: "Error deleting Data", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  