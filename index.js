const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const URL = require("./models/url"); // Needed for the redirect route below
const urlRoute = require("./routes/url"); // Import our new Router

const app = express();
const PORT = 3000;

// --- CONNECTION ---
// PASTE YOUR CONNECTION STRING HERE
const mongoURI = "mongodb+srv://suraj1947:suraj1947@cluster0.4cfj4jj.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- ROUTES ---

// 1. The URL API Routes (Everything starting with /url)
app.use("/url", urlRoute);

// 2. The Frontend Home Route
app.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
  });
});

// 3. The Redirect Route (We keep this here for simplicity)
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));