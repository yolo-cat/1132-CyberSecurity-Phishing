// script.js
document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup-modal');
    var btn = document.getElementById('popup-close-btn');
    if (popup && btn) {
        btn.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }

    // 模擬瀏覽器按鈕互動
    var backBtn = document.getElementById('browser-back');
    var forwardBtn = document.getElementById('browser-forward');
    var refreshBtn = document.getElementById('browser-refresh');
    var certBtn = document.getElementById('browser-cert');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            alert('這是模擬的「後退」按鈕，無實際功能。');
        });
    }
    if (forwardBtn) {
        forwardBtn.addEventListener('click', function() {
            alert('這是模擬的「前進」按鈕，無實際功能。');
        });
    }
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            alert('這是模擬的「重新整理」按鈕，無實際功能。');
        });
    }
    if (certBtn) {
        certBtn.addEventListener('click', function() {
            alert('檢查是否為正確憑證!');
        });
    }

    // 多步驟釣魚辨識教學
    var phishingSteps = [
        "步驟 1：檢查網址拼寫與結構。釣魚網站常用與正牌網站相似但有拼寫錯誤的網址，例如 gcogle.com。",
        "步驟 2：觀察網址內容與來源。若網址中有亂數、奇怪組合或非官方網域，請提高警覺。",
        "步驟 3：查看是否有 https:// 與正確憑證。雖然 https 不代表絕對安全，但沒有 https 更需注意。",
        "步驟 4：檢查網站內容與互動。釣魚網站常有大量錯字、不自然語句或互動功能異常。",
        "步驟 5：收到未經請求的訊息或緊急通知時，請勿輕易點擊或輸入個資。"
    ];
    var phishingGuideIdx = 0;
    var phishingGuideModal = document.getElementById('phishing-guide-modal');
    var phishingGuideText = document.getElementById('phishing-guide-text');
    var phishingGuideNextBtn = document.getElementById('phishing-guide-next-btn');
    var startPhishingGuideBtn = document.getElementById('start-phishing-guide');

    function showPhishingGuideStep(idx) {
        if (phishingGuideText) {
            phishingGuideText.textContent = phishingSteps[idx];
        }
        if (phishingGuideModal) {
            phishingGuideModal.style.display = 'flex';
        }
        if (phishingGuideNextBtn) {
            phishingGuideNextBtn.textContent = (idx < phishingSteps.length - 1) ? '下一步' : '完成';
        }
    }

    if (startPhishingGuideBtn && phishingGuideModal && phishingGuideNextBtn) {
        startPhishingGuideBtn.addEventListener('click', function() {
            phishingGuideIdx = 0;
            showPhishingGuideStep(phishingGuideIdx);
        });
        phishingGuideNextBtn.addEventListener('click', function() {
            phishingGuideIdx++;
            if (phishingGuideIdx < phishingSteps.length) {
                showPhishingGuideStep(phishingGuideIdx);
            } else {
                phishingGuideModal.style.display = 'none';
            }
        });
    }

    // 登入次數提示彈窗
    var victimModal = document.getElementById('victim-modal');
    var victimMsg = document.getElementById('victim-msg');
    var victimCloseBtn = document.getElementById('victim-close-btn');
    var victimQuizBtn = document.getElementById('victim-quiz-btn');
    var loginForm = document.getElementById('phishing-login-form');
    // 使用 localStorage 儲存計數
    function getVictimCount() {
        return parseInt(localStorage.getItem('phishingVictimCount') || '0', 10);
    }
    function incVictimCount() {
        var n = getVictimCount() + 1;
        localStorage.setItem('phishingVictimCount', n);
        return n;
    }
    if (loginForm && victimModal && victimMsg && victimCloseBtn && victimQuizBtn) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var n = incVictimCount();
            victimMsg.textContent = `你是第 ${n} 個被釣魚的受害者!`;
            victimModal.style.display = 'flex';
        });
        victimCloseBtn.addEventListener('click', function() {
            victimModal.style.display = 'none';
        });
        victimQuizBtn.addEventListener('click', function() {
            window.location.href = 'test.html';
        });
    }

    // 左側「資安小測驗」按鈕
    var startQuizBtn = document.getElementById('start-quiz-btn');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            window.location.href = 'test.html';
        });
    }
});