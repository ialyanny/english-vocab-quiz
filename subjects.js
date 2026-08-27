// 高二開學考：高一四科（國文/數學/自然/社會）範例題庫
// 題型格式：
//   type: "single" | "multi" | "fill" | "calc"
//   q: 題幹
//   options: ["A","B","C","D"]          // single / multi 用
//   answer: 2 或 [1,3]                   // single: 正確選項索引；multi: 正確索引陣列
//   answerText: "正確解答文字"            // fill / calc 用
//   solution: "解題說明（答錯或看解析時顯示）"
//   passage: "閱讀文章（可選，顯示在題幹上方）"
//   image: "圖片網址（可選，顯示圖表/示意圖）"
const SUBJECT_QUESTIONS = {
  "國文": [
    { type: "single", q: "〈師說〉的作者是誰？", options: ["柳宗元", "韓愈", "歐陽修", "蘇軾"], answer: 1,
      solution: "〈師說〉為唐代韓愈所作，提倡從師求學的精神。" },
    { type: "single", q: "〈桃花源記〉的作者是誰？", options: ["陶淵明", "王羲之", "謝靈運", "王維"], answer: 0,
      solution: "〈桃花源記〉為東晉陶淵明（陶潛）的寓言式記敘文。" },
    { type: "single", q: "「落霞與孤鶩齊飛，秋水共長天一色」出自哪一篇名作？", options: ["岳陽樓記", "滕王閣序", "醉翁亭記", "赤壁賦"], answer: 1,
      solution: "此名句出自唐代王勃的〈滕王閣序〉。" },
    { type: "single", q: "〈項脊軒志〉的作者是誰？", options: ["歸有光", "袁宏道", "方苞", "姚鼐"], answer: 0,
      solution: "〈項脊軒志〉為明代歸有光追憶故居與親人的抒情散文。" },
    { type: "single", q: "「先天下之憂而憂，後天下之樂而樂」出自哪篇文章？", options: ["岳陽樓記", "愛蓮說", "陋室銘", "五柳先生傳"], answer: 0,
      solution: "出自范仲淹〈岳陽樓記〉，表達以天下為己任的胸懷。" },
    { type: "single", q: "「瞠」目結舌的「瞠」正確讀音是？", options: ["táng", "chēng", "tǎng", "zhǎng"], answer: 1,
      solution: "「瞠」讀 chēng，意為瞪大眼睛看，形容驚呆的樣子。" },
    { type: "single", q: "〈世說新語〉的編者是誰？", options: ["劉義慶", "干寶", "劉勰", "蕭統"], answer: 0,
      solution: "〈世說新語〉為南朝宋劉義慶召集門客編纂的志人小說。" },
    { type: "single", q: "成語「鞠躬盡瘁」出自下列哪篇作品？", options: ["出師表", "陳情表", "諫太宗十思疏", "師說"], answer: 0,
      solution: "諸葛亮〈出師表〉：「鞠躬盡瘁，死而後已。」" },
    { type: "multi", q: "下列何者屬於「唐宋八大家」？（多選）", options: ["韓愈", "柳宗元", "司馬遷", "蘇軾"], answer: [0,1,3],
      solution: "唐宋八大家：韓柳歐曾王三蘇。司馬遷為西漢史學家，不在八家之列。" },
    { type: "multi", q: "下列詩句何者為「現代詩」？（多選）", options: ["《鄉愁》余光中", "《再別康橋》徐志摩", "《靜夜思》李白", "《雨巷》戴望舒"], answer: [0,1,3],
      solution: "《靜夜思》為唐代李白的古詩，其餘皆為現代詩。" },
    { type: "fill", q: "陶淵明〈桃花源記〉：「芳草鮮美，＿＿＿＿。」", answerText: "落英繽紛",
      solution: "原句：「芳草鮮美，落英繽紛。」描寫桃花源的春日美景。" },
    { type: "fill", q: "韓愈〈師說〉：「＿＿＿＿，師之所存也。」", answerText: "道之所存",
      solution: "原句：「道之所存，師之所存也。」意即道理存在的地方，就是老師存在的地方。" },
    { type: "fill", q: "《論語》：「學而不思則罔，＿＿＿＿。」", answerText: "思而不學則殆",
      solution: "原句：「學而不思則罔，思而不學則殆。」強調學思並重。" },
    { type: "single",
      passage: "閱讀下文：『山不在高，有仙則名。水不在深，有龍則靈。斯是陋室，惟吾德馨。』此為劉禹錫〈陋室銘〉。",
      q: "這段文字主要表達作者什麼樣的態度？", options: ["追求富貴", "重視品德修養勝於物質", "厭惡讀書", "嚮往山林隱居不問世事"], answer: 1,
      solution: "〈陋室銘〉以「惟吾德馨」表明作者認為品德比物質條件更重要。" }
  ],
  "數學": [
    { type: "single", q: "設 A={1,2,3}，B={2,3,4}，則 A∩B = ？", options: ["{1,2,3}", "{2,3}", "{2,3,4}", "{1,4}"], answer: 1,
      solution: "交集為兩集合共有的元素：{2,3}。" },
    { type: "single", q: "若 f(x)=x²，則 f(3) = ？", options: ["3", "6", "9", "27"], answer: 2,
      solution: "f(3)=3²=9。" },
    { type: "single", q: "方程式 2x−1=5 的解為？", options: ["x=2", "x=3", "x=4", "x=6"], answer: 1,
      solution: "2x=6，故 x=3。" },
    { type: "single", q: "不等式 3x−6>0 的解為？", options: ["x>2", "x<2", "x>−2", "x<−2"], answer: 0,
      solution: "3x>6，故 x>2。" },
    { type: "single", q: "二次函數 y=x²−4x+3 的頂點 x 座標為？", options: ["1", "2", "3", "4"], answer: 1,
      solution: "配方法：y=(x−2)²−1，頂點 x 座標為 2。" },
    { type: "single", q: "log₂8 = ？", options: ["2", "3", "4", "8"], answer: 1,
      solution: "因為 2³=8，所以 log₂8=3。" },
    { type: "single", q: "直線 y=2x+1 與 y 軸的交點座標為？", options: ["(0,1)", "(1,0)", "(0,2)", "(2,0)"], answer: 0,
      solution: "與 y 軸相交時 x=0，代入得 y=1，故為 (0,1)。" },
    { type: "multi", q: "下列函數中，哪些為偶函數？（多選）", options: ["y=x²", "y=|x|", "y=x³", "y=cos x"], answer: [0,1,3],
      solution: "偶函數滿足 f(−x)=f(x)。x²、|x|、cos x 皆為偶函數；x³ 為奇函數。" },
    { type: "multi", q: "二次方程式 x²−5x+6=0 的根有哪些？（多選）", options: ["x=2", "x=3", "x=−2", "x=−3"], answer: [0,1],
      solution: "x²−5x+6=(x−2)(x−3)=0，故根為 2、3。" },
    { type: "fill", q: "計算 2³ = ？", answerText: "8",
      solution: "2³=2×2×2=8。" },
    { type: "fill", q: "√16 = ？", answerText: "4",
      solution: "因為 4²=16，故 √16=4。" },
    { type: "calc", q: "展開 (x+2)(x−3)。", answerText: "x²−x−6",
      solution: "(x+2)(x−3)=x²−3x+2x−6=x²−x−6。" },
    { type: "calc", q: "解方程式 2x+3=11。", answerText: "x=4",
      solution: "2x=11−3=8，故 x=4。" },
    { type: "calc", q: "化簡 3(x−1)+2x。", answerText: "5x−3",
      solution: "3(x−1)+2x=3x−3+2x=5x−3。" }
  ],
  "自然": [
    { type: "single", q: "光在真空中的傳播速度約為？", options: ["3×10⁵ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "340 m/s"], answer: 1,
      solution: "光速 c≈3×10⁸ m/s；340 m/s 為空氣中聲速。" },
    { type: "single", q: "牛頓第二運動定律 F=ma，若質量 2kg、加速度 3m/s²，則合力為？", options: ["5 N", "6 N", "1 N", "9 N"], answer: 1,
      solution: "F=ma=2×3=6 N。" },
    { type: "single", q: "在一大氣壓下，純水的沸點為攝氏多少度？", options: ["0°C", "50°C", "100°C", "212°C"], answer: 2,
      solution: "1 atm 下純水沸點為 100°C（212°F）。" },
    { type: "single", q: "食鹽的主要化學成分是？", options: ["NaCl", "KCl", "CaCO₃", "H₂SO₄"], answer: 0,
      solution: "食鹽為氯化鈉 NaCl。" },
    { type: "single", q: "水的化學式為？", options: ["CO₂", "H₂O", "O₂", "NaCl"], answer: 1,
      solution: "水由兩個氫原子與一個氧原子組成，化學式 H₂O。" },
    { type: "single", q: "pH 值等於 7 時，溶液呈現何種性質？", options: ["酸性", "鹼性", "中性", "強酸性"], answer: 2,
      solution: "pH=7 為中性；小於 7 為酸性，大於 7 為鹼性。" },
    { type: "single", q: "植物細胞進行光合作用的主要胞器是？", options: ["粒線體", "葉綠體", "高基氏體", "溶體"], answer: 1,
      solution: "葉綠體含葉綠素，是光合作用（光能轉化為化學能）的場所。" },
    { type: "single", q: "地球大氣中含量比例最高的氣體是？", options: ["氧氣 O₂", "氮氣 N₂", "二氧化碳 CO₂", "氬 Ar"], answer: 1,
      solution: "大氣約 78% 為氮氣 N₂，21% 為氧氣。" },
    { type: "multi", q: "下列何者屬於可再生能源？（多選）", options: ["太陽能", "風能", "煤炭", "石油"], answer: [0,1],
      solution: "太陽能、風能取之不盡，為再生能源；煤炭、石油為化石燃料，屬不可再生。" },
    { type: "multi", q: "下列哪些現象常發生於板塊交界處？（多選）", options: ["地震", "火山活動", "海溝形成", "平原廣布"], answer: [0,1,2],
      solution: "板塊交界地殼活動劇烈，易有地震、火山、海溝；平原多分布於板塊內部或沉降區。" },
    { type: "fill", q: "人體正常體溫約為攝氏多少度？", answerText: "37",
      solution: "人體核心正常體溫約 37°C（範圍 36.5–37.5°C）。" },
    { type: "fill", q: "植物進行呼吸作用的主要胞器是？", answerText: "粒線體",
      solution: "粒線體是細胞的「發電廠」，進行有氧呼吸產生 ATP。" },
    { type: "calc", q: "某物以等速度跑 100 公尺花了 20 秒，求其平均速度（m/s）。", answerText: "5",
      solution: "速度=距離÷時間=100÷20=5 m/s。" },
    { type: "calc", q: "將 500 公克的水從 20°C 加熱到 100°C，若水的比熱為 1 cal/(g·°C)，需吸收多少熱量（cal）？", answerText: "40000",
      solution: "Q=mcΔT=500×1×(100−20)=500×80=40000 cal。" }
  ],
  "社會": [
    { type: "single", q: "台灣在哪一條約簽訂後進入日治時期（1895 年）？", options: ["南京條約", "馬關條約", "辛丑條約", "北京條約"], answer: 1,
      solution: "1895 年清廷在甲午戰爭戰敗後簽訂《馬關條約》，將台灣割讓日本。" },
    { type: "single", q: "鄭成功驅逐荷蘭人、收復台灣是在哪一年？", options: ["1624 年", "1662 年", "1683 年", "1895 年"], answer: 1,
      solution: "1662 年鄭成功擊退荷蘭東印度公司，結束其在台統治。" },
    { type: "single", q: "台灣本島的最高峰是？", options: ["玉山", "雪山", "南湖大山", "秀姑巒山"], answer: 0,
      solution: "玉山海拔 3952 公尺，為台灣第一高峰，也是東亞重要高山。" },
    { type: "single", q: "台灣最長的河川是？", options: ["淡水河", "濁水溪", "曾文溪", "高屏溪"], answer: 1,
      solution: "濁水溪全長約 186 公里，為台灣最長河川。" },
    { type: "single", q: "我國中央政府的「五權」體制，下列何者不屬於五院之一？", options: ["行政院", "立法院", "司法院", "檢察院"], answer: 3,
      solution: "五院為行政、立法、司法、考試、監察；檢察體系隸屬行政院法務部，非五院之一。" },
    { type: "single", q: "我國現行法律規定，擁有選舉權（投票權）的年齡為？", options: ["18 歲", "20 歲", "23 歲", "25 歲"], answer: 1,
      solution: "現行《刑法》《選舉罷免法》等以 20 歲為成年與投票年齡（修憲降至 18 歲之提案尚未通過生效）。" },
    { type: "single", q: "北回歸線通過台灣的哪兩個縣市？", options: ["嘉義、花蓮", "台北、高雄", "台中、台南", "屏東、台東"], answer: 0,
      solution: "北回歸線（北緯 23.5°）橫越台灣的嘉義縣與花蓮縣。" },
    { type: "multi", q: "下列何者屬於我國權力分立的機關？（多選）", options: ["行政院", "立法院", "司法院", "總統府（政黨）"], answer: [0,1,2],
      solution: "我國採五權分立，行政、立法、司法為憲法明定的三權；總統為國家元首，非分立機關之一。" },
    { type: "multi", q: "台灣的氣候主要受到哪些因素影響？（多選）", options: ["季風", "黑潮（暖流）", "地形抬升", "極地寒流"], answer: [0,1,2],
      solution: "台灣屬副熱帶季風氣候，受季風、黑潮暖流與中央山脈地形影響明顯；極地寒流影響不大。" },
    { type: "fill", q: "中華民國憲法於西元哪一年開始施行？", answerText: "1947",
      solution: "憲法於 1946 年制定、1947 年 12 月 25 日施行。" },
    { type: "fill", q: "台灣地區的總面積約為多少萬平方公里？", answerText: "3.6",
      solution: "台灣本島加離島面積約 3.6 萬平方公里。" },
    { type: "calc", q: "某縣人口 230 萬人，面積 2300 平方公里，求人口密度（人/平方公里）。", answerText: "1000",
      solution: "人口密度=人口÷面積=2,300,000÷2300=1000 人/km²。" },
    { type: "single",
      passage: "閱讀資料：『臺灣因位處板塊交界，地震頻繁；中央山脈縱貫南北，阻隔東西交通，也造就迎風坡與背風坡的降水差異。』",
      q: "根據上文，台灣地震頻繁的主要地質原因是？", options: ["位處板塊交界", "四面環海", "多火山噴發", "人口過密"], answer: 0,
      solution: "文中明言台灣位處板塊交界，故地震頻繁。" }
  ]
};

// 開學考各科目題數統計
const SUBJECT_KEYS = Object.keys(SUBJECT_QUESTIONS);
function getSubjectCounts() {
  const o = {};
  SUBJECT_KEYS.forEach(k => o[k] = SUBJECT_QUESTIONS[k].length);
  return o;
}
