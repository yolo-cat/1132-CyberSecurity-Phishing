// script.js

// 彈窗流程
window.onload = function() {
  const step1 = document.getElementById('phish-modal-step1');
  const step2 = document.getElementById('phish-modal-step2');
  const nextBtn = document.getElementById('next-step');
  const closeBtn = document.getElementById('close-modal');
  // 初始顯示step1
  step1.style.display = 'block';
  step2.style.display = 'none';
  // 下一步
  nextBtn.onclick = function() {
    step1.style.display = 'none';
    step2.style.display = 'block';
  };
  // 關閉彈窗
  closeBtn.onclick = function() {
    step2.style.display = 'none';
  };

  // 模擬瀏覽器互動提示
  document.getElementById('browser-url').onclick = function() {
    alert('網址可疑：ilearn.fake.edu.tw 並非官方網域，請小心！');
  };
  document.getElementById('btn-back').onclick = function() {
    alert('返回上一頁功能無效，這是釣魚網站常見手法。');
  };
  document.getElementById('btn-forward').onclick = function() {
    alert('前進功能無效，這是釣魚網站常見手法。');
  };
  document.getElementById('btn-refresh').onclick = function() {
    alert('重新整理無法解決安全問題，請檢查網址真偽。');
  };

  // 攔截登入表單提交，彈出釣魚警示
  document.getElementById('fake-login-form').onsubmit = function(e) {
    e.preventDefault();
    alert('警告：這是釣魚網站的模擬，請勿在不明網站輸入真實帳號密碼！');
  };

  // 彈窗三步驟流程
  const toStep3 = document.getElementById('to-step3');
  const step3 = document.getElementById('phish-modal-step3');
  const quizFormModal = document.getElementById('quiz-form-modal');
  const quizResultModal = document.getElementById('quiz-result-modal');
  // step2 -> step3
  toStep3.onclick = function() {
    step2.style.display = 'none';
    step3.style.display = 'block';
  };
  // step3互動式測驗
  quizFormModal.onsubmit = function(e) {
    e.preventDefault();
    const ans = quizFormModal.querySelector('input[name="quiz"]:checked');
    if (!ans) {
      quizResultModal.textContent = '請先選擇一個答案。';
      quizResultModal.style.color = 'red';
      return;
    }
    if (ans.value === 'A') {
      quizResultModal.textContent = '答對了！網址拼寫正確且為官方網域不是釣魚特徵。';
      quizResultModal.style.color = 'green';
    } else {
      quizResultModal.textContent = '答錯了，請再想想。';
      quizResultModal.style.color = 'red';
    }
  };
  // step3完成按鈕
  document.getElementById('close-modal').onclick = function() {
    step3.style.display = 'none';
  };

  // AJAX 取得釣魚攻擊特徵，動態渲染到 step2
  fetch('/api/features').then(r=>r.json()).then(data => {
    const ul = step2.querySelector('ul');
    if (ul && data.features) {
      ul.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        ul.appendChild(li);
      });
    }
  });
  // AJAX 取得防範措施，動態渲染到下方建議區塊
  fetch('/api/defense').then(r=>r.json()).then(data => {
    const antiPhishContent = document.querySelector('.anti-phish-content ul');
    if (antiPhishContent && data.defense) {
      antiPhishContent.innerHTML = '';
      data.defense.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        antiPhishContent.appendChild(li);
      });
    }
  });

  // 防範釣魚攻擊建議區塊展開/收合
  // const antiPhishSection = document.getElementById('antiPhishSection');
  // const antiPhishToggle = document.getElementById('antiPhishToggle');
  // let antiPhishOpen = false;
  // antiPhishToggle.onclick = function() {
  //   antiPhishOpen = !antiPhishOpen;
  //   if (antiPhishOpen) {
  //     antiPhishSection.classList.add('open');
  //     antiPhishToggle.textContent = '▼ 收合���範釣魚攻擊建議';
  //   } else {
  //     antiPhishSection.classList.remove('open');
  //     antiPhishToggle.textContent = '▲ 展開防範釣魚攻擊建議';
  //   }
  // };
};
