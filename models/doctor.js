const mongoose = require("mongoose")
const doctorSchema = mongoose.Schema({
    name: String,
    age: Number,
    location: String
})
module.exports = mongoose.model("Doctor", doctorSchema)