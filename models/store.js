import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import validator from 'validator';

import { createCode } from '../tools/random.js';

const storeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot be more than 50 characters long']
    },

    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },

    verification: {
        status: {
            type: Boolean,
            default: false
        },

        code: {
            type: String,
            default: createCode(6)
        }
    },

    profilePicture: {
        type: String,
        default: ''
    },

    profilePictureId: {
        type: String,
        default: ''
    },

    about: {
        type: String,
        trim: true,
        maxlength: [200, 'About cannot be more than 200 characters long'],
        default: ''
    },

    address: {
        type: String,
        trim: true,
        maxlength: [50, 'Address cannot be more than 50 characters long'],
        default: ''
    },

    contactNumber: {
        type: String,
        trim: true,
        maxlength: [50, 'Contact number cannot be more than 50 characters long'],
        default: ''
    }
});

const Store = mongoose.model('Store', storeSchema);

export default Store;