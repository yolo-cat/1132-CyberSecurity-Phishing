const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const SCORES_FILE = path.join(__dirname, 'scores.json');

function readScores() {
  if (!fs.existsSync(SCORES_FILE)) return [];
  const data = fs.readFileSync(SCORES_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeScores(scores) {
  try {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
  } catch (e) {
    // 若目錄不存在則建立
    fs.mkdirSync(path.dirname(SCORES_FILE), { recursive: true });
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
  }
}

app.get('/api/scores', (req, res) => {
  const scores = readScores();
  // 支援依分數、名稱、時間排序
  const { sortBy = 'score', order = 'desc' } = req.query;
  let sorted = [...scores];
  if (sortBy === 'score') {
    sorted.sort((a, b) => order === 'desc' ? b.score - a.score : a.score - b.score);
  } else if (sortBy === 'name') {
    sorted.sort((a, b) => order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
  } else if (sortBy === 'time') {
    sorted.sort((a, b) => order === 'desc' ? b.time - a.time : a.time - b.time);
  }
  res.json(sorted);
});

app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: '名稱與分數必填' });
  }
  const scores = readScores();
  scores.push({ name, score, time: Date.now() });
  writeScores(scores);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
