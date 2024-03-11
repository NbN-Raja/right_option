const mongoose = require("mongoose");

const InquerySchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
       
    },
    phone: {
        type: String,
        required: true,
        
    },
    message: {
        type: String,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now
    }
});

const Inquery = mongoose.model("inquiry", InquerySchema);

module.exports = Inquery;
