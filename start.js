
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  frontend: '\x1b[36m', // Cyan
  backend: '\x1b[32m',  // Green
  error: '\x1b[31m',    // Red
  reset: '\x1b[0m'      // Reset
};

console.log('\x1b[33m%s\x1b[0m', '🚀 Starting MERN Chat Application...');

// Start the backend server
const backendPath = path.join(__dirname, 'public', 'server');
if (!fs.existsSync(backendPath)) {
  console.error(`${colors.error}Error: Backend directory not found at ${backendPath}${colors.reset}`);
  process.exit(1);
}

console.log('\x1b[33m%s\x1b[0m', '📂 Starting backend server...');
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

// Start the frontend server
console.log('\x1b[33m%s\x1b[0m', '📂 Starting frontend server...');
const frontend = spawn('npm', ['start'], { 
  cwd: path.join(__dirname, 'public'),
  shell: true,
  stdio: 'pipe'
});

frontend.stdout.on('data', (data) => {
  console.log(`${colors.frontend}[Frontend] ${data.toString().trim()}${colors.reset}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`${colors.error}[Frontend Error] ${data.toString().trim()}${colors.reset}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\x1b[33m%s\x1b[0m', '🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});
