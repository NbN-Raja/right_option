const mongoose= require("mongoose")


AuthSchema= new mongoose.Schema({
    username:
    {
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true
    },
    password:{
        required: true,
        type: String
    },
    role:["superadmin","user"]
})


const Auth= mongoose.model("auth", AuthSchema)

module.exports= Auth