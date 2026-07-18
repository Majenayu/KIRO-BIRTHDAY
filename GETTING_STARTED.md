# Getting Started - ATS Resume Checklist Generator

Welcome! Here's everything you need to get started in 10 minutes.

## ✅ Pre-Flight Checklist

Before you start, verify:
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] You're in the project directory
- [ ] You have 50+ MB free disk space

## 📥 Step 1: Install Dependencies (2 minutes)

```bash
# From project root directory
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install

# Return to root
cd ..
```

✅ **What happens:** Downloads ~500MB of packages

## 🚀 Step 2: Start the Backend (1 minute)

Open **Terminal #1** (keep it open):

```bash
cd server
npm start
```

✅ **You should see:**
```
ATS Resume Checklist Server running on port 5000
Health check: http://localhost:5000/api/health
```

## 🎨 Step 3: Start the Frontend (1 minute)

Open **Terminal #2** (keep it open):

```bash
cd client
npm start
```

✅ **What happens:**
- React dev server starts
- Browser opens automatically
- You see the purple gradient interface

## 🎯 Step 4: Test It Works (1 minute)

### Test Backend
```bash
# In a new terminal, run:
curl http://localhost:5000/api/health
```

✅ **Response:**
```json
{"status":"OK","message":"Server is running"}
```

### Test Frontend
- Open: http://localhost:3000
- You should see the ATS Resume Checklist Generator

## 📋 Step 5: Try It Out (4 minutes)

### Get a Job Description
1. Go to any job board (LinkedIn, Indeed, etc.)
2. Copy a full job description
3. Example: Search for "Senior Developer" or any role

### Analyze
1. Paste job description into the textarea
2. Click "🚀 Generate Checklist"
3. Wait for results (instant)

### Review Results
You'll see:
- ✅ Technical skills to add
- ✅ Responsibilities to address
- ✅ Education requirements
- ✅ 7 ATS optimization tips

### Export
- Click "📋 Copy Checklist" to copy
- Click "⬇️ Download" to save as file

## 🎉 Success!

If you see results, congratulations! The app is working.

---

## 📚 Next Steps

### Learn More
- Read [QUICK_START.md](QUICK_START.md) for 5-min overview
- Read [README.md](README.md) for full documentation
- Read [FEATURES.md](FEATURES.md) for all capabilities

### Customize
- Change colors in `client/src/App.css`
- Add keywords in `server/analyzer.js`
- Add tips in `server/analyzer.js`

### Deploy
- See [SETUP_GUIDE.md](SETUP_GUIDE.md) for deployment

---

## 🆘 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Reinstall Node.js from https://nodejs.org/

### Problem: "Port 5000 already in use"
**Solution:** 
```bash
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json  # or rmdir for Windows
npm install
```

### Problem: "Cannot GET /api/analyze"
**Solution:** Make sure backend is running in Terminal #1

### Problem: Browser shows blank page
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Open DevTools (F12) and check console for errors
3. Make sure backend is running

## 💡 Quick Tips

### Running Both Servers
- Use two terminal tabs/windows
- Keep both running while developing
- Restart one that crashes

### Modifying Code
**Backend changes:**
- Edit `server/analyzer.js`
- Restart backend (Ctrl+C, then `npm start`)

**Frontend changes:**
- Edit files in `client/src/`
- Frontend auto-reloads

### Viewing Console Logs
- Backend: See Terminal #1 output
- Frontend: Press F12 → Console tab

---

## 📞 Key Commands

```bash
# Start backend
cd server && npm start

# Start frontend  
cd client && npm start

# Install all
npm install && cd server && npm install && cd ../client && npm install

# Test backend
curl http://localhost:5000/api/health

# View all files
cd .. && find . -type f -name "*.js" -o -name "*.json"
```

---

## 📊 Project URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | Main app UI |
| Backend | http://localhost:5000 | API server |
| API Health | http://localhost:5000/api/health | Check backend |
| API Endpoint | http://localhost:5000/api/analyze | Analyze jobs |

