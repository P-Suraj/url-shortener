const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortID = Math.random().toString(36).substring(2, 10);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    // If using Frontend (EJS), render the home page with the new data
    const allUrls = await URL.find({});
    return res.render("home", {
        id: shortID,
        urls: allUrls
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId; //extract shortId
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};