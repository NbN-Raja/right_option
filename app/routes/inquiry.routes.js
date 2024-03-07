module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
  
    const Success = require("../models/successstories");

    // Get All Countries
    router.get("/inquiry", async function (req, res, next) {
      try {
        await Success.find()
          .then((data) => {
            if (data.length === 0) {
              res.status(404).send({
                message: `There is no any data available !! please Update`,
              });
            } else {
              res.status(201).json({ message: "Success Data found", data });
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
    router.post("/inquiry",async function (req, res, next) {
        
        try {
         
          const { fullname, email, phone, message,updated_At } = req.body;
  
          if (!fullname || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
          }
  
          const result = new Success({
            fullname,
            email,
            phone,
            message,
          });
          // Save the new country to the database
          await result.save();
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
    router.get("/inquiry/:id", async function name(req, res, next) {
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
    router.put("/inquiry/:id", async function (req, res, next) {
      try {
        
        // Update the country document with the new data
        const updatedSuccess = await Success.findByIdAndUpdate(id, ...req.body, { new: true });
    
        if (!updatedCountry) {
          return res.status(404).send({
            message: `Success update Country with id=${id}.`
          });
        }
    
        return res.status(200).json({
          message: "Success updated successfully.",
          data: updatedSuccess
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
  
    router.delete("/inquiry/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const deletedCountry = await Success.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!deletedCountry) {
          res.status(404).json({ message: "Success not found" });
        }
  
        res.status(200).json({ message: "Success deleted successfully" });
      } catch (error) {
        console.error("Error deleting country:", error);
        res
          .status(500)
          .json({ message: "Error deleting country", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  