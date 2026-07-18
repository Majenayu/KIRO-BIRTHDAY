# WeatherMCP Assistant - Requirements

## Overview
Build a custom Model Context Protocol (MCP) server that connects Kiro to the OpenWeatherMap API and enables Kiro to retrieve live weather information for any city.

## Functional Requirements

### MCP Server Requirements
1. **Custom MCP Server Implementation**
   - Build from scratch (no prebuilt community MCP servers)
   - Connect to real OpenWeatherMap REST API
   - Provide HTTP-based endpoints for MCP tools
   - Implement error handling and validation

2. **Environment Configuration**
   - Read API key from `.env` file only
   - Never commit secrets to repository
   - Include `.env.example` file with template
   - Validate API key on server startup

3. **MCP Tools**
   - `getWeather(city)` - Fetch current weather for a city
   - `getForecast(city)` - Fetch 5-day forecast for a city

### Weather Data Requirements
The system must return the following data:
- Temperature (Celsius and Fahrenheit)
- Humidity (percentage)
- Wind Speed (m/s and mph)
- Weather Condition (main and description)
- Sunrise time (local)
- Sunset time (local)
- Pressure (hPa)
- Feels like temperature
- Visibility (meters/kilometers)
- Cloud coverage percentage
- Coordinates (latitude/longitude)

### Web Interface Requirements
1. **User Interface**
   - Input field for city name
   - Search button to fetch current weather
   - Forecast button to fetch 5-day forecast
   - Quick access buttons for popular cities
   - Display weather information in readable format
   - Show loading state during API calls
   - Display error messages

2. **Responsive Design**
   - Mobile-friendly layout
   - Works on all screen sizes
   - Touch-friendly buttons

### Technical Stack
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **API Integration**: HTTP client for OpenWeatherMap
- **Environment**: dotenv for configuration

### Build & Deployment
1. **Project Structure**
   - Clean, organized directory layout
   - Server logic separate from frontend assets
   - Configuration files properly placed

2. **Startup Command**
   ```bash
   npm install
   npm start
   ```

3. **Port Configuration**
   - Server runs on configurable port (default: 3000)
   - Set via `MCP_PORT` environment variable

## Documentation Requirements
1. **README.md** - Complete setup and usage guide
2. **Design Documentation** - Architecture and design patterns
3. **Specs folder** with:
   - requirements.md (this file)
   - design.md
   - tasks.md

## Quality Requirements
1. **Code Quality**
   - Clear, descriptive comments throughout code
   - Meaningful variable and function names
   - Consistent code formatting
   - Error handling on all API calls

2. **Security**
   - API keys never exposed in commits
   - Input validation on all endpoints
   - Proper error messages without sensitive data

3. **Performance**
   - Reasonable response times from MCP server
   - Efficient data formatting and transformation

## Acceptance Criteria
- [ ] MCP server starts successfully with `npm start`
- [ ] Web interface loads at `http://localhost:3000`
- [ ] Can fetch current weather by entering a city name
- [ ] Can fetch 5-day forecast for any city
- [ ] Weather data displays with all required information
- [ ] Error handling works for invalid cities
- [ ] API key is stored in `.env` file, not committed
- [ ] `.env.example` exists with template
- [ ] All code includes comments explaining functionality
- [ ] README explains setup, architecture, and usage
- [ ] Spec documents cover requirements, design, and tasks
