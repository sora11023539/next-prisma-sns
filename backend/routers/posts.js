const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// create post
router.post('/posts', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: '投稿内容がありません' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラーです' });
  }
});

// get latest post
router.get('/posts', async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
    return res.json(latestPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'サーバーエラーです' });
  }
});

module.exports = router;
