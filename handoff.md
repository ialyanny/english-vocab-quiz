# 交接檔

## ⏯️ 目前做到哪
- 新增高中龍騰 B1 294字/294句 + B2 160字/160句，題庫擴充至 303+454=757 字
- 範圍選擇：首頁新增「高二開學考」區塊（龍騰 B1 / B2 / 高中全部），與國中區互不干擾、可複選混考
- 先前三項功能：成績紀錄可刪除、同姓名錯題加權、題數自訂 15/20/25/30/全部
- JUL 103字 + KK 音標（`f45609e`）已上線

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 待部署
- 已驗證：`node --check data.js/app.js` 通過，WORDS B1=294 B2=160，SENTENCES B1=294 B2=160，範圍混選、高中獨立出題
- Git：本地 `data.js/index.html/app.js/AGENTS.md` 已改待 commit

## ➡️ 下一步
1. `git commit + push` 本次（高中 B1/B2 + 範圍 + 先前刪除/加權/題數），iPad 驗證高中單元獨立與混考
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 757 字重建）

## ⚠️ 注意事項
- 範圍邏輯：`app.js:80` getActiveUnits 自動合併國中/高中單元，`updateRangeCounts` 分別更新兩區計數
- 高中 SENTENCES 由 Groq 120b 批次生成（每批 10 字），B1 294 句、B2 160 句，格式 {s,blank,base,zh}
- 刪除：`renderRecords` 每筆加 `.rdel` 按鈕，`e.stopPropagation()` 防止觸發詳情，`deleteRecord(i)` 從 localStorage 刪除並同步
- 加權：`getWrongWordsByName(name)` 歷史錯題按 count 排序，`weightedPick` 重複錯題 3 次後 shuffle 再取，確保不出現重複題
- 題數：count-options 改五選一（15/20/25/30/全部），`questionCount=0` 為全部

## 🕐 最後更新
- 時間：2026-08-27
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（高中 B1/B2 + 範圍 + 刪除 + 加權 + 題數）
