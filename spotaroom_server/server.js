const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const SYMFONY_API_BASE_URL = 'http://spotaroom.test/api'; // Replace with your Symfony API base URL

// Define your API key
const API_KEY = 'secret_api_key_for_spot_a_home';

// Get all products
app.get('/api/flats', async (req, res) => {

  const { page, limit, sortBy, sortOrder, search } = req.query;

  try {
    const response = await axios.get(`${SYMFONY_API_BASE_URL}/flats`, {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
        search
      },
      headers: {
        'X-API-KEY': API_KEY // Include the API key in the headers
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});


// Get a single product by ID
app.get('/api/flats/:id', async (req, res) => {
  try {
    const response = await axios.get(`${SYMFONY_API_BASE_URL}/flats/${req.params.id}`, {
      headers: {
        'X-API-KEY': API_KEY // Include the API key in the headers
      }
    });
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