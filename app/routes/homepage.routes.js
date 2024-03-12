module.exports = (app) => {
  var router = require("express").Router();

  const Homepage = require("../models/homepage");

  // post all
  router.post("/homepage", async (req, res) => {
    try {
     

      const result = new Homepage({
        ...req.body,
      });
      await result.save();
      res.status(200).json({ success: true, message: "Data saved", data:result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, errormsg: error, error });
    }
  });

  router.get("/homepage", async (req, res) => {
    try {
      const result = await Homepage.find();

      if (result.length === 0) {
        res.status(301).json({ success: false, message: "No data found" });
      }

      res.status(200).json({ success: true, mesage: "data fond", data:result });
    } catch (error) {
      console.error(error);
      res.status(501).json({ success: false, errorMsg: error, error });
    }
  });

  router.put("/homepage/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const existingData = await Homepage.findById(id);

      if (!existingData) {
        return res.status(404).send({
          message: `Cannot find Data with id=${id}.`,
        });
      }

      const updateData = req.body; // Get the update data from req.body

      const result = await Homepage.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!result) {
        return res.status(404).send({
          message: `Cannot update Data with id=${id}.`,
        });
      }

      res.status(200).json({ success: true, message: "Updated Data", data:result });
    } catch (error) {
      console.error(error);
      res.status(501).json({ success: false, errorMsg: error });
    }
  });

  app.use("/api", router);
};
