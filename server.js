const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./db'); 


// Middleware to parse JSON
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('/signup', upload.single('profilePic'), (req, res) => {
    const { name, email, password } = req.body;
    const profilePic = req.file.filename;
  
    const sql = 'INSERT INTO users (name, email, password, profile_pic) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, profilePic], (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.json({
        message: 'User registered successfully!',
        data: { name, email, profilePic }
      });
    });
  });


app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});