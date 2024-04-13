// const express = require('express');
// const axios = require('axios');
// const client = require('../redisClient');
// const router = express.Router();
// require('dotenv').config();

// router.post('/weather', async (req, res) => {
//   const { city } = req.body;
//   const cacheKey = `weather:${city}`;
//   const encodedCity = encodeURIComponent(city);
//   const apiKey = process.env.OPENWEATHER_API_KEY;
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}`;
//   console.log("Requesting URL:", url);
//   console.log("Cache key:", cacheKey);
//   // Check cache for data
//   try {
//     const cachedResponse = await client.get(cacheKey);
//     if (cachedResponse) {
//       return res.json({ data: JSON.parse(cachedResponse), fromCache: true });
//     }

//     // Fetch from OpenWeather API
//     const response = await axios.get(url);
//     await client.set(cacheKey, JSON.stringify(response.data), 'EX', 15); // Cache for 15 seconds
//     res.json({ data: response.data, fromCache: false });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
// routes/weatherRouter.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

module.exports = (redisClient) => {
  const router = express.Router();

  router.post('/weather', async (req, res) => {
    const city = req.body.string;
    const cacheKey = `weather:${city}`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;
    console.log("Requesting URL:", url); // Log the URL to check its correctness
    // Check cache for data
    try {
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        return res.json({ data: JSON.parse(cachedResponse), fromCache: true });
      }

      // Fetch from OpenWeather API
      const response = await axios.get(url);
      await redisClient.set(cacheKey, JSON.stringify(response.data), 'EX', 15); // Cache for 15 seconds
      res.json({ data: response.data, fromCache: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

