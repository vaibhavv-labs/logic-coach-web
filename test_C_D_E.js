const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Starting Full Audit: Sections C, D, E');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => errors.push(err.toString()));

  const report = {};

  // Mock API requests for AI
  await page.setRequestInterception(true);
  page.on('request', req => {
    const url = req.url();
    if (url.includes('/api/ai/chat')) {
      // If request has "understand" or "next" we return understood: true
      const postData = req.postData();
      if (postData && postData.includes('understand')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ reply: "Great! Let's move on.", understood: true })
        });
      } else {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ reply: "Try to think about it differently.", understood: false })
        });
      }
    } else if (url.includes('/api/ai/logic')) {
      req.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ reply: "This is a logic hint.", isCorrect: false })
      });
    } else {
      req.continue();
    }
  });

  const delay = ms => new Promise(r => setTimeout(r, ms));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(2000);

  // Login as guest
  await page.evaluate(() => {
    const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start') || b.textContent.includes('Sign In'));
    if (startBtn) startBtn.click();
  });
  await delay(1000);
  await page.evaluate(() => {
    const guest = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Guest'));
    if (guest) guest.click();
  });
  await delay(2000);

  // ==========================================
  // SECTION C: DSA Path
  // ==========================================
  console.log('Testing Section C: DSA Path');
  report.DSA = {};
  
  // Go to DSA Path
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Learn');
    if (btn) btn.click();
  });
  await delay(1000);
  await page.evaluate(() => {
    const continues = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Continue'));
    if (continues.length > 0) continues[0].click(); // DSA
  });
  await delay(1000);

  // Click Arrays
  await page.evaluate(() => {
    const topic = Array.from(document.querySelectorAll('.graph-node')).find(n => n.textContent.includes('Arrays'));
    if (topic) topic.click();
  });
  await delay(1000);

  // Check visualizer rendering
  const hasVisualizer = await page.evaluate(() => !!document.querySelector('.visual-content'));
  report.DSA.visualizer = hasVisualizer ? '✅ Working' : '❌ Broken';

  // Test Chat - Quick Actions (should trigger failed attempt)
  await page.evaluate(() => {
    const action = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("I'm stuck"));
    if (action) action.click();
  });
  await delay(2000);

  const hasCoachMessage = await page.evaluate(() => {
    const msgs = Array.from(document.querySelectorAll('.message.coach'));
    return msgs.length > 1; // 1 initial + 1 from our quick action
  });
  report.DSA.chatQuickActions = hasCoachMessage ? '✅ Working' : '❌ Broken';

  // Test Skip Step (trigger 2 more fails)
  await page.evaluate(() => {
    const action = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes("Check my answer"));
    if (action) { action.click(); action.click(); }
  });
  await delay(3000);

  // Skip button should appear now
  const skipWorked = await page.evaluate(() => {
    const skipBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip'));
    if (skipBtn) {
      skipBtn.click();
      return true;
    }
    return false;
  });
  await delay(1000);
  report.DSA.skipStep = skipWorked ? '✅ Working' : '❌ Broken (Skip button not found)';

  // Test Understood Progression
  await page.evaluate(() => {
    const input = document.querySelector('.chat-input');
    if (input) {
      input.value = "I understand now";
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.evaluate(() => {
    const send = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('➤'));
    if (send) send.click();
  });
  // Wait for 3 seconds for the celebration and step transition
  await delay(3500);
  
  // Test Practice Compiler
  const compilerOpened = await page.evaluate(() => {
    const practiceBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Practice Code'));
    if (practiceBtn) practiceBtn.click();
    return !!document.querySelector('.practice-compiler-overlay') || !!document.querySelector('.monaco-editor');
  });
  report.DSA.practiceCompiler = compilerOpened ? '✅ Working' : '❌ Broken';
  // close compiler
  await page.evaluate(() => {
    const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Close Compiler') || b.textContent === '✕');
    if (closeBtn) closeBtn.click();
  });
  await delay(500);

  // ==========================================
  // SECTION D: Logic Problems
  // ==========================================
  console.log('Testing Section D: Logic Problems');
  report.Logic = {};
  
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Practice');
    if (btn) btn.click();
  });
  await delay(1000);

  const logicListLoaded = await page.evaluate(() => document.querySelectorAll('.logic-problem-card').length > 0);
  report.Logic.listLoaded = logicListLoaded ? '✅ Working' : '❌ Broken';

  if (logicListLoaded) {
    await page.evaluate(() => {
      document.querySelectorAll('.logic-problem-card')[0].click();
    });
    await delay(1000);
    const logicChatLoaded = await page.evaluate(() => !!document.querySelector('.logic-chat-container'));
    report.Logic.chatLoaded = logicChatLoaded ? '✅ Working' : '❌ Broken';
  }

  // ==========================================
  // SECTION E: Language Mastery
  // ==========================================
  console.log('Testing Section E: Language Mastery');
  report.Language = {};

  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Learn');
    if (btn) btn.click();
  });
  await delay(1000);
  await page.evaluate(() => {
    const continues = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Practice') && b.textContent.includes('Language'));
    // Wait, the button for Language is often "Practice Language"
    // Let's just find the card that says Language Mastery and click its button
    const cards = Array.from(document.querySelectorAll('.pro-timeline-card'));
    const langCard = cards.find(c => c.textContent.includes('Language'));
    if (langCard) {
      const btn = langCard.querySelector('button');
      if (btn) btn.click();
    }
  });
  await delay(1000);

  const langMapLoaded = await page.evaluate(() => document.querySelectorAll('.graph-node').length > 0);
  report.Language.mapLoaded = langMapLoaded ? '✅ Working' : '❌ Broken';

  fs.writeFileSync('audit_CDE.json', JSON.stringify(report, null, 2));
  console.log('Done!');
  await browser.close();
})();
