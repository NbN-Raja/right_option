require("dotenv").config();

const express = require('express')
const app = express()
const mongoose= require("mongoose")
const port = process.env.PORT
const path= require("path")
const cors= require("cors")
const bcrypt= require("bcrypt")

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'))


// database connection here 
const Auth = require("./app/models/auth.js")

// database connection
const seedSuperAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGODB, {});

    console.log('Connected to MongoDB');

    const superAdminUser = await Auth.findOne({ role: 'superadmin' });

    if (!superAdminUser) {

      const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASS, 10);
      const newSuperAdminUser = new Auth({
        username: process.env.USERNAME,
        password: hashedPassword,
        role: process.env.ROLE,
        email: process.env.EMAIL
      });

      await newSuperAdminUser.save();

      console.log('Super Admin  created successfully');
    } else {
      console.log('Super Admin user already exists');
    }

    
  } catch (error) {
    console.error('Error seeding super admin user:', error);
  }
};


const jwt = require('jsonwebtoken');



// Login Routes Are Here !!
app.post("/login", async (req, res) => {
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
// Run the script
seedSuperAdmin();

require("./app/routes/countries.routes.js")(app)
require("./app/routes/courses.routes.js")(app)
require("./app/routes/settings.routes.js")(app)
require("./app/routes/services.routes.js")(app)
require("./app/routes/blogs.routes.js")(app)
require("./app/routes/testimonials.routes.js")(app)
require("./app/routes/partners.routes.js")(app)
require("./app/routes/teams.routes.js")(app)
require("./app/routes/faqs.routes.js")(app)
require("./app/routes/pages.routes.js")(app)
require("./app/routes/sliders.routes.js")(app)
require("./app/routes/socialmedias.routes.js")(app)
require("./app/routes/successstories.routes.js")(app)
require("./app/routes/inquiry.routes.js")(app)
require("./app/routes/homepage.routes.js")(app)
require("./app/routes/contact.routes.js")(app)
require("./app/routes/seo.routes.js")(app)
require("./app/routes/global.routes.js")(app)
require("./app/routes/dashboard.routes.js")(app)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))