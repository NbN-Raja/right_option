module.exports = (app) => {
    var router = require("express").Router();

    const path= require("path");
    const sharp= require("sharp")

    const Contact = require("../models/contact")
    const {ContactImage}= require("../middleware/multer/imageauth")


    router.post("/contact", ContactImage.single("banner_image"), async (req,res)=>{

    try {
      let imagePath = null; // Initialize image path

      if(req.file){
        const filename = "Contact-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

        const outputPath = path.join("./public/images/contact", filename);
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);
  
  
         imagePath= `/images/contact/${filename}`;
      }

     
     const result= new Contact({
      ...req.body,
      banner_image: imagePath
     })  
     await result.save();
     res.status(200).json({ message: " saved successfully", data: result });
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

    try {
      
   
    let imagePath = null; // Initialize image path

      if(req.file){
        const filename = "Contact-"+ new Date().toISOString().replace(/:/g, "-") + req.file.originalname;

        const outputPath = path.join("./public/images/contact", filename);
        await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(outputPath);
  
         imagePath= `/images/contact/${filename}`;
      }

    const id = req.params.id;
    const updatedData = {
      ...req.body,
      image: imagePath // Set the image field to the new filename
    };

    // Update the country document with the new data
    const result = await Contact.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).send({
        message: `Success update Contact with id=${id}.`
      });
    }

    return res.status(200).json({
      message: "Success updated successfully.",
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({success: false, message:"error occured at",error})
    
  }
  })
    

    app.use("/api",router)



}