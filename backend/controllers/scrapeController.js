const { scrapeHackerNews } = require('../scraper/hackerNewsScraper');

const scrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({
      message: 'Scraping completed successfully',
      storiesScraped: stories.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error scraping Hacker News' });
  }
};

module.exports = { scrape };
