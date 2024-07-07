const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to update user.json
app.post('/update-user', async (req, res) => {
    try {
        const userData = req.body;
        await fs.writeFile(path.join(__dirname, 'user.json'), JSON.stringify(userData, null, 2));
        res.status(200).send('User data updated successfully');
    } catch (error) {
        console.error('Error updating user.json:', error);
        res.status(500).send('Error updating user data');
    }
});

// Route to update pass.json
app.post('/update-pass', async (req, res) => {
    try {
        const passData = req.body;
        await fs.writeFile(path.join(__dirname, 'pass.json'), JSON.stringify(passData, null, 2));
        res.status(200).send('Pass data updated successfully');
    } catch (error) {
        console.error('Error updating pass.json:', error);
        res.status(500).send('Error updating pass data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
