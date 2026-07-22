const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded';

(async () => {
  console.log('Starting Full Audit: Sections A & B');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', err => {
    errors.push(err.toString());
  });

  const getErrors = () => {
    const res = [...errors];
    errors = [];
    return res;
  };

  const delay = ms => new Promise(r => setTimeout(r, ms));

  console.log('Navigating to app...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(2000);

  // Login as guest
  console.log('Logging in as Guest...');
  await page.evaluate(() => {
    const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start') || b.textContent.includes('Sign In'));
    if (startBtn) startBtn.click();
  });
  await delay(1000);
  await page.evaluate(() => {
    const guest = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Guest'));
    if (guest) guest.click();
  });
  await delay(3000);

  const report = {};

  // ============================================
  // SECTION A: Navigation & Layout
  // ============================================
  console.log('--- SECTION A: Navigation ---');
  report.navigation = {};
  const navItems = ['Dashboard', 'Learn', 'Practice', 'Progress', 'Leaderboard', 'Profile', 'Settings', 'Feedback'];
  
  for (const nav of navItems) {
    console.log(`Testing Sidebar: ${nav}`);
    await page.evaluate((nav) => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes(nav));
      if (btn) btn.click();
    }, nav);
    await delay(1000);
    
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `nav_${nav}.png`) });
    
    const errs = getErrors();
    const isRendered = await page.evaluate(() => {
      const content = document.querySelector('.main-content');
      if (!content) return false;
      return content.innerText.length > 50 && !content.innerText.includes('Coming soon...');
    });
    
    report.navigation[nav] = {
      status: errs.length === 0 && isRendered ? '✅ Working' : (isRendered ? '🟡 Minor issue' : '❌ Broken'),
      errors: errs,
      rendered: isRendered
    };
  }

  console.log('Testing Mobile Menu...');
  await page.setViewport({ width: 375, height: 667 });
  await delay(500);
  // Click hamburger
  await page.evaluate(() => {
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) menuBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile_hamburger_open.png`) });
  
  // Close menu
  await page.evaluate(() => {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile_hamburger_closed.png`) });
  await page.setViewport({ width: 1280, height: 800 });
  await delay(500);

  report.mobileMenu = { status: getErrors().length === 0 ? '✅ Working' : '❌ Broken' };

  console.log('Testing Theme Toggle...');
  // Screens: Dashboard, Settings, Profile
  const themeScreens = ['Dashboard', 'Settings', 'Profile'];
  report.theme = {};
  for (const screen of themeScreens) {
    // Navigate
    await page.evaluate((nav) => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === nav);
      if (btn) btn.click();
    }, screen);
    await delay(1000);
    
    // Toggle
    await page.evaluate(() => {
      const themeBtn = document.querySelector('.theme-toggle');
      if (themeBtn) themeBtn.click();
    });
    await delay(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `theme_${screen}.png`) });
    const isDark = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark');
    report.theme[screen] = { status: isDark ? '✅ Working' : '❌ Broken' };
    
    // Toggle back
    await page.evaluate(() => {
      const themeBtn = document.querySelector('.theme-toggle');
      if (themeBtn) themeBtn.click();
    });
    await delay(500);
  }

  // ============================================
  // SECTION B: Learn Section
  // ============================================
  console.log('--- SECTION B: Learn Section ---');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Learn');
    if (btn) btn.click();
  });
  await delay(1500);

  report.learn = {};
  
  // Continue Buttons
  console.log('Testing Module Cards (Continue Buttons)...');
  const modules = ['DSA', 'Logic', 'Language'];
  for (let i = 0; i < 3; i++) {
    await page.evaluate((idx) => {
      const continues = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Continue') || b.textContent.includes('Practice'));
      if (continues.length > idx) continues[idx].click();
    }, i);
    await delay(1500);
    
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `learn_continue_${modules[i]}.png`) });
    const hasCards = await page.evaluate(() => document.querySelectorAll('.pro-timeline-card, .bento-card').length > 0);
    
    report.learn[`Continue_${modules[i]}`] = { status: (hasCards && getErrors().length === 0) ? '✅ Working' : '❌ Broken' };
    
    // Go back to Learn
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Learn');
      if (btn) btn.click();
    });
    await delay(1000);
  }

  // Recently Opened
  console.log('Testing Recently Opened...');
  await page.evaluate(() => {
    const recent = document.querySelector('.recent-topic-card');
    if (recent) recent.click();
  });
  await delay(1500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `learn_recent.png`) });
  report.learn.recentlyOpened = { status: getErrors().length === 0 ? '✅ Working' : '❌ Broken' };

  fs.writeFileSync('audit_AB.json', JSON.stringify(report, null, 2));
  console.log('Done!');
  await browser.close();
})();
