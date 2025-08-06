#!/bin/bash

echo "🚀 Simple HandyMate deployment (no sudo required)..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Setup project directory
PROJECT_DIR="$HOME/handymate-app"
print_status "Setting up project in: $PROJECT_DIR"

if [ -d "$PROJECT_DIR" ]; then
    print_status "Updating existing project..."
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

# Install frontend dependencies and build
print_status "Installing frontend dependencies and building..."
cd ../frontend
npm install
npm run build

print_status "✅ Build complete!"
print_status "Frontend built in: $PROJECT_DIR/frontend/build"

# Create simple start script
print_status "Creating start script..."
cd "$PROJECT_DIR"
cat > start-backend.sh << 'EOF'
#!/bin/bash
cd ~/handymate-app/backend
echo "Starting HandyMate backend on port 5000..."
echo "Access at: http://88.200.63.148:5000/api/test"
node index.js
EOF

chmod +x start-backend.sh

# Create simple HTTP server for frontend
cat > start-frontend.sh << 'EOF'
#!/bin/bash
cd ~/handymate-app/frontend/build
echo "Starting HandyMate frontend on port 3000..."
echo "Access at: http://88.200.63.148:3000"
python3 -m http.server 3000
EOF

chmod +x start-frontend.sh

# Create combined start script
cat > start-app.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting HandyMate application..."

# Start backend in background
cd ~/handymate-app/backend
nohup node index.js > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Start frontend
cd ~/handymate-app/frontend/build
echo "Frontend serving on port 3000..."
echo "Backend API on port 5000..."
echo ""
echo "🌐 Access your app at: http://88.200.63.148:3000"
echo "🔧 API available at: http://88.200.63.148:5000/api/test"
echo ""
echo "Press Ctrl+C to stop"
python3 -m http.server 3000
EOF

chmod +x start-app.sh

print_status "✅ Deployment complete!"
echo ""
print_warning "🚀 To start your application:"
echo "   ./start-app.sh"
echo ""
print_warning "🔧 To start backend only:"
echo "   ./start-backend.sh"
echo ""
print_warning "🌐 To start frontend only:"  
echo "   ./start-frontend.sh"
echo ""
print_status "📱 Your app will be available at:"
print_status "   Frontend: http://88.200.63.148:3000"
print_status "   API: http://88.200.63.148:5000/api/test"