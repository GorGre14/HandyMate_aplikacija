# 🚀 Complete HandyMate Deployment Guide for University Server

## Prerequisites
- University account credentials
- SSH access to `88.200.63.148`
- Database access to `SISIII2025_89211289`

## Step 1: Connect to University Server
```bash
ssh 89211289@88.200.63.148
# Enter password: hsc23
```

## Step 2: Deploy the Application
```bash
# Run the simple deployment script
curl -sSL https://raw.githubusercontent.com/GorGre14/HandyMate_aplikacija/main/simple-deploy.sh | bash
```

## Step 3: Fix Web Permissions
```bash
# Set correct permissions for web access
chmod 755 ~/
chmod 755 ~/public_html
chmod -R 644 ~/public_html/*
chmod -R 755 ~/public_html/*/

# Copy frontend to web directory
cp -r ~/handymate-app/frontend/build/* ~/public_html/

# Create a simple test file
echo '<h1>HandyMate App - Student 89211289</h1><p>App deployed successfully!</p>' > ~/public_html/test.html
```

## Step 4: Start Backend Server
```bash
cd ~/handymate-app

# Start backend on a random port to avoid conflicts
PORT=8429 nohup node backend/index.js > backend.log 2>&1 &

# Check if it's running
ps aux | grep node
```

## Step 5: Access the Application

### Frontend (React App):
Try these URLs in order until one works:
1. `http://88.200.63.148/~89211289/`
2. `http://88.200.63.148/students/89211289/`  
3. `http://88.200.63.148/users/89211289/`
4. `http://studenti.famnit.upr.si/~89211289/`

### Backend API:
- Test API: `http://88.200.63.148:8429/api/test`
- Database test: `http://88.200.63.148:8429/api/test-db`

### Test Page:
- Simple test: `http://88.200.63.148/~89211289/test.html`

## Step 6: Database Configuration
The app is pre-configured with these database settings:
- **Host:** 88.200.63.148
- **Database:** SISIII2025_89211289
- **User:** codeigniter
- **Password:** codeigniter2019

## Step 7: App Features
Once deployed, you can:
1. **Register** new users (mojster/uporabnik)
2. **Login** with existing credentials
3. **View mojstri** (craftsmen) list
4. **Add tezave** (problems/tasks)
5. **Browse tezave** and see details

## Troubleshooting

### If frontend shows 403 Forbidden:
```bash
chmod 755 ~/
chmod -R 755 ~/public_html/
find ~/public_html/ -type f -exec chmod 644 {} \;
```

### If backend won't start (port in use):
```bash
# Use a different random port
PORT=9234 nohup node backend/index.js > backend.log 2>&1 &
```

### If database connection fails:
```bash
# Check backend logs
tail -f ~/handymate-app/backend.log

# Test database connection
curl http://88.200.63.148:8429/api/test-db
```

### Check what's running:
```bash
# See running processes
ps aux | grep node

# Kill backend if needed
pkill -f "node backend/index.js"

# Restart backend
cd ~/handymate-app
PORT=8429 nohup node backend/index.js > backend.log 2>&1 &
```

## Quick Commands Summary
```bash
# Connect to server
ssh 89211289@88.200.63.148

# Deploy app
curl -sSL https://raw.githubusercontent.com/GorGre14/HandyMate_aplikacija/main/simple-deploy.sh | bash

# Set permissions
chmod 755 ~/ && chmod -R 755 ~/public_html/ && cp -r ~/handymate-app/frontend/build/* ~/public_html/

# Start backend
cd ~/handymate-app && PORT=8429 nohup node backend/index.js > backend.log 2>&1 &

# Access app
# Frontend: http://88.200.63.148/~89211289/
# API: http://88.200.63.148:8429/api/test
```

## Access URLs for Your Classmate
- **Main App:** `http://88.200.63.148/~89211289/`
- **API Test:** `http://88.200.63.148:8429/api/test`  
- **Simple Test:** `http://88.200.63.148/~89211289/test.html`

## Notes for Classmate
1. The app might take a few seconds to load initially
2. If you get API errors, the backend might need to be restarted
3. The database is shared, so be careful with test data
4. Try different URL patterns if the main one doesn't work
5. Contact the student (89211289) if the backend is down

## Database Access
- **phpMyAdmin:** `http://88.200.63.148/phpmyadmin`
- **Database:** SISIII2025_89211289
- **Login:** codeigniter / codeigniter2019