# 🚀 HandyMate School Server Deployment Instructions

## Step 1: Connect to School Server
```bash
ssh 89211289@studenti.famnit.upr.si
```
Enter your password: `hsc23`

## Step 2: Run Deployment Script
```bash
# Download and run deployment script
curl -sSL https://raw.githubusercontent.com/GorGre14/HandyMate_aplikacija/main/deploy.sh | bash
```

**OR manually:**
```bash
# Clone repository
git clone https://github.com/GorGre14/HandyMate_aplikacija.git ~/handymate-app
cd ~/handymate-app

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

## Step 3: Configure Database
```bash
cd ~/handymate-app

# Edit database credentials
nano backend/.env
```

**Update these values in .env file:**
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_DATABASE=handymate
DB_PORT=3306
```

## Step 4: Setup Database
```bash
# Create database and tables
mysql -u root -p < setup_database.sql
```

## Step 5: Start the Application
```bash
# Start backend server with PM2
pm2 start ecosystem.config.js

# Check if it's running
pm2 status
pm2 logs handymate-backend
```

## Step 6: Verify Installation
```bash
# Test backend API
curl http://localhost:5000/api/test

# Test database connection  
curl http://localhost:5000/api/test-db
```

## Step 7: Access Your App
- **Frontend:** `http://your-server-ip/`
- **API:** `http://your-server-ip/api/test`

## 🔧 Troubleshooting

### If Node.js is not installed:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### If MySQL is not installed:
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### If nginx is not installed:
```bash
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Check logs:
```bash
# Backend logs
pm2 logs handymate-backend

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Restart services:
```bash
# Restart backend
pm2 restart handymate-backend

# Restart nginx
sudo systemctl restart nginx
```

## 📝 Notes
- The app will automatically start on server reboot (PM2 handles this)
- Frontend is served by nginx
- Backend API runs on port 5000
- All files are in `~/handymate-app/`

## 🆘 If Something Goes Wrong
1. Check PM2 status: `pm2 status`
2. Check backend logs: `pm2 logs handymate-backend`
3. Check nginx: `sudo nginx -t`
4. Test database: `mysql -u root -p -e "SHOW DATABASES;"`