// script.js

// SQLite 前端查詢整合
let SQL, db;
async function loadDB() {
  SQL = await window.initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}` });
  const buf = await fetch('mydatabase.db').then(res => res.arrayBuffer());
  db = new SQL.Database(new Uint8Array(buf));
}

// 查詢釣魚特徵
function getPhishingFeatures() {
  const res = db.exec('SELECT * FROM features');
  return res[0] ? res[0].values.map(row => ({
    description: row[1],
    example_img: row[2],
    example_desc: row[3]
  })) : [];
}
// 查詢防範建議
function getDefenseTips() {
  const res = db.exec('SELECT * FROM defense');
  return res[0] ? res[0].values.map(row => ({
    tip: row[1],
    resource_url: row[2]
  })) : [];
}
// 查詢亂數考題
function getRandomQuestions(n=5) {
  const res = db.exec('SELECT * FROM questions ORDER BY RANDOM() LIMIT ' + n);
  return res[0] ? res[0].values.map(row => ({
    id: row[0],
    question: row[1],
    optA: row[2],
    optB: row[3],
    optC: row[4],
    optD: row[5],
    answer: row[6]
  })) : [];
}

window.onload = async function() {
  await loadDB();
  // 彈窗流程
  const step1 = document.getElementById('phish-modal-step1');
  const step2 = document.getElementById('phish-modal-step2');
  const step3 = document.getElementById('phish-modal-step3');
  const nextBtn = document.getElementById('next-step');
  const toStep3 = document.getElementById('to-step3');
  const closeBtn = document.getElementById('close-modal');
  const mainContent = document.getElementById('main-content');


  // 取得釣魚特徵與範例
  const featuresData = getPhishingFeatures();
  const featuresList = document.getElementById('phish-features-list');
  const examplesList = document.getElementById('phish-examples-list');
  if (featuresList && featuresData) {
    featuresList.innerHTML = '';
    featuresData.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f.description || f.desc;
      featuresList.appendChild(li);
      // 範例圖片與說明
      if (examplesList && f.example_img && f.example_desc) {
        const div = document.createElement('div');
        div.className = 'example';
        div.innerHTML = `<img src="${f.example_img}" alt="範例"><p>${f.example_desc}</p>`;
        examplesList.appendChild(div);
      }
    });
  }

  // 首頁互動警告
  document.getElementById('browser-url').onclick = function() {
    alert('警告：網址可疑，ilearn.fake.edu.tw 並非官方網域！');
  };
  document.getElementById('btn-back').onclick = function() {
    alert('警告：返回上一頁功能無效，這是釣魚網站常見手法。');
  };
  document.getElementById('btn-forward').onclick = function() {
    alert('警告：前進功能無效，這是釣魚網站常見手法。');
  };
  document.getElementById('btn-refresh').onclick = function() {
    alert('警告：�����新整理無法解決安全問題，請檢查網址真偽。');
  };
  document.getElementById('nid-link').onclick = function(e) {
    e.preventDefault();
    alert('警告：這是釣魚網站的模擬！真實情境中，此連結可能會帶你到另一個釣魚網站。');
  };
  document.getElementById('fake-bulletin').onclick = function() {
    alert('警告：這是釣魚網站常見誘導語，請勿輕信緊急通知！');
  };
  document.getElementById('fake-login-form').onsubmit = function(e) {
    e.preventDefault();
    alert('警告：這是釣魚網站的模擬，請勿在不明網站輸入真實帳號密碼！');
  };

  // 防範建議區塊AJAX
  const defenseTipsData = getDefenseTips();
  const defenseTipsList = document.getElementById('defense-tips-list');
  if (defenseTipsList && defenseTipsData) {
    defenseTipsList.innerHTML = '';
    defenseTipsData.forEach(defense => {
      const li = document.createElement('li');
      if (defense.resource_url) {
        const a = document.createElement('a');
        a.href = defense.resource_url;
        a.target = '_blank';
        a.textContent = defense.tip;
        li.appendChild(a);
      } else {
        li.textContent = defense.tip;
      }
      defenseTipsList.appendChild(li);
    });
  }

  // 釣魚攻擊特徵自動彈窗與互動式測驗（Instruction.md/DB.md整合）
  async function showFeaturePopup() {
    await loadDB();
    const features = getPhishingFeatures();
    const popup = document.getElementById('feature-popup');
    const list = document.getElementById('feature-popup-list');
    list.innerHTML = '';
    features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f.description;
      list.appendChild(li);
    });
    popup.style.display = 'flex';
  }
  function hideFeaturePopup() {
    document.getElementById('feature-popup').style.display = 'none';
    document.getElementById('feature-mini').style.display = 'block';
  }
  function showQuizPopup() {
    const quizDiv = document.getElementById('quiz-popup');
    const form = document.getElementById('quiz-popup-form');
    const resultDiv = document.getElementById('quiz-popup-result');
    form.innerHTML = '';
    resultDiv.textContent = '';
    // 亂數出題
    const questions = getRandomQuestions(5);
    questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.innerHTML = `<b>Q${idx+1}：${q.question}</b><br>
        <label><input type='radio' name='q${q.id}' value='A'> ${q.optA}</label>
        <label><input type='radio' name='q${q.id}' value='B'> ${q.optB}</label>
        <label><input type='radio' name='q${q.id}' value='C'> ${q.optC}</label>
        <label><input type='radio' name='q${q.id}' value='D'> ${q.optD}</label><br><br>`;
      form.appendChild(qDiv);
    });
    // 提交評分
    form.onsubmit = function(e) {
      e.preventDefault();
      let score = 0;
      questions.forEach(q => {
        const userAns = form.querySelector(`input[name='q${q.id}']:checked`);
        if (userAns && userAns.value === q.answer) score++;
      });
      resultDiv.textContent = `你答對了 ${score} / ${questions.length} 題！`;
      resultDiv.style.color = score === questions.length ? 'green' : 'red';
    };
    quizDiv.style.display = 'flex';
  }
  // DOMContentLoaded觸發彈窗與互動
  window.addEventListener('DOMContentLoaded', () => {
    showFeaturePopup();
    document.getElementById('feature-popup-close').onclick = hideFeaturePopup;
    document.getElementById('feature-mini').onclick = function() {
      document.getElementById('feature-mini').style.display = 'none';
      showQuizPopup();
    };
    document.getElementById('quiz-popup-close').onclick = function() {
      document.getElementById('quiz-popup').style.display = 'none';
      document.getElementById('feature-mini').style.display = 'block';
    };
  });
};
