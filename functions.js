const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'articles.json');

// Helper function to read articles from file
function readArticles() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

// Helper function to write articles to file
function writeArticles(articles) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error('Error writing articles:', error);
    throw new Error('Failed to save articles');
  }
}

// Helper function to get next ID
function getNextId(articles) {
  if (articles.length === 0) return 1;
  return Math.max(...articles.map(article => article.id)) + 1;
}

// CREATE
async function createArticle(data) {
  const articles = readArticles();
  const newArticle = {
    id: getNextId(articles),
    title: data.title,
    content: data.content,
    excerpt: data.excerpt || '',
    imageURL: data.imageURL || '',
    imageAlt: data.imageAlt || '',
    publishDate: new Date().toISOString(),
    category: data.category || '',
    author: data.author || '',
    readTime: data.readTime || '',
    url: data.url || data.title.toLowerCase().replace(/\s+/g, '-')
  };
  
  articles.push(newArticle);
  writeArticles(articles);
  return newArticle;
}

// READ all
async function getArticles() {
  return readArticles();
}

// READ by ID
async function getArticleById(id) {
  const articles = readArticles();
  return articles.find(article => article.id === id);
}

// UPDATE by ID
async function updateArticle(id, data) {
  const articles = readArticles();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) {
    throw new Error('Article not found');
  }
  
  articles[index] = {
    ...articles[index],
    ...data,
    id: articles[index].id, // Preserve original ID
    publishDate: articles[index].publishDate // Preserve original publish date
  };
  
  writeArticles(articles);
  return articles[index];
}

// DELETE by ID
async function deleteArticle(id) {
  const articles = readArticles();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) {
    throw new Error('Article not found');
  }
  
  const deletedArticle = articles.splice(index, 1)[0];
  writeArticles(articles);
  return deletedArticle;
}

// DELETE many (optional)
async function deleteArticlesByTitle(title) {
  const articles = readArticles();
  const filteredArticles = articles.filter(article => article.title !== title);
  const deletedCount = articles.length - filteredArticles.length;
  
  writeArticles(filteredArticles);
  return { deletedCount };
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteArticlesByTitle,
};