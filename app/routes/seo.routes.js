module.exports = (app) => {
    var router = require("express").Router();
  
    const Seo = require("../models/seo");
  
    // post all
    router.post("/seo", async (req, res) => {
      try {
        if (!req.body) {
          res
            .status(301)
            .json({ success: false, error: "All fields are required" });
        }
  
        const result = new Seo({
          ...req.body,
        });
        await result.save();
        res.status(200).json({ success: true, message: "Data saved", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errormsg: error, error });
      }
    });
  
    router.get("/seo", async (req, res) => {
      try {
        const result = await Seo.find();
  
        if (result.length === 0) {
          res.status(301).json({ success: false, message: "No data found" });
        }
  
        res.status(200).json({ success: true, mesage: "data fond", result });
      } catch (error) {
        console.error(error);
        res.status(501).json({ success: false, errorMsg: error, error });
      }
    });
  
    router.put("/seo/:id", async (req, res) => {
      try {
        const id = req.params.id;
  
        const existingData = await Seo.findById(id);
  
        if (!existingData) {
          return res.status(404).send({
            message: `Cannot find Data with id=${id}.`,
          });
        }
  
        const updateData = req.body; // Get the update data from req.body
  
        const result = await Seo.findByIdAndUpdate(id, updateData, {
          new: true,
        });
  
        if (!result) {
          return res.status(404).send({
            message: `Cannot update Data with id=${id}.`,
          });
        }
  
        res.status(200).json({ success: true, message: "Updated Data", result });
      } catch (error) {
        console.error(error);
        res.status(501).json({ success: false, errorMsg: error });
      }
    });
  
    app.use("/api", router);
  };
  