// 題庫範例（請依 QA.md 實際內容調整）
const questions = [
  {
    q: "1. 下列哪一個網址最有可能是釣魚網站？",
    options: [
      "https://www.google.com/",
      "https://gcogle.com/",
      "https://www.gov.tw/",
      "https://www.nccu.edu.tw/"
    ],
    answer: 1,
    explanation: "gcogle.com 與 google.com 僅一字之差，常見於釣魚網站偽裝。"
  },
  {
    q: "2. 你收到一封信，內容要求你立即點擊連結更改密碼，該怎麼做？",
    options: [
      "直接點擊信中的連結",
      "先檢查寄件者與連結網址",
      "將信件轉寄給朋友",
      "忽略信件"
    ],
    answer: 1,
    explanation: "應先檢查寄件者與連結網址是否可信，避免落入釣魚陷阱。"
  },
  {
    q: "3. 釣魚網站常見特徵為何？",
    options: [
      "網址拼寫錯誤",
      "內容語句不通順",
      "要求輸入個資",
      "以上皆是"
    ],
    answer: 3,
    explanation: "釣魚網站常有拼寫錯誤、不自然語句，並要求個資。"
  },
  {
    q: "4. 下列哪一個網址最安全？",
    options: [
      "http://bank.example.com",
      "https://bank.example.com",
      "http://bank-example.com",
      "http://example.com/bank"
    ],
    answer: 1,
    explanation: "https:// 開頭代表有加密憑證，較安全。"
  },
  {
    q: "5. 若網站憑證無效，瀏覽器會？",
    options: [
      "自動登入",
      "顯示警告訊息",
      "加快網頁速度",
      "無任何反應"
    ],
    answer: 1,
    explanation: "瀏覽器會顯示警告，提醒用戶憑證異常。"
  },
  {
    q: "6. 你發現網站內容大量錯字且排版混亂，應？",
    options: [
      "繼續輸入個資",
      "忽略異常",
      "提高警覺，勿輸入敏感資料",
      "與朋友分享該網站"
    ],
    answer: 2,
    explanation: "內容異常時應提高警覺，勿輸入敏感資料。"
  },
  {
    q: "7. 釣魚網站最常見的誘因為？",
    options: [
      "高額獎金",
      "免費禮物",
      "帳號異常通知",
      "以上皆是"
    ],
    answer: 3,
    explanation: "釣魚網站常用高額獎金、免費禮物、帳號異常等誘因。"
  },
  {
    q: "8. 如何確認網站是否為官方？",
    options: [
      "檢查網址與憑證",
      "看網站顏色",
      "看有無廣告",
      "看有無登入按鈕"
    ],
    answer: 0,
    explanation: "應檢查網址與憑證，確認是否為官方網站。"
  },
  {
    q: "9. 若收到陌生簡訊要求點擊連結，應？",
    options: [
      "直接點擊",
      "回覆簡訊",
      "刪除或忽略",
      "轉寄給朋友"
    ],
    answer: 2,
    explanation: "陌生簡訊應刪除或忽略，勿點擊連結。"
  },
  {
    q: "10. 釣魚網站的主要目的為？",
    options: [
      "提供免費資源",
      "竊取個資或帳號密碼",
      "推廣正確資訊",
      "協助用戶學習"
    ],
    answer: 1,
    explanation: "釣魚網站主要目的是竊取個資或帳號密碼。"
  }
];

let current = 0;
let score = 0;

function renderQuestion(idx) {
  const q = questions[idx];
  const area = document.getElementById('question-area');
  const expArea = document.getElementById('explanation-area');
  const summaryArea = document.getElementById('summary-area');
  expArea.style.display = 'none';
  summaryArea.style.display = 'none';
  area.innerHTML = `
    <div class="question-title">${q.q}</div>
    <ul class="options-list">
      ${q.options.map((opt, i) => `
        <li>
          <input type="radio" name="option" id="opt${i}" value="${i}">
          <label class="option-label" for="opt${i}">${opt}</label>
        </li>
      `).join('')}
    </ul>
    <button id="submit-btn" disabled>送出答案</button>
  `;
  // 啟用送出按鈕
  const radios = area.querySelectorAll('input[type="radio"]');
  const submitBtn = document.getElementById('submit-btn');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      submitBtn.disabled = false;
    });
  });
  submitBtn.addEventListener('click', () => {
    const selected = Array.from(radios).find(r => r.checked);
    const ansIdx = parseInt(selected.value, 10);
    const isCorrect = ansIdx === q.answer;
    if (isCorrect) score++;
    showExplanation(isCorrect, q, ansIdx);
  });
}

