const express = require('express');
const app = express();
const PORT = 8080;
const authRoutes = require('./routers/auth')

require('dotenv').config();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT);
