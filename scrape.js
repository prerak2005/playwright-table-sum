const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [3,4,5,6,7,8,9,10,11,12];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(td => parseInt(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${sum}`);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();
})();
