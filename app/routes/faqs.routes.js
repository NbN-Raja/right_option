module.exports = (app) => {
    var router = require("express").Router();
    const path = require("path");
    const sharp = require("sharp");
    const fs = require("fs");
  
    const { Faqs } = require("../middleware/multer/imageauth");
  
    const Faq = require("../models/faqs");
  
    // Get All Countries
    router.get("/faq", async function (req, res, next) {
      try {
        const result= await Faq.find()
          
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
    router.post("/faq",async function (req, res, next) {
       
        try {
          
          const { title, order, description } = req.body;
  
          if (!title || !order || !description ) {
            return res.status(400).json({ message: "All fields are required" });
          }
  
          const result = new Faq({
            title,
            order,
            description
         
          });
          // Save the new country to the database
          await result.save();
          res.status(200).json({
            sucess: true,
            message: "Data  saved successfully",
          });
        } catch (error) {
          console.error("Error saving country:", error);
          return res.status(500).json({ error: "Internal Server Error",error });
        }
      }
    );
  
    // Getting Single Country only
    router.get("/faq/:id", async function name(req, res, next) {
      try {
        const id = req.params.id;
  
        const result = await Faq.findById({ _id: id });
  
        if (!result) {
          res.status(301).json({ message: "Data Not found" });
        }
  
        res.status(200).json({ message: "Data Name saved", result });
      } catch (error) {
        console.error("Error saving country:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    // Update Country according to ID
    router.put("/faq/:id",  async function (req, res, next) {
      try {
       
        const id = req.params.id;
        const updatedData = {
          ...req.body,
        };
    
        // Update the country document with the new data
        const result = await Faq.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).send({
            message: `testimonial update Country with id=${id}.`
          });
        }
    
        return res.status(200).json({
          success: true,
          message: "Data updated successfully.",
          data: result
        });
      } catch (error) {
        console.error("Error updating data:", error);
        return res.status(500).json({
          message: "Error updating data",
          error: error.message
        });
      }
    });
    
  
    //   delete countries
  
    router.delete("/faq/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        const result = await Faq.findByIdAndDelete(id, {
          useFindAndModify: false,
        });
  
        if (!result) {
          res.status(404).json({ message: "Data not found" });
        }
  
        res.status(200).json({ success: true, message: "Data deleted successfully" });
      } catch (error) {
        console.error("Error deleting Data:", error);
        res.status(500)
          .json({ message: "Error deleting Data", error: error.message });
      }
    });
  
    app.use("/api", router);
  };
  