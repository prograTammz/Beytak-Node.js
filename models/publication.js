const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');


//publicationSchema defines the schema of an article/news which consist of:
//title,publication date, editDate incase of edition and the body of news/article
const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 100,
    },
    publicationDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    editDate:{
        type: Date
    },
    publicationBody:{
        type:String,
        required: true,
        minlength: 200,
    }
});

function publicationValidation(publication){

    const tempSchema = {
        title: Joi.string().min(15).max(100).required(),
        publicationDate: Joi.date().required(),
        editDate: Joi.date(),
        publicationBody: Joi.string().minlength(200).required(),
    }

    return Joi.validate(publication, tempSchema);
}
exports.Publication = mongoose.model('Publication', PublicationSchema);
exports.Validate = publicationValidation;