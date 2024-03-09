const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Optionally add timestamps for createdAt and updatedAt fields
});

const Partner = mongoose.model("partner", PartnerSchema);

module.exports = Partner;
