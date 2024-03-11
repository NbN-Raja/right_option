module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
  
    const { SuccessImage } = require("../middleware/multer/imageauth");
  
    const Success = require("../models/successstories");

    // Get All Countries
    router.get("/success", async function (req, res, next) {
      try {
        const result= await Success.find()
          
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
    router.post("/success",SuccessImage.single("image"),async function (req, res, next) {
        if (!req.file) {
          return res  .status(400)  .json({ success: false, message: "No image provided." });
        }
        try {
          const filename = "Success-"+new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

          const outputPath = path.join("./public/images/success", filename);
  
          await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

  
          const { name, order, description } = req.body;
  
          if (!name || !order || !description) {
            return res.status(400).json({ message: "All fields are required" });
          }

          const imagePath = `/images/success/${filename}`; 

          const result = new Success({
            name,
            order,
            description,
            image: imagePath,
          });

          await result.save();
          res.status(200).json({
            success:  true,
            message: "Data  saved successfully",
            data: result,
          });
        } catch (error) {
          console.error("Error saving Data:", error);
          return res.status(500).json({ error: "Internal Server Error",error });
        }
      }
    );
  
    // Getting Single  only
    router.get("/success/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Country.findById({ _id: id });
  
        if (!result) {
          res.status(301).json({ message: "Data Not found" });
        }
  
        res.status(200).json({ success: true, message: "Data  saved", result });
      } catch (error) {
        console.error("Error saving Data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/success/:id", SuccessImage.single("image"), async function (req, res, next) {
      try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
    
        const filename = "Success-"+new Date().toISOString().replace(/:/g, "-") + req.file.originalname;
        const output = path.join("./public/images/success", filename);
  
        await sharp(req.file.buffer)
        .resize(500) // Optional: Resize image to a width of 500px (maintaining aspect ratio)
        .jpeg({ quality: 70 })  // Convert to JPEG with 70% quality
        .toFile(output);


      const imagePath= `/images/succcess/${filename}`;
    
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: imagePath // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const result = await Success.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `Success update  with id=${id}.`
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
  
    router.delete("/success/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Success.findByIdAndDelete(id, { useFindAndModify: false, });
  
        if (!result) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({ success: true, message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting Data:", error);
        res
          .status(500)
          .json({ message: "Error deleting Data", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  