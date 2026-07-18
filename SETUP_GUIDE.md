# ATS Resume Checklist Generator - Setup Guide

Complete step-by-step guide to get the application running.

## 📋 Prerequisites

Before you start, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### Verify Installation
```bash
node --version
npm --version
```

## 🛠️ Installation Steps

### Step 1: Clone/Download the Project

**Option A: Using Git**
```bash
git clone <repository-url>
cd path-to-project
```

**Option B: Download ZIP**
1. Download the ZIP file
2. Extract to your desired location
3. Open terminal/cmd in the project folder

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- express
- cors
- body-parser
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

This will install:
- react
- react-dom
- react-scripts
- axios
- lucide-react

### Step 4: Configure Environment Variables

**For the server:**
```bash
cd server
copy .env.example .env    # Windows
cp .env.example .env      # Mac/Linux
```

Edit `.env` if needed (default values should work):
```
PORT=5000
NODE_ENV=development
```

**For the client:**
```bash
cd ../client
copy .env.example .env    # Windows
cp .env.example .env      # Mac/Linux
```

The default API URL should work:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

You should see:
```
ATS Resume Checklist Server running on port 5000
Health check: http://localhost:5000/api/health
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

This will:
- Start the React development server
- Open browser to http://localhost:3000
- Show a welcome screen

### Option 2: Using npm-concurrently (Advanced)

Install concurrently:
```bash
npm install -D concurrently
```

Add to root package.json scripts:
```json
"scripts": {
  "dev": "concurrently \"cd server && npm start\" \"cd client && npm start\""
}
```

Then run:
```bash
npm run dev
```

## ✅ Verification

### Test Backend
Open browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Test Frontend
- Open http://localhost:3000 in browser
- You should see the ATS Resume Checklist Generator interface

### Test Full Flow
1. Go to http://localhost:3000
2. Paste a job description
3. Click "Generate Checklist"
4. Verify results display

## 🔧 Troubleshooting

### Issue: "Port 5000 already in use"

**Solution 1: Use different port**
```bash
PORT=5001 npm start
```

**Solution 2: Kill process using port**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "npm: command not found"

**Solution:** Node.js not installed properly
- Reinstall from https://nodejs.org/
- Restart terminal/command prompt
- Verify with `node --version`

### Issue: "Cannot find module"

**Solution:** Dependencies not installed
```bash
cd server && npm install
cd ../client && npm install
```

### Issue: Frontend can't connect to backend

**Solution:** Check API URL
1. Ensure backend is running on port 5000
2. Check `.env` file in client folder
3. Verify `REACT_APP_API_URL=http://localhost:5000/api`
4. Restart frontend: `npm start`

### Issue: CORS error

**Solution:** Backend CORS is not configured
1. Check server.js includes `app.use(cors());`
2. Restart backend server
3. Refresh browser page

### Issue: Module not found error

**Solution:** Delete and reinstall node_modules
```bash
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s /q node_modules              # Windows (in PowerShell)
npm install
```

## 📚 Running in Production

### Build Frontend
```bash
cd client
npm run build
```

Creates optimized build in `client/build/`

### Deploy Backend
```bash
cd server
npm install --production
NODE_ENV=production npm start
```

### Environment for Production

**server/.env (Production):**
```
PORT=5000
NODE_ENV=production
```

**client/.env (Production):**
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 📖 Project Structure

```
ats-resume-checklist/
├── server/
│   ├── server.js          # Express server
│   ├── analyzer.js        # Analysis engine
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── client/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── README.md              # Main documentation
├── SETUP_GUIDE.md         # This file
├── package.json
└── .gitignore
```

## 🎯 Next Steps

1. **Explore the UI**: Paste a real job description and see the analysis
2. **Customize**: Modify analyzer.js to add more keywords or categories
3. **Deploy**: Set up hosting for frontend and backend
4. **Integrate**: Add to your workflow or portfolio

## 📝 Common Commands

```bash
# Backend
cd server
npm start          # Run server
npm run dev        # Run with nodemon (auto-restart)

# Frontend
cd client
npm start          # Run development server
npm run build      # Create production build
npm test           # Run tests (if configured)

# Utilities
npm list           # Show installed packages
npm update         # Update packages
npm install pkg    # Install specific package
npm uninstall pkg  # Remove package
```

## 🔒 Security Notes

- The current setup is for development only
- For production:
  - Add authentication if needed
  - Use HTTPS instead of HTTP
  - Add rate limiting
  - Validate and sanitize all inputs
  - Store sensitive data in environment variables

## 📞 Support

If you encounter issues:

1. Check this troubleshooting section first
2. Review component-specific README files
3. Check browser console for errors (F12)
4. Check terminal output for server errors
5. Verify all ports are available
6. Ensure Node.js and npm are properly installed

## 🎓 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Axios Documentation](https://axios-http.com/)

## 🎉 You're All Set!

Once both servers are running:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

Start using the ATS Resume Checklist Generator!

---

Last Updated: 2024
