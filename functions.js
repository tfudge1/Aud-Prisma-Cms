const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
async function createArticle(data) {
  return await prisma.article.create({ data });
}

// READ all
async function getArticles() {
  return await prisma.article.findMany();
}

// READ by ID
async function getArticleById(id) {
  return await prisma.article.findUnique({ where: { id } });
}

// UPDATE by ID
async function updateArticle(id, data) {
  return await prisma.article.update({ where: { id }, data });
}

// DELETE by ID
async function deleteArticle(id) {
  return await prisma.article.delete({ where: { id } });
}

// DELETE many (optional)
async function deleteArticlesByTitle(title) {
  return await prisma.article.deleteMany({ where: { title } });
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteArticlesByTitle,
};
