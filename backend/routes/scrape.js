const express = require('express');
const { scrape } = require('../controllers/scrapeController');

const router = express.Router();

router.post('/', scrape);

module.exports = router;
