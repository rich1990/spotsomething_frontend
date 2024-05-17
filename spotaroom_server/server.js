const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const SYMFONY_API_BASE_URL = 'http://spotaroom.test/api'; // Replace with your Symfony API base URL

// Get all products
app.get('/api/flats', async (req, res) => {
  try {
    const response = await axios.get(`${SYMFONY_API_BASE_URL}/flats`);
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

// Get a single product by ID
app.get('/api/flats/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SYMFONY_API_BASE_URL}/flats/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});