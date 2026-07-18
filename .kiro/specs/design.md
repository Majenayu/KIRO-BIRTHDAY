# WeatherMCP Assistant - Design

## Architecture Overview

### System Components
```
┌─────────────────────────────────────────────────────────────┐
│                    Web Browser                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  index.html (UI) + app.js (Client Logic)            │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │ HTTP POST                              │
└─────────────────────┼──────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────┐
│        WeatherMCP Custom MCP Server (Node.js)              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Express.js HTTP Server                            │    │
│  │  • Serves static files (HTML, CSS, JS)            │    │
│  │  • Exposes MCP tool endpoints                      │    │
│  │  • Handles errors and logging                      │    │
│  └──────────┬───────────────────────────┬─────────────┘    │
│             │                           │                   │
│  ┌──────────▼──────────┐  ┌────────────▼───────────┐        │
│  │  MCP Tools          │  │  Request Handler       │        │
│  │  • getWeather()     │  │  • Input validation    │        │
│  │  • getForecast()    │  │  • Error handling      │        │
│  └──────────┬──────────┘  └──────────────┬─────────┘        │
│             │                           │                   │
│             └─────────────┬─────────────┘                   │
│                           │ axios HTTP                      │
└───────────────────────────┼───────────────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │  OpenWeatherMap REST API  │
              │  • /data/2.5/weather      │
              │  • /data/2.5/forecast     │
              └───────────────────────────┘
```

## Component Design

### 1. Backend: MCP Server (server.js)
**Responsibilities:**
- Express.js HTTP server setup
- Environment configuration management
- API key validation
- Static file serving
- MCP tool endpoints

**Key Functions:**
```javascript
getWeather(city)        // Fetch current weather
getForecast(city)       // Fetch 5-day forecast
debugLog(msg, data)     // Conditional debug logging
```

**Endpoints:**
- `POST /mcp/getWeather` - Get current weather
- `POST /mcp/getForecast` - Get 5-day forecast
- `GET /mcp/health` - Server health check
- `GET /` - Serve index.html

### 2. Frontend: User Interface
**Files:**
- `public/index.html` - Structure
- `public/styles.css` - Styling
- `public/app.js` - Interactivity

**Key Features:**
- City input with validation
- Quick access buttons for popular cities
- Current weather display
- 5-day forecast cards
- Error handling and loading states

### 3. Configuration Management
**Environment Variables (.env):**
```
OPENWEATHER_API_KEY     # OpenWeatherMap API key
MCP_PORT                # Server port (default: 3000)
DEBUG                   # Debug mode (true/false)
```

**Why Environment-based:**
- Keeps secrets out of version control
- Easy deployment to different environments
- Secure API key management
- Clear separation of config from code

## Data Flow

### Weather Fetch Flow
```
1. User enters city → cityInput value
2. Click "Get Weather" button
3. JavaScript calls fetchWeather(city)
4. HTTP POST to /mcp/getWeather
5. Server calls getWeather(city)
6. axios calls OpenWeatherMap API
7. Parse and format response
8. Return structured JSON
9. Frontend displays weather card
```

### Forecast Fetch Flow
```
1. User enters city
2. Click "5-Day Forecast" button
3. JavaScript calls fetchForecast(city)
4. HTTP POST to /mcp/getForecast
5. Server calls getForecast(city)
6. axios calls OpenWeatherMap forecast API
7. Map and format forecast array
8. Return structured JSON array
9. Frontend renders forecast cards
```

## Data Structures

### Weather Object
```javascript
{
  city: string,
  country: string,
  temperature: {
    celsius: number,
    fahrenheit: number
  },
  humidity: number (0-100),
  windSpeed: {
    meterPerSecond: number,
    milesPerHour: number
  },
  condition: string,        // "Clear", "Rain", etc.
  description: string,      // "clear sky", "light rain"
  icon: string,            // Weather icon code
  pressure: number,        // hPa
  feelsLike: {
    celsius: number,
    fahrenheit: number
  },
  sunrise: string,         // Local time
  sunset: string,          // Local time
  cloudiness: number,      // Percentage
  visibility: number,      // Meters
  coordinates: {
    latitude: number,
    longitude: number
  }
}
```

### Forecast Object
```javascript
{
  city: string,
  country: string,
  forecast: [
    {
      timestamp: ISO8601,
      temperature: { celsius, fahrenheit },
      feelsLike: { celsius, fahrenheit },
      humidity: number,
      pressure: number,
      condition: string,
      description: string,
      windSpeed: { meterPerSecond, milesPerHour },
      cloudiness: number,
      precipitation: number (0-100 percentage),
      visibility: number,
      icon: string
    },
    ...
  ]
}
```

## Error Handling

### Server-Side
- API key validation on startup
- Try-catch blocks on all async operations
- Descriptive error messages
- HTTP status codes (400 for client errors, 500 for server errors)

### Client-Side
- Input validation (empty city check)
- Network error handling
- User-friendly error messages
- Loading state management
- Recovery UI (try again capability)

## Security Considerations

1. **API Key Protection**
   - Stored only in `.env` file
   - Validated on server startup
   - Never logged or exposed
   - `.gitignore` prevents accidental commits

2. **Input Validation**
   - City name required and trimmed
   - No SQL injection (using REST API, not database)
   - Error messages don't expose internal details

3. **CORS & Access**
   - Server runs locally for development
   - Express serves static files securely
   - No sensitive data in responses

## Performance Considerations

1. **API Calls**
   - Direct calls to OpenWeatherMap (no caching in v1.0)
   - Response time ~500-2000ms depending on network

2. **Frontend**
   - Vanilla JavaScript (no framework overhead)
   - CSS for smooth animations
   - Minimal bundle size

3. **Memory**
   - Server is lightweight (Express + axios)
   - No persistent state
   - Each request is independent

## Scaling Opportunities (Future)

1. **Caching**
   - Redis cache for popular cities
   - TTL-based invalidation

2. **Database**
   - Store weather history
   - User preferences

3. **Additional Tools**
   - Air quality data
   - Alerts/warnings
   - Historical data

4. **Deployment**
   - Docker containerization
   - Cloud hosting (AWS, Heroku)
   - Multiple region support
