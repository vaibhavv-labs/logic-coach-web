const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser for Part 3 tests...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('dialog', async dialog => {
    if (dialog.type() === 'confirm') await dialog.accept();
    else await dialog.dismiss();
  });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.setViewport({ width: 1280, height: 800 });

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

  // Click Practice
  await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('button'));
    const practiceNav = navs.find(n => n.textContent.includes('Practice'));
    if (practiceNav) practiceNav.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Verify generic logic problems view loads (click first problem)
  console.log('Clicking first Logic Problem...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bento-card'));
    if (cards.length > 0) cards[0].click();
  });
  await new Promise(r => setTimeout(r, 2000));

  // Verify it loaded PracticeProblemPane
  const hasEditor = await page.evaluate(() => !!document.querySelector('.cm-editor'));
  if (hasEditor) {
    console.log('Taking screenshot of Logic Problem view...');
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part3_problem.png` });
  } else {
    console.error('FAILED: Editor did not load for standard logic problem.');
  }

  // Go back to Practice Dashboard
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const backBtn = btns.find(b => b.title === 'Back to Dashboard' || b.textContent.includes('←'));
    if (backBtn) backBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Ensure we are back on practice
  await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('button'));
    const practiceNav = navs.find(n => n.textContent.includes('Practice'));
    if (practiceNav) practiceNav.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Test Custom Problem submission
  console.log('Testing Custom Problem submission...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bento-card'));
    const customCard = cards.find(c => c.textContent.includes('specific problem'));
    if (customCard) customCard.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Fill modal
  await page.evaluate(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = "Find the missing number in an array containing 1 to n.";
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find(b => b.textContent.includes('Start Solving'));
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  // Verify custom problem loaded
  const hasCustomEditor = await page.evaluate(() => !!document.querySelector('.cm-editor'));
  if (hasCustomEditor) {
    console.log('Taking screenshot of Custom Problem view...');
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\part3_custom.png` });
  } else {
    console.error('FAILED: Editor did not load for custom problem.');
  }

  await browser.close();
  console.log('Done!');
})();
