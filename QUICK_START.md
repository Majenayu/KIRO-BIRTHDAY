# Quick Start Guide - 5 Minutes to Running

Get the ATS Resume Checklist Generator running in 5 minutes.

## Prerequisites
- Node.js installed ([download](https://nodejs.org/))
- npm (comes with Node.js)

## Installation (2 minutes)

```bash
# Navigate to project folder
cd /path/to/project

# Install all dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

## Running (1 minute)

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Look for: `ATS Resume Checklist Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Browser will open automatically to `http://localhost:3000`

## Using the App (2 minutes)

1. **Find a Job**: Copy a job description from any job board
2. **Paste It**: Click the textarea and paste the job description
3. **Generate**: Click the "🚀 Generate Checklist" button
4. **Review**: See the checklist with:
   - ✓ Technical skills to include
   - ✓ Key responsibilities to address
   - ✓ Education requirements
   - ✓ ATS optimization tips
5. **Download**: Click "⬇️ Download" to save as text file

## That's It! 🎉

Your ATS Resume Checklist Generator is ready to use.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check port 5000 is free: `netstat -ano \| findstr :5000` |
| Frontend won't start | Check port 3000 is free, or use `PORT=3001 npm start` |
| Can't connect to backend | Ensure backend is running on port 5000 |
| Dependency errors | Delete node_modules and run `npm install` again |

## Key URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Next Steps

- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Check [FEATURES.md](FEATURES.md) for all capabilities
- See [README.md](README.md) for complete documentation

---

That's it! Enjoy using the ATS Resume Checklist Generator! 🚀
