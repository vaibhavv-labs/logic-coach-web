const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    } else {
      console.log('BROWSER LOG:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    console.log("Navigating to http://localhost:3005...");
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });
    
    console.log("Waiting for 2 seconds...");
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Evaluating buttons...");
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const signin = btns.find(b => b.textContent.includes('Sign In'));
      if (signin) {
        console.log("Found Sign In button, clicking...");
        signin.click();
      } else {
        const dashboard = btns.find(b => b.textContent.includes('Go to Dashboard'));
        if (dashboard) {
          console.log("Found Dashboard button, clicking...");
          dashboard.click();
        } else {
          console.log("No button found.");
        }
      }
    });

    console.log("Waiting 3 seconds for error to appear...");
    await new Promise(r => setTimeout(r, 3000));
    
  } catch (e) {
    console.error("Script error:", e);
  } finally {
    await browser.close();
  }
})();
