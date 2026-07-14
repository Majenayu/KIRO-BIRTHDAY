/**
 * src/index.js
 * ------------
 * Sample source file for the AutoDoc-Hook project.
 *
 * This file exists so the hook has something to watch immediately.
 * Modify and save this file to trigger the Kiro Hook and see
 * README.md update automatically.
 */

// --- Simple greeter function ---
function greet(name) {
  return `Hello, ${name}! Welcome to AutoDoc-Hook.`;
}

// --- Add two numbers ---
function add(a, b) {
  return a + b;
}

// --- Format a date as YYYY-MM-DD ---
function formatDate(date) {
  const d = new Date(date);
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day   = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;

  hellow 
}

// --- Multiply two numbers ---
function multiply(a, b) {
  return a * b;
}

// --- Entry point ---
console.log(greet('Developer'));
console.log('2 + 3 =', add(2, 3));
console.log('3 x 4 =', multiply(3, 4));
console.log('Today:', formatDate(new Date()));
