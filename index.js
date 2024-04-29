// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const axios = require('axios');
const { chromium } = require("playwright");
const fs = require("fs");
const AI_key = process.env.edenAI_key;

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  await page.waitForSelector("#hnmain");
  
  // Const to call top 10 articles from page defined in row 12
  const topArticles = await page.$$eval('.titleline', async (rows) => {
    // defined array which will be returned at end of function
    const articles = [];
    // for loop to evaluate the page and extract URL and titles of articles 1-10
    for (let i = 0; i < 10; i++) {
      const row = rows[i];
      const titleElement = row.querySelector(".titleline a");
      const url = titleElement.href;
      const title = titleElement.innerText.trim();
      // section to call on eden AI to summarise article
      try {
        const response = await axios.post("https://api.edenai.run/v2/text/summarize", {
          output_sentences: 1,
          providers: "openai",
          text: url,
          language: "en",
          fallback_providers: "",
        }, {
          headers: {
            authorization: AI_key,
          },
        });
        const summary = response.data.summary;
    
        // push extracted title, url, and summary to array
        articles.push({title, url, summary});
      } catch (error) {
        console.error("Error summarizing article:", error);
      }
    }
    return articles;  
  });

  // save data to CSV file
  const csvData = topArticles.map(article => `${article.title}, ${article.url}, ${article.summary}`).join("\n");
  fs.writeFileSync("Hacker_news_Top_10_TEST.csv", csvData);

  // Add message confirming outcome
  console.log("Top 10 articles have been saved to Hacker_news_Top_10_TEST.csv");

  // closing Browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
