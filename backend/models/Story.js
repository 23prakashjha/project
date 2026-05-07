const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: 0
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  postedAt: {
    type: Date,
    required: [true, 'Posted time is required']
  },
  hackerNewsId: {
    type: String,
    required: true,
    unique: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

StorySchema.index({ points: -1 });
StorySchema.index({ postedAt: -1 });

module.exports = mongoose.model('Story', StorySchema);
