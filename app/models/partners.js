const mongoose= require("mongoose")


PartnerSchema= new mongoose.Schema({
         name: String,
         order: String,
         description: String,
         short_description: String,
         image: String   
})


const Partner= mongoose.model("partner",PartnerSchema)

module.exports= Partner