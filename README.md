# 🚀 HandyMate - Ready for Deployment

A React + Node.js application for connecting craftsmen with customers.

## 🗃️ Database Configuration
This app uses **PostgreSQL** (configured for Neon database) with the following structure:
- **Users table** (`uporabniki`) - stores users and craftsmen
- **Problems table** (`tezave`) - stores customer problems/requests

## 📋 Quick Deployment Steps

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial HandyMate project"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables (see below)
4. Deploy!

### 3. Environment Variables for Vercel
Add these in your Vercel project settings:
```
DATABASE_URL=your_postgres_connection_string
NODE_ENV=production
```

### 4. Set Up Database
Run the SQL from `setup-postgres-db.sql` in your PostgreSQL database to create the required tables.

## 🛠️ Local Development
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (in one terminal)
cd backend && npm start

# Start frontend (in another terminal)  
cd frontend && npm start
```

## 📁 Project Structure
```
handymateapp-main/
├── backend/           # Node.js API server
│   ├── routes/        # API routes (auth, mojstri, tezave)
│   ├── index.js       # Main server file
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables
├── frontend/          # React application
│   ├── src/           # React source code
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── vercel.json        # Vercel deployment config
└── setup-postgres-db.sql # Database schema
```

## 🔧 Features
- User registration and authentication
- Craftsmen (mojstri) directory
- Problem/task posting system
- PostgreSQL database integration
- Responsive React frontend
- RESTful API backend

## 📱 After Deployment
Your app will have these endpoints:
- **Frontend:** `https://your-app.vercel.app`
- **API Test:** `https://your-app.vercel.app/api/test`
- **Database Test:** `https://your-app.vercel.app/api/test-db`

## 🎯 Ready to Go!
This project is pre-configured and ready for immediate deployment on Vercel with a PostgreSQL database.