---

## 🎓 Understanding the Flow

```
You paste job description
        ↓
Click "Generate Checklist"
        ↓
Frontend sends to backend
        ↓
Backend analyzes (analyzer.js)
        ↓
Backend returns checklist data
        ↓
Frontend displays results
        ↓
You see skills, tips, responsibilities, etc.
        ↓
You download or copy
```

---

## 🔄 Typical Workflow

### First Time
1. Install dependencies (2 min)
2. Start backend (30 sec)
3. Start frontend (30 sec)
4. Test with a job description (2 min)
5. Download checklist (30 sec)

### Subsequent Times
1. Terminal #1: `cd server && npm start`
2. Terminal #2: `cd client && npm start`
3. Wait for frontend to load
4. Use the app!

---

## 🚀 Ready to Deploy?

Once you're comfortable locally:

1. **Backend Deployment**
   - Deploy to: Heroku, Railway, AWS
   - Command: `npm start`
   - Set: `NODE_ENV=production`

2. **Frontend Deployment**
   - Run: `npm run build`
   - Deploy: Vercel, Netlify
   - Update API URL in `.env`

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for details.

---

## 📝 File Cheat Sheet

| File | Purpose |
|------|---------|
| `server/server.js` | Backend server setup |
| `server/analyzer.js` | Job analysis engine |
| `client/src/App.js` | Main React component |
| `client/src/components/*` | React components |
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Installation help |
| `FEATURES.md` | Feature descriptions |

---

## 💬 Common Questions

**Q: Do I need a database?**  
A: No. Currently, everything is in-session. No data is stored.

**Q: Can I modify the keywords?**  
A: Yes! Edit `server/analyzer.js` and modify `TECHNICAL_KEYWORDS`.

**Q: Can I change the colors?**  
A: Yes! Edit `client/src/App.css` and change the color variables.

**Q: Is my data secure?**  
A: Yes. Job descriptions are not stored. Everything is client-side.

**Q: Can I deploy this?**  
A: Yes! See SETUP_GUIDE.md for deployment instructions.

**Q: How do I add more ATS tips?**  
A: Edit the `generateATSTips()` function in `server/analyzer.js`.

---

## 🎯 Success Indicators

Your setup is working if:
- ✅ Backend runs without errors
- ✅ Frontend loads at localhost:3000
- ✅ You can paste a job description
- ✅ Checklist generates instantly
- ✅ You see purple gradient interface
- ✅ Download button works
- ✅ Copy button works

---

## 📞 Need Help?

1. **Installation Issues** → See [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Features Questions** → See [FEATURES.md](FEATURES.md)
3. **Architecture Questions** → See [ARCHITECTURE.md](ARCHITECTURE.md)
4. **File Questions** → See [PROJECT_INDEX.md](PROJECT_INDEX.md)
5. **Quick Help** → See [QUICK_START.md](QUICK_START.md)

---

## 🎉 You're All Set!

```
Installation complete! ✅
Backend running! ✅
Frontend running! ✅
Ready to generate ATS checklists! ✅
```

**Start using the app at http://localhost:3000**

---

## 🌟 Pro Tips

1. **Use Real Job Descriptions** - Copy the full posting, not just title
2. **Try Multiple Jobs** - See how different roles have different requirements
3. **Compare Results** - Notice patterns across job postings
4. **Customize Your Resume** - Use the checklist to improve your resume
5. **Download Checklists** - Keep them for reference

---

## 📞 Support Resources

- Backend docs: `server/README.md`
- Frontend docs: `client/README.md`
- Full docs: `README.md`
- Setup help: `SETUP_GUIDE.md`
- Features: `FEATURES.md`
- Architecture: `ARCHITECTURE.md`

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Ready to Use

---

**Have fun generating ATS checklists! 🚀**