function showExplanation(isCorrect, q, ansIdx) {
  const expArea = document.getElementById('explanation-area');
  expArea.innerHTML = `
    <div>
      <span class="${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? '答對！' : '答錯！'}
      </span>
      <br>
      正確答案：${q.options[q.answer]}
      <br>
      <span>解析：${q.explanation}</span>
    </div>
    <button id="next-btn">${current < questions.length - 1 ? '下一題' : '看結果'}</button>
  `;
  expArea.style.display = 'block';
  document.getElementById('question-area').innerHTML = '';
  document.getElementById('next-btn').addEventListener('click', () => {
    current++;
    if (current < questions.length) {
      renderQuestion(current);
    } else {
      showSummary();
    }
  });
}

function showSummary() {
  const summaryArea = document.getElementById('summary-area');
  let comment = '';
  if (score === 10) comment = '滿分！你已具備極佳的釣魚網站辨識能力！';
  else if (score >= 8) comment = '很棒！你對釣魚網站有高度警覺。';
  else if (score >= 5) comment = '不錯，但還有進步空間，請多加留意網路安全。';
  else comment = '建議加強資安意識，避免受騙。';
  const username = document.getElementById('username').value.trim();
  summaryArea.innerHTML = `
    <span class="score">${score} / ${questions.length}</span>
    <div>答題完畢！</div>
    <div class="comment">${comment}</div>
    <div id="submit-score-area">
      <button id="submit-score-btn">送出成績</button>
      <button id="restart-btn">重新測驗</button>
      <span id="submit-score-msg"></span>
    </div>
  `;
  summaryArea.style.display = 'block';
  document.getElementById('explanation-area').style.display = 'none';
  document.getElementById('question-area').innerHTML = '';
  document.getElementById('restart-btn').addEventListener('click', () => {
    current = 0;
    score = 0;
    renderQuestion(current);
  });
  // 送出成績
  document.getElementById('submit-score-btn').addEventListener('click', () => {
    if (!username) {
      document.getElementById('submit-score-msg').textContent = '請輸入名稱';
      return;
    }
    fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username, score })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          document.getElementById('submit-score-msg').textContent = '成績已送出！';
          loadLeaderboard();
          loadHistory();
        } else {
          document.getElementById('submit-score-msg').textContent = '送出失敗';
        }
      })
      .catch(() => {
        document.getElementById('submit-score-msg').textContent = '送出失敗';
      });
  });
  loadLeaderboard();
  loadHistory();
}

function loadLeaderboard() {
  fetch('/api/scores?sortBy=score&order=desc')
    .then(res => res.json())
    .then(scores => {
      const top10 = scores.slice(0, 10);
      document.getElementById('leaderboard').innerHTML =
        '<h3>排行榜（前10名）</h3>' +
        '<ol>' +
        top10.map(s => `<li>${s.name}：${s.score}分</li>`).join('') +
        '</ol>';
    });
}

function loadHistory() {
  fetch('/api/scores?sortBy=time&order=desc')
    .then(res => res.json())
    .then(scores => {
      document.getElementById('history').innerHTML =
        '<h3>歷史成績</h3>' +
        '<ul>' +
        scores.map(s => `<li>${s.name}：${s.score}分（${new Date(s.time).toLocaleString()}）</li>`).join('') +
        '</ul>';
    });
}

function showLeaderboardModal() {
  fetch('/api/scores?sortBy=score&order=desc')
    .then(res => res.json())
    .then(scores => {
      const top10 = scores.slice(0, 10);
      const list = document.getElementById('leaderboard-list');
      list.innerHTML = top10.length
        ? top10.map((s, i) => `<li>${s.name}：${s.score}分</li>`).join('')
        : '<li>暫無資料</li>';
      document.getElementById('leaderboard-modal').style.display = 'flex';
    });
}

window.onload = function() {
  renderQuestion(current);
  loadLeaderboard();
  loadHistory();

  // 排行榜彈窗事件
  document.getElementById('show-leaderboard-btn').onclick = showLeaderboardModal;
  document.getElementById('close-leaderboard').onclick = function() {
    document.getElementById('leaderboard-modal').style.display = 'none';
  };
  // 點擊遮罩關閉
  document.getElementById('leaderboard-modal').addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
};