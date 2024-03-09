module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
  
    const Inquery = require("../models/inquiry");

    // Get All Countries
    router.get("/inquiry", async function (req, res, next) {
      try {
        const result= await Inquery.find()
          
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
    router.post("/inquiry",async function (req, res, next) {
        
        try {
         
          const { fullname, email, phone, message,updated_At } = req.body;
  
          if (!fullname || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
          }
  
          const result = new Inquery({
            fullname,
            email,
            phone,
            message,
            updated_At
          });
          // Save the new country to the database
          await result.save();
          res.status(200).json({
            success: true,
            message: "Data saved successfully",
          });
        } catch (error) {
          console.error("Error saving Data:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/inquiry/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Inquery.findById({ _id: id });
  
        if (!result) {
          res.status(301).json({ message: "Data Not found" });
        }
  
        res.status(200).json({ message: "Data Name saved", result });
      } catch (error) {
        console.error("Error saving Data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/inquiry/:id", async function (req, res, next) {
      try {
        
        // Update the country document with the new data
        const result = await Inquery.findByIdAndUpdate(id, ...req.body, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `Success update Data with id=${id}.`
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
  
    router.delete("/inquiry/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const deletedCountry = await Inquery.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!deletedCountry) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({ message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting country:", error);
        res
          .status(500)
          .json({ message: "Error deleting country", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  