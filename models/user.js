import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import validator from 'validator';

import { createCode } from '../tools/random.js';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot be more than 50 characters long'],
        validate: {
            validator: validator.isAlpha,
            message: 'Name should only contain alphabetical characters'
        }
    },

    surname: {
        type: String,
        required: [true, 'Please enter a surname'],
        minlength: [3, 'Surname must be at least 3 characters long'],
        maxlength: [50, 'Surname cannot be more than 50 characters long'],
        validate: {
            validator: validator.isAlpha,
            message: 'Surname should only contain alphabetical characters'
        }
    },

    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot be more than 50 characters long'],
        validate: {
            validator: validator.isAlphanumeric,
            message: 'Username should only contain alphanumeric characters'
        }
    },

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
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

    address: {
        type: String,
        trim: true,
        maxlength: [50, 'Address cannot be more than 50 characters long'],
        default: ''
    },
});

const User = mongoose.model('User', userSchema);

export default User;