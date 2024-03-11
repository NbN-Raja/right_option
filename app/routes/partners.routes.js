module.exports = (app) => {
  var router = require("express").Router();
  const path = require("path");
  const sharp = require("sharp");

  const { PartnerImage } = require("../middleware/multer/imageauth");

  const Partner = require("../models/partners");

  // Get All Countries
  router.get("/partner", async (req, res) => {
    try {
      const result = await Partner.find();
      if (result.length === 0) {
        return res.status(404).send({
          message: `There is no any data available !! please Update`,
        });
      }
      res.status(200).json({ success: true, statusCode: 200, message: " Data found", data:result });
    } catch (err) {
      console.error("Error retrieving countries:", err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Post All  countries Including Images of countries
  router.post("/partner", PartnerImage.single("image"), async function (req, res, next) {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided." });
    }
    try {
      const filename = "Partner-" + new Date().toISOString().replace(/:/g, "-") + req.file.originalname;
      const outputPath = path.join("./public/images/partners", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const { name, order, description, short_description } = req.body;

      if (!name || !order || !description || !short_description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const imagePath = `/images/partners/${filename}`; 
      const result = new Partner({
        name,
        order,
        description,
        short_description,
        image: imagePath,
      });
      // Save the new country to the database
      await result.save();
      res.status(200).json({
        success: true, message: "Data saved successfully", data: result 
      });
    } catch (error) {
      console.error("Error saving Data:", error);
      return res.status(500).json({ error: "Internal Server Error", error });
    }
  }
  );

  // Getting Single Country only
  router.get("/partner/:id", async function name(req, res, next) {
    try {
      const id = req.params.id;

      const result = await Partner.findById({ _id: id });

      if (!result) {
        return res.status(301).json({ success: false, message: "Data Not found" });
      }

      res.status(200).json({ success: true, message: "Data  saved", data: result });
    } catch (error) {
      console.error("Error saving Data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update Country according to ID
  router.put("/partner/:id", PartnerImage.single("image"), async function (req, res, next) {

    try {
      if (!req.file) {
        return res.status(400).send("No file was uploaded.");
      }

      const filename = "Partner-" + new Date().toISOString().replace(/:/g, "-") + req.file.originalname;
      const outputPath = path.join("./public/images/partners", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const imagePath = `/images/partners/${filename}`; 

      const id = req.params.id;
      const updatedData = {
        ...req.body,
        image: imagePath,
      };

      // Update the country document with the new data
      const result = await Partner.findByIdAndUpdate(id, updatedData, { new: true });

      if (!result) {
        return res.status(404).send({ message: `Cannot update Partners with id=${id}.`, });
      }

      return res.status(200).json({
        message: "Data  updated successfully.", data: result,
      });
    } catch (error) {
      console.error("Error updating Data:", error);
      return res.status(500).json({
        success: true, message: "Error updating Data", error: error.message,
      });
    }
  }
  );

  //   delete countries
  router.delete("/partner/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Partner.findByIdAndDelete(id, { useFindAndModify: false });

      if (!result) {
        return res.status(404).json({ message: "Data not found" });
      }

      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error("Error deleting Data:", error);
      return res.status(500).json({ message: "Error deleting Data", error: error.message });
    }
  });

  app.use("/api", router);
};
