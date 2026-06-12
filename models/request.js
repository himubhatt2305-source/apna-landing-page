const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    jobRole: { type: String, required: true, trim: true },
    qualification: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);