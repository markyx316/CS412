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

// Another POST route with redis cache implemented
// and another third party API call to fetch random facts about numbers
// Modified from my PS2 Node App POST route
router.post('/string-length', async (req, res) => {
    const { string } = req.body;

    const cacheKey = `string_length:${string}`;

    try {
        // Try fetching the data from Redis cache
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            // If data is found in cache, parse it and return
            return res.json({ string, length: JSON.parse(cachedData).length, fromCache: true });
        } else {
            // If no data in cache, call the external API
            const response = await fetch(`http://numbersapi.com/random/trivia`);
            const trivia = await response.text();

            // Prepare the data to be cached
            const responseData = { string, length: string.length, trivia };

            // Cache the response data with a 15-second timeout
            await client.set(cacheKey, JSON.stringify(responseData), {
                EX: 15
            });

            // Return the newly fetched data
            return res.json({ ...responseData, fromCache: false });
        }
    } catch (error) {
        console.error('Error handling POST route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// From my PS2 Node App 
// GET route returning a fixed string
router.get('/fixed-string', (req, res) => {
    res.render('index', { string: 'Hope you are having a great day!', length: null, param: null });
});

// From my PS2 Node App 
// GET route that reads a named value from the URL
router.get('/names/:name', (req, res) => {
    const { name } = req.params;
    res.render('index', { string: `Hello, ${name}`, length: null, param: name });
});

module.exports = router;
