const mongoose = require('mongoose');


//schema
let employeeSchema = new mongoose.Schema({
    name : String,
    designation : String,
    salary : Number
})

module.exports = mongoose.model('Employee', employeeSchema);