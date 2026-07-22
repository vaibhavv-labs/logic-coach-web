const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser for Part 5 tests...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  
  // Test 1: Mobile UI (Sidebar and Theme Toggle)
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 }); // Mobile view

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

  // Take screenshot of default dashboard on mobile
  console.log('Screenshot: Mobile Dashboard');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part5_mobile_dashboard.png` });

  // Open sidebar
  console.log('Opening mobile sidebar...');
  await page.evaluate(() => {
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Screenshot: Mobile Sidebar');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part5_mobile_sidebar.png` });

  // Toggle theme to dark
  console.log('Toggling theme to Dark...');
  await page.evaluate(() => {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) themeBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Close sidebar
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.sidebar-close');
    if (closeBtn) closeBtn.click();
    else {
      // Fallback click outside or just keep it open
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Screenshot: Dark Mode Dashboard');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part5_dark_mode.png` });

  // Test 2: i18n Hindi Translation in DSATeachingPhase
  // Go to Learn, then DSATeachingPhase
  console.log('Navigating to DSA Teaching Phase for i18n test...');
  await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('button'));
    const learnNav = navs.find(n => n.textContent.includes('Learn'));
    if (learnNav) learnNav.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const mapBtn = btns.find(b => b.textContent.includes('Continue'));
    if (mapBtn) mapBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  // Change language to Hindi
  console.log('Changing language to Hindi...');
  await page.evaluate(() => {
    const select = document.querySelector('.lang-select');
    if (select) {
      select.value = 'Hindi';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Screenshot: Hindi Language');
  await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part5_hindi.png` });

  await browser.close();
  console.log('Done!');
})();
