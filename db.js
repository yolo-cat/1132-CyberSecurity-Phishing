const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'phishing.db'));

// 初始化資料表
function initDB() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      example_img TEXT,
      example_desc TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS defense (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tip TEXT NOT NULL,
      resource_url TEXT
    )`);
  });
}

// 釣魚攻擊特徵 CRUD
function getAllFeatures(cb) {
  db.all('SELECT * FROM features', cb);
}
function addFeature(desc, img, desc2, cb) {
  db.run('INSERT INTO features (description, example_img, example_desc) VALUES (?, ?, ?)', [desc, img, desc2], cb);
}
function deleteFeature(id, cb) {
  db.run('DELETE FROM features WHERE id=?', [id], cb);
}

// 防範措施 CRUD
function getAllDefense(cb) {
  db.all('SELECT * FROM defense', cb);
}
function addDefense(tip, url, cb) {
  db.run('INSERT INTO defense (tip, resource_url) VALUES (?, ?)', [tip, url], cb);
}
function deleteDefense(id, cb) {
  db.run('DELETE FROM defense WHERE id=?', [id], cb);
}

module.exports = {
  initDB,
  getAllFeatures,
  addFeature,
  deleteFeature,
  getAllDefense,
  addDefense,
  deleteDefense
};

