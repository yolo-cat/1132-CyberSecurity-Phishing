1. 客户端 SQLite (使用 WebAssembly - sql.js / wa-sqlite)
2. 原理：你可以将 SQLite 数据库文件（.sqlite 或 .db）作为静态资源上传到你的 GitHub Pages 仓库。然后，使用像 sql.js 或 wa-sqlite 这样的 JavaScript 库（它们通过 WebAssembly 将 SQLite 编译到可以在浏览器中运行）在客户端加载和查询这个数据库文件。 
3. 工作流程：
   - 将你的 SQLite 数据库文件（例如 mydatabase.db）添加到你的 GitHub Pages 仓库中。 
   - 在你的 HTML 页面中引入 sql.js 或 wa-sqlite 库。
   - 使用 JavaScript fetch API 下载 mydatabase.db 文件。
   - 使用 sql.js 或 wa-sqlite 将下载的数据库文件加载到浏览器内存中。

4. 用途：
    - 这种方法允许你在客户端直接查询 SQLite 数据库，而不需要服务器端的支持。
    - 适用于需要在浏览器中处理本地数据的应用，如离线应用、数据分析工具等。
    - 可以用于教育目的，展示如何在浏览器中使用 SQLite 数据库进行数据存储和查询。
    - 資料庫預先存放 20 道防釣魚考題，使用者每次到訪，以亂數出題，最後給予答題評分。