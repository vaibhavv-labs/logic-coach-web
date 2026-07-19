const { execSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'migrate-pii.js');

console.log("Running Migration Verification...");
try {
  execSync(`node "${scriptPath}" --verify`, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
