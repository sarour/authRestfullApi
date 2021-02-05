const mongoose = require('mongoose');
const paginate = require("mongoose-aggregate-paginate-v2");

const RiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        max: 255,
    },
    varietyCode: {
        type: String,
        required: true,
        max: 12,
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true,
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
RiceSchema.plugin(paginate);
module.exports = mongoose.model('rices', RiceSchema);