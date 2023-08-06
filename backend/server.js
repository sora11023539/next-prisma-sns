const express = require('express');
const app = express();
const PORT = 8080;
const authRoutes = require('./routers/auth');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT);
