const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateIdenticon = require('../utils/generateIdenticon');

const prisma = new PrismaClient();

// create user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultIconImage = generateIdenticon(email);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      profile: {
        create: {
          bio: 'Hello',
          profileImageUrl: defaultIconImage,
        },
      },
      include: {
        profile: true,
      },
    },
  });

  return res.json({ user });
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'そのユーザーは存在しません' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'そのパスワードは間違っています' });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });

  return res.json({ token });
});

module.exports = router;
