const jwt = require('jsonwebtoken');
const joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    lastName:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    accountType:{
        type: String,
        required: true,
        enum: ['seller','admin','buyer','agent']
    },
    phoneNumber:{
        type: Number,
        required: String
    },
    profilePic:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        firstName: joi.string().min(5).max(20).required(),
        lastName: joi.string().min(5).max(20).required(),
        accountType: joi.string().valid('seller','admin','buyer','agent').required(),
        phoneNumber: joi.number(),
        profilePic: joi.string(),
        email: joi.string().min(10).max(255).required().email(),
        password: joi.string().min(5).max(1024).required()
    }
    return joi.validate(user,schema);
}


exports.User = User;
