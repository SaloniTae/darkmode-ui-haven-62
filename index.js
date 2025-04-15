
// This file serves as the entry point for the application
// It will start both the frontend and backend servers
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting MERN Chat Application...');
console.log('📂 Starting backend server...');

// Start the backend server
const backendProcess = spawn('node', ['index.js'], {
  cwd: path.join(__dirname, 'public', 'server'),
  stdio: 'inherit',
  shell: true
});

// Start the frontend server
console.log('📂 Starting frontend server...');
const frontendProcess = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'public'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
const handleExit = () => {
  console.log('🛑 Shutting down servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
