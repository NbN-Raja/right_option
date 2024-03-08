module.exports = (app) => {
    var router = require("express").Router();

    const path= require("path");
    const sharp= require("sharp")

    const Contact = require("../models/contact")
    const {ContactImage}= require("../middleware/multer/imageauth")


    router.post("/contact", ContactImage.single("banner_image"), async (req,res)=>{

     // Check the files
     if (!req.file) {return res .status(400) .json({ success: false, message: "No image provided." });
    }
  
    try {

      const filename ="Contact -" +new Date().toISOString().replace(/:/g, "-") + path.extname(req.file.originalname);
      const outputPath = path.join("./app/public/images/contact", filename);
      await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);

     const result= new Contact({
      ...req.body,
      banner_image: filename
     })  
     await result.save();
     res.status(200).json({ message: "Country saved successfully", imagePath: outputPath,  });
    } catch (error) {
      console.error(error);
      res.status(401).json({success: false, message:"error occured at",error})
    }
  })


  router.get("/contact",async (req,res)=>{

    try {

      const result= await Contact.find({})

      if(result.length===0){
        res.status(301).json({success: false, message:" no data found"})
      }
      
      res.status(200).json({success: true, message:"Result found",result})
    } catch (error) {
      console.error(error);
      res.status(401).json({success: false, message:"error occured at",error})

    }

  })
  router.put("/contact/:id",ContactImage.single("banner_image"), async (req,res)=>{
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }

    const filename = "country-" + new Date().toISOString().replace(/:/g, "-") + path.extname(req.file.originalname);
    const output = path.join("./app/public/images/contact", filename);

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
    const result = await Contact.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).send({
        message: `Success update Country with id=${id}.`
      });
    }

    return res.status(200).json({
      message: "Success updated successfully.",
      data: result
    });
  })
    
    
    


    app.use("/api",router)



}