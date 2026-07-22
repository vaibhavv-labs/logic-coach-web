const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  console.log('Waiting for splash screen...');
  await page.waitForSelector('.start-btn', { timeout: 15000 }).catch(() => console.log('Start btn timeout'));

  console.log('Clicking Start Learning for Free...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.start-btn, .start-btn-small'));
    const startBtn = btns.find(b => b.textContent.includes('Start') || b.textContent.includes('Sign In'));
    if (startBtn) startBtn.click();
  });

  await new Promise(r => setTimeout(r, 2000));

  console.log('Clicking Continue as Guest (or fallback signin)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const guest = btns.find(b => b.textContent.includes('Guest'));
    if (guest) guest.click();
  });

  console.log('Waiting for Dashboard...');
  await new Promise(r => setTimeout(r, 3000));

  // Take baseline screenshot
  console.log('Taking screenshot of Dashboard...');
  await page.screenshot({ path: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\dashboard_ok.png' });

  // 1. Click "Practice" sidebar button
  console.log('Clicking "Practice"...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.action-btn'));
    const practice = btns.find(b => b.textContent.includes('Practice'));
    if (practice) practice.click();
  });

  await new Promise(r => setTimeout(r, 1000));
  console.log('Taking screenshot of Practice view bug...');
  await page.screenshot({ path: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\bug_practice.png' });

  // 2. Go back to Learn
  console.log('Clicking "Learn"...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.action-btn'));
    const learn = btns.find(b => b.textContent.includes('Learn'));
    if (learn) learn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Click the first "Continue" button on the cards
  console.log('Clicking "Continue" on DSA Path...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.start-btn-small'));
    const cont = btns.find(b => b.textContent.includes('Continue'));
    if (cont) cont.click();
  });

  await new Promise(r => setTimeout(r, 1000));
  console.log('Taking screenshot of Continue routing bug...');
  await page.screenshot({ path: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\bug_dsa_continue.png' });

  console.log('Closing browser...');
  await browser.close();
  console.log('Test complete!');
})();
