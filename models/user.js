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
    phoneNumber:Number,
    profilePic:String,
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

exports.User = User;
