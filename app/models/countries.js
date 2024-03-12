const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 50 },
    order: { type: Number, min: 0 },
    description: { type: String, minlength: 10, maxlength: 1000 },
    short_description: { type: String,  maxlength: 500 },
    image: { type: String}   
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
