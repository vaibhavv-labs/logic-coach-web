const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser for Arrays test...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  page.on('dialog', async dialog => {
    if (dialog.type() === 'confirm') await dialog.accept();
    else await dialog.dismiss();
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Login as guest
  await new Promise(r => setTimeout(r, 4000));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent.includes('Start') || b.textContent.includes('Sign In'));
    if (startBtn) startBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const guest = btns.find(b => b.textContent.includes('Guest'));
    if (guest) guest.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  // Click Learn
  await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('button'));
    const learnNav = navs.find(n => n.textContent.includes('Learn'));
    if (learnNav) learnNav.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Click Continue on DSA Path
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const mapBtn = btns.find(b => b.textContent.includes('Continue'));
    if (mapBtn) mapBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Taking screenshot of Level 0...');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part2_level0.png` });

  // Skip through Level 0
  console.log('Skipping Level 0...');
  for (let steps = 0; steps < 10; steps++) {
    const isCompleted = await page.evaluate(() => {
      if (document.body.innerText.includes('Practice Mode Unlocked')) return true;
      const btns = Array.from(document.querySelectorAll('button'));
      const skipBtn = btns.find(b => b.textContent.includes('Skip Step'));
      if (skipBtn) {
        skipBtn.click();
        return false;
      }
      return false;
    });
    if (isCompleted) break;
    await new Promise(r => setTimeout(r, 800));
  }

  // Click Start Level 1 Practice
  console.log('Starting Level 1...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const lvl1 = btns.find(b => b.textContent.includes('Start Level 1'));
    if (lvl1) lvl1.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Taking screenshot of Level 1...');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part2_level1.png` });

  await browser.close();
  console.log('Done!');
})();
