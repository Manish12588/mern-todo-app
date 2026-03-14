const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-todo';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/todos', todoRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB error:', err); process.exit(1); });

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
