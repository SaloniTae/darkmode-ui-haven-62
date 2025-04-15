
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
const backendExists = fs.existsSync(backendPath);

if (!backendExists) {
  console.error(`${colors.error}Error: Backend directory not found at ${backendPath}${colors.reset}`);
  process.exit(1);
}

console.log('\x1b[33m%s\x1b[0m', '🔧 Starting backend server...');
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
console.log('\x1b[33m%s\x1b[0m', '🔧 Starting frontend server...');
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
  console.log('\x1b[33m%s\x1b[0m', '🛑 Shutting down servers...');
  backend.kill();
  process.exit();
});
