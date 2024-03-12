const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    order: { type: Number,  min: 0 },
    description: { type: String, minlength: 10, maxlength: 1000 },
    short_description: { type: String, maxlength: 500 },
    image: { type: String }   
});

const Partner = mongoose.model("partner_uni", PartnerSchema);

module.exports = Partner;
