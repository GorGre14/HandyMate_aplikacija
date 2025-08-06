#!/bin/bash

echo "🚀 Starting HandyMate deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if MySQL is installed
print_status "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    print_warning "MySQL client not found. You may need to install it manually."
fi

# Clone or update repository
print_status "Setting up project directory..."
PROJECT_DIR="$HOME/handymate-app"

if [ -d "$PROJECT_DIR" ]; then
    print_status "Project directory exists, pulling latest changes..."
    cd "$PROJECT_DIR"
    git pull origin main
else
    print_status "Cloning repository..."
    git clone https://github.com/GorGre14/HandyMate_aplikacija.git "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install

# Create .env file for backend
print_status "Creating backend environment file..."
cat > .env << EOF
DB_HOST=88.200.63.148
DB_USER=codeigniter
DB_PASS=codeigniter2019
DB_DATABASE=SISIII2025_89211289
DB_PORT=3306
NODE_ENV=production
PORT=5000
EOF

print_warning "Please update the database credentials in backend/.env file:"
print_warning "Edit: nano backend/.env"
print_warning "Then set your actual database credentials"

# Install frontend dependencies and build
print_status "Installing frontend dependencies and building..."
cd ../frontend
npm install
npm run build

# Create a simple database setup script
print_status "Creating database setup script..."
cd ..
cat > setup_database.sql << EOF
-- HandyMate Database Setup
CREATE DATABASE IF NOT EXISTS handymate;
USE handymate;

-- Users table
CREATE TABLE IF NOT EXISTS uporabniki (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(100) NOT NULL,
    priimek VARCHAR(100) NOT NULL,
    gsm VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    geslo VARCHAR(255) NOT NULL,
    tip_racuna ENUM('uporabnik', 'mojster') NOT NULL,
    strokovnosti JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problems table
CREATE TABLE IF NOT EXISTS tezave (
    id INT AUTO_INCREMENT PRIMARY KEY,
    opis TEXT NOT NULL,
    kategorija VARCHAR(100) NOT NULL,
    cena DECIMAL(10,2) NOT NULL,
    uporabnik_id INT,
    datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uporabnik_id) REFERENCES uporabniki(id)
);

-- Insert sample data
INSERT IGNORE INTO uporabniki (ime, priimek, email, geslo, tip_racuna, strokovnosti) VALUES
('Test', 'User', 'test@test.com', 'password', 'uporabnik', NULL),
('Test', 'Mojster', 'mojster@test.com', 'password', 'mojster', '["Vodovodar", "Električar"]');

EOF

print_status "Database setup script created: setup_database.sql"

# Create PM2 ecosystem file for process management
print_status "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'handymate-backend',
    script: './backend/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
EOF

# Install PM2 globally if not exists
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2 process manager..."
    npm install -g pm2
fi

# Create nginx configuration
print_status "Creating nginx configuration..."
sudo tee /etc/nginx/sites-available/handymate << EOF
server {
    listen 80;
    server_name localhost;

    # Serve React app
    location / {
        root $PROJECT_DIR/frontend/build;
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/handymate /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

print_status "✅ Deployment preparation complete!"
echo ""
print_warning "🔧 Manual steps required:"
echo "1. Update database credentials in backend/.env"
echo "2. Run: mysql -u root -p < setup_database.sql"
echo "3. Start backend: pm2 start ecosystem.config.js"
echo "4. Check status: pm2 status"
echo ""
print_status "🌐 Your app will be available at: http://your-server-ip/"
print_status "🔧 API will be available at: http://your-server-ip/api/test"