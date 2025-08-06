# 🎓 Setup Instructions for Classmate

## 📦 What You Received
A complete **HandyMate** web application ready for deployment:
- ✅ **React Frontend** - User interface
- ✅ **Node.js Backend** - API server  
- ✅ **PostgreSQL Database** - Pre-configured schema
- ✅ **Vercel Ready** - Deployment configuration included

## 🚀 Quick Deployment (5 minutes)

### Step 1: Create GitHub Repository
1. Create a new repository on GitHub
2. Copy the URL (e.g., `https://github.com/yourusername/handymate.git`)

### Step 2: Push to GitHub
```bash
cd handymateapp-main
git init
git add .
git commit -m "HandyMate project ready for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Get Database (Choose One)

**Option A: Use Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new database
4. Copy the connection string

**Option B: Use Railway**
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string

### Step 4: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your HandyMate repository
5. Add environment variable:
   ```
   DATABASE_URL=your_postgres_connection_string_here
   ```
6. Click Deploy!

### Step 5: Set Up Database Tables
1. Go to your database dashboard (Neon/Railway)
2. Open SQL editor
3. Copy and run the SQL from `setup-postgres-db.sql`

## 🎯 That's It!
Your HandyMate app will be live at: `https://your-project.vercel.app`

## 🧪 Test Your Deployment
- **Frontend:** `https://your-app.vercel.app`
- **API Test:** `https://your-app.vercel.app/api/test`
- **Database Test:** `https://your-app.vercel.app/api/test-db`

## 💡 App Features
- **User Registration** - Students can register as users or craftsmen
- **Craftsmen Directory** - Browse available craftsmen and their skills
- **Problem Posting** - Users can post problems/tasks for craftsmen
- **Responsive Design** - Works on mobile and desktop

## 🛠️ Tech Stack
- **Frontend:** React, React Router
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Hosting:** Vercel (serverless)

## 🆘 Need Help?
The app is pre-configured and should work immediately. If you have issues:
1. Check that your DATABASE_URL is correct
2. Make sure you ran the setup-postgres-db.sql
3. Check Vercel function logs for errors

**Enjoy your HandyMate app! 🎉**