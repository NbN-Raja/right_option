module.exports = (app) => {
  var router = require("express").Router();
  const path = require("path");

  const Country = require("../models/countries");

  // Get All Countries
  router.get("/countries", async function (req, res, next) {
    try {
      Country.find()
        .then((data) => {
          if (data.length === 0) {
            res.status(404).send({
              message: `There are no images in the database`,
            });
          } else {
            res.status(201).json({ message: "data found", data });
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

  // post countries
  router.post("/countries", async function (req, res, next) {
    try {
      const { name, image, order, description, short_description } = req.body;

      if (!name || !image || !order || !description || !short_description) {
        res.send("All field required");
      }

      const newCountry = new Country({
        ...req.body,
      });

      // Save the new country to the database
      await newCountry.save();

      res.status(200).json({ message: "Country saved successfully" });
    } catch (error) {
      console.error("Error saving country:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // get single country
  router.get("/country/:id", async function name(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id);

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

  // Update countries
  router.put("/country/:id", async function name(req, res, next) {
    try {
      const id = req.params.id;

      Country.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Country id=${id}.!`,
            });
          } else
            res.send({ message: "Country was updated successfully.", data });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Country with id=" + id,
          });
        });
    } catch (error) {
      console.error("Error Updating Country:", error);
      res.status(500).json({ message: "Error Updating Data", error });
    }
  });


//   delete countries


router.delete("/country/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedCountry = await Country.findByIdAndDelete(id, { useFindAndModify: false });

        if (!deletedCountry) {
             res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json({ message: "Country deleted successfully" });
    } catch (error) {
        console.error("Error deleting country:", error);
        res.status(500).json({ message: "Error deleting country", error: error.message });
    }
});


  app.use("/api", router);
};
