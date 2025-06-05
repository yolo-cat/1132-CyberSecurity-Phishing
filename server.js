const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

db.initDB();

// 靜態檔案服務
app.use(express.static(path.join(__dirname, '.')));

// 首頁路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: 釣魚攻擊特徵（從SQLite）
app.get('/api/features', (req, res) => {
  db.getAllFeatures((err, rows) => {
    if (err) return res.status(500).json({error: 'DB error'});
    res.json({ features: rows });
  });
});

// API: 防範措施（從SQLite）
app.get('/api/defense', (req, res) => {
  db.getAllDefense((err, rows) => {
    if (err) return res.status(500).json({error: 'DB error'});
    res.json({ defense: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
