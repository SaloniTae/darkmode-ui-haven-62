
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  frontend: '\x1b[36m', // Cyan
  backend: '\x1b[32m',  // Green
  error: '\x1b[31m',    // Red
  warning: '\x1b[33m',  // Yellow
  reset: '\x1b[0m'      // Reset
};

console.log(`${colors.warning}🚀 Starting MERN Chat Application...${colors.reset}`);

// Check if we're in the dev-server environment
const isDevServer = process.cwd() === '/dev-server';

// Skip package.json check in dev-server environment
if (!isDevServer) {
  // Check for package.json in root
  const rootPackageJsonPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(rootPackageJsonPath)) {
    console.error(`${colors.error}Error: Root package.json not found at ${rootPackageJsonPath}${colors.reset}`);
    console.error(`${colors.warning}Please create a package.json file in the root directory with the following content:${colors.reset}`);
    console.error(`
{
  "name": "mern-chat-app",
  "version": "1.0.0",
  "description": "MERN Stack Chat Application",
  "main": "index.js",
  "scripts": {
    "start": "node start.js",
    "dev": "vite",
    "install-all": "npm install && cd public && npm install && cd ../public/server && npm install"
  },
  "dependencies": {
    "child_process": "^1.0.2",
    "fs": "0.0.1-security",
    "path": "^0.12.7",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.10"
  }
}
  `);
    process.exit(1);
  }
}

// Start the backend server
const backendPath = path.join(__dirname, 'public', 'server');
const backendExists = fs.existsSync(backendPath);

if (!backendExists) {
  console.error(`${colors.error}Error: Backend directory not found at ${backendPath}${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.warning}🔧 Starting backend server...${colors.reset}`);
const backend = spawn('node', ['index.js'], { 
  cwd: backendPath,
  shell: true,
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  console.log(`${colors.backend}[Backend] ${data.toString().trim()}${colors.reset}`);
});

backend.stderr.on('data', (data) => {
  console.error(`${colors.error}[Backend Error] ${data.toString().trim()}${colors.reset}`);
});

// Start the frontend server after a delay to ensure backend is up
console.log(`${colors.warning}🔧 Starting frontend server...${colors.reset}`);
setTimeout(() => {
  const frontendPath = path.join(__dirname, 'public');
  const frontendExists = fs.existsSync(frontendPath);

  if (!frontendExists) {
    console.error(`${colors.error}Error: Frontend directory not found at ${frontendPath}${colors.reset}`);
    process.exit(1);
  }

  const frontend = spawn('npm', ['start'], { 
    cwd: frontendPath,
    shell: true,
    stdio: 'pipe'
  });

  frontend.stdout.on('data', (data) => {
    console.log(`${colors.frontend}[Frontend] ${data.toString().trim()}${colors.reset}`);
  });

  frontend.stderr.on('data', (data) => {
    console.error(`${colors.error}[Frontend Error] ${data.toString().trim()}${colors.reset}`);
  });
}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log(`${colors.warning}🛑 Shutting down servers...${colors.reset}`);
  backend.kill();
  process.exit();
});
