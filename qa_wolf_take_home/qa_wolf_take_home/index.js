// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require("fs");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  await page.waitForSelector("#hnmain");
  
  // Const to call top 10 articles from page defined in row 12
  const topArticles = await page.$$eval('.titleline', (rows) => {
    // defined array which will be returned at end of function
    const articles = [];
    // for loop to evaluate the page and extract URL and titles of articles 1-10
    for (let i = 0; i < 10; i++) {
      const row = rows[i];
      const titleElement = row.querySelector(".titleline a");
      const url = titleElement.href;
      const title = titleElement.innerText.trim();
      // push extracted title and url to array
      articles.push({title, url});
    }
    return articles;  
  });

  // save data to CSV file
  const csvData = topArticles.map(article => `${article.title}, ${article.url}`).join("\n");
  fs.writeFileSync("Hacker_news_Top_10_TEST.csv", csvData);

  //Add message confirming outcome
  console.log("Top 10 articles have been saved to Hacker_news_Top_10_TEST.csv");

  //closing Browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
