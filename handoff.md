# 交接檔

## ⏯️ 目前做到哪
- 7月空英 103字/103句 + KK 音標已完成：`data.js:214` WORDS_BY_UNIT["JUL"]、`data.js:320` KK_BY_UNIT["JUL"]、`data.js:626` SENTENCES_BY_UNIT["JUL"]，英翻中透過 `getKK()` 在題目下方顯示 KK（僅 JUL 有）
- 範圍選擇已新增「7月空英」按鈕（`index.html:262`），`app.js:82` 已支援 JUL（getActiveUnits/updateRangeCounts/getRangeLabel），`index.html:228` 改 3 欄佈局
- 先前修復（`c9056dc/ed70627/ed9dbae`）已上線：en2zh 純中文、成績 null、無圖、版面截斷、同步匯出

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 待部署（200+103=303字 / 184+103=287句，含 JUL）
- 已驗證：`node --check data.js/app.js` 通過，`WORDS JUL` 103、`KK JUL` 103（74 有值 29 空）、`SENTS JUL` 103，`en2zh` 題目顯示 KK
- Git：本地 `data.js/index.html/app.js/AGENTS.md` 已改待 commit（JUL + KK）

## ➡️ 下一步
1. `git commit + push` 本次（JUL 103 + KK + 範圍按鈕），iPad 驗證 7月空英範圍與英翻中 KK 顯示
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 303 字重建）
3. 補齊 29 個缺 KK（`appeal` 等）或改用 Groq 批次補（可選）

## ⚠️ 注意事項
- JUL 單字來源為人工清單 103 字，已按字母排序寫入；KK 來自 DictionaryAPI IPA 轉括號，29 個缺值留空（app 已防禦）
- 英翻中 KK：`app.js:331` 透過 `getKK(en, unit)` 顯示於 `zh-hint`，僅 JUL 有值，其他回留空
- 範圍：`index.html:228` 改 3 欄，`app.js:82/98/104/144/533` 已加入 JUL，所有 `every` 判斷已更新
- 同步與版面修正已在前次 `ed9dbae` 完成，本次僅新增 JUL

## 🕐 最後更新
- 時間：2026-08-22 凌晨
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（JUL 103 + KK + 範圍按鈕）
