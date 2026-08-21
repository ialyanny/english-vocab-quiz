# 交接檔

## ⏯️ 目前做到哪
- Unit 08 完成：已將 45 個藍色字體單字 + 45 句寫入 `data.js` WORDS_BY_UNIT["08"] / SENTENCES_BY_UNIT["08"]，已 commit `9c06c4f` 並 push 上線
- 聽音題型已改為「聽音寫字」：從選擇題改為聽發音+看中文，手寫輸入英文，`app.js:265` 改用 setupTyping()，`index.html` 按鈕文案同步更新
- 排程 BlueBatchOCR 已取消（因改為人工提供 Unit 08）
- 網站已驗證：data.js 含 prominent/impression 等 45 字，app.js 含「聽音寫字」

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 正常，第七回 64題/第八回 45題可選
- 待補：Unit 09、Unit 10 仍為空陣列（需人工提供藍色字清單或等 Groq 額度重置）
- Git 乾淨：最後 commit 9c06c4f 已 push

## ➡️ 下一步
1. 取得 Unit 09 藍色字清單 → 同格式寫入 `data.js`（參考 Unit 08 段落）
2. 取得 Unit 10 藍色字清單 → 同格式寫入
3. 句子部分可沿用 Unit 08 的生成邏輯（post_process.py 已有模板）或人工提供課本例句

## ⚠️ 注意事項
- Groq Vision 免費版 200K TPD 額度已用 ~197K，每張圖 ~4.6K tokens，一天最多 ~43 張，需等 UTC 00:00 重置或改人工輸入較快
- `blue_batch.py` 已改為 MAX_DIM=800 / JPEG_QUALITY=55 以省 tokens，仍需額度重置才可跑 09/10
- data.js 寫入時注意 `inpresstion` → `impression` 已修正

## 🕐 最後更新
- 時間：2026-08-21 晚間
- 更新者：Muse Spark @ CORNI
- Git push：✅ 已推 (9c06c4f)
