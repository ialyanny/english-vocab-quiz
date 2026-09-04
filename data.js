"use strict";

// ===== 單字資料：依回分組（藍色字體 + 7月空英）=====
// 已完成（07:64字/48句 08:45字/45句 09:46字/46句 10:45字/45句 JUL:103字/103句）
const WORDS_BY_UNIT = {
  "07": [
    ["pace", "步調；踱步"],
    ["acceptance", "接受（名詞）"],
    ["accept", "接受（動詞）"],
    ["acceptable", "可接受的"],
    ["retain", "保留；保有"],
    ["maintain", "維持"],
    ["sustain", "維持（生命）"],
    ["detain", "扣留；拘留"],
    ["content", "滿足的；使滿足"],
    ["contented", "感到滿足的"],
    ["contentment", "知足；滿足"],
    ["discontent", "不滿意的"],
    ["abandon", "放棄；拋棄"],
    ["foundation", "地基；基金會"],
    ["founder", "創立者"],
    ["assembly", "集會；裝配"],
    ["assemble", "組裝；集合"],
    ["shelter", "庇護處；避難"],
    ["encounter", "不期而遇"],
    ["theme", "主題"],
    ["phenomenon", "現象"],
    ["phenomenal", "了不起的"],
    ["rural", "鄉村的"],
    ["liquor", "烈酒"],
    ["site", "地點；場所"],
    ["code", "密碼；規範"],
    ["lean", "斜靠；瘦的"],
    ["pursue", "追求（動詞）"],
    ["pursuit", "追求（名詞）"],
    ["academic", "學術的"],
    ["academy", "學院"],
    ["maximum", "最大量"],
    ["maximize", "使增至最大"],
    ["minimum", "最小量"],
    ["minimize", "使降至最低"],
    ["manufacture", "製造；生產"],
    ["manufacturer", "製造商"],
    ["produce", "生產（動詞）"],
    ["cooperate", "合作（動詞）"],
    ["cooperation", "合作（名詞）"],
    ["cooperative", "合作的"],
    ["overcome", "克服"],
    ["creation", "創造（名詞）"],
    ["creativity", "創造力"],
    ["tragedy", "悲劇"],
    ["tragic", "悲劇的"],
    ["comedy", "喜劇"],
    ["comedian", "喜劇演員"],
    ["commerce", "商業"],
    ["commercial", "商業的"],
    ["constitute", "構成"],
    ["constitution", "憲法"],
    ["constitutional", "憲法的"],
    ["numerous", "極多的"],
    ["plentiful", "許多的"],
    ["manual", "使用手冊；手工的"],
    ["quarrel", "爭吵"],
    ["squabble", "爭吵；口角"],
    ["argument", "爭執"],
    ["argue", "爭執；爭論"],
    ["renew", "更新（動詞）"],
    ["renewal", "更新（名詞）"],
    ["shade", "陰涼處；卷簾"],
    ["shady", "陰涼的"]
  ],
  "08": [
    ["prominent", "顯著的；突出的"],
    ["fundamental", "基本的；根本的"],
    ["concentrate", "專心；集中"],
    ["concentration", "專心；濃度"],
    ["incident", "事件"],
    ["precise", "精確的"],
    ["precisely", "精確地；恰好"],
    ["agreeable", "令人愉快的；適宜的"],
    ["convention", "大會；慣例"],
    ["conventional", "傳統的；慣例的"],
    ["elsewhere", "在別處"],
    ["percent", "百分之"],
    ["percentage", "百分比"],
    ["imply", "暗示；意味著"],
    ["chamber", "房間；議場"],
    ["sympathy", "同情"],
    ["sympathetic", "有同情心的"],
    ["absorb", "吸收；使全神貫注"],
    ["attach", "附上；貼上"],
    ["attachment", "附件；依戀"],
    ["deserve", "應得；值得"],
    ["spiritual", "精神的；心靈的"],
    ["definite", "明確的"],
    ["definitely", "肯定地；明確地"],
    ["resistance", "抵抗；阻力"],
    ["loan", "貸款；借出"],
    ["formation", "形成；編隊"],
    ["register", "登記；註冊"],
    ["registration", "登記；註冊"],
    ["accuse", "控告；指責"],
    ["consult", "商量；諮詢"],
    ["consultant", "顧問"],
    ["efficiency", "效率"],
    ["universal", "全球的；普遍的"],
    ["flee", "逃走；逃避"],
    ["install", "安裝"],
    ["isolate", "隔離；孤立"],
    ["isolated", "孤立的；隔離的"],
    ["isolation", "隔離；孤立"],
    ["route", "路線；途徑"],
    ["welfare", "福利；福祉"],
    ["appreciation", "感激；欣賞"],
    ["spark", "火花；引發"],
    ["fax", "傳真"],
    ["impression", "印象"]
  ],
  "09": [
    ["continuous", "連續的"],
    ["continuously", "連續地"],
    ["continual", "不斷的"],
    ["plot", "情節"],
    ["consume", "消耗"],
    ["consumer", "消費者"],
    ["crack", "裂縫"],
    ["invest", "投資"],
    ["investment", "投資"],
    ["investor", "投資者"],
    ["calculate", "計算"],
    ["calculation", "計算"],
    ["regulate", "調節"],
    ["regulation", "規章"],
    ["machinery", "機械"],
    ["mechanic", "機械師"],
    ["mechanical", "機械的"],
    ["witness", "證人"],
    ["prime", "主要的"],
    ["dominant", "主導的"],
    ["dominate", "支配"],
    ["satisfaction", "滿意"],
    ["dissatisfaction", "不滿"],
    ["interpret", "解釋"],
    ["translate", "翻譯"],
    ["translation", "翻譯"],
    ["translator", "翻譯者"],
    ["virtue", "美德"],
    ["permanent", "永久的"],
    ["transfer", "轉移"],
    ["regarding", "關於"],
    ["fort", "要塞"],
    ["reception", "接待"],
    ["genuine", "真實的"],
    ["authentic", "真實的"],
    ["indication", "指示"],
    ["laboratory", "實驗室"],
    ["horizon", "地平線"],
    ["primitive", "原始的"],
    ["severe", "嚴重的"],
    ["annoy", "惹惱"],
    ["annoyed", "惱怒的"],
    ["annoying", "惹人厭的"],
    ["millionaire", "億萬富翁"],
    ["category", "類別"],
    ["representation", "代表"]
  ],
  "10": [
    ["merit", "優點"],
    ["curve", "曲線"],
    ["license", "執照"],
    ["dignity", "尊嚴"],
    ["dignify", "使光榮"],
    ["differ", "不同"],
    ["limitation", "限制"],
    ["conscience", "良心"],
    ["lecture", "演講"],
    ["lecturer", "講師"],
    ["quilt", "被子"],
    ["disturb", "打擾"],
    ["disturbing", "令人不安的"],
    ["aspirin", "阿司匹林"],
    ["predict", "預測"],
    ["prediction", "預測"],
    ["forecast", "預報"],
    ["cease", "停止"],
    ["ceasefire", "停火"],
    ["opera", "歌劇"],
    ["ballet", "芭蕾舞"],
    ["gallery", "畫廊"],
    ["restriction", "限制"],
    ["enforce", "執行"],
    ["enforcement", "執行"],
    ["complicate", "複雜化"],
    ["complicated", "複雜的"],
    ["era", "時代"],
    ["dependent", "依賴的"],
    ["dependence", "依賴"],
    ["dependable", "可靠的"],
    ["frequency", "頻率"],
    ["logic", "邏輯"],
    ["logical", "合乎邏輯的"],
    ["illogical", "不合邏輯的"],
    ["presentation", "演示"],
    ["admission", "入場券"],
    ["guilt", "罪惡感"],
    ["guilty", "有罪的"],
    ["reform", "改革"],
    ["household", "家庭"],
    ["housework", "家務"],
    ["celebration", "慶祝"],
    ["issue", "事項"],
    ["lengthen", "延長"]
  ],
  "JUL": [
    ["acceptance", "接納；認可"],
    ["accuse", "指控，控告"],
    ["adventure", "冒險"],
    ["advertisement", "廣告"],
    ["agent", "代理人"],
    ["agreeable", "欣然同意的；親切友善的"],
    ["amuse", "使開心"],
    ["appeal", "吸引力"],
    ["appreciation", "欣賞；理解"],
    ["aspect", "方面；層面"],
    ["attach", "把…作為電子郵件的附件；附上"],
    ["attract", "吸引"],
    ["automatic", "必然的；自動的"],
    ["batter", "猛擊；搗毀"],
    ["blink", "眨（眼睛）"],
    ["bond", "聯繫；關係"],
    ["capable", "有能力的"],
    ["cashier", "收銀員"],
    ["categorize", "將…分類"],
    ["cavern", "大洞穴"],
    ["Celsius", "攝氏的"],
    ["companion", "伙伴；同伴"],
    ["condense", "凝結；濃縮"],
    ["conservation", "保育；保護"],
    ["convenience", "便利，方便"],
    ["critic", "批評者"],
    ["critical", "批判的；挑剔的"],
    ["criticize", "批評；指責"],
    ["deceive", "欺騙"],
    ["descent", "下降，下落"],
    ["detain", "拘留，扣押"],
    ["devastation", "破壞；蹂躪"],
    ["device", "裝置"],
    ["digital", "數位的"],
    ["discouragement", "挫折；洩氣"],
    ["discriminate", "歧視；差別對待"],
    ["dismantle", "廢除，取消"],
    ["distinction", "區分；差別"],
    ["duration", "持續時間"],
    ["ecological", "生態的；環保的"],
    ["economics", "經濟學"],
    ["envision", "想像；設想"],
    ["exceed", "超過；超越"],
    ["exhibit", "展覽，展出"],
    ["exhibition", "展覽"],
    ["exotic", "異國情調的"],
    ["fold", "摺疊"],
    ["formidable", "令人畏懼的；難對付的"],
    ["frustration", "受挫；沮喪"],
    ["global", "全球的"],
    ["grapefruit", "葡萄柚"],
    ["greedy", "貪婪的"],
    ["historian", "歷史學家"],
    ["identify", "認出，識別"],
    ["illuminate", "照亮"],
    ["immense", "巨大的，無限的"],
    ["impact", "巨大影響；衝擊"],
    ["injustice", "不公正；非公義"],
    ["intensify", "增強；變激烈"],
    ["interactive", "互動的"],
    ["interpret", "理解，解釋"],
    ["journalism", "新聞工作；新聞業"],
    ["liberty", "自由"],
    ["memorial", "紀念物；紀念碑"],
    ["miserable", "痛苦的；悲慘的"],
    ["mislead", "誤導"],
    ["monster", "怪物"],
    ["mountainous", "多山的；有山的"],
    ["opposition", "反對，反抗"],
    ["panic", "恐慌，驚慌"],
    ["patience", "耐心"],
    ["perspective", "觀點，想法"],
    ["pollute", "污染"],
    ["predict", "預料；預測"],
    ["preservation", "保護，維護"],
    ["prioritize", "確定優先次序"],
    ["realistic", "實際的；現實的"],
    ["reed", "蘆葦"],
    ["reflect", "深思；映現"],
    ["release", "上映；發布"],
    ["reliability", "可靠性"],
    ["repetitive", "重複的；反覆的"],
    ["revolution", "革命"],
    ["software", "軟體"],
    ["strive", "努力，奮鬥"],
    ["stubbornly", "頑固地；固執地"],
    ["studio", "電影公司"],
    ["sue", "控告"],
    ["superb", "極好的；超級的"],
    ["suspend", "使停職；使停學"],
    ["tablet", "平板電腦"],
    ["timid", "膽小的"],
    ["tolerate", "容忍；忍受"],
    ["tragic", "悲劇的；悲慘的"],
    ["transportation", "運送；交通工具"],
    ["tremble", "顫抖，發抖"],
    ["trend", "趨勢；傾向"],
    ["unrealistic", "不切實際的"],
    ["viable", "可行的"],
    ["viewpoint", "觀察點；角度"],
    ["visual", "視覺的"],
    ["volcano", "火山"],
    ["witch", "魔女；女巫"]
  ],
  "B1": [
    [
        "a means of",
        "一種方法"
    ],
    [
        "accordingly",
        "因此"
    ],
    [
        "actually",
        "實際上"
    ],
    [
        "additionally",
        "此外"
    ],
    [
        "air-traffic control",
        "航空管制"
    ],
    [
        "aisle",
        "通道"
    ],
    [
        "Alert",
        "警報"
    ],
    [
        "also",
        "也"
    ],
    [
        "and",
        "和"
    ],
    [
        "App",
        "應用程式"
    ],
    [
        "Artificial Intelligence",
        "人工智慧"
    ],
    [
        "as a consequence",
        "結果"
    ],
    [
        "as a result",
        "結果"
    ],
    [
        "Automation",
        "自動化"
    ],
    [
        "awareness",
        "意識"
    ],
    [
        "bag",
        "袋子"
    ],
    [
        "bare hands",
        "空手"
    ],
    [
        "barely",
        "幾乎不"
    ],
    [
        "besides",
        "此外"
    ],
    [
        "beverage",
        "飲料"
    ],
    [
        "billion",
        "十億"
    ],
    [
        "billionaire",
        "億萬富翁"
    ],
    [
        "biodegradable",
        "可生物降解的"
    ],
    [
        "Bite",
        "咬"
    ],
    [
        "Bite mark",
        "咬痕"
    ],
    [
        "Burrow",
        "洞穴"
    ],
    [
        "candy",
        "糖果"
    ],
    [
        "Canine",
        "犬類的"
    ],
    [
        "carbon footprint",
        "碳足跡"
    ],
    [
        "cash",
        "現金"
    ],
    [
        "cash register",
        "收銀機"
    ],
    [
        "certain",
        "某一；確定的"
    ],
    [
        "certainly",
        "當然"
    ],
    [
        "checkout",
        "結帳"
    ],
    [
        "chef",
        "主廚"
    ],
    [
        "Circadian rhythm",
        "循環節律"
    ],
    [
        "circular economy",
        "循環經濟"
    ],
    [
        "Citizen",
        "公民"
    ],
    [
        "Climate",
        "氣候"
    ],
    [
        "Cloud",
        "雲端"
    ],
    [
        "communicate",
        "溝通"
    ],
    [
        "Communication",
        "溝通"
    ],
    [
        "compost",
        "堆肥"
    ],
    [
        "connect A with B",
        "將A與B連接"
    ],
    [
        "connection",
        "連接"
    ],
    [
        "consequently",
        "因此"
    ],
    [
        "conservation",
        "保育"
    ],
    [
        "consumption",
        "消費"
    ],
    [
        "contamination",
        "污染"
    ],
    [
        "coupon",
        "優惠券"
    ],
    [
        "credit card",
        "信用卡"
    ],
    [
        "Crime",
        "犯罪"
    ],
    [
        "Crime scene",
        "犯罪現場"
    ],
    [
        "Culture",
        "文化"
    ],
    [
        "customer",
        "顧客"
    ],
    [
        "Data",
        "數據"
    ],
    [
        "Deep sleep",
        "深度睡眠"
    ],
    [
        "degree",
        "程度；學位"
    ],
    [
        "Democracy",
        "民主"
    ],
    [
        "Den",
        "巢穴"
    ],
    [
        "Detection",
        "探測"
    ],
    [
        "Detection dog",
        "探測犬"
    ],
    [
        "Dialect",
        "方言"
    ],
    [
        "Digital",
        "數位"
    ],
    [
        "Diplomacy",
        "外交"
    ],
    [
        "disconnect",
        "斷開"
    ],
    [
        "discount",
        "折扣"
    ],
    [
        "disposable",
        "可丟棄的"
    ],
    [
        "disposal",
        "處理"
    ],
    [
        "distinguish",
        "區分"
    ],
    [
        "distinguished",
        "卓越的"
    ],
    [
        "Diurnal",
        "日行性"
    ],
    [
        "Diversity",
        "多樣性"
    ],
    [
        "Dog",
        "狗"
    ],
    [
        "Dream",
        "夢"
    ],
    [
        "eco-friendly",
        "環保的"
    ],
    [
        "ecological",
        "生態的"
    ],
    [
        "Economy",
        "經濟"
    ],
    [
        "ecosystem",
        "生態系統"
    ],
    [
        "educate",
        "教育"
    ],
    [
        "educated",
        "受過教育的"
    ],
    [
        "education",
        "教育"
    ],
    [
        "educational",
        "教育的"
    ],
    [
        "embrace",
        "擁抱"
    ],
    [
        "Environment",
        "環境"
    ],
    [
        "environmental impact",
        "環境影響"
    ],
    [
        "etc",
        "等等"
    ],
    [
        "Evidence",
        "證據"
    ],
    [
        "Exhibit",
        "展示"
    ],
    [
        "Export",
        "出口"
    ],
    [
        "extinguish",
        "熄滅"
    ],
    [
        "fiction",
        "小說；虛構作品"
    ],
    [
        "fire extinguisher",
        "滅火器"
    ],
    [
        "Footprint",
        "足跡"
    ],
    [
        "for instance",
        "例如"
    ],
    [
        "Forensic",
        "法醫的"
    ],
    [
        "Forensic science",
        "法醫科學"
    ],
    [
        "Foundation",
        "基礎"
    ],
    [
        "Freedom",
        "自由"
    ],
    [
        "Freedom of assembly",
        "集會自由"
    ],
    [
        "Freedom of choice",
        "選擇自由"
    ],
    [
        "Freedom of expression",
        "表達自由"
    ],
    [
        "Freedom of movement",
        "移動自由"
    ],
    [
        "Freedom of religion",
        "宗教自由"
    ],
    [
        "Freedom of speech",
        "言論自由"
    ],
    [
        "Freedom of the press",
        "報紙自由"
    ],
    [
        "Global Positioning System",
        "全球定位系統"
    ],
    [
        "global warming",
        "全球暖化"
    ],
    [
        "Globalization",
        "全球化"
    ],
    [
        "globe",
        "球體；地球儀"
    ],
    [
        "govern",
        "統治"
    ],
    [
        "government",
        "政府"
    ],
    [
        "green",
        "綠色的"
    ],
    [
        "greenhouse gas",
        "溫室氣體"
    ],
    [
        "habitat",
        "棲息地"
    ],
    [
        "Handler",
        "牽引者"
    ],
    [
        "Hardware",
        "硬體"
    ],
    [
        "hazardous",
        "有害的"
    ],
    [
        "hence",
        "因此"
    ],
    [
        "Heritage",
        "遺產"
    ],
    [
        "Hibernation",
        "冬眠"
    ],
    [
        "History",
        "歷史"
    ],
    [
        "hug",
        "擁抱"
    ],
    [
        "Iconic",
        "標誌性的"
    ],
    [
        "imagination",
        "想像力"
    ],
    [
        "imagine",
        "想像"
    ],
    [
        "Immigrant",
        "移民"
    ],
    [
        "Immigration",
        "移民"
    ],
    [
        "Immigration law",
        "移民法"
    ],
    [
        "Immigration policy",
        "移民政策"
    ],
    [
        "Import",
        "進口"
    ],
    [
        "in addition",
        "另外"
    ],
    [
        "in fact",
        "事實上"
    ],
    [
        "in practice",
        "實際上"
    ],
    [
        "in reality",
        "實際上"
    ],
    [
        "in truth",
        "事實上"
    ],
    [
        "Inauguration",
        "揭幕"
    ],
    [
        "incineration",
        "焚燒"
    ],
    [
        "inform sb of sth",
        "通知某人某事"
    ],
    [
        "information",
        "資訊"
    ],
    [
        "information desk",
        "服務台"
    ],
    [
        "Innovation",
        "創新"
    ],
    [
        "Insomnia",
        "失眠"
    ],
    [
        "instant",
        "即時的"
    ],
    [
        "instead",
        "反而；改為"
    ],
    [
        "instead of",
        "代替…；而不是"
    ],
    [
        "international",
        "國際的"
    ],
    [
        "Internet",
        "互聯網"
    ],
    [
        "invention",
        "發明"
    ],
    [
        "inventory",
        "庫存"
    ],
    [
        "Investigation",
        "調查"
    ],
    [
        "K-9",
        "警犬"
    ],
    [
        "K9 unit",
        "警犬隊"
    ],
    [
        "karaoke",
        "卡拉OK"
    ],
    [
        "ketchup",
        "番茄醬"
    ],
    [
        "landfill",
        "垃圾填埋場"
    ],
    [
        "Landmark",
        "地標"
    ],
    [
        "Language",
        "語言"
    ],
    [
        "Liberation",
        "解放"
    ],
    [
        "Liberty",
        "自由"
    ],
    [
        "Light exposure",
        "光照"
    ],
    [
        "litter",
        "垃圾"
    ],
    [
        "loyalty card",
        "會員卡"
    ],
    [
        "Machine Learning",
        "機器學習"
    ],
    [
        "main idea",
        "主旨"
    ],
    [
        "major",
        "主要的；主修"
    ],
    [
        "major in English",
        "主修英文"
    ],
    [
        "majority",
        "多數"
    ],
    [
        "marine pollution",
        "海洋污染"
    ],
    [
        "media",
        "媒體（複數）"
    ],
    [
        "medium",
        "媒介"
    ],
    [
        "Melatonin",
        "褪黑激素"
    ],
    [
        "Migration",
        "遷徙"
    ],
    [
        "Monument",
        "紀念碑"
    ],
    [
        "Nap",
        "小睡"
    ],
    [
        "Narcolepsy",
        "嗜睡症"
    ],
    [
        "National",
        "國家"
    ],
    [
        "Negotiation",
        "談判"
    ],
    [
        "Network",
        "網路"
    ],
    [
        "Nocturnal",
        "夜行性"
    ],
    [
        "Nose",
        "鼻子"
    ],
    [
        "Nose work",
        "嗅覺工作"
    ],
    [
        "novel",
        "小說"
    ],
    [
        "novelist",
        "小說家"
    ],
    [
        "Obedience",
        "順從"
    ],
    [
        "one-third of",
        "三分之一"
    ],
    [
        "outstanding",
        "傑出的"
    ],
    [
        "overuse",
        "過度使用"
    ],
    [
        "Partnership",
        "合作夥伴關係"
    ],
    [
        "Patriot",
        "愛國者"
    ],
    [
        "Paw",
        "爪子"
    ],
    [
        "Paw print",
        "爪印"
    ],
    [
        "Pedestal",
        "底座"
    ],
    [
        "percent",
        "百分之"
    ],
    [
        "percentage",
        "百分比"
    ],
    [
        "plastic",
        "塑膠"
    ],
    [
        "plastic waste",
        "塑膠廢棄物"
    ],
    [
        "plus",
        "加上"
    ],
    [
        "Police",
        "警察"
    ],
    [
        "Police dog",
        "警犬"
    ],
    [
        "pollution",
        "污染"
    ],
    [
        "pop a question",
        "求婚"
    ],
    [
        "pop music",
        "流行音樂"
    ],
    [
        "population",
        "人口"
    ],
    [
        "Predator",
        "捕食者"
    ],
    [
        "Preservation",
        "保存"
    ],
    [
        "Prey",
        "獵物"
    ],
    [
        "price tag",
        "價格標籤"
    ],
    [
        "product",
        "商品"
    ],
    [
        "propose",
        "提議"
    ],
    [
        "put out",
        "熄滅"
    ],
    [
        "rare",
        "稀有的"
    ],
    [
        "rarely",
        "很少"
    ],
    [
        "receipt",
        "收據"
    ],
    [
        "recycle",
        "回收"
    ],
    [
        "recycling",
        "回收"
    ],
    [
        "reduce",
        "減少"
    ],
    [
        "REM sleep",
        "快速眼動睡眠"
    ],
    [
        "renewable",
        "可再生的"
    ],
    [
        "Renewable Energy",
        "可再生能源"
    ],
    [
        "repurpose",
        "重新利用"
    ],
    [
        "Rescue",
        "救援"
    ],
    [
        "research",
        "研究"
    ],
    [
        "researcher",
        "研究者"
    ],
    [
        "resource",
        "資源"
    ],
    [
        "resourceful",
        "足智多謀的"
    ],
    [
        "Rest",
        "休息"
    ],
    [
        "Restlessness",
        "焦躁"
    ],
    [
        "Robotics",
        "機器人"
    ],
    [
        "Routine",
        "日常"
    ],
    [
        "Scent",
        "氣味"
    ],
    [
        "Scent detection",
        "嗅覺檢測"
    ],
    [
        "Scent trail",
        "嗅線"
    ],
    [
        "sci-fi movie",
        "科幻電影"
    ],
    [
        "science fiction",
        "科幻小說"
    ],
    [
        "Search",
        "搜索"
    ],
    [
        "Seasonal",
        "季節性的"
    ],
    [
        "shopping cart",
        "購物車"
    ],
    [
        "single-use",
        "一次性"
    ],
    [
        "Sleep",
        "睡眠"
    ],
    [
        "Sleep apnea",
        "睡眠呼吸暫停症"
    ],
    [
        "Sleep architecture",
        "睡眠結構"
    ],
    [
        "Sleep cycle",
        "睡眠週期"
    ],
    [
        "Sleep deprivation",
        "睡眠剝奪"
    ],
    [
        "Sleep disorders",
        "睡眠障礙"
    ],
    [
        "Sleep duration",
        "睡眠時長"
    ],
    [
        "Sleep fragmentation",
        "睡眠碎片化"
    ],
    [
        "Sleep hygiene",
        "睡眠衛生"
    ],
    [
        "Sleep latency",
        "入睡潛伏期"
    ],
    [
        "Sleep onset",
        "入睡"
    ],
    [
        "Sleep quality",
        "睡眠品質"
    ],
    [
        "Sleep schedule",
        "睡眠排程"
    ],
    [
        "Slumber",
        "沉睡"
    ],
    [
        "Smartphone",
        "智慧手機"
    ],
    [
        "snack",
        "小吃"
    ],
    [
        "Sniff",
        "嗅探"
    ],
    [
        "Software",
        "軟體"
    ],
    [
        "stand out",
        "突出"
    ],
    [
        "Statue",
        "雕像"
    ],
    [
        "store clerk",
        "店員"
    ],
    [
        "storefront",
        "店面"
    ],
    [
        "Suspect",
        "嫌疑人"
    ],
    [
        "Sustainability",
        "可持續發展"
    ],
    [
        "sustainable",
        "可持續的"
    ],
    [
        "Symbol",
        "象徵"
    ],
    [
        "Tariff",
        "關稅"
    ],
    [
        "Technology",
        "科技"
    ],
    [
        "therefore",
        "因此"
    ],
    [
        "thus",
        "因此"
    ],
    [
        "to some degree",
        "在某種程度上"
    ],
    [
        "Torpor",
        "低代謝"
    ],
    [
        "Tourist",
        "旅客"
    ],
    [
        "toxic",
        "毒性的"
    ],
    [
        "Track",
        "足跡"
    ],
    [
        "Tracking dog",
        "追蹤犬"
    ],
    [
        "Trade",
        "貿易"
    ],
    [
        "Trail",
        "追蹤線"
    ],
    [
        "Training",
        "訓練"
    ],
    [
        "transfer",
        "轉移；轉學"
    ],
    [
        "transformer",
        "變壓器"
    ],
    [
        "translate",
        "翻譯"
    ],
    [
        "Translation",
        "翻譯"
    ],
    [
        "Treaty",
        "條約"
    ],
    [
        "Tribute",
        "敬意"
    ],
    [
        "tsunami",
        "海嘯"
    ],
    [
        "upcycle",
        "升級再利用"
    ],
    [
        "Visitor",
        "參觀者"
    ],
    [
        "Wakeful",
        "醒著"
    ],
    [
        "warn",
        "警告"
    ],
    [
        "waste",
        "廢棄物"
    ],
    [
        "waste management",
        "廢棄物管理"
    ],
    [
        "what's more",
        "更何況"
    ],
    [
        "wildlife",
        "野生動物"
    ],
    [
        "zero waste",
        "零廢棄"
    ]
],
  "B2": [
    [
        "activism",
        "行動主義"
    ],
    [
        "advocacy",
        "倡導"
    ],
    [
        "air traffic control",
        "空中交通管制"
    ],
    [
        "airplane",
        "飛機"
    ],
    [
        "airplane mode",
        "飛行模式"
    ],
    [
        "aisle",
        "走道"
    ],
    [
        "Alchemy",
        "炼金術"
    ],
    [
        "Ambition",
        "雄心"
    ],
    [
        "animation",
        "動畫"
    ],
    [
        "appetizer",
        "前菜"
    ],
    [
        "aptitude",
        "才能"
    ],
    [
        "arrival",
        "抵達"
    ],
    [
        "artificial intelligence",
        "人工智慧"
    ],
    [
        "audience",
        "觀眾"
    ],
    [
        "autism",
        "自閉症"
    ],
    [
        "Ban-doh",
        "板凍"
    ],
    [
        "Birthmark",
        "斑點"
    ],
    [
        "blockchain",
        "區塊鏈"
    ],
    [
        "braised",
        "紅燒"
    ],
    [
        "brand",
        "品牌"
    ],
    [
        "breakthrough",
        "突破"
    ],
    [
        "caregiver",
        "照顧者"
    ],
    [
        "challenge",
        "挑戰"
    ],
    [
        "champion",
        "冠軍"
    ],
    [
        "character",
        "角色"
    ],
    [
        "co-pilot",
        "副飛行員"
    ],
    [
        "coach",
        "教練"
    ],
    [
        "cockpit",
        "機艙"
    ],
    [
        "collaboration",
        "合作"
    ],
    [
        "communication",
        "溝通"
    ],
    [
        "confidence",
        "信心"
    ],
    [
        "Consequence",
        "後果"
    ],
    [
        "courage",
        "勇氣"
    ],
    [
        "creativity",
        "創造力"
    ],
    [
        "crowdsource",
        "眾包"
    ],
    [
        "crunchy",
        "酥脆的"
    ],
    [
        "culinary",
        "烹飪的"
    ],
    [
        "dedication",
        "奉獻"
    ],
    [
        "defeat",
        "失敗"
    ],
    [
        "departure",
        "出發"
    ],
    [
        "determination",
        "決心"
    ],
    [
        "diagnosis",
        "診斷"
    ],
    [
        "digitalization",
        "數位化"
    ],
    [
        "Dilemma",
        "兩難"
    ],
    [
        "discipline",
        "紀律"
    ],
    [
        "discrimination",
        "歧視"
    ],
    [
        "disrupt",
        "顛覆"
    ],
    [
        "dream",
        "夢想"
    ],
    [
        "ecosystem",
        "生態系統"
    ],
    [
        "education",
        "教育"
    ],
    [
        "empathy",
        "同理心"
    ],
    [
        "empowerment",
        "賦權"
    ],
    [
        "entrepreneurship",
        "創業精神"
    ],
    [
        "environment",
        "環境"
    ],
    [
        "Epitome",
        "典型"
    ],
    [
        "equality",
        "平等"
    ],
    [
        "Experiment",
        "實驗"
    ],
    [
        "family",
        "家庭"
    ],
    [
        "flavor",
        "風味"
    ],
    [
        "Flaw",
        "缺陷"
    ],
    [
        "flight",
        "航班"
    ],
    [
        "flight deck",
        "飛行甲板"
    ],
    [
        "focus",
        "專注"
    ],
    [
        "franchise",
        "特許經營"
    ],
    [
        "freedom",
        "自由"
    ],
    [
        "frequency",
        "頻率"
    ],
    [
        "gate",
        "登機門"
    ],
    [
        "genetics",
        "遺傳學"
    ],
    [
        "goal",
        "目標"
    ],
    [
        "grit",
        "堅韌"
    ],
    [
        "Guilt",
        "罪疚"
    ],
    [
        "heritage",
        "文化遺產"
    ],
    [
        "iconic",
        "標誌性的"
    ],
    [
        "Ideal",
        "理想"
    ],
    [
        "imagination",
        "想像力"
    ],
    [
        "in-flight entertainment",
        "機上娛樂"
    ],
    [
        "inclusion",
        "包容"
    ],
    [
        "independence",
        "獨立"
    ],
    [
        "ingredients",
        "食材"
    ],
    [
        "injustice",
        "不公"
    ],
    [
        "innovation",
        "創新"
    ],
    [
        "inspiration",
        "靈感"
    ],
    [
        "intervention",
        "干預"
    ],
    [
        "legacy",
        "遺產"
    ],
    [
        "literacy",
        "識字能力"
    ],
    [
        "marinated",
        "醃製"
    ],
    [
        "mental toughness",
        "心理韌性"
    ],
    [
        "mentorship",
        "指導"
    ],
    [
        "merchandise",
        "商品"
    ],
    [
        "Morality",
        "道德"
    ],
    [
        "motivation",
        "動力"
    ],
    [
        "nanotechnology",
        "奈米技術"
    ],
    [
        "neurodiversity",
        "神經多樣性"
    ],
    [
        "night market",
        "夜市"
    ],
    [
        "Obsession",
        "痴迷"
    ],
    [
        "oppression",
        "壓迫"
    ],
    [
        "overcome",
        "克服"
    ],
    [
        "paradigm",
        "範式"
    ],
    [
        "Paradox",
        "悖論"
    ],
    [
        "parents",
        "父母"
    ],
    [
        "passion",
        "熱情"
    ],
    [
        "Perfection",
        "完美"
    ],
    [
        "perseverance",
        "毅力"
    ],
    [
        "pilot",
        "飛行員"
    ],
    [
        "pitch",
        "簡報"
    ],
    [
        "potential",
        "潛力"
    ],
    [
        "prototype",
        "原型"
    ],
    [
        "radio",
        "無線電"
    ],
    [
        "recipe",
        "食譜"
    ],
    [
        "Redemption",
        "救贖"
    ],
    [
        "reform",
        "改革"
    ],
    [
        "Regret",
        "後悔"
    ],
    [
        "renewable energy",
        "再生能源"
    ],
    [
        "resilience",
        "韌性"
    ],
    [
        "rights",
        "權利"
    ],
    [
        "risk‑taking",
        "冒險精神"
    ],
    [
        "routine",
        "日常"
    ],
    [
        "Sacrifice",
        "牺牲"
    ],
    [
        "sauce",
        "醬汁"
    ],
    [
        "savory",
        "鹹味的"
    ],
    [
        "scholarship",
        "獎學金"
    ],
    [
        "seat",
        "座位"
    ],
    [
        "seat belt",
        "安全帶"
    ],
    [
        "self-advocacy",
        "自我倡導"
    ],
    [
        "self-awareness",
        "自我覺察"
    ],
    [
        "self-esteem",
        "自尊"
    ],
    [
        "siblings",
        "兄弟姐妹"
    ],
    [
        "silent mode",
        "靜音模式"
    ],
    [
        "skill",
        "技能"
    ],
    [
        "snack",
        "小吃"
    ],
    [
        "social skills",
        "社交技巧"
    ],
    [
        "solidarity",
        "團結"
    ],
    [
        "special needs",
        "特殊需求"
    ],
    [
        "spectrum",
        "譜系"
    ],
    [
        "spicy",
        "辣的"
    ],
    [
        "sportsmanship",
        "運動精神"
    ],
    [
        "startup",
        "新創公司"
    ],
    [
        "stewed",
        "燉煮"
    ],
    [
        "storyboard",
        "分鏡腳本"
    ],
    [
        "storytelling",
        "敘事"
    ],
    [
        "street food",
        "街頭小吃"
    ],
    [
        "support",
        "支援"
    ],
    [
        "sustainability",
        "永續性"
    ],
    [
        "synergy",
        "協同效應"
    ],
    [
        "Synthesis",
        "合成"
    ],
    [
        "talent",
        "天賦"
    ],
    [
        "teamwork",
        "團隊合作"
    ],
    [
        "tender",
        "嫩的"
    ],
    [
        "texture",
        "口感"
    ],
    [
        "theme park",
        "主題公園"
    ],
    [
        "therapy",
        "治療"
    ],
    [
        "think outside the box",
        "跳脫框架思考"
    ],
    [
        "tradition",
        "傳統"
    ],
    [
        "training",
        "訓練"
    ],
    [
        "Transgression",
        "過犯"
    ],
    [
        "Vanity",
        "虛榮"
    ],
    [
        "victory",
        "勝利"
    ],
    [
        "visionary",
        "有遠見的"
    ],
    [
        "voice",
        "聲音"
    ],
    [
        "window seat",
        "窗邊座位"
    ]
  ],
  "高2": [
    ["employ", "雇用"],
    ["employer", "雇主"],
    ["employee", "員工；受雇者"],
    ["employment", "工作；受雇"],
    ["corporation", "（大）公司；集團公司"],
    ["corporate", "（大）公司的"],
    ["suffer", "受苦"],
    ["terminal", "末期的；航廈；總站；起訖站"],
    ["illness", "疾病；生病"],
    ["ill", "生病的"],
    ["tremendously", "相當大地"],
    ["tremendous", "相當大的"],
    ["laughter", "笑；笑聲"],
    ["frighten", "使驚嚇"],
    ["fright", "驚嚇"],
    ["contact", "接觸；聯絡"],
    ["germ", "細菌"],
    ["warmth", "熱情；溫暖"],
    ["frail", "虛弱的"],
    ["prompt", "促使；立即的"],
    ["confine", "使離不開(床、輪椅等)；侷限；限定"],
    ["sparkle", "神采；閃耀"],
    ["hug", "擁抱"],
    ["drowsy", "昏昏欲睡的"],
    ["stretch", "伸出(手臂或腿)；伸展；拉長"],
    ["refuse", "拒絕"],
    ["refusal", "拒絕"],
    ["hesitate", "猶豫"],
    ["hesitation", "猶豫"],
    ["pass on...to...", "將……傳給、轉交給……"],
    ["cheer up", "使……振奮、高興"],
    ["turn down", "拒絕……"],
    ["be about to", "即將；正要"],
    ["after all", "畢竟"],
    ["pass away", "過世"],
    ["make a difference", "有所影響"]
  ]
};

