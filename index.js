
// This file serves as the entry point for the application
// It will start both the frontend and backend servers
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

// Check if package.json exists
if (!fs.existsSync('./package.json') && !isDevServer) {
  console.error(`${colors.error}Error: package.json not found in the root directory${colors.reset}`);
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

// Use start.js to start both servers
console.log(`${colors.warning}🔧 Starting servers with start.js...${colors.reset}`);
const startProcess = spawn('node', ['start.js'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(`${colors.warning}🛑 Shutting down servers...${colors.reset}`);
  startProcess.kill();
  process.exit(0);
});
