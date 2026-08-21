# 交接檔

## ⏯️ 目前做到哪
- Unit 09 完成：46 個藍色字體單字 + 46 句已寫入 `data.js:119` WORDS_BY_UNIT["09"] / SENTENCES_BY_UNIT["09"]（人工輸入藍字，Groq openai/gpt-oss-20b 翻譯 + gpt-oss-120b 造例句）
- Unit 10 完成：45 個藍色字體單字 + 45 句已寫入 `data.js:167` WORDS_BY_UNIT["10"] / SENTENCES_BY_UNIT["10"]（同上，contnual→continual、houswork→housework 已修正）
- Unit 08 已完成（45字/45句）、聽音改寫字已上線
- Groq Vision 本地土法 OCR 驗證失敗（RapidOCR 藍色遮罩僅 2.7% 難以區分），改用 `manual_input/index.html` 人工助手收集 21 張圖藍字

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 待部署（本地 data.js 已含 07:64 + 08:45 + 09:46 + 10:45 = 200字 / 184句）
- 已驗證：`node --check data.js` 通過，`WORDS 09` 46、`SENTS 09` 46、`WORDS 10` 45、`SENTS 10` 45
- Git：data.js 已修改待 commit，manual_input/ 為本地助手（不納入提交）

## ➡️ 下一步
1. `git commit + push` 上線，驗證 GitHub Pages 範圍選擇（07/08/09/10/全部）出題正常
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 200 字重建）
3. 清理本地助手與暫存（manual_input、ocr_test.txt 等不提交）

## ⚠️ 注意事項
- Groq Vision 200K TPD 當日已滿（Used 199961），單張 800px~1.9K tokens 仍需 22分冷卻，09/10 已改人工輸入繞過
- Groq 文字模型額度獨立，已用 openai/gpt-oss-20b (2022+1549 tokens) 翻譯、openai/gpt-oss-120b (5268+4238 tokens) 造例句
- data.js 修正：contnual→continual、houswork→housework、fort 保留為「要塞」

## 🕐 最後更新
- 時間：2026-08-21 晚間
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（09/10 已寫入）
