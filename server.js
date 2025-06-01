const express = require('express');
require('dotenv').config();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./db');

// Middleware to parse JSON
app.use(express.json());

// AWS S3 configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' // ✅ replace with your actual region
});

const s3 = new AWS.S3();

// Configure multer to upload to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 's3-uploader', // ✅ replace with your actual bucket name
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'uploads/' + uniqueSuffix + path.extname(file.originalname));
        }
    })
});

// Signup route that stores image in S3 and metadata in MySQL
app.post('/signup', upload.single('profilePic'), (req, res) => {
    const { name, email, password } = req.body;

    // S3 returns the file URL in req.file.location
    const profilePicUrl = req.file.location;

    const sql = 'INSERT INTO users (name, email, password, profile_pic) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, profilePicUrl], (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.json({
            message: 'User registered successfully!',
            data: { name, email, profilePic: profilePicUrl }
        });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
