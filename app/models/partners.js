const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    order: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, minlength: 10, maxlength: 1000 },
    short_description: { type: String, required: true, maxlength: 500 },
    image: { type: String, required: true }   
});

const Partner = mongoose.model("partner_uni", PartnerSchema);

module.exports = Partner;
