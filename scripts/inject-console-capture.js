const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), '.next/server/app');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log('Build output directory not found. Skipping console capture injection.');
    return;
  }
  
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(outDir);
console.log('Console capture script injection complete!');