const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser for Part 2 tests...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  // Auto-accept window.confirm for the Skip button
  page.on('dialog', async dialog => {
    if (dialog.type() === 'confirm') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Login as guest
  console.log('Waiting for splash screen...');
  await new Promise(r => setTimeout(r, 4000));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.start-btn, .start-btn-small'));
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

  console.log('--- Starting Level-by-Level Audit ---');
  let report = [];

  // Get all topics
  const topicsCount = await page.evaluate(() => {
    // We need to be on the DSA Path selection screen first.
    // Dashboard is the default. Let's click 'DSA Path' to go there.
    return 10; // We will handle navigation inside the loop
  });

  // Since we don't know the exact count, we will keep going until we can't find the nth topic card
  for (let i = 0; i < 15; i++) {
    // 1. Go to DSA Selection Screen
    await page.evaluate(() => {
      // Find the Learn navigation item first
      const navs = Array.from(document.querySelectorAll('button'));
      const learnNav = navs.find(n => n.textContent.includes('Learn'));
      if (learnNav) learnNav.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\debug_learn.png` });
    
    await page.evaluate(() => {
      // Then find the map button on the Learn dashboard
      const btns = Array.from(document.querySelectorAll('button'));
      const mapBtn = btns.find(b => b.textContent.includes('🗺️') || b.title === 'View full roadmap');
      if (mapBtn) mapBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\debug_map.png` });

    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    const fs = require('fs');
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\debug_dom.html', bodyHTML);
    console.log('DOM dumped.');
    process.exit(0);

    // Wait for the topic cards to render
    const topicExists = await page.evaluate((idx) => {
      const cards = document.querySelectorAll('.pro-timeline-card');
      if (cards.length > idx) {
        cards[idx].click();
        // The title is in an h3 inside pro-timeline-card... wait, is it?
        // Let's check DSAPath.js
        const h3 = cards[idx].querySelector('h3');
        return { exists: true, title: h3 ? h3.textContent : `Topic ${idx}` };
      }
      return { exists: false };
    }, i);

    if (!topicExists.exists) {
      break; // No more topics
    }

    let topicName = topicExists.title;
    console.log(`\nTesting Topic ${i+1}: ${topicName}`);
    let topicResult = { topic: topicName, teaching: false, practice: false, error: null };

    try {
      // 2. Verify Level 0 Teaching Phase renders
      await new Promise(r => setTimeout(r, 1500));
      const hasChat = await page.evaluate(() => !!document.querySelector('.chat-messages'));
      if (!hasChat) {
        throw new Error("Teaching Phase (chat) did not render.");
      }
      topicResult.teaching = true;

      // 3. Skip through the teaching phase
      console.log(`  Skipping through teaching phase...`);
      let isCompleted = false;
      for (let steps = 0; steps < 15; steps++) {
        isCompleted = await page.evaluate(() => {
          // Check if completion screen (Practice Mode header) is visible
          if (document.body.innerText.includes('Practice Mode')) return true;
          
          // Find and click skip button
          const btns = Array.from(document.querySelectorAll('button'));
          const skipBtn = btns.find(b => b.textContent.includes('Skip Step'));
          if (skipBtn) {
            skipBtn.click();
            return false;
          }
          return false;
        });
        
        if (isCompleted) break;
        await new Promise(r => setTimeout(r, 500));
      }

      if (!isCompleted) {
        throw new Error("Could not complete teaching phase (Skip button not found or stuck).");
      }

      // 4. Verify Level 1 Unlocked & Renders Editor
      console.log(`  Clicking Level 1 Practice Mode...`);
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.start-btn-small'));
        const level1Btn = btns.find(b => b.textContent.includes('Level 1'));
        if (level1Btn) level1Btn.click();
      });

      await new Promise(r => setTimeout(r, 2000));

      const hasEditor = await page.evaluate(() => !!document.querySelector('.cm-editor'));
      if (!hasEditor) {
        throw new Error("Level 1 Practice Mode did not load the CodeMirror editor.");
      }
      
      topicResult.practice = true;
      console.log(`  Topic ${topicName} Passed ✅`);

      // Optionally take a screenshot of the first and last to prove it works
      if (i === 0 || i === 9) {
        await page.screenshot({ path: `C:\\Users\\Admin\\.gemini\\antigravity\\brain\\141289b7-09ad-45d2-b10d-61d5298870e3\\.user_uploaded\\audit_topic_${i}.png` });
      }

    } catch (e) {
      console.error(`  Topic ${topicName} Failed ❌: ${e.message}`);
      topicResult.error = e.message;
    }
    
    // Go back to the dashboard/map to reset activeDsaTopic
    console.log(`  Going back to Map...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const backBtn = btns.find(b => b.title === 'Back to Dashboard' || b.textContent.includes('←'));
      if (backBtn) backBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    report.push(topicResult);
  }

  console.log('\n--- Final Audit Report ---');
  report.forEach(r => {
    console.log(`${r.topic}: Teaching=${r.teaching ? '✅' : '❌'} Practice=${r.practice ? '✅' : '❌'}`);
  });

  await browser.close();
})();
