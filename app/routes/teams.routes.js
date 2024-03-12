module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { TeamsImage } = require("../middleware/multer/imageauth");
  
    const Teams = require("../models/teams");

    // Get All Countries
    router.get("/teams", async function (req, res, next) {
      try {
        const result= await Teams.find()
          
             if (result.length === 0) {
               res.status(404).send({
                 message: `There is no any data available !! please Update`,
               });
             } else {
               res.status(201).json({success: true, message: "Data found", data:result });
             }
         
       } catch (error) {
         console.error("Error saving Data:", error);
         res.status(500).json({ error: "Internal Server Error" });
       } 
      
      });
  
    // Post All  countries Including Images of countries
    router.post("/teams",TeamsImage.single("image"),async function (req, res, next) {
        
        try {
          let imagePath= null;
          if (req.file) {
            
            const filename = "Teams-"+new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

          const outputPath = path.join("./public/images/teams", filename);
  
          await sharp(req.file.buffer)  .resize(500)  .jpeg({ quality: 70 })  .toFile(outputPath);
  
  
           imagePath = `/images/teams/${filename}`; 
          }

          const { name, order, short_description } = req.body;

          const result = new Teams({
            name,
            order,
            short_description,
            image: imagePath,
          });
          // Save the new country to the database
          await result.save();
          res.status(200).json({success: true,
            message: "Data saved successfully",
            result // Save image path
          });
        } catch (error) {
          console.error("Error saving Data:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/teams/:id", async function name(req, res, next) {
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
    router.put("/teams/:id", TeamsImage.single("image"), async function (req, res, next) {
      try {

        let imagePath=null;
        if (req.file) {
          const filename = "Teams-"+new Date().toISOString().replace(/:/g, "-") + req.file.originalname;
          const output = path.join("./public/images/teams", filename);
    
          await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(output);
      
           imagePath= `/images/teams/${filename}`;
        }
    
       
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Teams.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `Teams update Country with id=${id}.`
          });
        }
    
        return res.status(200).json({
          message: "Teams updated successfully.",
          data: result
        });
      } catch (error) {
        console.error("Error updating Country:", error);
        return res.status(500).json({
          message: "Error updating Country",
          error: error.message
        });
      }
    });
    
  
    //   delete countries
  
    router.delete("/teams/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Teams.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!result) {
          res.status(404).json({ message: "Teams not found" });
        }
  
        res.status(200).json({ message: "Teams deleted successfully" });
      } catch (error) {
        console.error("Error deleting country:", error);
        res
          .status(500)
          .json({ message: "Error deleting country", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  