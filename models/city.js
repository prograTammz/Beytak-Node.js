const Joi = require('joi');
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    governorate:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    longtiude: {
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    }
})

const City = mongoose.model('City',citySchema);

function validateCity(city){
    const Schema = {
        name: Joi.string().min(5).max(20).required(),
        governorate: Joi.string().min(5).max(20).required(),
        longtiude: Joi.number().required(),
        latitude: Joi.number().required()
    }
}

exports.City = City;
exports.Validate = validateCity;