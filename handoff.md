# 交接檔

## ⏯️ 目前做到哪
- Unit 09/10 已完成並推上線 `b4a511f`：09 46字/46句 + 10 45字/45句（人工藍字 + Groq 翻譯例句，已修正 contnual/houswork）
- 本次新增（待推）：聽音寫字重複聽發音（`app.js:265` 顯示喇叭、點再聽）、中→英填空隱藏圖片（`app.js:242`）、題型可複選（`app.js:37` selectedModes + `index.html:264`）
- 範圍選擇已支援 07/08/09/10 四回 + 全部（可複選），題型支援複選（混合為全選）

## 🚦 目前狀態
- 可運行：https://ialyanny.github.io/english-vocab-quiz/ 已上線 200字/184句，本地新增三項待部署
- 已驗證：`node --check app.js/data.js` 通過，`WORDS 09` 46、`SENTS 09` 46、`WORDS 10` 45、`SENTS 10` 45，選型複選邏輯已測
- Git：`b4a511f` 已推，本地 `app.js/index.html/AGENTS.md` 已改待 commit

## ➡️ 下一步
1. `git commit + push` 本次三項（聽音重播、zh2en無圖、題型複選），驗證 iPad 實際操作
2. 重建 WORD_IMAGES 配圖（目前仍對應舊清單，需按新 200 字重建）
3. 清理暫存並更新 handoff

## ⚠️ 注意事項
- 聽音寫字：`renderQuestion:265` 顯示喇叭 + `speak-hint` 改為「點一下再聽一次」，`speak-btn` 點擊對 listen 有效、zh2en 仍隱藏
- 中→英填空：`app.js:242` 以 `q.type==='zh2en'` 隱藏 WORD_IMAGES，與聽音寫字區隔
- 題型複選：`selectedModes` Set 至少一項，`getSelectedModes()` 展開 mixed，`getModeLabel()` 用於成績紀錄
- Groq 額度：Vision 200K TPD 已滿，文字模型獨立

## 🕐 最後更新
- 時間：2026-08-21 晚間
- 更新者：Muse Spark @ CORNI
- Git push：⏳ 待推（聽音重播 + zh2en無圖 + 題型複選）
