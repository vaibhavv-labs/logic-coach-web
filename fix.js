const fs = require('fs'); 
let code = fs.readFileSync('app/page.js', 'utf8'); 
code = code.replace(/\\\`/g, '\`'); 
code = code.replace(/\\\$\{/g, '${'); 
fs.writeFileSync('app/page.js', code);
