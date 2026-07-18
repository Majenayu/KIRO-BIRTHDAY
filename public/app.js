/**
 * WeatherMCP Assistant - Frontend JavaScript
 * Handles all client-side interactions and MCP tool invocation
 * Communicates with custom MCP server via HTTP
 */

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const forecastBtn = document.getElementById('forecastBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherSection = document.getElementById('weatherSection');
const forecastSection = document.getElementById('forecastSection');
const quickCityButtons = document.querySelectorAll('.quick-city');

// Configuration
const API_BASE_URL = 'http://localhost:3000';
const WEATHER_EMOJI = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '💨',
    'Haze': '🌫️',
    'Dust': '🌪️',
    'Fog': '🌫️',
    'Sand': '🌪️',
    'Ash': '💨',
    'Squall': '🌪️',
    'Tornado': '🌪️'
};

/**
 * Display loading state
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    weatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Display error message
 */
function showError(message) {
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.remove('hidden');
    hideLoading();
    weatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
}

/**
 * Get weather emoji based on condition
 */
function getWeatherEmoji(condition) {
    return WEATHER_EMOJI[condition] || '🌤️';
}

/**
 * Format timestamp to readable format
 */
function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format forecast timestamp to readable time
 */
function formatForecastTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Display current weather data
 * Called after successful MCP getWeather tool invocation
 */
function displayWeather(data) {
    // Update city name
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    
    // Update timestamp
    document.getElementById('timestamp').textContent = `Updated: ${formatTimestamp(new Date().toISOString())}`;
    
    // Update temperature
    document.getElementById('tempCelsius').textContent = Math.round(data.temperature.celsius);
    
    // Update weather icon and condition
    const emoji = getWeatherEmoji(data.condition);
    document.getElementById('weatherIcon').textContent = emoji;
    document.getElementById('condition').textContent = data.condition;
    document.getElementById('description').textContent = data.description;
    
    // Update weather details grid
    document.getElementById('feelsLike').textContent = `${Math.round(data.feelsLike.celsius)}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed.meterPerSecond.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('cloudiness').textContent = `${data.cloudiness}%`;
    
    // Update sunrise/sunset
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    
    // Update coordinates
    document.getElementById('coordinates').textContent = 
        `📍 Latitude: ${data.coordinates.latitude.toFixed(4)}° | Longitude: ${data.coordinates.longitude.toFixed(4)}°`;
    
    // Show weather section
    weatherSection.classList.remove('hidden');
}

/**
 * Display 5-day forecast data
 * Called after successful MCP getForecast tool invocation
 */
function displayForecast(data) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = ''; // Clear previous forecast
    
    // Create forecast cards for each forecast item
    data.forecast.forEach(item => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const emoji = getWeatherEmoji(item.condition);
        const tempC = Math.round(item.temperature.celsius);
        
        card.innerHTML = `
            <div class="forecast-time">${formatForecastTime(item.timestamp)}</div>
            <div class="forecast-icon">${emoji}</div>
            <div class="forecast-temp">${tempC}°C</div>
            <div class="forecast-condition">${item.description}</div>
            <div class="forecast-details">
                <div class="forecast-detail-item">💧 ${item.humidity}%</div>
                <div class="forecast-detail-item">💨 ${item.windSpeed.meterPerSecond.toFixed(1)} m/s</div>
                <div class="forecast-detail-item">🌧️ ${item.precipitation.toFixed(0)}%</div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Show forecast section
    forecastSection.classList.remove('hidden');
}

/**
 * Fetch current weather via MCP
 * Calls POST /mcp/getWeather with city parameter
 */
async function fetchWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    try {
        console.log(`🌤️ Fetching weather for: ${city}`);
        
        // Invoke MCP getWeather tool via HTTP POST
        const response = await fetch(`${API_BASE_URL}/mcp/getWeather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Failed to fetch weather data');
        }

        console.log('✅ Weather data received:', result.data);
        hideLoading();
        displayWeather(result.data);
        
    } catch (error) {
        console.error('❌ Error fetching weather:', error);
        showError(error.message);
    }
}

/**
 * Fetch 5-day forecast via MCP
 * Calls POST /mcp/getForecast with city parameter
 */
async function fetchForecast(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    try {
        console.log(`📊 Fetching forecast for: ${city}`);
        
        // Invoke MCP getForecast tool via HTTP POST
        const response = await fetch(`${API_BASE_URL}/mcp/getForecast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Failed to fetch forecast data');
        }

        console.log('✅ Forecast data received:', result.data);
        hideLoading();
        displayForecast(result.data);
        
    } catch (error) {
        console.error('❌ Error fetching forecast:', error);
        showError(error.message);
    }
}

/**
 * Event Listeners
 */

// Search button click
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeather(city);
});

// Forecast button click
forecastBtn.addEventListener('click', () => {
    const city = cityInput.value;
    fetchForecast(city);
});

// Enter key in city input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        fetchWeather(city);
    }
});

// Quick city buttons
quickCityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const city = button.getAttribute('data-city');
        cityInput.value = city;
        fetchWeather(city);
    });
});

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌤️ WeatherMCP Assistant loaded');
    console.log('📡 Connected to MCP Server at:', API_BASE_URL);
    
    // Focus on city input
    cityInput.focus();
    
    // Log available MCP tools
    console.log('🔧 Available MCP Tools:');
    console.log('   • getWeather(city) - Get current weather');
    console.log('   • getForecast(city) - Get 5-day forecast');
});

/**
 * Export functions for external use
 */
export { fetchWeather, fetchForecast };
