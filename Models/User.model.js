const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    mobile: {
        type: String,
        required: true,
        max: 14,
        min: 11
    },
    areaId: {
        type: String,
        required: true,
        max: 24,
    },
    address: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    nid: {
        type: String,
        required: false,
        max: 255,
        min: 10,
    },
    location: {
        type: String,
        required: false,
        max: 255,
        min: 6,
    },
    latitude: {
        type: Number,
        require: false
    },
    longitude: {
        type: Number,
        require: false
    },
    otp: {
        type: String,
        require: false,
        max: 6
    },
    fcm_token: {
        type: String,
        require: false,
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false,
    },
    image: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Users', UserSchema);