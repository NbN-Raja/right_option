const mongoose= require("mongoose")


CountrySchema= new mongoose.Schema({
    name: { type: String, required: true },
         order: { type: Number, required: true},
         description: { type: String, required: true },
         short_description: { type: String, required: true },
         image: {type:String}   
})


const Country= mongoose.model("country",CountrySchema)

module.exports= Country