require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes

console.log('Starting script...');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Attempt to connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Endpoint to get spells
app.get('/spells', (req, res) => {
    console.log('Received request for /spells');
    db.query('SELECT * FROM Spells', (err, results, fields) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database');
            return;
        }
        console.log('Query executed successfully, sending results.');
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

console.log('Script end.');
