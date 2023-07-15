const mongoose = require("mongoose");


const usersSchema = new mongoose.Schema({

    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNo: { type: Number, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    
    
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema)