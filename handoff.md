# 交接檔

## ⏯️ 目前做到哪
- Unit 09/10 已完成 `b4a511f` + 題型複選 `b26441f` 已上線；本次修復三項 bug 並新增同步與版面修正
- 修復：英翻中選項純中文（`app.js:273` correct=zh）、考完成績 null（`index.html:347` 補 id + `app.js:530` 防禦）、全面移除圖片（`app.js:295`）
- 新增：網頁上方截斷修正（`index.html:11` flex-start + 100dvh + safe-area）、成績紀錄雲端自動同步 + 匯出匯入（`app.js:575` NPOINT + `index.html` 成績紀錄區）

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 待部署（200字/184句 + 三 bug 修復 + 同步/版面）
- 已驗證：`node --check app.js/data.js` 通過，`en2zh` 四選項皆中文、成績頁 `review-title` 已補 id、圖片全面隱藏
- Git：`c9056dc/b26441f/b4a511f` 已推，本地 `app.js/index.html/AGENTS.md` 已改待 commit（同步+版面）

## ➡️ 下一步
1. `git commit + push` 本次（版面 + 同步 + 匯出匯入），iPad 驗證上方不截斷、同步碼共享、匯出 JSON
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 200 字重建）
3. 若 NPOINT 500 持續，改用 Google Apps Script 作為備用同步（可選）

## ⚠️ 注意事項
- 成績頁：`index.html:347` 已補 `id="review-title"`，`app.js:530` 已加 `el?.textContent` 與 `try/finally` 確保 `show("screen-result")`
- 圖片：`app.js:295` 一律 `remove("show")`，徹底移除舊配圖干擾
- 同步：`app.js:575` 自動雲端備份（`getSyncId`/`syncUpload`/`syncDownload`），`index.html` 成績紀錄區新增同步碼、匯出/匯入；NPOINT 目前 500，若失敗請用匯出 JSON 手動同步
- 版面：`index.html:11` `body` 改 `align-items:flex-start` + `min-height:100dvh` + `env(safe-area-inset-*)` + `overflow-y:auto`，`.app` 加 `margin:16px auto`

## 🕐 最後更新
- 時間：2026-08-22 凌晨
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（版面 + 同步 + 匯出匯入 + 三 bug 修復）
