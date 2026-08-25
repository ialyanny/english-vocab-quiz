# 交接檔

## ⏯️ 目前做到哪
- 新增三項功能：成績紀錄可刪除、同姓名錯題加權、題數自訂 15/20/25/30/全部
- 成績紀錄：每筆右侧加 ✕ 刪除按鈕（`renderRecords` + `deleteRecord`），確認後刪除並同步雲端
- 錯題加權：`getWrongWordsByName` 取同姓名歷史錯題，`weightedPick` 將錯題重複 3 次加入加權池，答對率低的單字下次出現機率 ×3
- 題數：`index.html:296` 改為 15/20/25/30/全部五選一，預設「全部」
- 先前 JUL 103字 + KK 音標（`f45609e`）已上線

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 待部署
- 已驗證：`node --check app.js` 通過，成績紀錄可刪除、錯題加權、題數五選一
- Git：本地 `app.js/index.html/AGENTS.md` 已改待 commit

## ➡️ 下一步
1. `git commit + push` 本次（刪除 + 加權 + 題數），iPad 驗證三項功能
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 303 字重建）

## ⚠️ 注意事項
- 刪除：`renderRecords` 每筆加 `.rdel` 按鈕，`e.stopPropagation()` 防止觸發詳情，`deleteRecord(i)` 從 localStorage 刪除並同步
- 加權：`getWrongWordsByName(name)` 歷史錯題按 count 排序，`weightedPick` 重複錯題 3 次後 shuffle 再取，確保不出現重複題
- 題數：count-options 改五選一（15/20/25/30/全部），`questionCount=0` 為全部，`poolSize` 不變

## 🕐 最後更新
- 時間：2026-08-25
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（刪除 + 加權 + 題數）
