module.exports=(app)=>{


    const jwt= require("jsonwebtoken");

    const bcrypt= require("bcrypt")

    const Auth= require("../models/auth")

    var router = require("express").Router();

    router.get("/login", async (req, res) => {


        try{




        }catch(error){
            console.error(error);
            res.send({success: false, message:"Error Occured", error})
        }
    })

    


    app.use("/api",router)
}