const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const RequestModel = require('./models/request'); // Importing Mongoose Schema

const app = express();

// Middleware parsing rules
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ===================================================
// 1. DATABASE LINK CONNECTION SETUP
// ===================================================
const MONGO_URI = "mongodb://bhatthimanshu429_db_user:b1wOAJdPA3Z4LXMZ@ac-dsqfiyr-shard-00-00.i1xr6lc.mongodb.net:27017,ac-dsqfiyr-shard-00-01.i1xr6lc.mongodb.net:27017,ac-dsqfiyr-shard-00-02.i1xr6lc.mongodb.net:27017/apnaDB?ssl=true&replicaSet=atlas-gt1vzt-shard-0&authSource=admin&appName=Cluster0";
mongoose.connect(MONGO_URI)
.then(() => console.log("🚀 Secure Connection to MongoDB Atlas Established!"))
.catch(err => console.error("❌ MongoDB Atlas Connection Refused:", err));

// ===================================================
// 2. BACKEND ROUTE ENTRY POINT
// ===================================================
app.post('/api/register', async (req, res) => {
    try {
        // Create new record instance from payload data
        const newRecord = new RequestModel({
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            city: req.body.city,
            pincode: req.body.pincode,
            jobRole: req.body.jobRole,
            qualification: req.body.qualification,
            resumeName: req.body.resumeName,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        // Insert document inside collection cluster
        await newRecord.save();
        res.status(201).json({ success: true, message: "Data successfully written inside Atlas cluster!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ UNIVERSAL EXPRESS V5 COMPLIANT MIDDLWARE (Ab kabhi error nahi aayega)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Bind service connection port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎯 Monolith operational platform listening on port ${PORT}`));