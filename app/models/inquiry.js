const mongoose= require("mongoose")


PartnerSchema= new mongoose.Schema({
         fullname: String,
         email: String,
         phone: String,
         message: String,
         updated_At: String   
})


const Partner= mongoose.model("partner",PartnerSchema)

module.exports= Partner