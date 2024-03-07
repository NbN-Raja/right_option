module.exports = (app) => {
    const path = require("path");
    const sharp = require("sharp");

    const Service = require("../models/services");

    const { ServiceUpload } = require("../middleware/multer/imageauth");

    var router = require("express").Router();

    // Post Courses
    router.post("/service", ServiceUpload.single("image"), async (req, res) => {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No image provided." });
        }

        try {
            const filename =
                "course-" +
                new Date().toISOString().replace(/:/g, "-") +
                path.extname(req.file.originalname);
            const outputPath = path.join("./app/public/images/services", filename);

            await sharp(req.file.buffer)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(outputPath);

            const { name, order, description, short_description } = req.body;

            if (!name || !order || !description || !short_description) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newCountry = new Service({
                name,
                order,
                description,
                short_description,
                image: filename,
            });
            // Save the new country to the database
            await newCountry.save();
            res.status(200).json({
                message: "Country saved successfully",
                imagePath: outputPath, // Save image path
            });
        } catch (error) {
            console.error("Error saving country:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Get All countries Detaills

    router.get("/service", async (req, res) => {
        try {
            const courses = await Service.find({});

            if (courses.length === 0) {
                res.status(301).json({ message: "No data in database! Add Data" });
            }
            res
                .status(201)
                .json({ message: "Getting All data from database", courses });
        } catch (error) {
            console.error();
            res.status(500).json({ error: "Error Occured", error });
        }
    });

    // Get Single  Courses Here

    router.get("/service/:id", async (req, res) => {
        try {
            const id = req.params.id;
    
            const course = await Service.findById({ _id: id });
            if (!course) {
                return res.status(301).json({ message: "No course found related to this id" });
            }
            return res.status(200).json({ message: "Data Found", course });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error Occurred", error });
        }
    });
    

    // Update The Courses

    router.put("/service/:id", ServiceUpload.single("image"), async function (req, res, next) {
        try {
          if (!req.file) {
            return res.status(400).send("No file was uploaded.");
          }
      
          const filename = "country-" + new Date().toISOString().replace(/:/g, "-") + path.extname(req.file.originalname);
          const output = path.join("./app/public/images/services", filename);
    
          await sharp(req.file.buffer)
          .resize(500) // Optional: Resize image to a width of 500px (maintaining aspect ratio)
          .jpeg({ quality: 70 })  // Convert to JPEG with 70% quality
          .toFile(output);

          const filenameb = "country-" + new Date().toISOString().replace(/:/g, "-") + path.extname(req.file.originalname);
          const outputb = path.join("./app/public/images/services", filename);
    
          await sharp(req.file.buffer)
          .resize(500) // Optional: Resize image to a width of 500px (maintaining aspect ratio)
          .jpeg({ quality: 70 })  // Convert to JPEG with 70% quality
          .toFile(output);
      
          const id = req.params.id;
          const updatedData = {
            ...req.body,
            image: filename, // Set the image field to the new filename
            banner_image: filenameb // Set the image field to the new filename
          };
      
          // Update the country document with the new data
          const updatedCountry = await Service.findByIdAndUpdate(id, updatedData, { new: true });
      
          if (!updatedCountry) {
            return res.status(404).send({
              message: `Cannot update Country with id=${id}.`
            });
          }
      
          return res.status(200).json({
            message: "Country updated successfully.",
            data: updatedCountry
          });
        } catch (error) {
          console.error("Error updating Country:", error);
          return res.status(500).json({
            message: "Error updating Country",
            error: error.message
          });
        }
      });



      router.delete("/service/:id", async (req,res)=>{
        try {
            const id = req.params.id;
            const deletedCountry = await Service.findByIdAndDelete(id, {
              useFindAndModify: false,
            });
      
            if (!deletedCountry) {
              res.status(404).json({ message: "Courses not found" });
            }
      
            res.status(200).json({ message: "Courses deleted successfully" });
          } catch (error) {
            console.error("Error deleting Courses:", error);
            res
              .status(500)
              .json({ message: "Error deleting Courses", error: error.message });
          }
        });

    app.use("/api", router);
};
