module.exports=(app)=>{

    var router = require("express").Router();

    const path= require("path");
    const sharp= require("sharp")

    const Global = require("../models/global")

    const multer = require('multer');
     const memoryStorage = multer.memoryStorage();
      const imageUpload = multer({ storage: memoryStorage });

      
      const imageFields = [
        { name: 'logo', maxCount: 1 },
        { name: 'footer', maxCount: 1 },
        { name: 'icon', maxCount: 1 }
    ];

      router.post("/global", imageUpload.fields(imageFields), async (req, res) => {
          try {
              // Check if files are provided
              if (req.files) {
                const { logo: [logoFile], footer: [FooterFile], icon: [IconFile] } = req.files;
   
                const [logoFilename, footerFilename, iconFilename] = ["logo", "footer", "icon"].map(prefix => `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`);
  
              
                const [logoFileOutput, footerFileOutput, iconFileOutput] =  ["logo", "footer", "icon"].map(prefix => path.join("./public/images/global", `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`));
       
                // Resize and save the uploaded images
                await Promise.all([
                    sharp(logoFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(logoFileOutput),
                    sharp(FooterFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(footerFileOutput),
                    sharp(IconFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(iconFileOutput)
                ]);
        
                // Create a new Global object with the uploaded file details and additional data from req.body
  
                logoPath=`/images/global/${logoFilename}`;
                footerPath=`/images/global/${footerFilename}`;
                iconPath=`/images/global/${iconFilename}`;              }
      
              
              const result = new Global({
                  ...req.body,
                  logo: logoPath,
                  footer: footerPath,
                  icon: iconPath
              });
      
              // Save the Global object to the database
              await result.save();
      
              res.status(200).json({ message: "Global data saved successfully",data:result });
          } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, message: "An error occurred", error });
          }
      });
      


  router.get("/global",async (req,res)=>{

    try {

      const result= await Global.find({})

      if(result.length===0){
        res.status(301).json({success: false, message:" no data found"})
      }
      
      res.status(200).json({success: true, message:"Result found",result})
    } catch (error) {
      console.error(error);
      res.status(401).json({success: false, message:"error occured at",error})

    }

  })


  router.get("/global/:id",async (req,res)=>{

    try {

        

      const result= await Global.find({_id :req.params.id})

      if(result.length===0){
        res.status(301).json({success: false, message:" no data found"})
      }
      
      res.status(200).json({success: true, message:"Result found",result})
    } catch (error) {
      console.error(error);
      res.status(401).json({success: false, message:"error occured at",error})

    }

  })



  router.put("/global/:id",imageUpload.fields(imageFields), async (req, res) => {
    if (!req.files) {
      return res.status(400).send("No file was uploaded.");
    }

    const { logo: [logoFile], footer: [FooterFile], icon: [IconFile] } = req.files;
   
    const [logoFilename, footerFilename, iconFilename] = ["logo", "footer", "icon"].map(prefix => `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`);

  
    const [logoFileOutput, footerFileOutput, iconFileOutput] =  ["logo", "footer", "icon"].map(prefix => path.join("./public/images/global", `${prefix}-${new Date().toISOString().replace(/:/g, "-")}${path.extname(req.files[prefix][0].originalname)}`));

    // Resize and save the uploaded images
    await Promise.all([
        sharp(logoFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(logoFileOutput),
        sharp(FooterFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(footerFileOutput),
        sharp(IconFile.buffer).resize(500).jpeg({ quality: 70 }).toFile(iconFileOutput)
    ]);

    const id = req.params.id;

    logoPath=`/images/global/${logoFilename}`;
    footerPath=`/images/global/${footerFilename}`;
    iconPath=`/images/global/${iconFilename}`;

    const updatedData = {
        ...req.body,
        logo: logoPath,
        footer: footerPath,
        icon: iconPath
    };

    // Update the country document with the new data
    const result = await Global.findByIdAndUpdate(id, updatedData, { new: true });

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
    
    app.use("/api", router);

}

