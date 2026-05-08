const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');
const scrapeRoutes = require('./routes/scrape');
const { scrapeHackerNews } = require('./scraper/hackerNewsScraper');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);
app.use('/_/backend/api/auth', authRoutes);
app.use('/_/backend/api/stories', storyRoutes);
app.use('/_/backend/api/scrape', scrapeRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
      console.log('Running initial scrape on server start...');
      await scrapeHackerNews();
    } catch (error) {
      console.error('Initial scrape failed:', error);
    }
  });
}

module.exports = app;
