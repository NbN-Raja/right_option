const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    order: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, minlength: 10, maxlength: 1000 },
    short_description: { type: String, required: true, maxlength: 500 },
    image: { type: String, required: true }   
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
