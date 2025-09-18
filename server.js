const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('./functions');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

// --- API routes ---
app.post('/articles', async (req, res) => {
  try {
    const article = await createArticle(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/articles', async (req, res) => {
  const articles = await getArticles();
  res.json(articles);
});

app.get('/articles/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const article = await getArticleById(id);
  res.json(article);
});

app.put('/articles/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await updateArticle(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/articles/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await deleteArticle(id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
