const  express = require('express')
const app = express()
const mongoose= require("mongoose")
const port = 4000;
const path= require("path")
const cors= require("cors")
const bcrypt= require("bcrypt")

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request body
// app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'))


// database connection here 



const Auth = require("./app/models/auth.js")

// database connection
const seedSuperAdmin = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://localhost:27017/rightoptions", {});

    console.log('Connected to MongoDB');

    // Check if the super admin user already exists
    const superAdminUser = await Auth.findOne({ role: 'superadmin' });

    if (!superAdminUser) {
      // If not, create the super admin user
      const hashedPassword = await bcrypt.hash("password", 10);

      // Replace 'superadminpassword' with the desired password
      const newSuperAdminUser = new Auth({
        username: 'superadmin',
        password: hashedPassword,
        role: 'superadmin',
        email: "info@paradiseit.com.np"
      });

      await newSuperAdminUser.save();
      console.log('Super Admin user created successfully');
    } else {
      console.log('Super Admin user already exists');
    }

    
  } catch (error) {
    console.error('Error seeding super admin user:', error);
  }
};

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
require("./app/routes/auth.routes.js")(app)





app.listen(port, () => console.log(`Example app listening on port ${port}!`))