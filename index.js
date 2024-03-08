const  express = require('express')
const app = express()
const mongoose= require("mongoose")
const port = 4000


app.use(express.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request body
app.use('/public', express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'))


// database connection here 

const connect= mongoose.connect("mongodb://localhost:27017/rightoptions")

if(connect){
  console.log("mongodb connected");
}


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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))