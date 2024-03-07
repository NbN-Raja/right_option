const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
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

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;
