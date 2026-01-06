const mongoose = require("mongoose");

// The Schema (The Blueprint)
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{ timestamp: { type: Number } }],
}, { timestamps: true });

// The Model (The Tool)
const URL = mongoose.model("url", urlSchema);

// Export it so other files can use it
module.exports = URL;