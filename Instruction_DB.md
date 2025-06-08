## **資料庫結構與 API 說明**

---

### **檔案結構**

- `server.js`：Node.js/Express 伺服器，提供 API 服務，負責讀寫排行榜資料
- `scores.json`：排行榜資料檔案，儲存所有使用者的名稱、分數、作答時間
- `schema.json`：排行榜資料格式的 JSON Schema 驗證描述

---

### **scores.json 結構**

- 格式：陣列，每筆為一個物件
- 欄位：
    - `name`：使用者名稱（字串）
    - `score`：分數（整數）
    - `time`：作答時間（timestamp，整數）

**範例：**
```json
[
  {
    "name": "JOJO",
    "score": 9,
    "time": 1749415874193
  },
  {
    "name": "KK園區",
    "score": 2,
    "time": 1749417245365
  }
]
```

---

### **schema.json 結構**

- 用於描述 scores.json 的資料格式
- 必要欄位：`name`（string）、`score`（integer）、`time`（integer）

---

### **API 路徑**

#### `GET /api/scores`

- 取得所有排行榜資料
- 支援查詢參數排序
    - `sortBy`：排序欄位（score、name、time），預設 score
    - `order`：排序方式（desc、asc），預設 desc
- 回傳：排序後的所有資料陣列

#### `POST /api/scores`

- 新增一筆排行榜資料
- 請求內容（JSON）：
    - `name`：使用者名稱（必填）
    - `score`：分數（必填，整數）
- 自動加入 `time` 欄位（伺服器端產生）
- 回傳：`{ success: true }` 或錯誤訊息

---

### **server.js 運作說明**

- 讀寫 `scores.json` 作為排行榜資料來源
- 若檔案不存在自動建立
- 支援依分數、名稱、時間排序
- 所有資料皆儲存於本地 JSON 檔案，重啟伺服器資料不會遺失

---

### **vibe coding 小結**

- 使用 Express + JSON 檔案實現簡易排行榜資料庫
- API 設計簡單，易於前端 fetch 互動
- 支援多種排序，方便排行榜與歷史紀錄查詢
- 資料結構明確，易於擴充與維護

---
