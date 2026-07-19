const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let initialJsBytes = 0;
  let initialJsCount = 0;
  let lazyJsBytes = 0;
  let lazyJsCount = 0;
  
  let measureLazy = false;

  page.on('response', async (response) => {
    const url = response.url();
    if (url.endsWith('.js') && response.status() === 200) {
      try {
        const buffer = await response.buffer();
        if (measureLazy) {
          lazyJsBytes += buffer.length;
          lazyJsCount++;
          console.log(`[Lazy] Loaded chunk: ${url.split('/').pop()} (${(buffer.length / 1024).toFixed(2)} KB)`);
        } else {
          initialJsBytes += buffer.length;
          initialJsCount++;
        }
      } catch (err) {
        // Ignore
      }
    }
  });

  console.log("Navigating to http://localhost:3005 (Home)...");
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });
  
  console.log(`\n--- Initial Page Load (Home) ---`);
  console.log(`Total JS Files: ${initialJsCount}`);
  console.log(`Total JS Size: ${(initialJsBytes / 1024).toFixed(2)} KB\n`);

  console.log("Activating client-side navigation to /practice/arrays to load DSA Teaching Phase, Visualizer, and Code Editor...");
  measureLazy = true;
  
  // Trigger Next.js client-side navigation
  await page.evaluate(() => {
    // Look for Next.js router in window or click a link
    // The easiest way to force a client-side nav if next/router is not exposed 
    // is to create a link and click it.
    const link = document.createElement('a');
    link.href = '/practice/arrays';
    document.body.appendChild(link);
    link.click();
  });

  // Wait for the route to change and chunks to load
  await new Promise(r => setTimeout(r, 4000));

  console.log(`\n--- Lazy Load (Navigating to /practice/arrays) ---`);
  console.log(`New JS Chunks Loaded: ${lazyJsCount}`);
  console.log(`Total Lazy JS Size: ${(lazyJsBytes / 1024).toFixed(2)} KB\n`);

  await browser.close();
})();
