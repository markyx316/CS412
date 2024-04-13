const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const client = require('../redisClient');
require('dotenv').config();

// POST route with redis cache implemented 
// and with third party API call to fetch weather data
router.post('/weather', async (req, res) => {
    const city = req.body.string;
    const cacheKey = `weather:${city}`;

    try {
        // Check the cache
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json({ data: JSON.parse(cachedData), fromCache: true });
        }

        // Fetch from the API if not cached
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        // Cache the API response
        if (data) {
            // Cache the response data with a 15-second timeout
            await client.set(cacheKey, JSON.stringify(data), {
                EX: 15
            });
            res.json({ data, fromCache: false });
        } else {
            res.status(404).json({ message: 'No weather data found' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
