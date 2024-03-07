module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { PartnerImage } = require("../middleware/multer/imageauth");
  
    const Partner = require("../models/partners");
  
    // Get All Countries
    router.get("/partner", async function (req, res, next) {
      try {
        await Partner.find()
          .then((data) => {
            if (data.length === 0) {
              res.status(404).send({
                message: `There is no any data available !! please Update`,
              });
            } else {
              res.status(201).json({ message: "Partner Data found", data });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Internal server error",
            });
          });
      } catch (error) {
        console.error("Error saving country:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Post All  countries Including Images of countries
    router.post("/partner",PartnerImage.single("image"),async function (req, res, next) {
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No image provided." });
        }
        try {
          const filename =
            "country-" +
            new Date().toISOString().replace(/:/g, "-") +
            path.extname(req.file.originalname);
          const outputPath = path.join("./app/public/images/Partners", filename);
  
          await sharp(req.file.buffer)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(outputPath);
  
          const { name, order, description, short_description } = req.body;
  
          if (!name || !order || !description || !short_description) {
            return res.status(400).json({ message: "All fields are required" });
          }
  
          const partner = new Partner({
            name,
            order,
            description,
            short_description,
            image: filename,
          });
          // Save the new country to the database
          await partner.save();
          res.status(200).json({
            message: "Country saved successfully",
            imagePath: outputPath, // Save image path
          });
        } catch (error) {
          console.error("Error saving country:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/partner/:id", async function name(req, res, next) {
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
    router.put("/partner/:id", PartnerImage.single("image"), async function (req, res, next) {
      try {
        if (!req.file) {
          return res.status(400).send("No file was uploaded.");
        }
    
        const filename = "country-" + new Date().toISOString().replace(/:/g, "-") + path.extname(req.file.originalname);
        const output = path.join("./app/public/images/Partners", filename);
  
        await sharp(req.file.buffer)
        .resize(500) // Optional: Resize image to a width of 500px (maintaining aspect ratio)
        .jpeg({ quality: 70 })  // Convert to JPEG with 70% quality
        .toFile(output);
    
        const id = req.params.id;
        const updatedData = {
          ...req.body,
          image: filename // Set the image field to the new filename
        };
    
        // Update the country document with the new data
        const updatedPartner = await Partner.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!updatedCountry) {
          return res.status(404).send({
            message: `Partner update Country with id=${id}.`
          });
        }
    
        return res.status(200).json({
          message: "Partner updated successfully.",
          data: updatedPartner
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
  
    router.delete("/partner/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const deletedCountry = await Partner.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!deletedCountry) {
          res.status(404).json({ message: "Partner not found" });
        }
  
        res.status(200).json({ message: "Partner deleted successfully" });
      } catch (error) {
        console.error("Error deleting country:", error);
        res
          .status(500)
          .json({ message: "Error deleting country", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  