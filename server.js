#!/usr/bin/env node

/**
 * WeatherMCP Server
 * Custom Model Context Protocol (MCP) server that connects to OpenWeatherMap API
 * Provides live weather data and forecasting capabilities
 */

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.MCP_PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const DEBUG = process.env.DEBUG === 'true';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Validate API key on startup
if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.error('❌ ERROR: OPENWEATHER_API_KEY is not set in .env file');
  console.error('Please set your API key in .env. Get one at: https://openweathermap.org/api');
  process.exit(1);
}

if (DEBUG) {
  console.log('🔍 DEBUG MODE: Enabled');
}

// OpenWeatherMap API base URL
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Logs debug messages if DEBUG mode is enabled
 */
function debugLog(message, data = null) {
  if (DEBUG) {
    console.log(`🔍 [DEBUG] ${message}`, data || '');
  }
}

/**
 * MCP Tool: getWeather
 * Fetches current weather data for a specified city
 * 
 * Returns:
 * - temperature: Current temperature in Celsius and Fahrenheit
 * - humidity: Humidity percentage
 * - windSpeed: Wind speed in m/s and mph
 * - condition: Weather condition description
 * - sunrise: Local sunrise time
 * - sunset: Local sunset time
 * - icon: Weather icon code
 */
async function getWeather(city) {
  try {
    debugLog(`Fetching weather for city: ${city}`);

    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    const data = response.data;
    debugLog('Weather API response received', { city, status: response.status });

    // Format sunrise/sunset times
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Construct the weather object with comprehensive data
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: {
        celsius: data.main.temp,
        fahrenheit: (data.main.temp * 9/5) + 32
      },
      humidity: data.main.humidity,
      windSpeed: {
        meterPerSecond: data.wind.speed,
        milesPerHour: data.wind.speed * 2.237
      },
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      feelsLike: {
        celsius: data.main.feels_like,
        fahrenheit: (data.main.feels_like * 9/5) + 32
      },
      sunrise: sunrise,
      sunset: sunset,
      cloudiness: data.clouds.all,
      visibility: data.visibility,
      coordinates: {
        latitude: data.coord.lat,
        longitude: data.coord.lon
      }
    };

    return weatherData;
  } catch (error) {
    debugLog('Weather API error', { city, error: error.message });
    
    if (error.response?.status === 404) {
      throw new Error(`City not found: ${city}`);
    }
    throw new Error(`Failed to fetch weather: ${error.message}`);
  }
}

/**
 * MCP Tool: getForecast
 * Fetches 5-day weather forecast for a specified city
 * 
 * Returns array of forecast objects, each containing:
 * - timestamp: Date and time of forecast
 * - temperature: Predicted temperature
 * - condition: Weather condition
 * - humidity: Predicted humidity
 * - windSpeed: Predicted wind speed
 * - precipitation: Chance of rain
 */
async function getForecast(city) {
  try {
    debugLog(`Fetching forecast for city: ${city}`);

    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    const data = response.data;
    debugLog('Forecast API response received', { city, forecasts: data.list.length });

    // Map forecast data into a structured format
    const forecast = data.list.map((item) => ({
      timestamp: new Date(item.dt * 1000).toISOString(),
      temperature: {
        celsius: item.main.temp,
        fahrenheit: (item.main.temp * 9/5) + 32
      },
      feelsLike: {
        celsius: item.main.feels_like,
        fahrenheit: (item.main.feels_like * 9/5) + 32
      },
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      condition: item.weather[0].main,
      description: item.weather[0].description,
      windSpeed: {
        meterPerSecond: item.wind.speed,
        milesPerHour: item.wind.speed * 2.237
      },
      cloudiness: item.clouds.all,
      precipitation: item.pop * 100, // Probability of precipitation as percentage
      visibility: item.visibility,
      icon: item.weather[0].icon
    }));

    return {
      city: data.city.name,
      country: data.city.country,
      forecast: forecast
    };
  } catch (error) {
    debugLog('Forecast API error', { city, error: error.message });
    
    if (error.response?.status === 404) {
      throw new Error(`City not found: ${city}`);
    }
    throw new Error(`Failed to fetch forecast: ${error.message}`);
  }
}

/**
 * MCP Endpoint: Get Current Weather
 * HTTP POST /mcp/getWeather
 */
app.post('/mcp/getWeather', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        error: 'Missing required parameter: city'
      });
    }

    debugLog('MCP request received', { tool: 'getWeather', city });

    const weatherData = await getWeather(city);
    
    res.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    debugLog('MCP error', { tool: 'getWeather', error: error.message });
    
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * MCP Endpoint: Get Weather Forecast
 * HTTP POST /mcp/getForecast
 */
app.post('/mcp/getForecast', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        error: 'Missing required parameter: city'
      });
    }

    debugLog('MCP request received', { tool: 'getForecast', city });

    const forecastData = await getForecast(city);
    
    res.json({
      success: true,
      data: forecastData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    debugLog('MCP error', { tool: 'getForecast', error: error.message });
    
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Health Check Endpoint
 * Verifies server is running and API key is configured
 */
app.get('/mcp/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'WeatherMCP Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * Serve main HTML page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Start the MCP Server
 */
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     🌤️  WeatherMCP Server Started         ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`📍 Web Interface: http://localhost:${PORT}`);
  console.log(`🔌 MCP Endpoints:`);
  console.log(`   • POST http://localhost:${PORT}/mcp/getWeather`);
  console.log(`   • POST http://localhost:${PORT}/mcp/getForecast`);
  console.log(`   • GET  http://localhost:${PORT}/mcp/health`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✋ Shutting down server...');
  process.exit(0);
});

export { getWeather, getForecast };
