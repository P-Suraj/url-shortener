const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

// Define the paths and tell them which Controller function to use
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;