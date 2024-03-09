module.exports = (app) => {
  var router = require("express").Router();
  const path = require("path");
  const sharp = require("sharp");

  const { countryUpload } = require("../middleware/multer/imageauth");

  const Country = require("../models/countries");


  // Get All Countries
  router.get("/countries", async (req, res) => {
    try {
      const countries = await Country.find();
      if (countries.length === 0) {
        return res.status(404).send({
          message: `There is no any data available !! please Update`,
        });
      }
      res.status(200).json({ success: true, statusCode: 200, message: "Countries Data found", data: countries });
    } catch (err) {
      console.error("Error retrieving countries:", err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  });


  // Post All  countries Including Images of countries
  router.post("/countries", countryUpload.single("image"), async function (req, res, next) {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided." });
    }
    try {
      const filename = "country-" + req.file.originalname;
      const outputPath = path.join("./public/images/countries", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const { name, order, description, short_description } = req.body;

      if (!name || !order || !description || !short_description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const imagePath = `/images/countries/${filename}`; // Construct the image path
      const newCountry = new Country({
        name,
        order,
        description,
        short_description,
        image: imagePath,
      });
      // Save the new country to the database
      await newCountry.save();
      res.status(200).json({
        success: true, message: "Country saved successfully", imagePath: imagePath, // Save image path
      });
    } catch (error) {
      console.error("Error saving country:", error);
      return res.status(500).json({ error: "Internal Server Error", error });
    }
  }
  );

  // Getting Single Country only
  router.get("/countries/:id", async function name(req, res, next) {
    try {
      const id = req.params.id;

      const result = await Country.findById({ _id: id });

      if (!result) {
        return res.status(301).json({ success: false, message: "Country Not found" });
      }

      res.status(200).json({ success: true, message: "Country Name saved", result });
    } catch (error) {
      console.error("Error saving country:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update Country according to ID
  router.put("/countries/:id", countryUpload.single("image"), async function (req, res, next) {

    try {
      if (!req.file) {
        return res.status(400).send("No file was uploaded.");
      }

      const filename = "country-" + req.file.originalname;
      const outputPath = path.join("./public/images/countries", filename);

      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

      const imagePath = `/images/countries/${filename}`; // Construct the image path

      const id = req.params.id;
      const updatedData = {
        ...req.body,
        image: imagePath, // Set the image field to the new filename
      };

      // Update the country document with the new data
      const result = await Country.findByIdAndUpdate(id, updatedData, { new: true });

      if (!result) {
        return res.status(404).send({ message: `Cannot update Country with id=${id}.`, });
      }

      return res.status(200).json({
        message: "Country updated successfully.", data: result,
      });
    } catch (error) {
      console.error("Error updating Country:", error);
      return res.status(500).json({
        success: true, message: "Error updating Country", error: error.message,
      });
    }
  }
  );

  //   delete countries

  router.delete("/countries/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Country.findByIdAndDelete(id, { useFindAndModify: false });

      if (!result) {
        return res.status(404).json({ message: "Country not found" });
      }

      res.status(200).json({ message: "Country deleted successfully" });
    } catch (error) {
      console.error("Error deleting country:", error);
      return res.status(500).json({ message: "Error deleting country", error: error.message });
    }
  });

  app.use("/api", router);
};