// ===== KK 音標（僅 JUL 目前有，其餘為空）=====
const KK_BY_UNIT = {
  "07": {},
  "08": {},
  "09": {},
  "10": {},
  "B1": {},
  "B2": {},
  "JUL": {
    "acceptance": "[ək.ˈsɛp.təns]",
    "accuse": "[əˈkjuːz]",
    "adventure": "[ædˈvɛnt͡ʃɚ]",
    "advertisement": "[ədˈvɜːtɪsmənt]",
    "agent": "[ˈeɪ.dʒənt]",
    "agreeable": "[əˈɡɹiːəbl]",
    "amuse": "[əˈmjuːz]",
    "appeal": "",
    "appreciation": "[əˌpɹiː.ʃiˈeɪ.ʃən]",
    "aspect": "[ˈæspɛkt]",
    "attach": "[əˈtætʃ]",
    "attract": "[əˈtɹækt]",
    "automatic": "",
    "batter": "[ˈbætə(ɹ)]",
    "blink": "[blɪŋk]",
    "bond": "[bɒnd]",
    "capable": "[ˈkeɪpəbl̩]",
    "cashier": "[kəˈʃɪə]",
    "categorize": "",
    "cavern": "[ˈkæv.ən]",
    "Celsius": "",
    "companion": "",
    "condense": "[kənˈdɛns]",
    "conservation": "[ˌkɑnsə(ɹ)ˈveɪʃən]",
    "convenience": "[kənˈviːnɪəns]",
    "critic": "[ˈkɹɪt.ɪk]",
    "critical": "",
    "criticize": "",
    "deceive": "[dɪˈsiːv]",
    "descent": "[dɪˈsɛnt]",
    "detain": "[dɪˈteɪn]",
    "devastation": "[ˌdɛ.vəˈsteɪ.ʃən]",
    "device": "[dəˈvaɪs]",
    "digital": "",
    "discouragement": "",
    "discriminate": "[dɪsˈkɹɪmɪneɪt]",
    "dismantle": "[dɪsˈmæntʰəɫ]",
    "distinction": "",
    "duration": "",
    "ecological": "[ˌiːkəˈlɒd͡ʒɪkl̩]",
    "economics": "[ˌikəˈnɑmɪks]",
    "envision": "",
    "exceed": "[ɪkˈsiːd]",
    "exhibit": "[ɛɡ-]",
    "exhibition": "[ɛksɪˈbɪʃən]",
    "exotic": "[ɪɡˈzɒtɪk]",
    "fold": "[fəʊld]",
    "formidable": "[fɔːˈmɪdəbəl]",
    "frustration": "[fɹʌsˈtɹeɪʃən]",
    "global": "[ˈɡləʊbəl]",
    "grapefruit": "[ˈɡɹeɪp.fɹuːt]",
    "greedy": "[ˈɡɹiːdi]",
    "historian": "[hɪˈstɔəɹɪən]",
    "identify": "[aɪˈdɛn.tɪ.faɪ]",
    "illuminate": "[ɪlˈl(j)uməneɪt]",
    "immense": "[ɪˈmɛns]",
    "impact": "",
    "injustice": "[ɪnˈdʒʌs.tɪs]",
    "intensify": "",
    "interactive": "",
    "interpret": "[ɪnˈtɜː.pɹɪt]",
    "journalism": "[ˈdʒɜːn(ə)lɪzəm]",
    "liberty": "",
    "memorial": "[məˈmoʊɹi.əl]",
    "miserable": "[ˈmɪz(ə)ɹəbəl]",
    "mislead": "[mɪsˈliːd]",
    "monster": "[ˈmɒnstə(ɹ)]",
    "mountainous": "",
    "opposition": "",
    "panic": "[ˈpænɪk]",
    "patience": "",
    "perspective": "[pɚˈspɛktɪv]",
    "pollute": "[pəˈljuːt]",
    "predict": "",
    "preservation": "[pɹɛ.zɝˈveɪ.ʃən]",
    "prioritize": "[pɹaɪˈɒɹətaɪz]",
    "realistic": "[ˌɹiːjəˈlɪstɪk]",
    "reed": "[ɹiːd]",
    "reflect": "",
    "release": "[ɹɪˈliːs]",
    "reliability": "",
    "repetitive": "",
    "revolution": "",
    "software": "[ˈsɑftˌwɛɹ]",
    "strive": "",
    "stubbornly": "",
    "studio": "",
    "sue": "",
    "superb": "[sjuːˈpɜːb]",
    "suspend": "[səˈspɛnd]",
    "tablet": "[ˈtæblət]",
    "timid": "[ˈtɪmɪd]",
    "tolerate": "[ˈtɒl.ə.ɹeɪt]",
    "tragic": "[ˈtɹædʒɪk]",
    "transportation": "[tɹænspɔːˈteɪʃən]",
    "tremble": "[ˈtɹɛmbl̩]",
    "trend": "[tɹɛnd]",
    "unrealistic": "",
    "viable": "[ˈvaɪəbəl]",
    "viewpoint": "[ˈvjuː.pɔɪnt]",
    "visual": "[ˈvɪʒuəl]",
    "volcano": "[vɒlˈkeɪnəʊ]",
    "witch": "[wɪtʃ]"
  },
  "高2": {},
};

