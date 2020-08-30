const mongoose = require('mongoose'),
      crypto = require('crypto');

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowersase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: Number,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)
