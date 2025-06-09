@startuml
!theme aws-orange
skinparam backgroundColor #FAFAFA
skinparam roundCorner 15
skinparam shadowing true

' 設定全域深色字體
skinparam defaultTextColor #222222

skinparam class {
  BackgroundColor<<frontend>> #E3F2FD
  BorderColor<<frontend>> #1976D2
  BackgroundColor<<backend>> #E8F5E8
  BorderColor<<backend>> #388E3C
  BackgroundColor<<library>> #FFF3E0
  BorderColor<<library>> #F57C00
  BackgroundColor<<data>> #F3E5F5
  BorderColor<<data>> #7B1FA2
}

class "🌐 Client (Browser)" as Client <<frontend>> {
+ index.html
+ test.html
  --
+ 顯示教學
+ 小測驗互動
+ 送出/查詢分數
}

class "⚙️ Express Server" as Server <<backend>> {
+ server.js
  --
+ serveStatic()
+ /api/scores (GET/POST)
+ validateScores()
}

class "🔍 AJV 驗證器" as AjvLib <<library>> {
+ compile()
+ validate()
}

class "📊 scores.json" as Scores <<data>> {
+ 排行榜資料
}

class "📋 schema.json" as Schema <<data>> {
+ 資料格式定義
}

Client --> Server : HTTP 請求\n(API/靜態檔案)
Server --> Scores : 讀取/寫入分數
Server --> Schema : 載入驗證規則
Server --> AjvLib : 資料驗證
Server --> Client : 回應資料/頁面

@enduml
