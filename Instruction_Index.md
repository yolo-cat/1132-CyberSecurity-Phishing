## **HTML 結構（index.html）**

- `<!DOCTYPE html>` 標準宣告
- `<html lang="zh-tw">`：語系
- `<head>`
    - `<title>`：登入 iLearn 模仿頁
    - `<meta charset="utf-8">`、viewport 響應式
    - `<!-- bootstrap CDN 註解掉 -->`
    - `<link rel="stylesheet" href="style.css">`：自訂樣式
- `<body>`
    - `.browser-bar`：模擬瀏覽器網址列，含前進、後退、重新整理、**憑證檢查**按鈕與網址欄
        - 憑證檢查按鈕（🔒）點擊會顯示提示
    - `#popup-modal`：彈出視窗，絕對置中，內容：「本網頁將教你如何分辨釣魚網站」，含「開始學習」按鈕
    - `#phishing-guide-modal`：多步驟釣魚辨識教學彈窗，內容依序顯示辨識步驟，含「下一步」/「完成」按鈕
    - `#victim-modal`：登入次數提示彈窗，顯示「你是第 n 個被釣魚的受害者!」，含「關閉」與「資安小測驗」按鈕
    - `.login-wrapper`：全頁容器，背景圖
        - `.login-container`：主內容，兩欄式
            - `.left-column`：登入區
                - `.login-logo`：Logo 圖片
                - `<form class="login-form" action="notify.html" id="phishing-login-form">`
                    - `.form-group`：帳號輸入
                    - `.form-group`：密碼輸入
                    - `<button type="submit">登入</button>`
                - `<div>`：包含「我要學習如何辨識釣魚網站」與「資安小測驗」兩個按鈕，並排顯示，**按鈕文字完整顯示且不換行，字體大小會隨螢幕自動縮放**
            - `.right-column`：說明區
                - `<p>`：資安教學警語
                - `<p>`：NID 帳號/密碼提醒
                - `<p>`：NID 密碼變更連結（含 NID 圖示）
        - `.footer`：頁尾
            - `<p>`：版權宣告
            - `<script src="/script.js"></script>`：載入 JS

---

## **CSS 結構（style.css）**

- body：Roboto 字型、灰底
- .browser-bar：模擬瀏覽器網址列，flex 置頂，含按鈕與網址欄
- .browser-btn：圓角、hover 效果（憑證檢查按鈕共用）
- .browser-url：仿真網址欄
- .login-wrapper：flex 置中、背景圖
- .login-container：白底、圓角、陰影、響應式 row/column
- .left-column / .right-column：padding、flex、內容置中
- .login-logo img：自適應寬度
- .login-form：100% 寬
- .form-group：間距
- input, button：圓角、padding、hover 效果
- .right-column：左邊框、置中、字大
- a：藍色、hover 下劃線
- .footer：固定置底、深色底、白字
- `#popup-modal`：全螢幕遮罩，flex 置中
- `.popup-content`：白底圓角、置中、陰影、內文與按鈕
- .phishing-guide-btn：教學啟動與小測驗按鈕，單行顯示，防止換行，**字體大小使用 clamp 動態調整，無長度限制**
- .phishing-guide-btn#start-quiz-btn：綠色樣式，hover 深綠
- 多步驟彈窗沿用 .popup-modal, .popup-content 樣式
- #victim-modal .popup-content button：登入提示彈窗按鈕樣式
- @media：響應式調整欄位方向與 padding

---

## **JS 結構（script.js）**

- 彈出視窗控制：「開始學習」按鈕點擊後關閉彈窗
- 模擬瀏覽器按鈕（前進、後退、重新整理）點擊時顯示提示
- **憑證檢查按鈕**點擊時顯示「檢查是否為正確憑證!」
- 多步驟釣魚辨識教學彈窗邏輯
    - 點擊「我要學習如何辨識釣魚網站」啟動教學
    - 依序顯示步驟，點「下一步」切換，最後「完成」關閉
- 登入次數提示彈窗與計數器
    - 使用 localStorage 記錄被釣魚次數
    - 登入時彈窗顯示「你是第 n 個被釣魚的受害者!」
    - 「關閉」關閉彈窗，「資安小測驗」導向 quiz.html
- 左側「資安小測驗」按鈕與登入彈窗「資安小測驗」按鈕皆會跳轉到 test.html
- 可擴充其他互動功能（如表單驗證、提示等）

---

## **資源關聯**

- 圖片：`img/moodle4_log.jpg`、`img/nidlogo.png`
- 樣式：`style.css`
- JS：`script.js`
- 表單送出：`notify.html`

---

## **vibe coding 小結**

- 結構清晰，兩欄式設計，響應式支援
- 樣式現代，重視 UX
- JS 可擴充互動，含彈出提示與模擬瀏覽器列
- **強化資安意識，加入憑證檢查教學**
- 強化互動式教學，逐步引導辨識釣魚網站重點
- 增加互動式受害者計數提示，強化資安警覺
- 增加「資安小測驗」按鈕，方便使用者隨時進行自我檢測
- 按鈕文字完整顯示，介面不換行，字體大小自適應，提升體驗
- 適合資安教學場景

---