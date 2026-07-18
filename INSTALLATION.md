# 🚀 WeatherMCP Assistant - Installation & Setup Guide

Complete step-by-step guide to get WeatherMCP Assistant running on your system.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **A free OpenWeatherMap API key** ([Get one here](https://openweathermap.org/api))

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

Both should display version numbers (e.g., v18.0.0).

## 🔑 Step 1: Get Your OpenWeatherMap API Key

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Verify your email address
4. Log in to your account
5. Go to "API Keys" section (in the top menu)
6. Your default API key is displayed on the page
7. Copy the API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

## 📁 Step 2: Download/Clone the Project

Choose one of these methods:

### Option A: Direct Download
```bash
# The project is already in your current directory
cd "d:\Vectorflow\cray\Crazy shi\Kiro WEEK\DAY 5"
```

### Option B: Clone (if on GitHub)
```bash
git clone <repository-url>
cd WeatherMCP
```

## 🔧 Step 3: Configure Environment

### Create .env file from template

```bash
# Windows CMD
copy .env.example .env

# Windows PowerShell
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

### Edit the .env file

Open `.env` in your text editor and add your API key:

```env
# Template
OPENWEATHER_API_KEY=your_api_key_from_openweathermap_here

# Set these values in your .env file:
# 1. Get your API key at https://openweathermap.org/api
# 2. Copy and paste your key to the line above
```

⚠️ **Important:** Never commit `.env` to version control. It's already in `.gitignore`.

## 📦 Step 4: Install Dependencies

```bash
npm install
```

This will:
- Download all required packages
- Create `node_modules/` folder
- Generate `package-lock.json`

**Expected packages:**
- express (HTTP server)
- axios (HTTP client)
- dotenv (environment configuration)

Installation takes 30-60 seconds depending on internet speed.

## ▶️ Step 5: Start the Server

### Basic Start

```bash
npm start
```

### Expected Output

```
╔════════════════════════════════════════════╗
║     🌤️  WeatherMCP Server Started         ║
╚════════════════════════════════════════════╝

✅ Server running on: http://localhost:3000
📍 Web Interface: http://localhost:3000
🔌 MCP Endpoints:
   • POST http://localhost:3000/mcp/getWeather
   • POST http://localhost:3000/mcp/getForecast
   • GET  http://localhost:3000/mcp/health

Press Ctrl+C to stop the server
```

If you see this, the server started successfully! ✅

## 🌐 Step 6: Open the Web Interface

1. Open your web browser
2. Visit: **http://localhost:3000**
3. You should see the WeatherMCP Assistant interface

## ✅ Step 7: Test the Application

### Try These Actions

1. **Get Current Weather:**
   - Enter "London" in the city input
   - Click "Get Weather"
   - You should see current weather for London

2. **Try Quick Cities:**
   - Click one of the quick city buttons
   - Weather data should load instantly

3. **Get Forecast:**
   - Enter a city name
   - Click "5-Day Forecast"
   - Forecast cards should display

### Expected Results

- Weather data loads in 1-2 seconds
- Current weather shows temperature, humidity, wind speed, sunrise/sunset
- Forecast shows 5-day predictions
- No error messages appear

## 🐛 Troubleshooting

### Error: "API Key is not set"

**Problem:** Server won't start, shows API key error

**Solution:**
1. Check if `.env` file exists in project root
2. Verify API key is added to `.env`
3. Restart server: `npm start`

### Error: "Port 3000 already in use"

**Problem:** Another process is using port 3000

**Solution:**
```bash
# Use a different port
MCP_PORT=3001 npm start

# Then visit: http://localhost:3001
```

### Error: "City not found"

**Problem:** Weather lookup returns "city not found" error

**Solution:**
- Try English city names (e.g., "London" not "Londres")
- Try adding country code (e.g., "London, GB")
- Check spelling carefully

### Error: "Network error" or "Connection refused"

**Problem:** Can't connect to server or OpenWeatherMap API

**Solution:**
1. Verify server is running (`npm start`)
2. Check internet connection
3. Verify API key is valid
4. Check firewall settings
5. Try restarting the server

### Error: "Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
npm start
```

### Server starts but interface doesn't load

**Problem:** Browser can't reach http://localhost:3000

**Solution:**
1. Verify server is running (check terminal)
2. Try full reload: Ctrl+Shift+R (Cmd+Shift+R on Mac)
3. Check if port is different: `netstat -ano | findstr :3000`
4. Restart server and browser

## 🛠️ Advanced Configuration

### Enable Debug Mode

Shows detailed logging:

```bash
DEBUG=true npm start
```

### Use Custom Port

```bash
MCP_PORT=8000 npm start

# Then visit: http://localhost:8000
```

### Multiple Instances

Run on different ports in separate terminals:

```bash
# Terminal 1
npm start

# Terminal 2
MCP_PORT=3001 npm start
```

## 📊 Checking System Status

### Health Check Endpoint

```bash
# Using curl
curl http://localhost:3000/mcp/health

# Response
{
  "status": "ok",
  "server": "WeatherMCP Server",
  "version": "1.0.0",
  "timestamp": "2024-07-18T14:30:00.000Z"
}
```

### Test MCP Tool Directly

```bash
# Using curl to test getWeather
curl -X POST http://localhost:3000/mcp/getWeather \
  -H "Content-Type: application/json" \
  -d '{"city":"London"}'
```

## 🎓 Project Structure Reference

```
WeatherMCP/
├── server.js                 # Main MCP server
├── package.json              # Dependencies list
├── .env                       # Your configuration (⚠️ secret)
├── .env.example               # Configuration template
├── .gitignore                 # Git ignore rules
├── README.md                  # Main documentation
├── INSTALLATION.md            # This file
├── public/
│   ├── index.html             # Web interface
│   ├── styles.css             # Styling
│   └── app.js                 # Client JavaScript
├── .kiro/
│   ├── settings/
│   │   └── mcp.json           # Kiro MCP configuration
│   └── specs/
│       ├── requirements.md    # Requirements
│       ├── design.md          # Design documentation
│       └── tasks.md           # Task list
└── node_modules/              # Installed packages (not committed)
```

## 🚀 Next Steps

1. **Explore the Code**
   - Read `server.js` to understand MCP implementation
   - Check `public/app.js` for frontend logic
   - Review `public/index.html` for HTML structure

2. **Extend Functionality**
   - Add more weather parameters
   - Create new MCP tools
   - Modify styling and UI

3. **Deploy**
   - Deploy to Heroku, Railway, or other platforms
   - Containerize with Docker
   - Scale for production use

4. **Learn More**
   - Read `.kiro/specs/design.md` for architecture
   - Check OpenWeatherMap API docs
   - Explore Model Context Protocol

## 📞 Getting Help

1. Check README.md for features and API documentation
2. Review .kiro/specs/ for detailed design information
3. Check troubleshooting section above
4. Verify OpenWeatherMap account status
5. Test internet connectivity

## ✨ Common Commands

```bash
# Start the server
npm start

# Start with debug logging
DEBUG=true npm start

# Stop the server
# Press Ctrl+C in the terminal

# Reinstall dependencies
npm install

# Check if dependencies are installed
npm list

# View installed package versions
npm list --depth=0
```

## 🎉 Success Checklist

- [x] Downloaded/cloned the project
- [x] Got OpenWeatherMap API key
- [x] Created `.env` file from `.env.example`
- [x] Added API key to `.env`
- [x] Ran `npm install`
- [x] Ran `npm start`
- [x] Opened http://localhost:3000
- [x] Tested weather lookup
- [x] Tested forecast lookup

## 🎊 You're Ready!

Your WeatherMCP Assistant is now ready to use. Enjoy live weather data through the MCP server! 🌤️

---

**For more information, see:**
- [README.md](./README.md) - Full documentation
- [.kiro/specs/requirements.md](./.kiro/specs/requirements.md) - Requirements
- [.kiro/specs/design.md](./.kiro/specs/design.md) - Architecture
