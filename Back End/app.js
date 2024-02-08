const express = require('express');
const db = require('./db'); // db.js must be in the same directory

const app = express();

app.use(express.static('public'));

// Define a route to fetch and serve spells from the database
app.get('/spells', async (req, res) => {
  try {
    // Fetch all spells from the database
    const [rows] = await db.query('SELECT * FROM Spells');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
