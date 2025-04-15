
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

// Check if package.json exists
if (!fs.existsSync('./package.json')) {
  console.error(`${colors.error}Error: package.json not found in the root directory${colors.reset}`);
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
