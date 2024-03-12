module.exports=(app)=>{


    const jwt = require('jsonwebtoken');
    const bcrypt= require("bcrypt")
    const Auth= require("../models/auth")
    var router = require("express").Router();



    // Login Routes Are Here !!
    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
    
            const user = await Auth.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ success: false, message: "No user found with this email" });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ success: false, message: "Incorrect password" });
            }
    
            const token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET, { expiresIn: '1h' });

    
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    });

    


    app.use("/api",router)
}