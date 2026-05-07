const express = require('express');
const auth = require('../middleware/auth');
const { getStories, getStory, toggleBookmark, getBookmarks } = require('../controllers/storyController');

const router = express.Router();

router.get('/', getStories);
router.get('/bookmarks', auth, getBookmarks);
router.get('/:id', getStory);
router.post('/:id/bookmark', auth, toggleBookmark);

module.exports = router;
