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

const Inquery = mongoose.model("inquiry", InquerySchema);

module.exports = Inquery;
