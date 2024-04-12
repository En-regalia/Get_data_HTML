// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require("FS");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  const topArticles = await page.$$eval(".itemlist tbody tr", (rows) => {
    const articles = []
    for (let i = 0; i < 10; i++) {
}

(async () => {
  await saveHackerNewsArticles();
})();
