# 英文單字考試 — 專案藍圖

## 專案目標
為小朋友製作 iPad 可考的英文單字網站：從課本圖片擷取藍色字體單字，支援發音、多題型、提醒、手寫填空、成績與錯題複習，部署於 GitHub Pages。

- 網址：https://ialyanny.github.io/english-vocab-quiz/
- Repo：ialyanny/english-vocab-quiz (public, main 分支)
- 單字來源：`G:\我的雲端硬碟\英文單字\Unti07`~`Unti10` (44 張 JPG) + 7月空英 103字（人工清單）

## 技術栈
- 前端：純 HTML/CSS/JS (無框架)，Web Speech API 發音
- 資料：`data.js` (WORDS_BY_UNIT / SENTENCES_BY_UNIT / KK_BY_UNIT)、`images.js` (WORD_IMAGES)
- 部署：GitHub Pages

## 路線圖
- [x] 第七回藍色字體 64字/48句 完成並上線
- [x] 成績紀錄可點入看錯題、喇叭複習、再考錯題
- [x] 衍生字只保留藍色字體（剔除 13 個黑色字）
- [x] 範圍選擇（第七/八/九/十/全部，可複選）
- [x] app.js fIdx→entry 遷移，支援依範圍出題
- [x] Unit 08 45字/45句（人工提供，inpresstion→impression）
- [x] 聽音選字改為聽音寫字（手寫輸入）
- [x] Unit 09 46字/46句（人工輸入藍字 + Groq 翻譯例句，已寫入 data.js:119）
- [x] Unit 10 45字/45句（人工輸入藍字 + Groq 翻譯例句，已寫入 data.js:167）
- [x] 聽音寫字可重複聽發音（app.js:265 顯示喇叭 + 點再聽）
- [x] 中→英填空取消配圖（app.js:242 依 q.type==='zh2en' 隱藏 WORD_IMAGES）
- [x] 題型可複選（app.js:37 selectedModes + index.html:264 可複選，混合為全選）
- [x] 成績畫面 null 修正（index.html:347 補 id、app.js:530 防禦，修 Cannot set properties of null）
- [x] 英翻中選項純中文（app.js:273 correct=zh）、全面移除圖片（app.js:295 一律隱藏）
- [x] 網頁上方截斷修正（index.html:11 body 改 flex-start + 100dvh + safe-area）
- [x] 成績紀錄雲端自動同步 + 匯出匯入（app.js:575 NPOINT + index.html 成績紀錄區）
- [x] 7月空英 103字/103句 + KK 音標（JUL, data.js:214/320/626, 英翻中題目顯示 KK via getKK）
- [x] 成績紀錄可單筆刪除（app.js deleteRecord + renderRecords 刪除按鈕）
- [x] 同姓名錯題加權（app.js getWrongWordsByName + weightedPick，錯題出現頻率 ×3）
- [x] 題數自訂 15/20/25/30/全部（index.html count-options 五選一）
- [ ] 重建 WORD_IMAGES 配圖（目前仍對應舊清單）

## 資料夾結構
```
英文單字考試/
├── index.html  # 頁面與範圍/題型選擇
├── app.js      # 全部邏輯（出題、發音、提醒半分、成績、複習）
├── data.js     # WORDS_BY_UNIT / SENTENCES_BY_UNIT + WORDS/SENTENCES 相容
├── images.js   # WORD_IMAGES
└── qrcode.png
```

## 開發注意
- `data.js` 按回分組，選範圍時用 getFilteredWords()/getFilteredSentences()
- 考題物件為 {type, entry}（entry 為 [en,zh] 或 {s,blank,base,zh}），複習用 {type, snap}
- 提醒用過答對得 0.5 分，en2zh 不顯示提醒
- 聽音寫字顯示喇叭可重播，中→英填空隱藏圖片，題型支援複選（selectedModes）
- 7月空英為獨立單元 JUL，英翻中題目透過 getKK(unit) 顯示 KK 音標（僅 JUL 有，其餘留空）
- Groq Vision 免費版 200K TPD，每張圖 ~1.9K tokens（600px壓縮），Unit 09/10 已改人工輸入繞過額度；Groq 文字模型（openai/gpt-oss-20b/120b）用於翻譯與例句生成
