# 英文單字考試 — 專案藍圖

## 專案目標
為小朋友製作 iPad 可考的英文單字網站：從課本圖片擷取藍色字體單字，支援發音、多題型、提醒、手寫填空、成績與錯題複習，部署於 GitHub Pages。

- 網址：https://ialyanny.github.io/english-vocab-quiz/
- Repo：ialyanny/english-vocab-quiz (public, main 分支)
- 單字來源：`G:\我的雲端硬碟\英文單字\Unti07`~`Unti10` (44 張 JPG)

## 技術栈
- 前端：純 HTML/CSS/JS (無框架)，Web Speech API 發音
- 資料：`data.js` (WORDS_BY_UNIT / SENTENCES_BY_UNIT)、`images.js` (WORD_IMAGES)
- 部署：GitHub Pages

## 路線圖
- [x] 第七回藍色字體 64字/48句 完成並上線
- [x] 成績紀錄可點入看錯題、喇叭複習、再考錯題
- [x] 衍生字只保留藍色字體（剔除 13 個黑色字）
- [x] 範圍選擇（第七/八/九/十/全部，可複選）
- [x] app.js fIdx→entry 遷移，支援依範圍出題
- [x] Unit 08 45字/45句（人工提供，inpresstion→impression）
- [x] 聽音選字改為聽音寫字（手寫輸入）
- [ ] Unit 09 藍色字體待補
- [ ] Unit 10 藍色字體待補
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
- Groq Vision 免費版 200K TPD，每張圖 ~4.6K tokens，Unit 07 已用高額度，09/10 待人工或隔日額度重置再補
