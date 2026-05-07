const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
  try {
    console.log('Starting Hacker News scrape...');
    
    const response = await axios.get('https://news.ycombinator.com');
    const $ = cheerio.load(response.data);
    
    const stories = [];
    
    $('.titleline').each((index, element) => {
      if (index >= 10) return false;
      
      const titleElement = $(element).find('a');
      const title = titleElement.text().trim();
      const url = titleElement.attr('href');
      
      if (!title || !url) return;
      
      const subtextRow = $(element).closest('tr').next();
      const subtext = $(subtextRow).find('.subtext').text();
      
      const pointsMatch = subtext.match(/(\d+)\s*points?/);
      const authorMatch = subtext.match(/by\s*(\w+)/);
      const timeMatch = subtext.match(/(\d+\s*(?:minute|hour|day)s?\s*ago)/);
      
      const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;
      const author = authorMatch ? authorMatch[1] : 'unknown';
      const timeText = timeMatch ? timeMatch[1] : '';
      
      const postedAt = parsePostedTime(timeText);
      const hackerNewsId = url.includes('item?id=') ? url.split('item?id=')[1] : `ext-${index}`;
      
      stories.push({
        title,
        url: url.startsWith('http') ? url : `https://news.ycombinator.com/${url}`,
        points,
        author,
        postedAt,
        hackerNewsId
      });
    });
    
    console.log(`Found ${stories.length} stories`);
    
    for (const storyData of stories) {
      await Story.findOneAndUpdate(
        { hackerNewsId: storyData.hackerNewsId },
        storyData,
        { upsert: true, new: true }
      );
    }
    
    console.log('Scraping completed successfully');
    return stories;
    
  } catch (error) {
    console.error('Error scraping Hacker News:', error);
    throw error;
  }
};

const parsePostedTime = (timeText) => {
  const now = new Date();
  
  if (!timeText) return now;
  
  if (timeText.includes('minute')) {
    const minutes = parseInt(timeText) || 1;
    return new Date(now.getTime() - minutes * 60 * 1000);
  } else if (timeText.includes('hour')) {
    const hours = parseInt(timeText) || 1;
    return new Date(now.getTime() - hours * 60 * 60 * 1000);
  } else if (timeText.includes('day')) {
    const days = parseInt(timeText) || 1;
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }
  
  return now;
};

module.exports = { scrapeHackerNews };
