const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const LevelConfig = require('./models/LevelConfig');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Connected to MongoDB');
}).catch(console.error);

// Setup EJS templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index'); // homepage
});

app.get('/commands', (req, res) => {
  res.render('commands'); // commands page
});

app.get('/leveling', async (req, res) => {
  // Fetch all leveling configs from MongoDB
  const configs = await LevelConfig.find({});
  res.render('leveling', { configs });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
