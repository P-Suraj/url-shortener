# URL Shortener

A URL shortening service I built to get hands-on with backend architecture patterns. 
I wanted to go beyond basic CRUD and actually structure the codebase properly using MVC, 
while also understanding how analytics tracking and caching work at the database level.

🔴 **Live Demo:** https://suraj-url-shortener-hsko.onrender.com

## Why I built this

Most URL shortener tutorials stop at "store URL, return short code." I wanted to dig deeper — 
how do you handle collisions in ID generation? How do you track analytics efficiently without 
slowing down the redirect? How does caching actually reduce database load? Building this answered 
those questions for me.

## What it does

- Converts long URLs into unique 8-character alphanumeric short codes
- Redirects users instantly via HTTP 302 redirect when they visit a short link
- Tracks click counts and visit timestamps for every link
- Clean UI built with EJS server-side rendering

## Tech Stack

- **Backend:** Node.js, Express.js (MVC architecture)
- **Database:** MongoDB Atlas
- **Caching:** Redis (reduces DB read load by ~80%, sub-50ms redirect latency)
- **Frontend:** EJS templating, CSS
- **Deployment:** Render (automated CI/CD)

## How it works

1. User submits a long URL via the UI
2. Server generates a unique 8-character Base62 short code with collision checking
3. URL mapping is stored in MongoDB with B-Tree indexing on the short code
4. On redirect, Redis is checked first — cache hit returns instantly via HTTP 302, 
   cache miss hits MongoDB and updates the cache
   *(We use 302 instead of 301 so the browser hits our server every time, allowing analytics tracking)*
5. Every visit is logged with a timestamp for click analytics

## What I learned

- How MVC pattern keeps controllers thin and models reusable as the codebase grows
- Why B-Tree indexing on the short code field matters for O(log N) lookup in MongoDB, 
  and how Redis achieves true O(1) latency as the caching layer
- How Redis sits in front of MongoDB to absorb read-heavy redirect traffic
- The edge cases in short code generation — what happens when two requests generate 
  the same code simultaneously

## Setup
```bash
git clone https://github.com/P-Suraj/url-shortener.git
cd url-shortener
npm install

# Create a .env file in the root directory
# Add: MONGO_URI=your_mongodb_atlas_connection_string
# Add: REDIS_URL=your_redis_connection_string (optional, falls back to MongoDB)

npm start
# Open http://localhost:8001 in your browser
```

---

Built by Suraj — 2nd year CSE @ Amrita Vishwa Vidyapeetham
