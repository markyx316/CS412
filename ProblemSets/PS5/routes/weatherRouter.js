const express = require('express');
const axios = require('axios');
require('dotenv').config();

module.exports = (redisClient) => {
  const router = express.Router();

  router.post('/weather', async (req, res) => {
    const city = req.body.string;
    const cacheKey = `weather:${city}`;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(req.body);
    // Check cache for data
    try {
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        return res.json({ data: JSON.parse(cachedResponse), fromCache: true });
      }

      // Fetch from OpenWeather API
      const response = await axios.get(url);
      await redisClient.set(cacheKey, JSON.stringify(response.data), {EX: 15}); // Cache for 15 seconds
      res.json({ data: response.data, fromCache: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

