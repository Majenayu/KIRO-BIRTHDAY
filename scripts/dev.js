#!/usr/bin/env node

/**
 * Development server launcher
 * Starts both backend and frontend servers concurrently
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting ATS Resume Checklist Generator...\n');

const serverDir = path.join(__dirname, '../server');
const clientDir = path.join(__dirname, '../client');

// Start backend
console.log('📦 Starting backend server on port 5000...');
const server = spawn('npm', ['start'], {
  cwd: serverDir,
  stdio: 'inherit',
  shell: true
});

// Give backend time to start before starting frontend
setTimeout(() => {
  console.log('\n🎨 Starting frontend server on port 3000...');
  const client = spawn('npm', ['start'], {
    cwd: clientDir,
    stdio: 'inherit',
    shell: true
  });

  client.on('error', (err) => {
    console.error('Frontend error:', err);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    console.log('\n\nShutting down servers...');
    client.kill();
    server.kill();
    process.exit(0);
  });
}, 2000);

server.on('error', (err) => {
  console.error('Backend error:', err);
  process.exit(1);
});

console.log('\n✅ Application starting...');
console.log('📍 Frontend: http://localhost:3000');
console.log('📍 Backend API: http://localhost:5000/api\n');
