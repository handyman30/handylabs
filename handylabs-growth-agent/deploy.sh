#!/bin/bash

# HandyLabs Growth Agent Deployment Script
# This script sets up the autonomous improvement agent

set -e

echo "🚀 HandyLabs Growth Agent Deployment"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_status "npm version: $NPM_VERSION"
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    npm install
    print_status "Dependencies installed successfully"
}

# Setup environment file
setup_environment() {
    print_step "Setting up environment configuration..."
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_status "Created .env file from template"
        print_warning "Please edit the .env file with your credentials before running the agent"
        print_warning "Required: GITHUB_TOKEN, OPENAI_API_KEY, REPO_OWNER, REPO_NAME"
    else
        print_status ".env file already exists"
    fi
}

# Build the project
build_project() {
    print_step "Building the project..."
    npm run build
    print_status "Project built successfully"
}

# Run tests
run_tests() {
    print_step "Running tests..."
    if npm test 2>/dev/null; then
        print_status "Tests passed"
    else
        print_warning "Tests not configured or failed (this is okay for initial setup)"
    fi
}

# Create systemd service file (optional, for Linux servers)
create_systemd_service() {
    if [ "$1" = "--systemd" ]; then
        print_step "Creating systemd service..."
        
        CURRENT_DIR=$(pwd)
        USER=$(whoami)
        
        cat > handylabs-growth-agent.service << EOF
[Unit]
Description=HandyLabs Growth Agent
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$CURRENT_DIR
ExecStart=$(which node) dist/index.js start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF
        
        print_status "Systemd service file created: handylabs-growth-agent.service"
        print_status "To install: sudo cp handylabs-growth-agent.service /etc/systemd/system/"
        print_status "To enable: sudo systemctl enable handylabs-growth-agent"
        print_status "To start: sudo systemctl start handylabs-growth-agent"
    fi
}

# Create Docker files (optional)
create_docker_files() {
    if [ "$1" = "--docker" ]; then
        print_step "Creating Docker configuration..."
        
        # Dockerfile
        cat > Dockerfile << EOF
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Build the project
RUN npm run build

# Expose port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
EOF

        # Docker Compose
        cat > docker-compose.yml << EOF
version: '3.8'

services:
  handylabs-growth-agent:
    build: .
    container_name: handylabs-growth-agent
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
    depends_on:
      - redis
    
  redis:
    image: redis:7-alpine
    container_name: handylabs-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
EOF

        print_status "Docker files created: Dockerfile, docker-compose.yml"
        print_status "To run with Docker: docker-compose up -d"
    fi
}

# Main deployment function
main() {
    print_step "Starting deployment process..."
    
    # Check prerequisites
    check_node
    check_npm
    
    # Install and setup
    install_dependencies
    setup_environment
    build_project
    run_tests
    
    # Optional components
    create_systemd_service "$1"
    create_docker_files "$1"
    
    print_status "Deployment completed successfully!"
    echo
    print_step "Next steps:"
    echo "1. Edit the .env file with your credentials"
    echo "2. Run 'npm run dev interactive' to test the agent"
    echo "3. Run 'npm start' to start the scheduled agent"
    echo "4. Check the README.md for detailed usage instructions"
    echo
    print_status "Happy coding! 🤖"
}

# Help function
show_help() {
    echo "HandyLabs Growth Agent Deployment Script"
    echo
    echo "Usage: ./deploy.sh [OPTIONS]"
    echo
    echo "Options:"
    echo "  --systemd    Create systemd service file for Linux servers"
    echo "  --docker     Create Docker and docker-compose files"
    echo "  --help       Show this help message"
    echo
    echo "Examples:"
    echo "  ./deploy.sh                    # Basic deployment"
    echo "  ./deploy.sh --systemd          # Deploy with systemd service"
    echo "  ./deploy.sh --docker           # Deploy with Docker files"
}

# Parse command line arguments
case "$1" in
    --help)
        show_help
        exit 0
        ;;
    --systemd|--docker)
        main "$1"
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac