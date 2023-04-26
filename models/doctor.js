const mongoose = require("mongoose")
const doctorSchema = mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: [18, "too young"]
    },
    location: String
})
module.exports = mongoose.model("Doctor", doctorSchema)