const SENTENCES_BY_UNIT = {
  "07": [
    { s: "Duncan likes the fast {blank} of life in the city.", blank: "pace", base: "pace", zh: "鄧肯喜歡城市快速的生活步調。" },
    { s: "Dad {blank} the floor as he waited for his daughter to give birth to his first grandchild.", blank: "paced", base: "pace", zh: "爸爸等候女兒生下他頭一個金孫時，一直來回踱步。" },
    { s: "The new student found it hard to gain the {blank} of others.", blank: "acceptance", base: "acceptance", zh: "新來的學生發現要被其他同學接納並不容易。" },
    { s: "You'd better {blank} copies of the documents for at least one year.", blank: "retain", base: "retain", zh: "這些文件你最好留著至少一年別丟。" },
    { s: "The boxer succeeded in {blank} his title as the heavyweight champion.", blank: "retaining", base: "retain", zh: "那位拳擊手成功地衛冕重量級冠軍。" },
    { s: "Alex was {blank} with his performance in the speech contest.", blank: "content", base: "content", zh: "亞歷克斯對他在演講比賽的表現很滿意。" },
    { s: "The manager {blank} the plan to set up a new factory in Mexico.", blank: "abandoned", base: "abandon", zh: "經理放棄在墨西哥建立新廠的計畫。" },
    { s: "The workers laid the {blank} before they built the walls.", blank: "foundation", base: "foundation", zh: "工人們打好地基，然後把牆砌起來。" },
    { s: "George has a solid {blank} in geography.", blank: "foundation", base: "foundation", zh: "喬治在地理學方面有很好的基礎。" },
    { s: "If you know how to {blank} the computer yourself, you can save lots of money.", blank: "assemble", base: "assemble", zh: "你若懂得組裝電腦，便可以省下很多錢。" },
    { s: "The boy can take the parts apart, but he can't {blank} them.", blank: "assemble", base: "assemble", zh: "這個小男孩懂得把零件分解，卻無法將它們組合起來。" },
    { s: "The elderly people {blank} in the hospital for free flu shots.", blank: "assembled", base: "assemble", zh: "老人們聚集在醫院裡打免費的流感疫苗。" },
    { s: "It's against the law to {blank} a criminal from the police.", blank: "shelter", base: "shelter", zh: "庇護罪犯躲避警方是違法的。" },
    { s: "The homeless man needed a {blank} from the cold rain.", blank: "shelter", base: "shelter", zh: "那個無家可歸的人需要一個躲避寒雨的庇護處。" },
    { s: "I had an unexpected {blank} with my old friend in the supermarket.", blank: "encounter", base: "encounter", zh: "我在超市和老友不期而遇。" },
    { s: "We went to a famous {blank} park during the summer vacation.", blank: "theme", base: "theme", zh: "暑假我們去了著名的主題公園。" },
    { s: "Violence is not a new {blank} in Taiwan.", blank: "phenomenon", base: "phenomenon", zh: "暴力在臺灣不是個新現象。" },
    { s: "Some people prefer {blank} areas for a quiet environment.", blank: "rural", base: "rural", zh: "有些人因為環境安靜而喜歡住鄉下。" },
    { s: "You have to be 18 to drink {blank} in Taiwan.", blank: "liquor", base: "liquor", zh: "在臺灣你必須年滿 18 歲才能喝酒。" },
    { s: "There were several people at the {blank} of the accident helping the survivors.", blank: "site", base: "site", zh: "意外現場有幾個人幫忙生還者。" },
    { s: "You have to obey the dress {blank} if you want to work here.", blank: "code", base: "code", zh: "如果你想在這裡工作，就必須遵守服裝規定。" },
    { s: "Each word on the list is {blank} to show the level of difficulty.", blank: "coded", base: "code", zh: "表上的所有字都加以編碼，以顯示其難度。" },
    { s: "The young man was {blank} against the wall, looking at the sky.", blank: "leaning", base: "lean", zh: "這年輕人斜靠著牆，仰望著天空。" },
    { s: "You should eat more vegetables and {blank} meat if you want to slim down.", blank: "lean", base: "lean", zh: "如果你想瘦下來就應該多吃青菜及瘦肉。" },
    { s: "With my father's support, I have been able to {blank} my dreams.", blank: "pursue", base: "pursue", zh: "有了我爸的支持，我才能夠去追尋我的夢想。" },
    { s: "Peter is planning to study abroad in {blank} of a bright future.", blank: "pursuit", base: "pursuit", zh: "彼得計畫要出國留學，以追求光明的前途。" },
    { s: "Laziness may be responsible for Timmy's bad {blank} performance.", blank: "academic", base: "academic", zh: "懶惰或許是提米學業成績不佳的原因。" },
    { s: "Give yourself a {blank} of 20 minutes to read the questions.", blank: "maximum", base: "maximum", zh: "給自己最多 20 分鐘的時間讀完題目。" },
    { s: "You must practice playing the piano for a {blank} of two hours every day.", blank: "minimum", base: "minimum", zh: "你每天必須練習彈鋼琴至少兩個小時。" },
    { s: "Our company {blank} electronic devices.", blank: "manufactures", base: "manufacture", zh: "我們公司生產電子儀器。" },
    { s: "The {blank} of newspapers requires a lot of wood pulp.", blank: "manufacture", base: "manufacture", zh: "製造報紙需要許多木漿。" },
    { s: "We {blank} with the police to locate the suspects.", blank: "cooperated", base: "cooperate", zh: "我們和警方合作找出嫌疑犯。" },
    { s: "I could not {blank} the difficulty of learning French, so I changed my major.", blank: "overcome", base: "overcome", zh: "我無法克服學法文的困難，因此我換了主修科系。" },
    { s: "This project will help foster the {blank} of new jobs.", blank: "creation", base: "creation", zh: "本計畫將有助於創造新的就業機會。" },
    { s: "Without {blank}, one can't be a successful artist.", blank: "creativity", base: "creativity", zh: "一個人若是缺乏創意，就沒辦法成為成功的藝術家。" },
    { s: "Jason's death was a {blank} to his family.", blank: "tragedy", base: "tragedy", zh: "傑森的死對他的家庭是一個慘劇。" },
    { s: "I prefer comedies to {blank}.", blank: "tragedies", base: "tragedy", zh: "我喜歡看喜劇勝於悲劇。" },
    { s: "The Taming of the Shrew is one of Shakespeare's most famous {blank}.", blank: "comedies", base: "comedy", zh: "《馴悍記》是莎士比亞最著名的喜劇之一。" },
    { s: "Taipei is Taiwan's center of {blank}.", blank: "commerce", base: "commerce", zh: "台北是臺灣的商業中心。" },
    { s: "According to the US {blank}, people have the right to speak freely.", blank: "Constitution", base: "constitution", zh: "根據美國憲法，人民享有言論自由權。" },
    { s: "Seven days {blank} a week.", blank: "constitute", base: "constitute", zh: "七天構成一個星期。" },
    { s: "She has made {blank} contributions to the project.", blank: "numerous", base: "numerous", zh: "她對這個專案做了許多貢獻。" },
    { s: "You should read the {blank} before you use the copier.", blank: "manual", base: "manual", zh: "在使用這部影印機之前，你應該先閱讀使用手冊。" },
    { s: "Mark doesn't like {blank} labor. He wants a desk job instead.", blank: "manual", base: "manual", zh: "馬克不喜歡勞力工作。他反而想要一份坐辦公室的工作。" },
    { s: "Terence is ill-tempered. He {blank} with his wife over almost everything.", blank: "quarrels", base: "quarrel", zh: "泰倫斯的脾氣不好。他幾乎每件事都會和太太爭吵。" },
    { s: "The boss decided to {blank} my contract for another year.", blank: "renew", base: "renew", zh: "老闆決定將與我續簽一年的合約。" },
    { s: "We took a rest in the {blank} of a large tree.", blank: "shade", base: "shade", zh: "我們在一棵大樹的樹蔭下休息。" },
    { s: "Monica's beauty and confidence put other contestants in the {blank}.", blank: "shade", base: "shade", zh: "莫妮卡的美貌和自信使其他參賽者相形失色。" }
  ],
  "08": [
    { s: "She is a {blank} scholar in the field of AI.", blank: "prominent", base: "prominent", zh: "她是AI領域中一位傑出的學者。" },
    { s: "Math is a {blank} subject for engineering students.", blank: "fundamental", base: "fundamental", zh: "數學是工程系學生的基本科目。" },
    { s: "Please {blank} on your work and avoid distractions.", blank: "concentrate", base: "concentrate", zh: "請專心工作，避免分心。" },
    { s: "The {blank} of caffeine in this coffee is very high.", blank: "concentration", base: "concentration", zh: "這杯咖啡的咖啡因濃度非常高。" },
    { s: "A strange {blank} happened on the way to school.", blank: "incident", base: "incident", zh: "上學途中發生了一件奇怪的事件。" },
    { s: "The watch is {blank} to the second.", blank: "precise", base: "precise", zh: "這隻手錶精確到秒。" },
    { s: "The meeting ends at {blank} three o'clock.", blank: "precisely", base: "precisely", zh: "會議恰好三點結束。" },
    { s: "The weather is very {blank} for a picnic.", blank: "agreeable", base: "agreeable", zh: "這個天氣非常適合野餐。" },
    { s: "The annual teachers' {blank} will be held next week.", blank: "convention", base: "convention", zh: "一年一度的教師大會將在下週舉行。" },
    { s: "Most people still prefer {blank} paper books.", blank: "conventional", base: "conventional", zh: "大多數人仍然偏好傳統的紙本書。" },
    { s: "If you don't like it here, you can go {blank}.", blank: "elsewhere", base: "elsewhere", zh: "如果你不喜歡這裡，可以去別的地方。" },
    { s: "About 60 {blank} of students passed the exam.", blank: "percent", base: "percent", zh: "大約百分之六十的學生通過了考試。" },
    { s: "What {blank} of the budget is spent on food?", blank: "percentage", base: "percentage", zh: "預算的多少百分比用在食物上？" },
    { s: "Are you {blank} that you locked the door?", blank: "imply", base: "imply", zh: "你是在暗示你鎖了門嗎？" },
    { s: "The meeting {blank} was packed with attendees.", blank: "chamber", base: "chamber", zh: "會議廳擠滿了與會者。" },
    { s: "I feel deep {blank} for the victims of the disaster.", blank: "sympathy", base: "sympathy", zh: "我對災難的受害者深感同情。" },
    { s: "She is very {blank} and always listens to others.", blank: "sympathetic", base: "sympathetic", zh: "她非常有同情心，總是傾聽別人。" },
    { s: "The sponge can {blank} a lot of water.", blank: "absorb", base: "absorb", zh: "海綿可以吸收大量水分。" },
    { s: "Please {blank} a photo to your email.", blank: "attach", base: "attach", zh: "請在電子郵件中附加一張照片。" },
    { s: "I found an {blank} in the envelope but no letter.", blank: "attachment", base: "attachment", zh: "我在信封裡找到附件，但沒有信。" },
    { s: "Hard work {blank} a good result.", blank: "deserve", base: "deserve", zh: "努力工作值得好的結果。" },
    { s: "Music can heal our {blank} wounds.", blank: "spiritual", base: "spiritual", zh: "音樂能治癒我們心靈的創傷。" },
    { s: "Is there a {blank} answer to this question?", blank: "definite", base: "definite", zh: "這個問題有明確的答案嗎？" },
    { s: "I will {blank} be there on time.", blank: "definitely", base: "definitely", zh: "我一定會準時到達。" },
    { s: "The army met strong {blank} from the enemy.", blank: "resistance", base: "resistance", zh: "軍隊遭到敵人的激烈抵抗。" },
    { s: "Can I get a {blank} to buy a new computer?", blank: "loan", base: "loan", zh: "我能貸款買新電腦嗎？" },
    { s: "The {blank} of clouds brought rain.", blank: "formation", base: "formation", zh: "雲的形成了帶來了雨水。" },
    { s: "You need to {blank} before you can vote.", blank: "register", base: "register", zh: "你需要登記才能投票。" },
    { s: "Online {blank} for the course is now open.", blank: "registration", base: "registration", zh: "這門課的線上報名已經開放。" },
    { s: "The police {blank} him of stealing the car.", blank: "accuse", base: "accuse", zh: "警方指控他偷車。" },
    { s: "You should {blank} a doctor about your symptoms.", blank: "consult", base: "consult", zh: "你應該就你的症狀諮詢醫生。" },
    { s: "Our company hired a financial {blank}.", blank: "consultant", base: "consultant", zh: "我們公司聘請了一位財務顧問。" },
    { s: "This machine improves work {blank}.", blank: "efficiency", base: "efficiency", zh: "這台機器提高了工作效率。" },
    { s: "English is a {blank} language spoken worldwide.", blank: "universal", base: "universal", zh: "英語是全球通用的語言。" },
    { s: "The thief tried to {blank} from the police.", blank: "flee", base: "flee", zh: "小偷試圖逃離警方。" },
    { s: "They plan to {blank} solar panels on the roof.", blank: "install", base: "install", zh: "他們計畫在屋頂安裝太陽能板。" },
    { s: "The village was {blank} by the heavy snow.", blank: "isolated", base: "isolate", zh: "這個村莊被大雪隔離了。" },
    { s: "He felt {blank} and alone in the new city.", blank: "isolated", base: "isolate", zh: "他在新城市感到孤立無援。" },
    { s: "The patient was kept in {blank} to prevent infection.", blank: "isolation", base: "isolation", zh: "病人被隔離以防止感染。" },
    { s: "Follow this {blank} to reach the hospital.", blank: "route", base: "route", zh: "跟著這條路線就能到達醫院。" },
    { s: "The government provides {blank} for elderly citizens.", blank: "welfare", base: "welfare", zh: "政府為老年公民提供福利。" },
    { s: "She showed great {blank} for your help.", blank: "appreciation", base: "appreciation", zh: "她對你的幫助表示極大的感激。" },
    { s: "A single {blank} can start a forest fire.", blank: "spark", base: "spark", zh: "一粒火花就能引起森林大火。" },
    { s: "Please send the documents by {blank}.", blank: "fax", base: "fax", zh: "請用傳真發送文件。" },
    { s: "My first {blank} of him was very positive.", blank: "impression", base: "impression", zh: "我對他的第一印象非常正面。" }
  ],
  "09": [
    { s: "The rain fell in a {blank} rhythm all night.", blank: "continuous", base: "continuous", zh: "雨整晚以連續的節奏下著。" },
    { s: "She practices the piano {blank} to improve her skill.", blank: "continuously", base: "continuously", zh: "她持續不斷地練習鋼琴，以提升技巧。" },
    { s: "The school has a {blank} need for new textbooks each year.", blank: "continual", base: "continual", zh: "學校每年都有持續的需求，需要新課本。" },
    { s: "The detective tried to solve the mysterious {blank} of the missing book.", blank: "plot", base: "plot", zh: "偵探試圖解開失蹤書本的神祕情節。" },
    { s: "Plants {blank} sunlight and water to grow.", blank: "consume", base: "consume", zh: "植物需要光和水才能生長。" },
    { s: "Every {blank} has the right to choose what to buy.", blank: "consumer", base: "consumer", zh: "每位消費者都有選擇購買的權利。" },
    { s: "He heard a loud {blank} when the vase fell on the floor.", blank: "crack", base: "crack", zh: "當花瓶掉在地板上時，他聽到一聲巨響。" },
    { s: "They decided to {blank} money in a savings account.", blank: "invest", base: "invest", zh: "他們決定把錢投資到儲蓄帳戶。" },
    { s: "Her first {blank} in stocks earned a small profit.", blank: "investment", base: "investment", zh: "她首次的股票投資獲得了一點利潤。" },
    { s: "The {blank} bought shares of the new tech company.", blank: "investor", base: "investor", zh: "投資者購買了新科技公司的股份。" },
    { s: "You can {blank} the total cost by adding the prices together.", blank: "calculate", base: "calculate", zh: "你可以把價格相加來計算總成本。" },
    { s: "The teacher checked his math {blank} for mistakes.", blank: "calculation", base: "calculation", zh: "老師檢查了他的數學計算是否有錯誤。" },
    { s: "The government will {blank} the water quality to keep it safe.", blank: "regulate", base: "regulate", zh: "政府將調節水質以確保安全。" },
    { s: "New traffic {blank} require drivers to wear seat belts.", blank: "regulation", base: "regulation", zh: "新的交通規則要求駕駛員必須繫安全帶。" },
    { s: "The factory uses heavy {blank} to make metal parts.", blank: "machinery", base: "machinery", zh: "工廠使用重型機械來製造金屬零件。" },
    { s: "A {blank} fixed the broken bike chain after school.", blank: "mechanic", base: "mechanic", zh: "一位機械師在放學後修好了破損的自行車鏈條。" },
    { s: "The robot works by {blank} parts that move together.", blank: "mechanical", base: "mechanical", zh: "這個機器人透過機械部件協同運作。" },
    { s: "She was a {blank} to the accident and gave a clear statement.", blank: "witness", base: "witness", zh: "她是事故的目擊者，並提供了清晰的陳述。" },
    { s: "He is the {blank} suspect in the case, according to the police.", blank: "prime", base: "prime", zh: "根據警方說法，他是此案的主要嫌疑人。" },
    { s: "The lion is the {blank} animal in the savanna.", blank: "dominant", base: "dominant", zh: "獅子是草原上占主導地位的動物。" },
    { s: "The team hopes to {blank} the competition with their new strategy.", blank: "dominate", base: "dominate", zh: "團隊希望以新策略在比賽中佔上風。" },
    { s: "She felt great {blank} after finishing her project.", blank: "satisfaction", base: "satisfaction", zh: "完成專案後，她感到非常滿足。" },
    { s: "His {blank} with the cafeteria food made him skip lunch.", blank: "dissatisfaction", base: "dissatisfaction", zh: "他對學校餐廳食物的不滿讓他不吃午餐。" },
    { s: "The teacher asked us to {blank} the poem's meaning.", blank: "interpret", base: "interpret", zh: "老師請我們解釋這首詩的意涵。" },
    { s: "He can {blank} English sentences into Chinese quickly.", blank: "translate", base: "translate", zh: "他能快速把英文句子翻譯成中文。" },
    { s: "The book includes a French {blank} of the original story.", blank: "translation", base: "translation", zh: "這本書包含原作的法文翻譯。" },
    { s: "A professional {blank} helped the tourists understand the signs.", blank: "translator", base: "translator", zh: "專業翻譯員幫助遊客了解標示。" },
    { s: "Honesty is a {blank} that many people admire.", blank: "virtue", base: "virtue", zh: "誠實是一種許多人欣賞的美德。" },
    { s: "The museum displays a {blank} exhibit of ancient tools.", blank: "permanent", base: "permanent", zh: "博物館展示了一個永久性的古代工具展覽。" },
    { s: "Please {blank} the files to the new folder.", blank: "transfer", base: "transfer", zh: "請把檔案轉移到新資料夾。" },
    { s: "The email contains information {blank} the upcoming trip.", blank: "regarding", base: "regarding", zh: "這封電子郵件包含關於即將出發的旅行的資訊。" },
    { s: "The old {blank} on the hill was built centuries ago.", blank: "fort", base: "fort", zh: "山丘上的古老堡壘是幾個世紀前建造的。" },
    { s: "The hotel {blank} was decorated with balloons for the party.", blank: "reception", base: "reception", zh: "飯店的接待大廳為派對裝飾了氣球。" },
    { s: "Her smile looked {blank} and warm.", blank: "genuine", base: "genuine", zh: "她的笑容看起來真誠而溫暖。" },
    { s: "The artifact is {blank} and dates back to the Ming dynasty.", blank: "authentic", base: "authentic", zh: "這件文物是真品，追溯到明朝。" },
    { s: "A sudden headache can be an {blank} of stress.", blank: "indication", base: "indication", zh: "突如其來的頭痛可能是壓力的徵兆。" },
    { s: "Scientists work in a {blank} to test new chemicals.", blank: "laboratory", base: "laboratory", zh: "科學家在實驗室裡測試新化學物質。" },
    { s: "The sun set beyond the distant {blank}.", blank: "horizon", base: "horizon", zh: "太陽在遙遠的地平線之外落下。" },
    { s: "Cave paintings show {blank} ways of life from thousands of years ago.", blank: "primitive", base: "primitive", zh: "洞穴壁畫展示了數千年前原始的生活方式。" },
    { s: "The storm caused {blank} damage to the coastal town.", blank: "severe", base: "severe", zh: "暴風雨對沿海小鎮造成了嚴重的破壞。" },
    { s: "Loud chewing can {blank} some people during class.", blank: "annoy", base: "annoy", zh: "大聲咀嚼會讓一些人在課堂上感到惱火。" },
    { s: "She felt {blank} when her brother borrowed her bike without asking.", blank: "annoyed", base: "annoyed", zh: "當她的哥哥未經允許借走她的自行車時，她感到惱怒。" },
    { s: "The buzzing fly was very {blank} in the quiet library.", blank: "annoying", base: "annoying", zh: "嗡嗡叫的蒼蠅在寧靜的圖書館裡非常惹人厭煩。" },
    { s: "The charity event was attended by a local {blank} who donated a large sum.", blank: "millionaire", base: "millionaire", zh: "慈善活動有一位當地百萬富翁出席，捐贈了大筆金額。" },
    { s: "Animals are grouped into different {blank} such as mammals and birds.", blank: "category", base: "category", zh: "動物被分成不同的類別，例如哺乳動物和鳥類。" },
    { s: "The flag is a {blank} of the country's history and values.", blank: "representation", base: "representation", zh: "旗幟是該國歷史與價值觀的象徵。" }
  ],
  "10": [
    { s: "She earned a {blank} for her hard work.", blank: "merit", base: "merit", zh: "她因努力而獲得了功勞。" },
    { s: "The road makes a sharp {blank} near the hill.", blank: "curve", base: "curve", zh: "道路在山坡附近有一個急彎。" },
    { s: "You need a {blank} to drive a car.", blank: "license", base: "license", zh: "開車需要執照。" },
    { s: "She kept her {blank} even when she lost the game.", blank: "dignity", base: "dignity", zh: "即使輸了比賽，她仍保持尊嚴。" },
    { s: "He tried to {blank} his older brother by speaking politely.", blank: "dignify", base: "dignify", zh: "他試著用禮貌的說話方式使哥哥受尊敬。" },
    { s: "My answer will {blank} from yours.", blank: "differ", base: "differ", zh: "我的答案會和你的不同。" },
    { s: "There is a {blank} on how many books you can borrow.", blank: "limitation", base: "limitation", zh: "借書的數量有限制。" },
    { s: "His {blank} told him not to cheat.", blank: "conscience", base: "conscience", zh: "他的良心告訴他不要作弊。" },
    { s: "The teacher gave a short {blank} about planets.", blank: "lecture", base: "lecture", zh: "老師做了一個關於行星的短講。" },
    { s: "Our {blank} is very friendly and explains everything clearly.", blank: "lecturer", base: "lecturer", zh: "我們的講師非常友善，說明也很清楚。" },
    { s: "She made a warm {blank} for winter.", blank: "quilt", base: "quilt", zh: "她為冬天縫了一條暖和的被子。" },
    { s: "Please do not {blank} the sleeping baby.", blank: "disturb", base: "disturb", zh: "請不要打擾正在睡覺的嬰兒。" },
    { s: "The news story was very {blank}.", blank: "disturbing", base: "disturbing", zh: "那則新聞非常令人不安。" },
    { s: "He took an {blank} for his headache.", blank: "aspirin", base: "aspirin", zh: "他服用了一顆阿司匹林止痛。" },
    { s: "Scientists try to {blank} the weather for next week.", blank: "predict", base: "predict", zh: "科學家試圖預測下週的天氣。" },
    { s: "Her {blank} about the rain came true.", blank: "prediction", base: "prediction", zh: "她對雨的預測成真了。" },
    { s: "The weather {blank} says it will be sunny tomorrow.", blank: "forecast", base: "forecast", zh: "天氣預報說明天會是晴天。" },
    { s: "The fighting will {blank} tomorrow morning.", blank: "cease", base: "cease", zh: "戰鬥將於明早停止。" },
    { s: "A {blank} was signed after the war ended.", blank: "ceasefire", base: "ceasefire", zh: "戰爭結束後簽署了停火協議。" },
    { s: "We watched an {blank} about a brave queen.", blank: "opera", base: "opera", zh: "我們觀看了一部關於勇敢女王的歌劇。" },
    { s: "She practices {blank} every Thursday after school.", blank: "ballet", base: "ballet", zh: "她每週四放學後練習芭蕾舞。" },
    { s: "The new art {blank} opened downtown last month.", blank: "gallery", base: "gallery", zh: "新的藝術畫廊上個月在市中心開幕。" },
    { s: "There is a {blank} on loud music after 10 p.m.", blank: "restriction", base: "restriction", zh: "晚上十點後對大聲音樂有限制。" },
    { s: "Police {blank} the new traffic rules strictly.", blank: "enforce", base: "enforce", zh: "警察嚴格執行新的交通規則。" },
    { s: "The {blank} of the law keeps everyone safe.", blank: "enforcement", base: "enforcement", zh: "法律的執行讓大家都安全。" },
    { s: "Adding more steps will only {blank} the game.", blank: "complicate", base: "complicate", zh: "增加更多步驟只會讓遊戲變得更複雜。" },
    { s: "The math problem is very {blank} for most students.", blank: "complicated", base: "complicated", zh: "這道數學題對大多數學生來說非常複雜。" },
    { s: "The dinosaur {blank} ended millions of years ago.", blank: "era", base: "era", zh: "恐龍時代在數百萬年前結束。" },
    { s: "He is {blank} on his parents for financial support.", blank: "dependent", base: "dependent", zh: "他在經濟上依賴父母。" },
    { s: "Her {blank} on coffee makes her feel jittery.", blank: "dependence", base: "dependence", zh: "她對咖啡的依賴讓她感到坐立不安。" },
    { s: "A {blank} friend always keeps his promises.", blank: "dependable", base: "dependable", zh: "一個可靠的朋友總是遵守承諾。" },
    { s: "The {blank} of buses is every ten minutes during rush hour.", blank: "frequency", base: "frequency", zh: "高峰時段公車的班次頻率是每十分鐘一班。" },
    { s: "Good {blank} helps you solve puzzles quickly.", blank: "logic", base: "logic", zh: "良好的邏輯能幫助你快速解謎。" },
    { s: "It is {blank} to wear a coat when it is cold outside.", blank: "logical", base: "logical", zh: "在外面很冷時穿外套是合乎邏輯的。" },
    { s: "It is {blank} to think the sun will rise at night.", blank: "illogical", base: "illogical", zh: "認為太陽會在夜裡升起是沒有邏輯的。" },
    { s: "She prepared a {blank} about the solar system for class.", blank: "presentation", base: "presentation", zh: "她為班上準備了一個關於太陽系的簡報。" },
    { s: "His {blank} to the school was celebrated by his family.", blank: "admission", base: "admission", zh: "他被錄取的消息讓家人很高興。" },
    { s: "She felt {blank} after breaking her friend's toy.", blank: "guilt", base: "guilt", zh: "她打破朋友的玩具後感到內疚。" },
    { s: "He was found {blank} of stealing the bike.", blank: "guilty", base: "guilty", zh: "他被判定偷自行車有罪。" },
    { s: "The school plans to {blank} its rules to be fairer.", blank: "reform", base: "reform", zh: "學校計畫改革規則，使之更公平。" },
    { s: "Cleaning the kitchen is a {blank} chore for the whole family.", blank: "household", base: "household", zh: "打掃廚房是全家共同的家務。" },
    { s: "She helps with {blank} after school every day.", blank: "housework", base: "housework", zh: "她每天放學後幫忙做家務。" },
    { s: "The birthday {blank} was full of balloons and cake.", blank: "celebration", base: "celebration", zh: "生日慶祝活動充滿了氣球和蛋糕。" },
    { s: "The main {blank} we need to solve is the water shortage.", blank: "issue", base: "issue", zh: "我們需要解決的主要問題是缺水。" },
    { s: "We can {blank} the break by ten minutes if everyone agrees.", blank: "lengthen", base: "lengthen", zh: "如果大家同意，我們可以把休息時間延長十分鐘。" }
  ],
  "JUL": [
    { s: "The teacher praised her for her {blank} of the new rules.", blank: "acceptance", base: "acceptance", zh: "老師讚揚她對新規則的接受。" },
    { s: "He didn't want to {blank} his friend without proof.", blank: "accuse", base: "accuse", zh: "他不想在沒有證據的情況下指控他的朋友。" },
    { s: "They went on a {blank} in the forest after school.", blank: "adventure", base: "adventure", zh: "他們放學後去森林裡冒險。" },
    { s: "The {blank} on the bus showed a new video game.", blank: "advertisement", base: "advertisement", zh: "公車上的廣告展示了一款新電玩。" },
    { s: "A travel {blank} helped us plan the trip.", blank: "agent", base: "agent", zh: "旅行社的代理人幫我們安排了行程。" },
    { s: "She has an {blank} personality that makes everyone smile.", blank: "agreeable", base: "agreeable", zh: "她有一個讓人愉快的性格，讓大家都笑。" },
    { s: "The clown will {blank} the children at the party.", blank: "amuse", base: "amuse", zh: "小丑會逗樂派對上的孩子們。" },
    { s: "The new movie has a strong {blank} to teenagers.", blank: "appeal", base: "appeal", zh: "這部新電影對青少年有很大的吸引力。" },
    { s: "He showed his {blank} for the gift by writing a thank‑note.", blank: "appreciation", base: "appreciation", zh: "他寫感謝卡表達對禮物的感激。" },
    { s: "One important {blank} of learning a language is listening.", blank: "aspect", base: "aspect", zh: "學習語言的一個重要面向是聽力。" },
    { s: "Please {blank} the file to your email before sending.", blank: "attach", base: "attach", zh: "請在發送前把檔案附加到電子郵件。" },
    { s: "Bright colors can {blank} many insects to the garden.", blank: "attract", base: "attract", zh: "鮮豔的顏色會吸引許多昆蟲到花園。" },
    { s: "The doors open with an {blank} sensor when you approach.", blank: "automatic", base: "automatic", zh: "當你靠近時，門會用自動感應器打開。" },
    { s: "She mixed the {blank} for the pancakes in a bowl.", blank: "batter", base: "batter", zh: "她在碗裡混合麵糊來做煎餅。" },
    { s: "If the light {blank}s, it means the battery is low.", blank: "blink", base: "blink", zh: "如果指示燈閃爍，表示電池電量不足。" },
    { s: "The twins share a strong {blank} that lasts forever.", blank: "bond", base: "bond", zh: "這對雙胞胎有永遠不變的緊密聯繫。" },
    { s: "She is {blank} of solving the math problem on her own.", blank: "capable", base: "capable", zh: "她能夠自行解決這道數學題。" },
    { s: "The {blank} gave me change after I paid for the snack.", blank: "cashier", base: "cashier", zh: "收銀員在我付完零食後找給我零錢。" },
    { s: "We need to {blank} the books by genre in the library.", blank: "categorize", base: "categorize", zh: "我們需要把圖書館的書依類型分類。" },
    { s: "Explorers discovered a hidden {blank} deep in the mountain.", blank: "cavern", base: "cavern", zh: "探險者在山裡深處發現了一個隱蔽的洞穴。" },
    { s: "Water freezes at 0 degrees {blank}.", blank: "Celsius", base: "Celsius", zh: "水在攝氏零度時結冰。" },
    { s: "A dog can be a loyal {blank} during long walks.", blank: "companion", base: "companion", zh: "狗在長途散步時可以是忠實的伴侶。" },
    { s: "The writer will {blank} the story into a short summary.", blank: "condense", base: "condense", zh: "作者會把故事濃縮成簡短的摘要。" },
    { s: "Tree {blank} helps protect the environment.", blank: "conservation", base: "conservation", zh: "樹木保育有助於保護環境。" },
    { s: "Online shopping offers great {blank} for busy people.", blank: "convenience", base: "convenience", zh: "線上購物為忙碌的人提供極大的便利。" },
    { s: "The film {blank} wrote a positive review in the newspaper.", blank: "critic", base: "critic", zh: "影評人在報紙上寫了正面的評論。" },
    { s: "It is {blank} to wear a helmet when riding a bike.", blank: "critical", base: "critical", zh: "騎自行車時戴頭盔是非常關鍵的。" },
    { s: "We should not {blank} others for small mistakes.", blank: "criticize", base: "criticize", zh: "我們不應該批評別人的小錯誤。" },
    { s: "He tried to {blank} his classmates with a fake story.", blank: "deceive", base: "deceive", zh: "他試圖用假故事欺騙同學。" },
    { s: "The hikers began their {blank} down the steep hill at noon.", blank: "descent", base: "descent", zh: "登山者在中午開始下坡下降。" },
    { s: "The police can {blank} a suspect for a few hours.", blank: "detain", base: "detain", zh: "警察可以拘留嫌疑人幾個小時。" },
    { s: "The earthquake left a lot of {blank} in the city.", blank: "devastation", base: "devastation", zh: "地震在城市裡留下了大量的破壞。" },
    { s: "She bought a new electronic {blank} for her phone.", blank: "device", base: "device", zh: "她為手機買了一個新電子裝置。" },
    { s: "Our class uses a {blank} textbook on tablets.", blank: "digital", base: "digital", zh: "我們班在平板上使用數位教科書。" },
    { s: "He felt {blank} after failing the test.", blank: "discouragement", base: "discouragement", zh: "他在考試失敗後感到沮喪。" },
    { s: "It is wrong to {blank} against people because of their skin color.", blank: "discriminate", base: "discriminate", zh: "因膚色而歧視他人是錯誤的。" },
    { s: "The crew will {blank} the old bridge next week.", blank: "dismantle", base: "dismantle", zh: "工作人員下週將拆除舊橋。" },
    { s: "There is a clear {blank} between fact and opinion.", blank: "distinction", base: "distinction", zh: "事實與意見之間有明顯的區別。" },
    { s: "The {blank} of the movie is two hours.", blank: "duration", base: "duration", zh: "這部電影的時長是兩小時。" },
    { s: "We learned about {blank} problems in the rainforest.", blank: "ecological", base: "ecological", zh: "我們學習了雨林的生態問題。" },
    { s: "She wants to study {blank} in university.", blank: "economics", base: "economics", zh: "她想在大學學習經濟學。" },
    { s: "I can {blank} a world without pollution.", blank: "envision", base: "envision", zh: "我能想像一個沒有污染的世界。" },
    { s: "The runner will try to {blank} the record this year.", blank: "exceed", base: "exceed", zh: "跑者將嘗試打破今年的紀錄。" },
    { s: "The museum will {blank} ancient pottery tomorrow.", blank: "exhibit", base: "exhibit", zh: "博物館明天將展出古代陶器。" },
    { s: "Our school organized a science {blank} for the fair.", blank: "exhibition", base: "exhibition", zh: "我們學校為展覽會舉辦了科學展。" },
    { s: "She wore an {blank} flower in her hair.", blank: "exotic", base: "exotic", zh: "她在頭髮上戴了一朵異國的花。" },
    { s: "Please {blank} the paper in half.", blank: "fold", base: "fold", zh: "請把紙對折。" },
    { s: "The mountain was a {blank} challenge for the hikers.", blank: "formidable", base: "formidable", zh: "對登山者而言，這座山是一個艱巨的挑戰。" },
    { s: "He felt {blank} when the computer kept crashing.", blank: "frustration", base: "frustration", zh: "當電腦不斷當機時，他感到沮喪。" },
    { s: "Climate change is a {blank} issue that affects everyone.", blank: "global", base: "global", zh: "氣候變遷是一個影響所有人的全球議題。" },
    { s: "I ate a fresh {blank} for breakfast.", blank: "grapefruit", base: "grapefruit", zh: "我早餐吃了一顆新鮮的葡萄柚。" },
    { s: "The {blank} cat ate all the fish.", blank: "greedy", base: "greedy", zh: "那隻貪吃的貓把所有魚都吃光了。" },
    { s: "The {blank} wrote a book about ancient Egypt.", blank: "historian", base: "historian", zh: "那位歷史學家寫了一本關於古埃及的書。" },
    { s: "Can you {blank} the animal in the picture?", blank: "identify", base: "identify", zh: "你能辨認出圖片裡的動物嗎？" },
    { s: "The flashlight will {blank} the dark path.", blank: "illuminate", base: "illuminate", zh: "手電筒會照亮黑暗的道路。" },
    { s: "The ocean has an {blank} amount of water.", blank: "immense", base: "immense", zh: "海洋擁有巨量的水。" },
    { s: "The new law will have a big {blank} on traffic safety.", blank: "impact", base: "impact", zh: "新法規將對交通安全產生重大影響。" },
    { s: "She fought against {blank} in her community.", blank: "injustice", base: "injustice", zh: "她在社區裡抗爭不公。" },
    { s: "The storm will {blank} tonight.", blank: "intensify", base: "intensify", zh: "暴風雨今晚會加劇。" },
    { s: "The game is {blank} and lets you choose the ending.", blank: "interactive", base: "interactive", zh: "這個遊戲是互動式的，讓你選擇結局。" },
    { s: "The teacher asked us to {blank} the poem in our own words.", blank: "interpret", base: "interpret", zh: "老師請我們用自己的話去詮釋那首詩。" },
    { s: "My older brother wants to study {blank} in college.", blank: "journalism", base: "journalism", zh: "我哥哥想在大學學習新聞學。" },
    { s: "The statue represents {blank} for all people.", blank: "liberty", base: "liberty", zh: "那座雕像代表所有人的自由。" },
    { s: "We visited the {blank} for the soldiers who died.", blank: "memorial", base: "memorial", zh: "我們參觀了為陣亡士兵而建的紀念碑。" },
    { s: "He felt {blank} after losing his favorite toy.", blank: "miserable", base: "miserable", zh: "他失去最喜歡的玩具後感到非常悲慘。" },
    { s: "The rumor could {blank} many students.", blank: "mislead", base: "mislead", zh: "那個謠言可能會誤導許多學生。" },
    { s: "The children pretended the big dog was a {blank}.", blank: "monster", base: "monster", zh: "孩子們把那隻大狗當成怪物玩。" },
    { s: "Our hiking trail goes through {blank} regions.", blank: "mountainous", base: "mountainous", zh: "我們的登山步道穿過多山的地區。" },
    { s: "She faced strong {blank} to her plan.", blank: "opposition", base: "opposition", zh: "她的計畫遭到強烈的反對。" },
    { s: "When the fire alarm rang, a feeling of {blank} spread.", blank: "panic", base: "panic", zh: "當消防警報響起時，恐慌的感覺蔓延開來。" },
    { s: "Learning to play piano needs a lot of {blank}.", blank: "patience", base: "patience", zh: "學習彈鋼琴需要很多耐心。" },
    { s: "Reading books can change your {blank} on life.", blank: "perspective", base: "perspective", zh: "閱讀書籍可以改變你對生活的觀點。" },
    { s: "Factories should not {blank} the river.", blank: "pollute", base: "pollute", zh: "工廠不應該污染河流。" },
    { s: "Weather forecasters try to {blank} tomorrow's rain.", blank: "predict", base: "predict", zh: "氣象預報員試圖預測明天的雨。" },
    { s: "The park focuses on {blank} of wildlife.", blank: "preservation", base: "preservation", zh: "這座公園專注於野生動物的保育。" },
    { s: "You should {blank} your homework before video games.", blank: "prioritize", base: "prioritize", zh: "你應該把作業排在玩電動之前。" },
    { s: "It is important to set {blank} goals.", blank: "realistic", base: "realistic", zh: "設定實際的目標很重要。" },
    { s: "The wind made the {blank} sway by the lake.", blank: "reed", base: "reed", zh: "風使湖邊的蘆葦搖擺。" },
    { s: "The water will {blank} the mountains at sunrise.", blank: "reflect", base: "reflect", zh: "水面會在日出時映照山巒。" },
    { s: "The zoo will {blank} the rescued birds tomorrow.", blank: "release", base: "release", zh: "動物園明天會放飛被救的鳥兒。" },
    { s: "The teacher praised his {blank} in completing assignments.", blank: "reliability", base: "reliability", zh: "老師稱讚他在完成作業上的可靠性。" },
    { s: "The song felt {blank} after hearing it many times.", blank: "repetitive", base: "repetitive", zh: "聽了很多次之後，這首歌感覺很重複。" },
    { s: "The invention started a small {blank} in our school.", blank: "revolution", base: "revolution", zh: "這項發明在我們學校掀起了一場小革命。" },
    { s: "We learned how to install new {blank} on the computer.", blank: "software", base: "software", zh: "我們學會了在電腦上安裝新軟體。" },
    { s: "She will {blank} to become a better runner.", blank: "strive", base: "strive", zh: "她會努力成為更好的跑者。" },
    { s: "He {blank} refused to share his snack.", blank: "stubbornly", base: "stubbornly", zh: "他固執地拒絕分享零食。" },
    { s: "The art {blank} was filled with colorful paintings.", blank: "studio", base: "studio", zh: "藝術工作室裡充滿了彩色的畫作。" },
    { s: "If the store broke the rule, customers could {blank} them.", blank: "sue", base: "sue", zh: "如果商店違規，顧客可以起訴他們。" },
    { s: "Her performance in the play was {blank}.", blank: "superb", base: "superb", zh: "她在戲劇中的表演非常出色。" },
    { s: "The school decided to {blank} the basketball game due to rain.", blank: "suspend", base: "suspend", zh: "學校決定因雨而暫停籃球比賽。" },
    { s: "He reads his e-books on a {blank}.", blank: "tablet", base: "tablet", zh: "他在平板上閱讀電子書。" },
    { s: "The {blank} rabbit hid behind the bush.", blank: "timid", base: "timid", zh: "那隻膽小的兔子躲在灌木後面。" },
    { s: "We should {blank} each other's differences.", blank: "tolerate", base: "tolerate", zh: "我們應該容忍彼此的差異。" },
    { s: "The story had a {blank} ending.", blank: "tragic", base: "tragic", zh: "這個故事有一個悲慘的結局。" },
    { s: "Bicycles are a cheap form of {blank}.", blank: "transportation", base: "transportation", zh: "自行車是一種廉價的交通工具。" },
    { s: "She could feel her hands {blank} with cold.", blank: "tremble", base: "tremble", zh: "她能感覺到雙手因寒冷而顫抖。" },
    { s: "Wearing masks became a global {blank} last year.", blank: "trend", base: "trend", zh: "去年戴口罩成為全球的潮流。" },
    { s: "His plan to travel around the world in a week is {blank}.", blank: "unrealistic", base: "unrealistic", zh: "他一週環遊世界的計畫是不切實際的。" },
    { s: "Solar energy is a {blank} alternative to fossil fuels.", blank: "viable", base: "viable", zh: "太陽能是可行的替代化石燃料的方案。" },
    { s: "From her {blank}, the problem seemed easy to solve.", blank: "viewpoint", base: "viewpoint", zh: "從她的觀點看，這個問題似乎很容易解決。" },
    { s: "The teacher used a {blank} aid to explain the concept.", blank: "visual", base: "visual", zh: "老師使用視覺教具來說明概念。" },
    { s: "The {blank} erupted and covered the town with ash.", blank: "volcano", base: "volcano", zh: "火山爆發，將城鎮覆蓋在灰燼之中。" },
    { s: "In the story, the kind {blank} helped the lost child.", blank: "witch", base: "witch", zh: "在故事裡，那位善良的女巫幫助了迷路的孩子。" }
  ],
  "B1": [
    {
        "s": "This device is {blank} to improve communication.",
        "blank": "a means of",
        "base": "a means of",
        "zh": "此裝置是{blank}以改善通訊。"
    },
    {
        "s": "We will adjust the schedule {blank}.",
        "blank": "accordingly",
        "base": "accordingly",
        "zh": "我們將根據{blank}調整時間表。"
    },
    {
        "s": "I {blank} think the project is complete.",
        "blank": "actually",
        "base": "actually",
        "zh": "我{blank}認為專案已完成。"
    },
    {
        "s": "We will provide training {blank}.",
        "blank": "additionally",
        "base": "additionally",
        "zh": "我們將額外{blank}提供培訓。"
    },
    {
        "s": "The system monitors {blank} to ensure safety.",
        "blank": "air-traffic control",
        "base": "air-traffic control",
        "zh": "系統監控{blank}以確保安全。"
    },
    {
        "s": "Please keep the {blank} clear for passengers.",
        "blank": "aisle",
        "base": "aisle",
        "zh": "請保持{blank}暢通，方便乘客。"
    },
    {
        "s": "The system will {blank} you when a problem occurs.",
        "blank": "Alert",
        "base": "Alert",
        "zh": "系統在出現問題時會{blank}您。"
    },
    {
        "s": "She will join us {blank}.",
        "blank": "also",
        "base": "also",
        "zh": "她將{blank}加入我們。"
    },
    {
        "s": "We need to review the report {blank} the budget.",
        "blank": "and",
        "base": "and",
        "zh": "我們需要審查報告{blank}預算。"
    },
    {
        "s": "You can download the new {blank} from the store.",
        "blank": "App",
        "base": "App",
        "zh": "您可以從商店下載新的{blank}。"
    },
    {
        "s": "We {blank} is already reshaping the future of work.",
        "blank": "Artificial Intelligence",
        "base": "Artificial Intelligence",
        "zh": "我們的{blank}已經在重塑未來的工作方式。"
    },
    {
        "s": "The policy was tightened, {blank} the market saw a decline.",
        "blank": "as a consequence",
        "base": "as a consequence",
        "zh": "政策被收緊，{blank}市場出現下滑。"
    },
    {
        "s": "The experiment failed, {blank} the team had to restart.",
        "blank": "as a result",
        "base": "as a result",
        "zh": "實驗失敗，{blank}團隊不得不重新開始。"
    },
    {
        "s": "The factory adopted {blank} to increase efficiency.",
        "blank": "Automation",
        "base": "Automation",
        "zh": "工廠採用了{blank}以提高效率。"
    },
    {
        "s": "Public {blank} about climate change is growing.",
        "blank": "awareness",
        "base": "awareness",
        "zh": "公眾對氣候變化的{blank}正在增長。"
    },
    {
        "s": "She carried her books in a sturdy {blank}.",
        "blank": "bag",
        "base": "bag",
        "zh": "她把書放在一個堅固的{blank}裡。"
    },
    {
        "s": "He repaired the delicate device with {blank}.",
        "blank": "bare hands",
        "base": "bare hands",
        "zh": "他用{blank}修理了精細的裝置。"
    },
    {
        "s": "The car {blank} passed the inspection.",
        "blank": "barely",
        "base": "barely",
        "zh": "車輛{blank}通過了檢查。"
    },
    {
        "s": "I have no time, {blank} I can't help.",
        "blank": "besides",
        "base": "besides",
        "zh": "我沒有時間，{blank}我無法幫忙。"
    },
    {
        "s": "They offered a refreshing {blank} to guests.",
        "blank": "beverage",
        "base": "beverage",
        "zh": "他們為客人提供了一種清爽的{blank}。"
    },
    {
        "s": "The startup aims to raise a {blank} dollars in its next funding round.",
        "blank": "billion",
        "base": "billion",
        "zh": "該新創公司目標在下一輪融資中籌集{blank}美元。"
    },
    {
        "s": "He aspires to become a {blank} by the age of forty.",
        "blank": "billionaire",
        "base": "billionaire",
        "zh": "他立志在四十歲前成為一名{blank}。"
    },
    {
        "s": "The new packaging is fully {blank} and will decompose within months.",
        "blank": "biodegradable",
        "base": "biodegradable",
        "zh": "新包裝完全{blank}，將在數月內分解。"
    },
    {
        "s": "She took a quick {blank} of the apple before putting it in her bag.",
        "blank": "Bite",
        "base": "Bite",
        "zh": "她在把蘋果放進袋子前快速咬了一口{blank}。"
    },
    {
        "s": "The detective examined the {blank} on the victim's arm for clues.",
        "blank": "Bite mark",
        "base": "Bite mark",
        "zh": "偵探檢查受害者手臂上的{blank}以尋找線索。"
    },
    {
        "s": "The rabbit created a deep {blank} beneath the meadow to stay safe.",
        "blank": "Burrow",
        "base": "Burrow",
        "zh": "兔子在草地下挖了一個深{blank}以保持安全。"
    },
    {
        "s": "Children love to trade their {blank} during recess.",
        "blank": "candy",
        "base": "candy",
        "zh": "孩子們在課間喜歡交換他們的{blank}。"
    },
    {
        "s": "Veterinarians often study {blank} behavior to understand dog health.",
        "blank": "Canine",
        "base": "Canine",
        "zh": "獸醫經常研究{blank}行為以了解犬類健康。"
    },
    {
        "s": "Reducing your {blank} can help combat climate change.",
        "blank": "carbon footprint",
        "base": "carbon footprint",
        "zh": "減少你的{blank}有助於對抗氣候變遷。"
    },
    {
        "s": "He kept his {blank} hidden in a secret compartment.",
        "blank": "cash",
        "base": "cash",
        "zh": "他把{blank}藏在一個秘密隔層裡。"
    },
    {
        "s": "The {blank} rang as the customer paid.",
        "blank": "cash register",
        "base": "cash register",
        "zh": "當顧客付款時，{blank} 發出了響聲。"
    },
    {
        "s": "I am {blank} sure that the answer is correct.",
        "blank": "certain",
        "base": "certain",
        "zh": "我對答案正確性 {blank} 確信。"
    },
    {
        "s": "She will {blank} attend the meeting tomorrow.",
        "blank": "certainly",
        "base": "certainly",
        "zh": "她將 {blank} 參加明天的會議。"
    },
    {
        "s": "Please go to the {blank} to pay for your items.",
        "blank": "checkout",
        "base": "checkout",
        "zh": "請前往 {blank} 付款。"
    },
    {
        "s": "The {blank} prepared a delicious meal for the guests.",
        "blank": "chef",
        "base": "chef",
        "zh": "廚師為客人準備了一道美味佳肴。"
    },
    {
        "s": "Your {blank} affects your sleep quality.",
        "blank": "Circadian rhythm",
        "base": "Circadian rhythm",
        "zh": "你的 {blank} 影響睡眠質量。"
    },
    {
        "s": "Adopting a {blank} can reduce waste.",
        "blank": "circular economy",
        "base": "circular economy",
        "zh": "採用 {blank} 可以減少浪費。"
    },
    {
        "s": "Every {blank} has the right to vote.",
        "blank": "Citizen",
        "base": "Citizen",
        "zh": "每個 {blank} 都有投票權。"
    },
    {
        "s": "The {blank} is changing rapidly.",
        "blank": "Climate",
        "base": "Climate",
        "zh": "氣候正迅速變化。"
    },
    {
        "s": "Store your files in the {blank} for easy access.",
        "blank": "Cloud",
        "base": "Cloud",
        "zh": "將文件存儲在 {blank} 中以便輕鬆訪問。"
    },
    {
        "s": "We {blank} the message to everyone.",
        "blank": "communicate",
        "base": "communicate",
        "zh": "傳達"
    },
    {
        "s": "We {blank} the project details with the team.",
        "blank": "Communication",
        "base": "Communication",
        "zh": "溝通"
    },
    {
        "s": "We {blank} the kitchen waste into nutrient-rich soil.",
        "blank": "compost",
        "base": "compost",
        "zh": "堆肥"
    },
    {
        "s": "We {blank} A with B to streamline the process.",
        "blank": "connect A with B",
        "base": "connect A with B",
        "zh": "將A與B連接"
    },
    {
        "s": "We {blank} the two systems to improve efficiency.",
        "blank": "connection",
        "base": "connection",
        "zh": "連接"
    },
    {
        "s": "We {blank} the data, the results were surprising.",
        "blank": "consequently",
        "base": "consequently",
        "zh": "因此"
    },
    {
        "s": "We {blank} our resources to protect biodiversity.",
        "blank": "conservation",
        "base": "conservation",
        "zh": "保育"
    },
    {
        "s": "We {blank} the energy consumption to reduce costs.",
        "blank": "consumption",
        "base": "consumption",
        "zh": "消費"
    },
    {
        "s": "We {blank} the water supply to ensure safety.",
        "blank": "contamination",
        "base": "contamination",
        "zh": "污染"
    },
    {
        "s": "We {blank} the discount for loyal customers.",
        "blank": "coupon",
        "base": "coupon",
        "zh": "優惠券"
    },
    {
        "s": "The {blank} was used to purchase groceries.",
        "blank": "credit card",
        "base": "credit card",
        "zh": "那張{blank}被用來購買雜貨。"
    },
    {
        "s": "The {blank} was investigated by the police.",
        "blank": "Crime",
        "base": "Crime",
        "zh": "那起{blank}被警方調查。"
    },
    {
        "s": "The {blank} was cordoned off for evidence.",
        "blank": "Crime scene",
        "base": "Crime scene",
        "zh": "那個{blank}被封鎖以保存證據。"
    },
    {
        "s": "The {blank} of the region is rich in traditions.",
        "blank": "Culture",
        "base": "Culture",
        "zh": "該地區的{blank}充滿傳統。"
    },
    {
        "s": "The {blank} left a positive review.",
        "blank": "customer",
        "base": "customer",
        "zh": "那位{blank}留下了正面評論。"
    },
    {
        "s": "The {blank} was analyzed for patterns.",
        "blank": "Data",
        "base": "Data",
        "zh": "這些{blank}被分析以尋找模式。"
    },
    {
        "s": "During {blank}, the brain consolidates memories.",
        "blank": "Deep sleep",
        "base": "Deep sleep",
        "zh": "在{blank}期間，大腦會鞏固記憶。"
    },
    {
        "s": "She earned a {blank} in physics.",
        "blank": "degree",
        "base": "degree",
        "zh": "她獲得了物理學{blank}。"
    },
    {
        "s": "The {blank} allows citizens to vote.",
        "blank": "Democracy",
        "base": "Democracy",
        "zh": "{blank}允許公民投票。"
    },
    {
        "s": "The {blank} was a cozy corner of the house.",
        "blank": "Den",
        "base": "Den",
        "zh": "那個{blank}是房子裡一個舒適的角落。"
    },
    {
        "s": "We {blank} all incoming signals for anomalies.",
        "blank": "Detection",
        "base": "Detection",
        "zh": "我們 {blank} 所有進入訊號以尋找異常。"
    },
    {
        "s": "The {blank} was trained to locate hidden explosives.",
        "blank": "Detection dog",
        "base": "Detection dog",
        "zh": "那隻 {blank} 已經訓練好能尋找隱藏的爆炸物。"
    },
    {
        "s": "She can speak the local {blank} with ease.",
        "blank": "Dialect",
        "base": "Dialect",
        "zh": "她能輕鬆說當地的 {blank}。"
    },
    {
        "s": "The company launched a new {blank} marketing campaign.",
        "blank": "Digital",
        "base": "Digital",
        "zh": "公司推出了一個新的 {blank} 行銷活動。"
    },
    {
        "s": "Effective {blank} can resolve conflicts without war.",
        "blank": "Diplomacy",
        "base": "Diplomacy",
        "zh": "有效的 {blank} 能在不戰爭的情況下解決衝突。"
    },
    {
        "s": "Please {blank} your device before leaving the office.",
        "blank": "disconnect",
        "base": "disconnect",
        "zh": "請在離開辦公室前 {blank} 您的裝置。"
    },
    {
        "s": "Customers receive a {blank} when they buy two items.",
        "blank": "discount",
        "base": "discount",
        "zh": "顧客購買兩件商品時可享受 {blank}。"
    },
    {
        "s": "Use a {blank} coffee cup to reduce waste.",
        "blank": "disposable",
        "base": "disposable",
        "zh": "使用一個 {blank} 咖啡杯以減少浪費。"
    },
    {
        "s": "Proper {blank} of hazardous waste is mandatory.",
        "blank": "disposal",
        "base": "disposal",
        "zh": "正確的 {blank} 有害廢棄物是必須的。"
    },
    {
        "s": "It is hard to {blank} between the two similar species.",
        "blank": "distinguish",
        "base": "distinguish",
        "zh": "很難 {blank} 兩種相似物種之間的差異。"
    },
    {
        "s": "She is {blank} in her field.",
        "blank": "distinguished",
        "base": "distinguished",
        "zh": "她在她的領域中是{blank}的。"
    },
    {
        "s": "The {blank} habits of the animal affect its feeding patterns.",
        "blank": "Diurnal",
        "base": "Diurnal",
        "zh": "該動物的{blank}習性影響其進食模式。"
    },
    {
        "s": "Our city celebrates cultural {blank} every year.",
        "blank": "Diversity",
        "base": "Diversity",
        "zh": "我們的城市每年慶祝文化{blank}。"
    },
    {
        "s": "The {blank} barked loudly at the stranger.",
        "blank": "Dog",
        "base": "Dog",
        "zh": "那隻{blank}對陌生人大聲吠叫。"
    },
    {
        "s": "I often {blank} of traveling the world.",
        "blank": "Dream",
        "base": "Dream",
        "zh": "我常常{blank}環遊世界。"
    },
    {
        "s": "We aim to build a more {blank} office space.",
        "blank": "eco-friendly",
        "base": "eco-friendly",
        "zh": "我們的目標是打造更{blank}的辦公空間。"
    },
    {
        "s": "Scientists study the {blank} impact of climate change.",
        "blank": "ecological",
        "base": "ecological",
        "zh": "科學家研究氣候變遷的{blank}影響。"
    },
    {
        "s": "The government introduced policies to strengthen the {blank}.",
        "blank": "Economy",
        "base": "Economy",
        "zh": "政府推出政策以加強{blank}。"
    },
    {
        "s": "Protecting the {blank} is essential for biodiversity.",
        "blank": "ecosystem",
        "base": "ecosystem",
        "zh": "保護{blank}對生物多樣性至關重要。"
    },
    {
        "s": "Teachers strive to {blank} students about critical thinking.",
        "blank": "educate",
        "base": "educate",
        "zh": "教師努力{blank}學生關於批判性思考。"
    },
    {
        "s": "We {blank} to think critically about the world.",
        "blank": "educated",
        "base": "educated",
        "zh": "我們{blank}去批判性地思考世界。"
    },
    {
        "s": "We {blank} every child deserves equal opportunities.",
        "blank": "education",
        "base": "education",
        "zh": "我們{blank}每個孩子都應該擁有平等的機會。"
    },
    {
        "s": "We {blank} resources can enhance learning experiences.",
        "blank": "educational",
        "base": "educational",
        "zh": "我們{blank}資源可以提升學習體驗。"
    },
    {
        "s": "We {blank} change to foster innovation.",
        "blank": "embrace",
        "base": "embrace",
        "zh": "我們{blank}變化以促進創新。"
    },
    {
        "s": "We {blank} our actions affect the planet.",
        "blank": "Environment",
        "base": "Environment",
        "zh": "我們{blank}的行動會影響地球。"
    },
    {
        "s": "We {blank} of our choices on ecosystems.",
        "blank": "environmental impact",
        "base": "environmental impact",
        "zh": "我們{blank}對生態系統的影響。"
    },
    {
        "s": "We {blank} include other relevant factors.",
        "blank": "etc",
        "base": "etc",
        "zh": "我們{blank}包括其他相關因素。"
    },
    {
        "s": "We {blank} supports the hypothesis strongly.",
        "blank": "Evidence",
        "base": "Evidence",
        "zh": "我們{blank}強有力地支持假設。"
    },
    {
        "s": "We {blank} our findings at the conference.",
        "blank": "Exhibit",
        "base": "Exhibit",
        "zh": "我們{blank}在會議上展示我們的發現。"
    },
    {
        "s": "We {blank} goods to international markets.",
        "blank": "Export",
        "base": "Export",
        "zh": "我們{blank}商品到國際市場。"
    },
    {
        "s": "We must {blank} the flames before they spread.",
        "blank": "extinguish",
        "base": "extinguish",
        "zh": "我們必須{blank}火焰，以防它蔓延。"
    },
    {
        "s": "She enjoys reading {blank} before bedtime.",
        "blank": "fiction",
        "base": "fiction",
        "zh": "她喜歡在睡前閱讀{blank}。"
    },
    {
        "s": "Every office should keep a {blank} within easy reach.",
        "blank": "fire extinguisher",
        "base": "fire extinguisher",
        "zh": "每個辦公室都應該把{blank}放在易於取用的地方。"
    },
    {
        "s": "The hiker left a clear {blank} in the soft mud.",
        "blank": "Footprint",
        "base": "Footprint",
        "zh": "徒步者在柔軟的泥土中留下了明顯的{blank}。"
    },
    {
        "s": "Many examples exist, {blank}, of successful community gardens.",
        "blank": "for instance",
        "base": "for instance",
        "zh": "有許多例子，例如{blank}，顯示社區花園的成功。"
    },
    {
        "s": "The detective used {blank} techniques to solve the case.",
        "blank": "Forensic",
        "base": "Forensic",
        "zh": "偵探使用{blank}技術破解此案。"
    },
    {
        "s": "Students enrolled in {blank} learn to analyze evidence.",
        "blank": "Forensic science",
        "base": "Forensic science",
        "zh": "修讀{blank}的學生學會分析證據。"
    },
    {
        "s": "The charity's {blank} supports education worldwide.",
        "blank": "Foundation",
        "base": "Foundation",
        "zh": "該慈善機構的{blank}支援全球教育。"
    },
    {
        "s": "Citizens cherish {blank} as a fundamental right.",
        "blank": "Freedom",
        "base": "Freedom",
        "zh": "公民珍視{blank}作為基本權利。"
    },
    {
        "s": "Protests are protected under {blank}, allowing people to gather peacefully.",
        "blank": "Freedom of assembly",
        "base": "Freedom of assembly",
        "zh": "抗議活動受到{blank}的保護，允許人們和平集會。"
    },
    {
        "s": "We {blank} to choose our own path.",
        "blank": "Freedom of choice",
        "base": "Freedom of choice",
        "zh": "選擇自由"
    },
    {
        "s": "Everyone should have the right to {blank}.",
        "blank": "Freedom of expression",
        "base": "Freedom of expression",
        "zh": "表達自由"
    },
    {
        "s": "The law protects our {blank} across borders.",
        "blank": "Freedom of movement",
        "base": "Freedom of movement",
        "zh": "移動自由"
    },
    {
        "s": "Respecting the {blank} is essential for a tolerant society.",
        "blank": "Freedom of religion",
        "base": "Freedom of religion",
        "zh": "宗教自由"
    },
    {
        "s": "The {blank} is a cornerstone of democracy.",
        "blank": "Freedom of speech",
        "base": "Freedom of speech",
        "zh": "言論自由"
    },
    {
        "s": "The {blank} ensures unbiased reporting.",
        "blank": "Freedom of the press",
        "base": "Freedom of the press",
        "zh": "新聞自由"
    },
    {
        "s": "The {blank} helps drivers navigate accurately.",
        "blank": "Global Positioning System",
        "base": "Global Positioning System",
        "zh": "全球定位系統"
    },
    {
        "s": "Scientists warn that {blank} could alter ecosystems worldwide.",
        "blank": "global warming",
        "base": "global warming",
        "zh": "全球暖化"
    },
    {
        "s": "The rapid pace of {blank} connects markets and cultures.",
        "blank": "Globalization",
        "base": "Globalization",
        "zh": "全球化"
    },
    {
        "s": "The {blank} spins once every 24 hours.",
        "blank": "globe",
        "base": "globe",
        "zh": "地球"
    },
    {
        "s": "We {blank} the organization with integrity.",
        "blank": "govern",
        "base": "govern",
        "zh": "我們以誠信治理該組織。"
    },
    {
        "s": "The {blank} announced new environmental policies.",
        "blank": "government",
        "base": "government",
        "zh": "政府宣布了新的環境政策。"
    },
    {
        "s": "The park is {blank} and full of trees.",
        "blank": "green",
        "base": "green",
        "zh": "公園是綠色的，充滿了樹木。"
    },
    {
        "s": "Reducing {blank} is essential for climate action.",
        "blank": "greenhouse gas",
        "base": "greenhouse gas",
        "zh": "減少溫室氣體對氣候行動至關重要。"
    },
    {
        "s": "Protecting the {blank} ensures species survival.",
        "blank": "habitat",
        "base": "habitat",
        "zh": "保護棲息地確保物種存活。"
    },
    {
        "s": "The {blank} managed the data flow efficiently.",
        "blank": "Handler",
        "base": "Handler",
        "zh": "處理者有效地管理了資料流。"
    },
    {
        "s": "Upgrading the {blank} improved system performance.",
        "blank": "Hardware",
        "base": "Hardware",
        "zh": "升級硬體提升了系統效能。"
    },
    {
        "s": "The waste was labeled as {blank} and handled carefully.",
        "blank": "hazardous",
        "base": "hazardous",
        "zh": "該廢棄物被標示為危險，並被小心處理。"
    },
    {
        "s": "The experiment failed, {blank} we must revise our approach.",
        "blank": "hence",
        "base": "hence",
        "zh": "實驗失敗，因此我們必須修正方法。"
    },
    {
        "s": "Preserving cultural {blank} enriches future generations.",
        "blank": "Heritage",
        "base": "Heritage",
        "zh": "保存文化遺產豐富了未來世代。"
    },
    {
        "s": "The bear will enter {blank} during the winter months.",
        "blank": "Hibernation",
        "base": "Hibernation",
        "zh": "冬眠"
    },
    {
        "s": "The museum displays artifacts that tell the story of {blank}.",
        "blank": "History",
        "base": "History",
        "zh": "歷史"
    },
    {
        "s": "After the long journey, she gave him a warm {blank}.",
        "blank": "hug",
        "base": "hug",
        "zh": "擁抱"
    },
    {
        "s": "The Eiffel Tower is an {blank} symbol of Paris.",
        "blank": "Iconic",
        "base": "Iconic",
        "zh": "標誌性的"
    },
    {
        "s": "Children use their {blank} to create fantastical worlds.",
        "blank": "imagination",
        "base": "imagination",
        "zh": "想像力"
    },
    {
        "s": "Can you {blank} a world where everyone shares knowledge?",
        "blank": "imagine",
        "base": "imagine",
        "zh": "想像"
    },
    {
        "s": "Every year, thousands of {blank} arrive seeking better opportunities.",
        "blank": "Immigrant",
        "base": "Immigrant",
        "zh": "移民"
    },
    {
        "s": "The debate over {blank} has intensified in recent years.",
        "blank": "Immigration",
        "base": "Immigration",
        "zh": "移民"
    },
    {
        "s": "The new {blank} will affect how visas are processed.",
        "blank": "Immigration law",
        "base": "Immigration law",
        "zh": "移民法"
    },
    {
        "s": "The government announced a revised {blank} to address labor shortages.",
        "blank": "Immigration policy",
        "base": "Immigration policy",
        "zh": "移民政策"
    },
    {
        "s": "We {blank} the data from abroad.",
        "blank": "Import",
        "base": "Import",
        "zh": "我們{blank}從國外的資料。"
    },
    {
        "s": "The report mentions the cost, and {blank} the time required.",
        "blank": "in addition",
        "base": "in addition",
        "zh": "報告提到成本，{blank}所需的時間。"
    },
    {
        "s": "He said he was busy, but {blank} he was at home.",
        "blank": "in fact",
        "base": "in fact",
        "zh": "他說自己很忙，{blank}他其實在家。"
    },
    {
        "s": "The theory sounds simple, yet {blank} it is hard to implement.",
        "blank": "in practice",
        "base": "in practice",
        "zh": "理論聽起來簡單，{blank}實際上很難執行。"
    },
    {
        "s": "The project seems profitable, but {blank} expenses are higher.",
        "blank": "in reality",
        "base": "in reality",
        "zh": "該項目看似有利潤，{blank}實際支出更高。"
    },
    {
        "s": "She appears confident, {blank} she feels uncertain.",
        "blank": "in truth",
        "base": "in truth",
        "zh": "她看起來很自信，{blank}事實上她感到不確定。"
    },
    {
        "s": "The city celebrated the {blank} of the new museum.",
        "blank": "Inauguration",
        "base": "Inauguration",
        "zh": "城市慶祝新博物館的{blank}。"
    },
    {
        "s": "The waste is processed through {blank} to reduce volume.",
        "blank": "incineration",
        "base": "incineration",
        "zh": "廢棄物透過{blank}處理以減少體積。"
    },
    {
        "s": "Please {blank} the manager of the schedule change.",
        "blank": "inform sb of sth",
        "base": "inform sb of sth",
        "zh": "請{blank}經理有關時間表的變更。"
    },
    {
        "s": "The website provides accurate {blank} about the event.",
        "blank": "information",
        "base": "information",
        "zh": "網站提供關於活動的準確{blank}。"
    },
    {
        "s": "I went to the {blank} to ask for directions.",
        "blank": "information desk",
        "base": "information desk",
        "zh": "我走到資訊櫃檯詢問方向。"
    },
    {
        "s": "The company's success is largely due to {blank}.",
        "blank": "Innovation",
        "base": "Innovation",
        "zh": "公司的成功在很大程度上歸功於創新。"
    },
    {
        "s": "After a long day, I struggled with {blank}.",
        "blank": "Insomnia",
        "base": "Insomnia",
        "zh": "長時間工作後，我因失眠而苦惱。"
    },
    {
        "s": "She made an {blank} decision without thinking.",
        "blank": "instant",
        "base": "instant",
        "zh": "她毫不猶豫地做了一個即時決定。"
    },
    {
        "s": "I chose to stay home {blank} go out.",
        "blank": "instead",
        "base": "instead",
        "zh": "我選擇留在家裡，而不是外出。"
    },
    {
        "s": "She took a walk {blank} studying.",
        "blank": "instead of",
        "base": "instead of",
        "zh": "她選擇散步，而不是學習。"
    },
    {
        "s": "The conference attracted {blank} experts.",
        "blank": "international",
        "base": "international",
        "zh": "該會議吸引了國際專家。"
    },
    {
        "s": "He accessed the {blank} to find information.",
        "blank": "Internet",
        "base": "Internet",
        "zh": "他上網搜尋資訊。"
    },
    {
        "s": "The {blank} changed the way we communicate.",
        "blank": "invention",
        "base": "invention",
        "zh": "這項發明改變了我們的溝通方式。"
    },
    {
        "s": "She checked the {blank} before the audit.",
        "blank": "inventory",
        "base": "inventory",
        "zh": "她在審核前檢查了庫存。"
    },
    {
        "s": "The detective opened an {blank} to uncover the truth.",
        "blank": "Investigation",
        "base": "Investigation",
        "zh": "調查"
    },
    {
        "s": "The officer relied on his {blank} to track the suspect.",
        "blank": "K-9",
        "base": "K-9",
        "zh": "警犬"
    },
    {
        "s": "The city’s {blank} responded quickly to the emergency.",
        "blank": "K9 unit",
        "base": "K9 unit",
        "zh": "警犬部隊"
    },
    {
        "s": "After dinner, we enjoyed a lively session of {blank}.",
        "blank": "karaoke",
        "base": "karaoke",
        "zh": "卡拉OK"
    },
    {
        "s": "He added a splash of {blank} to his fries.",
        "blank": "ketchup",
        "base": "ketchup",
        "zh": "番茄醬"
    },
    {
        "s": "The new {blank} is located on the outskirts of town.",
        "blank": "landfill",
        "base": "landfill",
        "zh": "垃圾掩埋場"
    },
    {
        "s": "The ancient tower is a famous {blank} for tourists.",
        "blank": "Landmark",
        "base": "Landmark",
        "zh": "地標"
    },
    {
        "s": "Learning a new {blank} can open many doors.",
        "blank": "Language",
        "base": "Language",
        "zh": "語言"
    },
    {
        "s": "The country's {blank} was celebrated with fireworks.",
        "blank": "Liberation",
        "base": "Liberation",
        "zh": "解放"
    },
    {
        "s": "She fought tirelessly for {blank} and equality.",
        "blank": "Liberty",
        "base": "Liberty",
        "zh": "自由"
    },
    {
        "s": "We must limit {blank} to protect our circadian rhythms.",
        "blank": "Light exposure",
        "base": "Light exposure",
        "zh": "我們必須限制{blank}以保護我們的晝夜節律。"
    },
    {
        "s": "The park was covered in {blank} after the festival.",
        "blank": "litter",
        "base": "litter",
        "zh": "節慶結束後，公園被{blank}覆蓋。"
    },
    {
        "s": "Customers can earn points by using their {blank} at checkout.",
        "blank": "loyalty card",
        "base": "loyalty card",
        "zh": "顧客在結帳時使用{blank}即可累積點數。"
    },
    {
        "s": "Researchers applied {blank} to predict climate patterns.",
        "blank": "Machine Learning",
        "base": "Machine Learning",
        "zh": "研究人員運用{blank}來預測氣候模式。"
    },
    {
        "s": "To understand the article, identify the {blank} first.",
        "blank": "main idea",
        "base": "main idea",
        "zh": "要理解文章，首先要找出{blank}。"
    },
    {
        "s": "She chose {blank} as her field of study because of its versatility.",
        "blank": "major",
        "base": "major",
        "zh": "她選擇{blank}作為她的主修，因為它的多樣性。"
    },
    {
        "s": "He decided to {blank} to improve his career prospects.",
        "blank": "major in English",
        "base": "major in English",
        "zh": "他決定{blank}以提升職業前景。"
    },
    {
        "s": "The {blank} of voters supported the new policy.",
        "blank": "majority",
        "base": "majority",
        "zh": "大多數選民的{blank}支持了新政策。"
    },
    {
        "s": "Efforts are underway to reduce {blank} in coastal areas.",
        "blank": "marine pollution",
        "base": "marine pollution",
        "zh": "正在努力減少沿海地區的{blank}。"
    },
    {
        "s": "The {blank} influences public opinion on many issues.",
        "blank": "media",
        "base": "media",
        "zh": "{blank}影響了公眾對許多議題的看法。"
    },
    {
        "s": "The artist chose a {blank} to convey subtle tones.",
        "blank": "medium",
        "base": "medium",
        "zh": "中等"
    },
    {
        "s": "Your body releases more {blank} when it gets dark, helping you feel sleepy.",
        "blank": "Melatonin",
        "base": "Melatonin",
        "zh": "褪黑激素"
    },
    {
        "s": "Birds begin their long {blank} south as winter approaches.",
        "blank": "Migration",
        "base": "Migration",
        "zh": "遷徙"
    },
    {
        "s": "The city unveiled a new {blank} to honor its founding heroes.",
        "blank": "Monument",
        "base": "Monument",
        "zh": "紀念碑"
    },
    {
        "s": "A short {blank} after lunch can boost your afternoon productivity.",
        "blank": "Nap",
        "base": "Nap",
        "zh": "小睡"
    },
    {
        "s": "People with {blank} often struggle to stay awake during the day.",
        "blank": "Narcolepsy",
        "base": "Narcolepsy",
        "zh": "嗜睡症"
    },
    {
        "s": "The {blank} flag features a white star on a blue background.",
        "blank": "National",
        "base": "National",
        "zh": "國家"
    },
    {
        "s": "Successful {blank} requires both listening and clear articulation of goals.",
        "blank": "Negotiation",
        "base": "Negotiation",
        "zh": "談判"
    },
    {
        "s": "A reliable {blank} can keep your devices connected across the house.",
        "blank": "Network",
        "base": "Network",
        "zh": "網路"
    },
    {
        "s": "Owls are {blank} hunters, relying on darkness to stalk their prey.",
        "blank": "Nocturnal",
        "base": "Nocturnal",
        "zh": "夜行的"
    },
    {
        "s": "We use our {blank} to detect hidden aromas.",
        "blank": "Nose",
        "base": "Nose",
        "zh": "我們使用我們的{blank}來偵測隱藏的香氣。"
    },
    {
        "s": "We practice {blank} to sharpen our scent abilities.",
        "blank": "Nose work",
        "base": "Nose work",
        "zh": "我們練習{blank}以提升嗅覺能力。"
    },
    {
        "s": "She wrote a {blank} that surprised everyone.",
        "blank": "novel",
        "base": "novel",
        "zh": "她寫了一本{blank}讓所有人都感到驚訝。"
    },
    {
        "s": "He became a famous {blank} after his debut book.",
        "blank": "novelist",
        "base": "novelist",
        "zh": "他的處女作出版後，他成為了著名的{blank}。"
    },
    {
        "s": "The dog's {blank} impressed the judges.",
        "blank": "Obedience",
        "base": "Obedience",
        "zh": "那隻狗的{blank}讓評委印象深刻。"
    },
    {
        "s": "She ate {blank} the cake before anyone else noticed.",
        "blank": "one-third of",
        "base": "one-third of",
        "zh": "她在其他人注意之前吃掉了{blank}的蛋糕。"
    },
    {
        "s": "His performance was {blank} among the competitors.",
        "blank": "outstanding",
        "base": "outstanding",
        "zh": "他的表現在競爭者中是{blank}的。"
    },
    {
        "s": "The {blank} of antibiotics can lead to resistance.",
        "blank": "overuse",
        "base": "overuse",
        "zh": "抗生素的{blank}可能導致抗藥性。"
    },
    {
        "s": "Their {blank} lasted for decades.",
        "blank": "Partnership",
        "base": "Partnership",
        "zh": "他們的{blank}持續了數十年。"
    },
    {
        "s": "He was celebrated as a true {blank} of his country.",
        "blank": "Patriot",
        "base": "Patriot",
        "zh": "他被譽為國家的真正{blank}。"
    },
    {
        "s": "We {blank} the dog gently on the couch.",
        "blank": "Paw",
        "base": "Paw",
        "zh": "我們在沙發上輕輕{blank}狗。"
    },
    {
        "s": "The detective examined the {blank} left at the crime scene.",
        "blank": "Paw print",
        "base": "Paw print",
        "zh": "偵探檢查了犯罪現場留下的{blank}。"
    },
    {
        "s": "The statue stood on a marble {blank} in the garden.",
        "blank": "Pedestal",
        "base": "Pedestal",
        "zh": "雕像站在花園的大理石{blank}上。"
    },
    {
        "s": "The interest rate increased by {blank}.",
        "blank": "percent",
        "base": "percent",
        "zh": "利率上升了{blank}。"
    },
    {
        "s": "The survey showed a {blank} of respondents favoring the new policy.",
        "blank": "percentage",
        "base": "percentage",
        "zh": "調查顯示有{blank}的受訪者支持新政策。"
    },
    {
        "s": "They recycled the {blank} bottles to reduce waste.",
        "blank": "plastic",
        "base": "plastic",
        "zh": "他們回收了{blank}瓶子以減少垃圾。"
    },
    {
        "s": "The city launched a campaign to clean up {blank} from the river.",
        "blank": "plastic waste",
        "base": "plastic waste",
        "zh": "城市發起了清理河流中{blank}的活動。"
    },
    {
        "s": "Add two and three to get a {blank} of five.",
        "blank": "plus",
        "base": "plus",
        "zh": "二加三得到的{blank}是五。"
    },
    {
        "s": "The {blank} arrived at the scene within minutes.",
        "blank": "Police",
        "base": "Police",
        "zh": "{blank}在幾分鐘內到達現場。"
    },
    {
        "s": "The {blank} helped locate the missing hiker.",
        "blank": "Police dog",
        "base": "Police dog",
        "zh": "{blank}幫助找到了失蹤的徒步旅行者。"
    },
    {
        "s": "The river suffers from {blank} caused by industrial waste.",
        "blank": "pollution",
        "base": "pollution",
        "zh": "這條河因工業廢棄物而受到{blank}的侵害。"
    },
    {
        "s": "He decided to {blank} during the meeting to clarify the project scope.",
        "blank": "pop a question",
        "base": "pop a question",
        "zh": "他決定在會議中{blank}，以釐清專案範圍。"
    },
    {
        "s": "She enjoys listening to {blank} while studying.",
        "blank": "pop music",
        "base": "pop music",
        "zh": "她在學習時喜歡聽{blank}。"
    },
    {
        "s": "The country's {blank} has grown rapidly over the past decade.",
        "blank": "population",
        "base": "population",
        "zh": "該國的{blank}在過去十年迅速增長。"
    },
    {
        "s": "In the documentary, the {blank} stalks its prey with silent precision.",
        "blank": "Predator",
        "base": "Predator",
        "zh": "在紀錄片中，{blank}以無聲的精準追蹤獵物。"
    },
    {
        "s": "The museum focuses on the {blank} of ancient artifacts.",
        "blank": "Preservation",
        "base": "Preservation",
        "zh": "博物館專注於古代文物的{blank}。"
    },
    {
        "s": "The lion's {blank} tried to escape the savannah's harsh conditions.",
        "blank": "Prey",
        "base": "Prey",
        "zh": "獅子的{blank}試圖逃離草原的嚴酷環境。"
    },
    {
        "s": "Every product in the store has a clearly displayed {blank}.",
        "blank": "price tag",
        "base": "price tag",
        "zh": "店內每件商品都有清晰標示的{blank}。"
    },
    {
        "s": "The new {blank} promises to improve energy efficiency.",
        "blank": "product",
        "base": "product",
        "zh": "新{blank}承諾提升能源效率。"
    },
    {
        "s": "She will {blank} a new strategy at tomorrow's conference.",
        "blank": "propose",
        "base": "propose",
        "zh": "她將在明天的會議上{blank}一項新策略。"
    },
    {
        "s": "We {blank} the fire before it spreads.",
        "blank": "put out",
        "base": "put out",
        "zh": "我們在火勢蔓延前把它{blank}。"
    },
    {
        "s": "The comet is {blank} in our sky.",
        "blank": "rare",
        "base": "rare",
        "zh": "彗星在我們的天空中是{blank}的。"
    },
    {
        "s": "She {blank} visits the museum, preferring to stay at home.",
        "blank": "rarely",
        "base": "rarely",
        "zh": "她{blank}參觀博物館，寧願留在家。"
    },
    {
        "s": "Please keep the {blank} for future reference.",
        "blank": "receipt",
        "base": "receipt",
        "zh": "請保留{blank}以備將來參考。"
    },
    {
        "s": "We should {blank} plastic bottles to reduce waste.",
        "blank": "recycle",
        "base": "recycle",
        "zh": "我們應該{blank}塑膠瓶以減少垃圾。"
    },
    {
        "s": "Proper {blank} can save a lot of resources.",
        "blank": "recycling",
        "base": "recycling",
        "zh": "適當的{blank}可以節省大量資源。"
    },
    {
        "s": "Try to {blank} your energy consumption by turning off lights.",
        "blank": "reduce",
        "base": "reduce",
        "zh": "嘗試通過關燈來{blank}你的能源消耗。"
    },
    {
        "s": "During {blank}, the brain consolidates memories.",
        "blank": "REM sleep",
        "base": "REM sleep",
        "zh": "在{blank}期間，大腦會鞏固記憶。"
    },
    {
        "s": "Solar panels are a {blank} source of power.",
        "blank": "renewable",
        "base": "renewable",
        "zh": "太陽能板是{blank}的電力來源。"
    },
    {
        "s": "Investing in {blank} can reduce carbon emissions.",
        "blank": "Renewable Energy",
        "base": "Renewable Energy",
        "zh": "投資{blank}可以減少碳排放。"
    },
    {
        "s": "We {blank} the discarded wood into a stylish bookshelf.",
        "blank": "repurpose",
        "base": "repurpose",
        "zh": "我們將廢棄的木材{blank}成時尚的書架。"
    },
    {
        "s": "The team will {blank} the stranded hikers before nightfall.",
        "blank": "Rescue",
        "base": "Rescue",
        "zh": "團隊將在天黑前{blank}被困的登山者。"
    },
    {
        "s": "Scientists {blank} the effects of microplastics on marine life.",
        "blank": "research",
        "base": "research",
        "zh": "科學家{blank}微塑料對海洋生物的影響。"
    },
    {
        "s": "The {blank} presented her findings at the international conference.",
        "blank": "researcher",
        "base": "researcher",
        "zh": "那位{blank}在國際會議上發表了她的研究成果。"
    },
    {
        "s": "Clean water is a vital {blank} for sustainable development.",
        "blank": "resource",
        "base": "resource",
        "zh": "清潔水是永續發展的重要{blank}。"
    },
    {
        "s": "She is incredibly {blank} when solving unexpected problems.",
        "blank": "resourceful",
        "base": "resourceful",
        "zh": "她在解決突發問題時非常{blank}。"
    },
    {
        "s": "After a long journey, we need to {blank} and recover our strength.",
        "blank": "Rest",
        "base": "Rest",
        "zh": "長途旅行後，我們需要{blank}並恢復體力。"
    },
    {
        "s": "His {blank} made it hard for him to sit still during the lecture.",
        "blank": "Restlessness",
        "base": "Restlessness",
        "zh": "他的{blank}使他在講座中難以靜坐。"
    },
    {
        "s": "The university launched a new program in {blank} engineering.",
        "blank": "Robotics",
        "base": "Robotics",
        "zh": "大學開設了全新的{blank}工程課程。"
    },
    {
        "s": "Establishing a healthy {blank} can improve overall well-being.",
        "blank": "Routine",
        "base": "Routine",
        "zh": "建立健康的{blank}可以提升整體福祉。"
    },
    {
        "s": "We {blank} the garden to discover the lingering fragrance.",
        "blank": "Scent",
        "base": "Scent",
        "zh": "我們在花園裡{blank}，以發現殘留的香氣。"
    },
    {
        "s": "The dog excels at {blank} during the search operation.",
        "blank": "Scent detection",
        "base": "Scent detection",
        "zh": "這隻狗在搜索行動中擅長{blank}。"
    },
    {
        "s": "The hiker followed the {blank} through the forest.",
        "blank": "Scent trail",
        "base": "Scent trail",
        "zh": "徒步者沿著{blank}穿過森林。"
    },
    {
        "s": "Everyone gathered to watch the new {blank} tonight.",
        "blank": "sci-fi movie",
        "base": "sci-fi movie",
        "zh": "大家今晚聚在一起觀看全新的{blank}。"
    },
    {
        "s": "She writes compelling {blank} stories set in distant galaxies.",
        "blank": "science fiction",
        "base": "science fiction",
        "zh": "她寫出引人入勝的{blank}故事，背景設定在遙遠的星系。"
    },
    {
        "s": "We must {blank} the archives for any relevant records.",
        "blank": "Search",
        "base": "Search",
        "zh": "我們必須{blank}檔案，以尋找任何相關記錄。"
    },
    {
        "s": "The market offers {blank} produce during the harvest months.",
        "blank": "Seasonal",
        "base": "Seasonal",
        "zh": "市場在收穫季節提供{blank}農產品。"
    },
    {
        "s": "Please add the items to your {blank} before checkout.",
        "blank": "shopping cart",
        "base": "shopping cart",
        "zh": "請在結帳前將商品加入您的{blank}。"
    },
    {
        "s": "The policy bans {blank} plastics to protect the environment.",
        "blank": "single-use",
        "base": "single-use",
        "zh": "該政策禁止{blank}塑料，以保護環境。"
    },
    {
        "s": "A good night of {blank} improves focus and mood.",
        "blank": "Sleep",
        "base": "Sleep",
        "zh": "充足的{blank}能提升專注力與情緒。"
    },
    {
        "s": "We are concerned about {blank}.",
        "blank": "Sleep apnea",
        "base": "Sleep apnea",
        "zh": "睡眠呼吸暫停症"
    },
    {
        "s": "We study {blank} to understand sleep stages.",
        "blank": "Sleep architecture",
        "base": "Sleep architecture",
        "zh": "睡眠結構"
    },
    {
        "s": "We monitor {blank} throughout the night.",
        "blank": "Sleep cycle",
        "base": "Sleep cycle",
        "zh": "睡眠週期"
    },
    {
        "s": "We experience {blank} when we work late.",
        "blank": "Sleep deprivation",
        "base": "Sleep deprivation",
        "zh": "睡眠剝奪"
    },
    {
        "s": "We diagnose {blank} with polysomnography.",
        "blank": "Sleep disorders",
        "base": "Sleep disorders",
        "zh": "睡眠障礙"
    },
    {
        "s": "We track {blank} to assess health.",
        "blank": "Sleep duration",
        "base": "Sleep duration",
        "zh": "睡眠時長"
    },
    {
        "s": "We observe {blank} in restless patients.",
        "blank": "Sleep fragmentation",
        "base": "Sleep fragmentation",
        "zh": "睡眠碎片化"
    },
    {
        "s": "We recommend {blank} for better rest.",
        "blank": "Sleep hygiene",
        "base": "Sleep hygiene",
        "zh": "睡眠衛生"
    },
    {
        "s": "We measure {blank} to evaluate insomnia.",
        "blank": "Sleep latency",
        "base": "Sleep latency",
        "zh": "睡眠潛伏期"
    },
    {
        "s": "We record {blank} to study sleep patterns.",
        "blank": "Sleep onset",
        "base": "Sleep onset",
        "zh": "睡眠開始"
    },
    {
        "s": "We should monitor our {blank} to ensure better health.",
        "blank": "Sleep quality",
        "base": "Sleep quality",
        "zh": "睡眠品質"
    },
    {
        "s": "Keeping a consistent {blank} helps regulate our circadian rhythm.",
        "blank": "Sleep schedule",
        "base": "Sleep schedule",
        "zh": "睡眠時間表"
    },
    {
        "s": "A good {blank} is essential for recovery after a long day.",
        "blank": "Slumber",
        "base": "Slumber",
        "zh": "熟睡"
    },
    {
        "s": "I can't imagine traveling without my trusty {blank}.",
        "blank": "Smartphone",
        "base": "Smartphone",
        "zh": "智慧手機"
    },
    {
        "s": "A quick {blank} can boost energy during a break.",
        "blank": "snack",
        "base": "snack",
        "zh": "零食"
    },
    {
        "s": "She gave the perfume a gentle {blank} before deciding.",
        "blank": "Sniff",
        "base": "Sniff",
        "zh": "嗅聞"
    },
    {
        "s": "The new {blank} update fixed many bugs.",
        "blank": "Software",
        "base": "Software",
        "zh": "軟體"
    },
    {
        "s": "His bright tie helped him {blank} in the crowd.",
        "blank": "stand out",
        "base": "stand out",
        "zh": "脫穎而出"
    },
    {
        "s": "The ancient {blank} attracted many tourists.",
        "blank": "Statue",
        "base": "Statue",
        "zh": "雕像"
    },
    {
        "s": "The friendly {blank} assisted me with my purchase.",
        "blank": "store clerk",
        "base": "store clerk",
        "zh": "店員"
    },
    {
        "s": "The new {blank} attracted many customers.",
        "blank": "storefront",
        "base": "storefront",
        "zh": "新的門面吸引了許多顧客。"
    },
    {
        "s": "The detective considered the man a {blank}.",
        "blank": "Suspect",
        "base": "Suspect",
        "zh": "偵探認為那個男人是嫌疑犯。"
    },
    {
        "s": "The company pledged to improve its {blank} practices.",
        "blank": "Sustainability",
        "base": "Sustainability",
        "zh": "公司承諾改善其可持續性做法。"
    },
    {
        "s": "They built a {blank} energy system.",
        "blank": "sustainable",
        "base": "sustainable",
        "zh": "他們建造了一個可持續的能源系統。"
    },
    {
        "s": "The flag is a powerful {blank} of freedom.",
        "blank": "Symbol",
        "base": "Symbol",
        "zh": "旗幟是自由的強大象徵。"
    },
    {
        "s": "The government imposed a high {blank} on imports.",
        "blank": "Tariff",
        "base": "Tariff",
        "zh": "政府對進口商品徵收高關稅。"
    },
    {
        "s": "Advances in {blank} are reshaping the industry.",
        "blank": "Technology",
        "base": "Technology",
        "zh": "科技進步正在重塑這個行業。"
    },
    {
        "s": "It rained heavily, {blank} the event was canceled.",
        "blank": "therefore",
        "base": "therefore",
        "zh": "下了大雨，因此活動被取消。"
    },
    {
        "s": "She studied hard, {blank} she passed the exam.",
        "blank": "thus",
        "base": "thus",
        "zh": "她努力學習，因此通過了考試。"
    },
    {
        "s": "The policy affected the economy, {blank}.",
        "blank": "to some degree",
        "base": "to some degree",
        "zh": "該政策在某種程度上影響了經濟。"
    },
    {
        "s": "The hiker fell into {blank} during the scorching noon.",
        "blank": "Torpor",
        "base": "Torpor",
        "zh": "徒步者在炙熱的正午陷入{blank}。"
    },
    {
        "s": "The {blank} snapped photos of every street corner.",
        "blank": "Tourist",
        "base": "Tourist",
        "zh": "那位{blank}對每個街角都拍照。"
    },
    {
        "s": "The river water turned {blank} after the spill.",
        "blank": "toxic",
        "base": "toxic",
        "zh": "泄漏後，河水變得{blank}。"
    },
    {
        "s": "She tried to {blank} the missing car through the mud.",
        "blank": "Track",
        "base": "Track",
        "zh": "她試圖{blank}失蹤的車輛穿過泥濘。"
    },
    {
        "s": "The {blank} led the rescue team to the trapped hikers.",
        "blank": "Tracking dog",
        "base": "Tracking dog",
        "zh": "那隻{blank}把救援隊帶到被困的徒步者。"
    },
    {
        "s": "The merchants decided to {blank} goods at the market.",
        "blank": "Trade",
        "base": "Trade",
        "zh": "商人們決定在市場{blank}貨物。"
    },
    {
        "s": "We followed the {blank} that wound through the forest.",
        "blank": "Trail",
        "base": "Trail",
        "zh": "我們沿著蜿蜒穿過森林的{blank}前進。"
    },
    {
        "s": "The athletes began {blank} early in the morning.",
        "blank": "Training",
        "base": "Training",
        "zh": "運動員們在清晨開始{blank}。"
    },
    {
        "s": "He needed to {blank} the files to the new server.",
        "blank": "transfer",
        "base": "transfer",
        "zh": "他需要將檔案{blank}到新伺服器。"
    },
    {
        "s": "The {blank} powered the entire city during the blackout.",
        "blank": "transformer",
        "base": "transformer",
        "zh": "那個{blank}在停電時為整座城市供電。"
    },
    {
        "s": "We {blank} the documents.",
        "blank": "translate",
        "base": "translate",
        "zh": "翻譯"
    },
    {
        "s": "The {blank} was published in the journal.",
        "blank": "Translation",
        "base": "Translation",
        "zh": "翻譯"
    },
    {
        "s": "They signed the {blank} last night.",
        "blank": "Treaty",
        "base": "Treaty",
        "zh": "條約"
    },
    {
        "s": "The king received a {blank} from the neighboring kingdom.",
        "blank": "Tribute",
        "base": "Tribute",
        "zh": "供品"
    },
    {
        "s": "The {blank} devastated the coastal town.",
        "blank": "tsunami",
        "base": "tsunami",
        "zh": "海嘯"
    },
    {
        "s": "We plan to {blank} the old furniture.",
        "blank": "upcycle",
        "base": "upcycle",
        "zh": "循環再利用"
    },
    {
        "s": "The {blank} was greeted by the receptionist.",
        "blank": "Visitor",
        "base": "Visitor",
        "zh": "參觀者"
    },
    {
        "s": "She remained {blank} throughout the meeting.",
        "blank": "Wakeful",
        "base": "Wakeful",
        "zh": "警覺的"
    },
    {
        "s": "Please {blank} the guests about the hazard.",
        "blank": "warn",
        "base": "warn",
        "zh": "警告"
    },
    {
        "s": "We must reduce {blank} in our processes.",
        "blank": "waste",
        "base": "waste",
        "zh": "廢棄物"
    },
    {
        "s": "Effective {blank} reduces landfill use.",
        "blank": "waste management",
        "base": "waste management",
        "zh": "有效的{blank}可減少填埋場的使用。"
    },
    {
        "s": "The project succeeded, and {blank} the profits increased.",
        "blank": "what's more",
        "base": "what's more",
        "zh": "該項目成功，{blank}利潤增加了。"
    },
    {
        "s": "Protecting {blank} is essential for ecosystem health.",
        "blank": "wildlife",
        "base": "wildlife",
        "zh": "保護{blank}對生態系統健康至關重要。"
    },
    {
        "s": "Our goal is to achieve {blank} by 2030.",
        "blank": "zero waste",
        "base": "zero waste",
        "zh": "我們的目標是到2030年實現{blank}。"
    }
],
  "B2": [
    {
        "s": "We {blank} for climate justice.",
        "blank": "activism",
        "base": "activism",
        "zh": "我們參與{blank}以爭取氣候正義。"
    },
    {
        "s": "She pursued {blank} of human rights.",
        "blank": "advocacy",
        "base": "advocacy",
        "zh": "她致力於人權的{blank}。"
    },
    {
        "s": "The {blank} team coordinated the busy runway.",
        "blank": "air traffic control",
        "base": "air traffic control",
        "zh": "{blank}團隊協調了繁忙的跑道。"
    },
    {
        "s": "He boarded the {blank} at dawn.",
        "blank": "airplane",
        "base": "airplane",
        "zh": "他在黎明時登上了{blank}。"
    },
    {
        "s": "Remember to switch to {blank} before the flight.",
        "blank": "airplane mode",
        "base": "airplane mode",
        "zh": "請在飛行前切換到{blank}。"
    },
    {
        "s": "She walked down the {blank} of the theater.",
        "blank": "aisle",
        "base": "aisle",
        "zh": "她走過劇院的{blank}。"
    },
    {
        "s": "The novel explores the mystery of {blank}.",
        "blank": "Alchemy",
        "base": "Alchemy",
        "zh": "小說探討了{blank}的奧秘。"
    },
    {
        "s": "His {blank} drove him to start a company.",
        "blank": "Ambition",
        "base": "Ambition",
        "zh": "他的{blank}驅使他創辦公司。"
    },
    {
        "s": "The studio specializes in {blank} for video games.",
        "blank": "animation",
        "base": "animation",
        "zh": "該工作室專注於為電子遊戲製作{blank}。"
    },
    {
        "s": "We shared a delicious {blank} before dinner.",
        "blank": "appetizer",
        "base": "appetizer",
        "zh": "我們在晚餐前分享了一道美味的{blank}。"
    },
    {
        "s": "She has a remarkable {blank} for solving complex puzzles.",
        "blank": "aptitude",
        "base": "aptitude",
        "zh": "她對解決複雜謎題有著驚人的{blank}。"
    },
    {
        "s": "The {blank} of the train was delayed by two hours.",
        "blank": "arrival",
        "base": "arrival",
        "zh": "火車的{blank}被延遲了兩個小時。"
    },
    {
        "s": "The new {blank} system can predict market trends.",
        "blank": "artificial intelligence",
        "base": "artificial intelligence",
        "zh": "新的{blank}系統能夠預測市場趨勢。"
    },
    {
        "s": "The {blank} applauded loudly after the performance.",
        "blank": "audience",
        "base": "audience",
        "zh": "觀眾{blank}在表演後熱烈鼓掌。"
    },
    {
        "s": "He was diagnosed with {blank} at the age of five.",
        "blank": "autism",
        "base": "autism",
        "zh": "他在五歲時被診斷出{blank}。"
    },
    {
        "s": "{blank} is known for his adventurous spirit.",
        "blank": "Ban-doh",
        "base": "Ban-doh",
        "zh": "{blank}以其冒險精神聞名。"
    },
    {
        "s": "The {blank} on her cheek was a family heirloom.",
        "blank": "Birthmark",
        "base": "Birthmark",
        "zh": "她頰上的{blank}是一件家族傳承。"
    },
    {
        "s": "The {blank} technology ensures secure transactions.",
        "blank": "blockchain",
        "base": "blockchain",
        "zh": "{blank}技術確保安全交易。"
    },
    {
        "s": "The {blank} pork was tender and flavorful.",
        "blank": "braised",
        "base": "braised",
        "zh": "這道{blank}豬肉嫩滑多汁。"
    },
    {
        "s": "They launched a new {blank} last month.",
        "blank": "brand",
        "base": "brand",
        "zh": "他們在上個月推出了一個新的{blank}。"
    },
    {
        "s": "The scientists announced a {blank} that could change renewable energy.",
        "blank": "breakthrough",
        "base": "breakthrough",
        "zh": "突破"
    },
    {
        "s": "She works tirelessly as a {blank} for her elderly neighbor.",
        "blank": "caregiver",
        "base": "caregiver",
        "zh": "照顧者"
    },
    {
        "s": "The upcoming marathon presents a {blank} for even seasoned runners.",
        "blank": "challenge",
        "base": "challenge",
        "zh": "挑戰"
    },
    {
        "s": "He was hailed as a {blank} of environmental justice.",
        "blank": "champion",
        "base": "champion",
        "zh": "冠軍"
    },
    {
        "s": "The novel's protagonist is a complex {blank} who evolves over time.",
        "blank": "character",
        "base": "character",
        "zh": "角色"
    },
    {
        "s": "During the flight, the {blank} assisted with navigation and communication.",
        "blank": "co-pilot",
        "base": "co-pilot",
        "zh": "副駕駛"
    },
    {
        "s": "The veteran {blank} motivated the team to exceed their limits.",
        "blank": "coach",
        "base": "coach",
        "zh": "教練"
    },
    {
        "s": "All controls are located within the aircraft's {blank} for quick access.",
        "blank": "cockpit",
        "base": "cockpit",
        "zh": "駕駛艙"
    },
    {
        "s": "The project succeeded thanks to seamless {blank} between departments.",
        "blank": "collaboration",
        "base": "collaboration",
        "zh": "協作"
    },
    {
        "s": "Effective {blank} is essential for remote teams to stay aligned.",
        "blank": "communication",
        "base": "communication",
        "zh": "溝通"
    },
    {
        "s": "We {blank} the team to achieve our goals.",
        "blank": "confidence",
        "base": "confidence",
        "zh": "我們{blank}團隊以實現我們的目標。"
    },
    {
        "s": "Every action has a {blank} that we must consider.",
        "blank": "Consequence",
        "base": "Consequence",
        "zh": "每個行動都有一個{blank}我們必須考慮。"
    },
    {
        "s": "It takes {blank} to face the unknown.",
        "blank": "courage",
        "base": "courage",
        "zh": "面對未知需要{blank}。"
    },
    {
        "s": "Let {blank} guide your design process.",
        "blank": "creativity",
        "base": "creativity",
        "zh": "讓{blank}指引你的設計流程。"
    },
    {
        "s": "We can {blank} ideas from our community.",
        "blank": "crowdsource",
        "base": "crowdsource",
        "zh": "我們可以{blank}來自社群的想法。"
    },
    {
        "s": "The {blank} texture of the snack made it irresistible.",
        "blank": "crunchy",
        "base": "crunchy",
        "zh": "這種{blank}的口感讓人無法抗拒。"
    },
    {
        "s": "Her {blank} skills impressed everyone at the dinner.",
        "blank": "culinary",
        "base": "culinary",
        "zh": "她的{blank}技巧讓晚宴上的每個人都印象深刻。"
    },
    {
        "s": "His {blank} to the craft earned him respect.",
        "blank": "dedication",
        "base": "dedication",
        "zh": "他對工藝的{blank}贏得了尊重。"
    },
    {
        "s": "After the {blank}, the team regrouped and tried again.",
        "blank": "defeat",
        "base": "defeat",
        "zh": "在{blank}之後，團隊重新集結並再次嘗試。"
    },
    {
        "s": "Her {blank} from the company shocked many.",
        "blank": "departure",
        "base": "departure",
        "zh": "她離職的{blank}震驚了許多人。"
    },
    {
        "s": "We {blank} our goals with unwavering determination.",
        "blank": "determination",
        "base": "determination",
        "zh": "決心"
    },
    {
        "s": "The doctor made a quick {blank} to identify the illness.",
        "blank": "diagnosis",
        "base": "diagnosis",
        "zh": "診斷"
    },
    {
        "s": "Companies are accelerating {blank} to stay competitive.",
        "blank": "digitalization",
        "base": "digitalization",
        "zh": "數位化"
    },
    {
        "s": "She faced a {blank} when choosing between career and family.",
        "blank": "Dilemma",
        "base": "Dilemma",
        "zh": "兩難"
    },
    {
        "s": "The coach emphasized {blank} to improve the team's performance.",
        "blank": "discipline",
        "base": "discipline",
        "zh": "紀律"
    },
    {
        "s": "Society must confront {blank} to ensure equal opportunities.",
        "blank": "discrimination",
        "base": "discrimination",
        "zh": "歧視"
    },
    {
        "s": "Innovative ideas can {blank} traditional markets.",
        "blank": "disrupt",
        "base": "disrupt",
        "zh": "擾亂"
    },
    {
        "s": "He pursued his {blank} of becoming an astronaut.",
        "blank": "dream",
        "base": "dream",
        "zh": "夢想"
    },
    {
        "s": "Protecting the {blank} is essential for biodiversity.",
        "blank": "ecosystem",
        "base": "ecosystem",
        "zh": "生態系統"
    },
    {
        "s": "Lifelong {blank} empowers individuals to adapt to change.",
        "blank": "education",
        "base": "education",
        "zh": "教育"
    },
    {
        "s": "She listened with {blank} to understand everyone's feelings.",
        "blank": "empathy",
        "base": "empathy",
        "zh": "她以同理心傾聽，了解每個人的感受。"
    },
    {
        "s": "The workshop aimed to give participants {blank} to pursue their goals.",
        "blank": "empowerment",
        "base": "empowerment",
        "zh": "這個工作坊旨在賦予參與者實現目標的賦能。"
    },
    {
        "s": "His {blank} spirit led him to start a tech company.",
        "blank": "entrepreneurship",
        "base": "entrepreneurship",
        "zh": "他的創業精神促使他創辦了一家科技公司。"
    },
    {
        "s": "We must protect the {blank} for future generations.",
        "blank": "environment",
        "base": "environment",
        "zh": "我們必須保護環境，為未來世代。"
    },
    {
        "s": "She is the {blank} of grace and intelligence.",
        "blank": "Epitome",
        "base": "Epitome",
        "zh": "她是優雅與智慧的典範。"
    },
    {
        "s": "The law promotes {blank} among all citizens.",
        "blank": "equality",
        "base": "equality",
        "zh": "法律促進所有公民之間的平等。"
    },
    {
        "s": "The scientist conducted a {blank} to test the hypothesis.",
        "blank": "Experiment",
        "base": "Experiment",
        "zh": "科學家進行了一個實驗以測試假設。"
    },
    {
        "s": "A strong {blank} is the foundation of a happy life.",
        "blank": "family",
        "base": "family",
        "zh": "堅強的家庭是快樂生活的基礎。"
    },
    {
        "s": "The dish has a subtle {blank} of citrus.",
        "blank": "flavor",
        "base": "flavor",
        "zh": "這道菜帶有微妙的柑橘風味。"
    },
    {
        "s": "Despite its success, the project had a major {blank}.",
        "blank": "Flaw",
        "base": "Flaw",
        "zh": "儘管成功，該項目仍存在一個重大缺陷。"
    },
    {
        "s": "The airline announced a delay for our {blank} due to a storm.",
        "blank": "flight",
        "base": "flight",
        "zh": "航空公司因暴風雨宣布我們的{blank}延遲。"
    },
    {
        "s": "Engineers performed routine checks on the {blank} to ensure safety.",
        "blank": "flight deck",
        "base": "flight deck",
        "zh": "工程師對{blank}進行例行檢查以確保安全。"
    },
    {
        "s": "She needed to sharpen her {blank} to complete the project.",
        "blank": "focus",
        "base": "focus",
        "zh": "她需要加強{blank}以完成該項目。"
    },
    {
        "s": "The company expanded its {blank} into three new countries last year.",
        "blank": "franchise",
        "base": "franchise",
        "zh": "該公司去年將其{blank}擴展到三個新國家。"
    },
    {
        "s": "He cherished the {blank} of speaking his mind without fear.",
        "blank": "freedom",
        "base": "freedom",
        "zh": "他珍惜無所畏懼表達意見的{blank}。"
    },
    {
        "s": "The radio station increased the {blank} of its broadcasts during the holidays.",
        "blank": "frequency",
        "base": "frequency",
        "zh": "該電台在假期期間提高了廣播的{blank}。"
    },
    {
        "s": "Passengers waited anxiously at the {blank} for boarding.",
        "blank": "gate",
        "base": "gate",
        "zh": "乘客在{blank}焦急等待登機。"
    },
    {
        "s": "Researchers made a breakthrough in {blank} that could cure the disease.",
        "blank": "genetics",
        "base": "genetics",
        "zh": "研究人員在{blank}方面取得突破，可能治癒此疾病。"
    },
    {
        "s": "The team's {blank} for the season is to win the championship.",
        "blank": "goal",
        "base": "goal",
        "zh": "該隊本賽季的{blank}是贏得冠軍。"
    },
    {
        "s": "She faced the challenge with remarkable {blank} and never gave up.",
        "blank": "grit",
        "base": "grit",
        "zh": "她以非凡的{blank}面對挑戰，從未放棄。"
    },
    {
        "s": "We feel {blank} after realizing our mistake.",
        "blank": "Guilt",
        "base": "Guilt",
        "zh": "我們在意識到錯誤後會感到{blank}。"
    },
    {
        "s": "Our family {blank} is a treasure we must protect.",
        "blank": "heritage",
        "base": "heritage",
        "zh": "我們的家族{blank}是我們必須保護的寶藏。"
    },
    {
        "s": "The statue has become {blank} symbol of the city.",
        "blank": "iconic",
        "base": "iconic",
        "zh": "這座雕像已成為{blank}的城市象徵。"
    },
    {
        "s": "She strives to live by the {blank} of honesty.",
        "blank": "Ideal",
        "base": "Ideal",
        "zh": "她努力以{blank}的誠實為生活準則。"
    },
    {
        "s": "Children's {blank} can turn a simple box into a spaceship.",
        "blank": "imagination",
        "base": "imagination",
        "zh": "孩子們的{blank}能把一個簡單的盒子變成太空船。"
    },
    {
        "s": "Passengers enjoy {blank} during long flights.",
        "blank": "in-flight entertainment",
        "base": "in-flight entertainment",
        "zh": "乘客在長途飛行中享受{blank}。"
    },
    {
        "s": "The school promotes {blank} for all students.",
        "blank": "inclusion",
        "base": "inclusion",
        "zh": "學校為所有學生推廣{blank}。"
    },
    {
        "s": "He values {blank} and makes his own choices.",
        "blank": "independence",
        "base": "independence",
        "zh": "他重視{blank}並自行做出選擇。"
    },
    {
        "s": "The chef carefully selects the {blank} for the dish.",
        "blank": "ingredients",
        "base": "ingredients",
        "zh": "廚師仔細挑選菜餚的{blank}。"
    },
    {
        "s": "The protest was sparked by a sense of {blank}.",
        "blank": "injustice",
        "base": "injustice",
        "zh": "示威是因為一種{blank}的感覺而引發的。"
    },
    {
        "s": "We {blank} new ideas to stay ahead of the curve.",
        "blank": "innovation",
        "base": "innovation",
        "zh": "我們{blank}新想法以保持領先。"
    },
    {
        "s": "She {blank} her team with stories of perseverance.",
        "blank": "inspiration",
        "base": "inspiration",
        "zh": "她以{blank}的故事激勵團隊。"
    },
    {
        "s": "The committee decided on a timely {blank} to address the issue.",
        "blank": "intervention",
        "base": "intervention",
        "zh": "委員會決定進行及時的{blank}以解決問題。"
    },
    {
        "s": "He hopes his work will leave a lasting {blank}.",
        "blank": "legacy",
        "base": "legacy",
        "zh": "他希望自己的工作留下持久的{blank}。"
    },
    {
        "s": "The program aims to improve {blank} among adults.",
        "blank": "literacy",
        "base": "literacy",
        "zh": "該計畫旨在提升成人的{blank}。"
    },
    {
        "s": "The chef {blank} the chicken overnight for extra flavor.",
        "blank": "marinated",
        "base": "marinated",
        "zh": "廚師將雞肉{blank}過夜以增添風味。"
    },
    {
        "s": "Athletes train to develop {blank} for competition.",
        "blank": "mental toughness",
        "base": "mental toughness",
        "zh": "運動員訓練以培養{blank}以備比賽。"
    },
    {
        "s": "The company values {blank} as a path to growth.",
        "blank": "mentorship",
        "base": "mentorship",
        "zh": "公司重視{blank}作為成長之路。"
    },
    {
        "s": "Fans eagerly await the new {blank} release.",
        "blank": "merchandise",
        "base": "merchandise",
        "zh": "粉絲熱切期待新的{blank}發佈。"
    },
    {
        "s": "Philosophers debate the foundations of {blank} in society.",
        "blank": "Morality",
        "base": "Morality",
        "zh": "哲學家討論社會中{blank}的基礎。"
    },
    {
        "s": "We {blank} every day to fuel our progress.",
        "blank": "motivation",
        "base": "motivation",
        "zh": "動機"
    },
    {
        "s": "The future of medicine relies on {blank} breakthroughs.",
        "blank": "nanotechnology",
        "base": "nanotechnology",
        "zh": "納米技術"
    },
    {
        "s": "Celebrating {blank} fosters inclusive communities.",
        "blank": "neurodiversity",
        "base": "neurodiversity",
        "zh": "神經多樣性"
    },
    {
        "s": "The aroma of street food draws crowds to the {blank}.",
        "blank": "night market",
        "base": "night market",
        "zh": "夜市"
    },
    {
        "s": "Her {blank} for the novel consumed her every thought.",
        "blank": "Obsession",
        "base": "Obsession",
        "zh": "痴迷"
    },
    {
        "s": "They fought against {blank} to claim their rights.",
        "blank": "oppression",
        "base": "oppression",
        "zh": "壓迫"
    },
    {
        "s": "With determination, she {blank} the challenges ahead.",
        "blank": "overcome",
        "base": "overcome",
        "zh": "克服"
    },
    {
        "s": "This study challenges the existing {blank} in physics.",
        "blank": "paradigm",
        "base": "paradigm",
        "zh": "範式"
    },
    {
        "s": "The situation presents a clear {blank} between theory and practice.",
        "blank": "Paradox",
        "base": "Paradox",
        "zh": "悖論"
    },
    {
        "s": "Both {blank} support their children through thick and thin.",
        "blank": "parents",
        "base": "parents",
        "zh": "父母"
    },
    {
        "s": "We {blank} our dreams with relentless fire.",
        "blank": "passion",
        "base": "passion",
        "zh": "我們以不懈的熱情燃燒夢想。"
    },
    {
        "s": "She strives for {blank} in every brushstroke.",
        "blank": "Perfection",
        "base": "Perfection",
        "zh": "她在每一筆畫中追求完美。"
    },
    {
        "s": "His {blank} carried him across the toughest climbs.",
        "blank": "perseverance",
        "base": "perseverance",
        "zh": "他的毅力讓他跨過最艱難的高峰。"
    },
    {
        "s": "The {blank} guided the plane through stormy skies.",
        "blank": "pilot",
        "base": "pilot",
        "zh": "飛行員在暴風雨的天空中駕駛飛機。"
    },
    {
        "s": "They delivered a {blank} that won the investors' hearts.",
        "blank": "pitch",
        "base": "pitch",
        "zh": "他們的提案贏得了投資者的青睞。"
    },
    {
        "s": "Every child holds {blank} waiting to be nurtured.",
        "blank": "potential",
        "base": "potential",
        "zh": "每個孩子都擁有待培育的潛能。"
    },
    {
        "s": "The team unveiled a {blank} that could change the industry.",
        "blank": "prototype",
        "base": "prototype",
        "zh": "團隊展示了一個可能改變產業的原型。"
    },
    {
        "s": "She tuned the {blank} to catch the distant melody.",
        "blank": "radio",
        "base": "radio",
        "zh": "她調整收音機以捕捉遠方的旋律。"
    },
    {
        "s": "Grandma shared her secret {blank} for perfect dumplings.",
        "blank": "recipe",
        "base": "recipe",
        "zh": "奶奶分享了完美水餃的祕密食譜。"
    },
    {
        "s": "His final act was one of {blank} and forgiveness.",
        "blank": "Redemption",
        "base": "Redemption",
        "zh": "他最後的行為是救贖與寬恕。"
    },
    {
        "s": "We {blank} the outdated system to improve efficiency.",
        "blank": "reform",
        "base": "reform",
        "zh": "我們將 {blank} 這個過時的系統以提高效率。"
    },
    {
        "s": "I {blank} the missed opportunity.",
        "blank": "Regret",
        "base": "Regret",
        "zh": "我對錯過的機會感到 {blank}。"
    },
    {
        "s": "Investing in {blank} can reduce carbon emissions.",
        "blank": "renewable energy",
        "base": "renewable energy",
        "zh": "投資於 {blank} 可以減少碳排放。"
    },
    {
        "s": "Her {blank} helped her recover quickly.",
        "blank": "resilience",
        "base": "resilience",
        "zh": "她的 {blank} 幫助她迅速恢復。"
    },
    {
        "s": "Everyone deserves basic {blank}.",
        "blank": "rights",
        "base": "rights",
        "zh": "每個人都應享有基本的 {blank}。"
    },
    {
        "s": "Successful entrepreneurs embrace {blank}.",
        "blank": "risk‑taking",
        "base": "risk‑taking",
        "zh": "成功的企業家擁抱 {blank}。"
    },
    {
        "s": "A healthy {blank} can improve sleep.",
        "blank": "routine",
        "base": "routine",
        "zh": "健康的 {blank} 可以改善睡眠。"
    },
    {
        "s": "He made a {blank} for his family's future.",
        "blank": "Sacrifice",
        "base": "Sacrifice",
        "zh": "他為家人的未來做出了一個 {blank}。"
    },
    {
        "s": "The dish needs a {blank} to taste better.",
        "blank": "sauce",
        "base": "sauce",
        "zh": "這道菜需要一種 {blank} 來提升口味。"
    },
    {
        "s": "The {blank} aroma filled the kitchen.",
        "blank": "savory",
        "base": "savory",
        "zh": "那股 {blank} 的香氣充滿了廚房。"
    },
    {
        "s": "We {blank} a scholarship to support our education.",
        "blank": "scholarship",
        "base": "scholarship",
        "zh": "我們獲得獎學金以支持我們的教育。"
    },
    {
        "s": "Please take your {blank} before the performance begins.",
        "blank": "seat",
        "base": "seat",
        "zh": "請在演出開始前就座。"
    },
    {
        "s": "Remember to fasten your {blank} before the car moves.",
        "blank": "seat belt",
        "base": "seat belt",
        "zh": "請在車子移動前系好安全帶。"
    },
    {
        "s": "Developing {blank} helps you voice your needs effectively.",
        "blank": "self-advocacy",
        "base": "self-advocacy",
        "zh": "培養自我倡導能幫助你有效表達需求。"
    },
    {
        "s": "{blank} allows you to understand your emotions better.",
        "blank": "self-awareness",
        "base": "self-awareness",
        "zh": "自我覺察讓你更了解自己的情緒。"
    },
    {
        "s": "Building {blank} is essential for personal growth.",
        "blank": "self-esteem",
        "base": "self-esteem",
        "zh": "建立自尊對個人成長至關重要。"
    },
    {
        "s": "My {blank} and I share many childhood memories.",
        "blank": "siblings",
        "base": "siblings",
        "zh": "我的兄弟姐妹和我共享許多童年回憶。"
    },
    {
        "s": "Switch your phone to {blank} during the meeting.",
        "blank": "silent mode",
        "base": "silent mode",
        "zh": "會議期間請將手機切換至靜音模式。"
    },
    {
        "s": "Practice daily to improve this {blank}.",
        "blank": "skill",
        "base": "skill",
        "zh": "每天練習以提升此技能。"
    },
    {
        "s": "I grabbed a quick {blank} before the exam.",
        "blank": "snack",
        "base": "snack",
        "zh": "我在考試前快速吃了點零食。"
    },
    {
        "s": "We {blank} to connect with others.",
        "blank": "social skills",
        "base": "social skills",
        "zh": "我們{blank}以與他人建立聯繫。"
    },
    {
        "s": "We {blank} in times of need.",
        "blank": "solidarity",
        "base": "solidarity",
        "zh": "我們{blank}於需要時刻。"
    },
    {
        "s": "We {blank} with empathy and support.",
        "blank": "special needs",
        "base": "special needs",
        "zh": "我們{blank}以同理心與支持。"
    },
    {
        "s": "We {blank} across a wide range of possibilities.",
        "blank": "spectrum",
        "base": "spectrum",
        "zh": "我們{blank}於廣泛的可能性。"
    },
    {
        "s": "We {blank} the dish to add a kick.",
        "blank": "spicy",
        "base": "spicy",
        "zh": "我們{blank}這道菜以增添辣味。"
    },
    {
        "s": "We {blank} even when the competition is fierce.",
        "blank": "sportsmanship",
        "base": "sportsmanship",
        "zh": "我們{blank}即使競爭激烈。"
    },
    {
        "s": "We {blank} with fresh ideas.",
        "blank": "startup",
        "base": "startup",
        "zh": "我們{blank}以新穎的想法。"
    },
    {
        "s": "We {blank} the stew until it is tender.",
        "blank": "stewed",
        "base": "stewed",
        "zh": "我們{blank}炖菜直到柔軟。"
    },
    {
        "s": "We {blank} the scenes before filming.",
        "blank": "storyboard",
        "base": "storyboard",
        "zh": "我們{blank}場景後進行拍攝。"
    },
    {
        "s": "We {blank} to captivate our audience.",
        "blank": "storytelling",
        "base": "storytelling",
        "zh": "我們{blank}以吸引觀眾。"
    },
    {
        "s": "We enjoy {blank} from the bustling market.",
        "blank": "street food",
        "base": "street food",
        "zh": "我們喜歡來自熱鬧市場的{blank}。"
    },
    {
        "s": "Our community thrives with {blank} from local volunteers.",
        "blank": "support",
        "base": "support",
        "zh": "我們的社區在當地志願者的{blank}下蓬勃發展。"
    },
    {
        "s": "The company's future depends on {blank} practices.",
        "blank": "sustainability",
        "base": "sustainability",
        "zh": "公司的未來取決於{blank}的做法。"
    },
    {
        "s": "Great results come from the {blank} of our departments.",
        "blank": "synergy",
        "base": "synergy",
        "zh": "卓越的成果來自於我們各部門的{blank}。"
    },
    {
        "s": "The research breakthrough was achieved through careful {blank} of data.",
        "blank": "Synthesis",
        "base": "Synthesis",
        "zh": "研究突破是透過對資料的仔細{blank}而實現的。"
    },
    {
        "s": "Our growth is fueled by {blank} across the organization.",
        "blank": "talent",
        "base": "talent",
        "zh": "我們的成長由組織內的{blank}所驅動。"
    },
    {
        "s": "Success in the project relies on effective {blank}.",
        "blank": "teamwork",
        "base": "teamwork",
        "zh": "專案的成功依賴於有效的{blank}。"
    },
    {
        "s": "The chef prepared a {blank} piece of meat for the guests.",
        "blank": "tender",
        "base": "tender",
        "zh": "廚師為客人準備了一塊{blank}的肉。"
    },
    {
        "s": "The dessert's appeal lies in its unique {blank}.",
        "blank": "texture",
        "base": "texture",
        "zh": "甜點的吸引力在於其獨特的{blank}。"
    },
    {
        "s": "Families gather at the {blank} for a day of fun.",
        "blank": "theme park",
        "base": "theme park",
        "zh": "家庭們聚集在{blank}度過歡樂的一天。"
    },
    {
        "s": "I often seek {blank} after a stressful day.",
        "blank": "therapy",
        "base": "therapy",
        "zh": "我常在壓力大的一天後尋求{blank}。"
    },
    {
        "s": "Our team needs to {blank} to solve this problem.",
        "blank": "think outside the box",
        "base": "think outside the box",
        "zh": "我們的團隊需要{blank}才能解決這個問題。"
    },
    {
        "s": "Every holiday, we honor {blank} with a family dinner.",
        "blank": "tradition",
        "base": "tradition",
        "zh": "每逢節日，我們會以{blank}舉行家庭晚餐來表達敬意。"
    },
    {
        "s": "She completed her {blank} in martial arts last month.",
        "blank": "training",
        "base": "training",
        "zh": "她上個月完成了她的{blank}。"
    },
    {
        "s": "The novel explores the consequences of {blank} in a utopian society.",
        "blank": "Transgression",
        "base": "Transgression",
        "zh": "這部小說探討在烏托邦社會中{blank}的後果。"
    },
    {
        "s": "He realized that {blank} was empty without genuine connections.",
        "blank": "Vanity",
        "base": "Vanity",
        "zh": "他意識到沒有真誠的連結，{blank}是空洞的。"
    },
    {
        "s": "The crowd erupted in cheers after the team's {blank}.",
        "blank": "victory",
        "base": "victory",
        "zh": "在球隊的{blank}後，觀眾發出歡呼聲。"
    },
    {
        "s": "She is known as a {blank} who envisions a sustainable future.",
        "blank": "visionary",
        "base": "visionary",
        "zh": "她被稱為{blank}，能預見可持續的未來。"
    },
    {
        "s": "The protest gained momentum when the crowd raised their {blank} together.",
        "blank": "voice",
        "base": "voice",
        "zh": "當群眾一起舉起他們的{blank}時，抗議活動勢頭大增。"
    },
    {
        "s": "From the {blank}, I watched the sunrise over the city.",
        "blank": "window seat",
        "base": "window seat",
        "zh": "從{blank}上，我看見城市的日出。"
    }
  ],
  "高2": [
    { s: "The company plans to {blank} twenty new staff members next month.", blank: "employ", base: "employ", zh: "公司計劃下個月雇用二十名新員工。" },
    { s: "As the {blank}, she was responsible for hiring new employees.", blank: "employer", base: "employer", zh: "作為雇主，她負責雇用新員工。" },
    { s: "The new {blank} was nervous on his first day at work.", blank: "employee", base: "employee", zh: "新員工第一天上班很緊張。" },
    { s: "Full {blank} can give people a sense of purpose.", blank: "employment", base: "employment", zh: "全職工作能賦予人目標感。" },
    { s: "She works for a large {blank} that operates in many countries.", blank: "corporation", base: "corporation", zh: "她在一家跨國大型集團公司工作。" },
    { s: "He is experienced in the {blank} world.", blank: "corporate", base: "corporate", zh: "他在企業界經驗豐富。" },
    { s: "She began to {blank} from a serious illness last year.", blank: "suffer", base: "suffer", zh: "她去年開始因重病而受苦。" },
    { s: "The patient was taken to the airport {blank} to catch a flight.", blank: "terminal", base: "terminal", zh: "病人被帶到機場航廈搭機。" },
    { s: "His chronic {blank} kept him from going to school.", blank: "illness", base: "illness", zh: "他長期的疾病讓他無法上學。" },
    { s: "She was too {blank} to go outside in the cold weather.", blank: "ill", base: "ill", zh: "她生病了，太虛弱無法在寒冷天氣外出。" },
    { s: "The movie was {blank} long and boring.", blank: "tremendously", base: "tremendously", zh: "那部電影相當冗長且無聊。" },
    { s: "A {blank} amount of water fell during the typhoon.", blank: "tremendous", base: "tremendous", zh: "颱風期間降下了相當大量的雨水。" },
    { s: "The children's {blank} filled the room with joy.", blank: "laughter", base: "laughter", zh: "孩子們的笑聲讓房間充滿了歡樂。" },
    { s: "The loud noise began to {blank} the little baby.", blank: "frighten", base: "frighten", zh: "巨大的聲響開始使小寶寶受驚。" },
    { s: "The child was taken to the emergency room in a state of {blank}.", blank: "fright", base: "fright", zh: "那個孩子在驚嚇狀態下被送到急診室。" },
    { s: "If you have any questions, please don't hesitate to {blank} me.", blank: "contact", base: "contact", zh: "如果有任何問題，請不吝與我聯絡。" },
    { s: "Wash your hands often to avoid spreading {blank}.", blank: "germ", base: "germ", zh: "勤洗手以避免細菌散播。" },
    { s: "She greeted us with great {blank} and kindness.", blank: "warmth", base: "warmth", zh: "她以極大的熱情和善意迎接我們。" },
    { s: "The {blank} old woman needed help to cross the street.", blank: "frail", base: "frail", zh: "那位虛弱的老婦人需要協助才能過馬路。" },
    { s: "The speaker's words began to {blank} the audience to take action.", blank: "prompt", base: "prompt", zh: "演講者的話促使聽眾採取行動。" },
    { s: "She was {blank} to her room by illness for three months.", blank: "confine", base: "confine", zh: "她因病被侷限在房間裡三個月。" },
    { s: "Her eyes began to {blank} with tears of happiness.", blank: "sparkle", base: "sparkle", zh: "她的眼睛開始因喜悅的淚水而閃耀。" },
    { s: "He gave his mother a warm {blank} before leaving.", blank: "hug", base: "hug", zh: "他在離開前給了媽媽一個溫暖的擁抱。" },
    { s: "After the long meeting, she felt very {blank}.", blank: "drowsy", base: "drowsy", zh: "冗長的會議後，她感到昏昏欲睡。" },
    { s: "She began to {blank} her arms to greet her friend.", blank: "stretch", base: "stretch", zh: "她開始伸展雙臂來迎接朋友。" },
    { s: "He decided to {blank} the invitation because he was too busy.", blank: "refuse", base: "refuse", zh: "他決定拒絕邀請，因為他太忙了。" },
    { s: "Her {blank} to answer the question made everyone nervous.", blank: "refusal", base: "refusal", zh: "她拒絕回答問題，讓所有人都很緊張。" },
    { s: "Don't {blank} to ask for help if you need it.", blank: "hesitate", base: "hesitate", zh: "如果需要幫忙，不要猶豫。" },
    { s: "After a moment's {blank}, she finally made her decision.", blank: "hesitation", base: "hesitation", zh: "猶豫片刻後，她終於做出了決定。" },
    { s: "Please {blank} this letter to your teacher.", blank: "pass on", base: "pass on", zh: "請把這封信轉交給你的老師。" },
    { s: "Duncan tried to {blank} his friend Lily.", blank: "cheer up", base: "cheer up", zh: "Duncan 試著讓他的朋友 Lily 振作起來。" },
    { s: "She decided to {blank} the job offer.", blank: "turn down", base: "turn down", zh: "她決定拒絕那份工作邀約。" },
    { s: "The movie {blank} start; please take your seat.", blank: "be about to", base: "be about to", zh: "電影即將開始，請盡快入座。" },
    { s: "Don't give up; {blank}, you've already come this far.", blank: "after all", base: "after all", zh: "不要放棄，畢竟你已經走了這麼遠。" },
    { s: "My grandfather {blank} peacefully at the age of 90.", blank: "pass away", base: "pass away", zh: "我的祖父在90歲時平靜地過世了。" },
    { s: "A good teacher can {blank} in a student's life.", blank: "make a difference", base: "make a difference", zh: "一位好老師能對學生的人生有所影響。" }
  ]
};

// 相容舊版：全部合併（供未選範圍時使用）
const WORDS = Object.values(WORDS_BY_UNIT).flat();
const SENTENCES = Object.values(SENTENCES_BY_UNIT).flat();
