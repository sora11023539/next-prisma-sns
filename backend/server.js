const express = require('express');
const app = express();
const PORT = 8080;
const authRoutes = require('./routers/auth');
const postsRoutes = require('./routers/posts');
const usersRoutes = require('./routers/users');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', postsRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT);
