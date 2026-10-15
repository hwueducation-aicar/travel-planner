/**
 * Travel Planner Data & Generation Engine
 * Contains presets for top destinations, dynamic itinerary generator, and API adapters.
 */

const PRESET_DESTINATIONS = {
  "台北": {
    city: "台北市 (Taipei)",
    country: "台灣",
    center: [25.0330, 121.5654],
    zoom: 13,
    description: "結合現代摩天大樓、歷史廟宇與世界級小吃夜市的活力都會。",
    weatherTip: "氣候溫和多雨，建議隨身攜帶折疊傘，搭乘捷運最便利。",
    transportTip: "推薦使用悠遊卡搭乘台北捷運 (MRT) 與 YouBike 微笑單車。",
    attractions: [
      {
        id: "tpe-att-1",
        name: "台北101觀景台",
        category: "地標觀景",
        rating: 4.8,
        reviews: "3.2萬則評價",
        address: "台北市信義區信義路五段7號",
        lat: 25.0339,
        lng: 121.5645,
        stayTime: "1.5 ~ 2 小時",
        openHours: "10:00 - 21:00",
        description: "曾為世界最高摩天大樓，搭乘超高速電梯登頂，360度俯瞰大台北城市與群山環繞的壯麗景致。",
        tips: "推薦傍晚入場，可同時欣賞日落黃昏與璀璨璀璨的百萬夜景；別忘了參觀巨大的風阻尼球！",
        image: "https://images.unsplash.com/photo-1508248017024-fb727653229b?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-att-2",
        name: "國立故宮博物院",
        category: "歷史藝術",
        rating: 4.7,
        reviews: "2.8萬則評價",
        address: "台北市士林區至善路二段221號",
        lat: 25.1023,
        lng: 121.5485,
        stayTime: "2 ~ 3 小時",
        openHours: "09:00 - 17:00 (週一休館)",
        description: "收藏近70萬件跨越數千年的中華古代瑰寶與書畫，名列世界四大博物館之一。",
        tips: "翠玉白菜與肉形石是必看人氣國寶，建議提前於官網預約門票免排隊。",
        image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-att-3",
        name: "艋舺龍山寺",
        category: "宗教文化",
        rating: 4.6,
        reviews: "2.4萬則評價",
        address: "台北市萬華區廣州街211號",
        lat: 25.0368,
        lng: 121.4999,
        stayTime: "1 小時",
        openHours: "07:00 - 21:30",
        description: "建於清乾隆年間的國家二級古蹟，傳統剪黏石雕工藝精湛，香火鼎盛，月老星君尤為靈驗。",
        tips: "參拜後可順道逛逛旁邊的剝皮寮歷史街區與華西街觀光夜市。",
        image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-att-4",
        name: "松山文創園區 (松菸)",
        category: "文創藝術",
        rating: 4.5,
        reviews: "1.9萬則評價",
        address: "台北市信義區光復南路133號",
        lat: 25.0438,
        lng: 121.5604,
        stayTime: "1.5 小時",
        openHours: "09:00 - 18:00 (室內展區)",
        description: "由日治時期松山菸草工場改建的設計與藝術重鎮，綠意庭園與古蹟倉庫洋溢文青悠閒氣息。",
        tips: "緊鄰誠品生活松菸店（24小時書店），常有各類國際設計展與特色市集。",
        image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-att-5",
        name: "象山親山步道 (六巨石)",
        category: "自然登山",
        rating: 4.7,
        reviews: "2.1萬則評價",
        address: "台北市信義區信義路五段150巷",
        lat: 25.0273,
        lng: 121.5746,
        stayTime: "1.5 小時",
        openHours: "全天開放",
        description: "眺望台北盆地與台北101天際線最完美的經典拍攝點，階梯步道修整完善，登頂僅需約20-30分鐘。",
        tips: "推薦接近傍晚時登頂，拍下夕陽金光灑在101上的明信片級美照，請穿好走布鞋。",
        image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "tpe-res-1",
        name: "鼎泰豐 (台北101旗艦店)",
        category: "經典台灣料理 / 小籠包",
        rating: 4.7,
        reviews: "2.9萬則評價",
        priceRange: "$$$",
        address: "台北市信義區市府路45號B1 (台北101內)",
        lat: 25.0336,
        lng: 121.5642,
        openHours: "11:00 - 20:30",
        signature: "黃金十八摺小籠包、排骨蛋炒飯、紅油抄手、松露小籠包",
        vibe: "國際米其林必比登推薦，透明開放式廚房，極致貼心細膩的台式餐飲服務體驗。",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-res-2",
        name: "阜杭豆漿",
        category: "傳統中式早午餐",
        rating: 4.4,
        reviews: "1.6萬則評價",
        priceRange: "$",
        address: "台北市中正區忠孝東路一段108號2樓 (華山市場)",
        lat: 25.0441,
        lng: 121.5247,
        openHours: "05:30 - 12:30 (週一公休)",
        signature: "厚燒餅夾蛋、香濃鹹豆漿、焦糖甜餅、油條",
        vibe: "老台北人心目中的傳奇排隊早餐，窯烤厚燒餅外酥內軟，香氣四溢。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-res-3",
        name: "永康牛肉麵",
        category: "老字號台灣牛肉麵",
        rating: 4.3,
        reviews: "1.1萬則評價",
        priceRange: "$$",
        address: "台北市大安區金山南路二段31巷17號",
        lat: 25.0332,
        lng: 121.5298,
        openHours: "11:00 - 20:50",
        signature: "紅燒半筋半肉牛肉麵、粉蒸排骨、粉蒸肥腸",
        vibe: "自1963年創立至今的川味牛肉麵霸主，大塊厚切牛肉燉至軟嫩化口，湯頭濃郁香醇。",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-res-4",
        name: "欣葉台菜 (創始店)",
        category: "道地精緻台菜宴席",
        rating: 4.5,
        reviews: "8,500則評價",
        priceRange: "$$$",
        address: "台北市中山區雙城街34-1號",
        lat: 25.0645,
        lng: 121.5249,
        openHours: "11:30 - 15:00, 17:00 - 21:30",
        signature: "正宗菜脯蛋、煎豬肝、紅蟳米糕、杏仁豆腐",
        vibe: "四十餘年經典台菜老招牌，將家常料理升級為精緻饗宴，深受政商名流與國外貴賓喜愛。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      },
      {
        id: "tpe-res-5",
        name: "富霸王豬腳",
        category: "台北經典小吃便當",
        rating: 4.4,
        reviews: "9,200則評價",
        priceRange: "$",
        address: "台北市中山區南京東路二段115巷20號",
        lat: 25.0519,
        lng: 121.5342,
        openHours: "11:00 - 19:30 (週日、一公休)",
        signature: "霸王腿扣、滷肉飯、潤白豆腐、燙青菜",
        vibe: "四平商圈人氣爆棚的排隊排隊名店，琥珀色滷汁膠質豐厚、肉質軟嫩入口即化。",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
      }
    ]
  },
  "台南": {
    city: "台南市 (Tainan)",
    country: "台灣",
    center: [22.9997, 120.2270],
    zoom: 13,
    description: "台灣歷史文化古都，滿城古蹟街巷與數百年傳承的美食小吃王國。",
    weatherTip: "陽光充沛炎熱，建議做好防曬與適時補充水分，租機車遊逛最靈活。",
    transportTip: "台南景點集中於中西區與安平區，租機車或搭配大台南公車非常方便。",
    attractions: [
      {
        id: "tnn-att-1",
        name: "赤崁樓 (普羅民遮城)",
        category: "歷史古蹟",
        rating: 4.6,
        reviews: "2.1萬則評價",
        address: "台南市中西區民族路二段212號",
        lat: 22.9976,
        lng: 120.2026,
        stayTime: "1.5 小時",
        openHours: "08:30 - 21:30",
        description: "荷治時期所建紅毛樓，歷經明鄭與清代更迭，庭院贔屭御碑與紅磚閣樓極具歷史厚重感。",
        tips: "夜間點燈後氛圍浪漫，周邊民族路聚集眾多百年小吃名店。",
        image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-att-2",
        name: "奇美博物館",
        category: "西洋藝術殿堂",
        rating: 4.8,
        reviews: "3.5萬則評價",
        address: "台南市仁德區文華路二段66號",
        lat: 22.9348,
        lng: 120.2263,
        stayTime: "3 小時",
        openHours: "09:30 - 17:30 (週三休館)",
        description: "宛如置身歐洲宮殿的純白建築，展出豐富西洋繪畫、雕塑、世界頂級名琴與兵器動物標本。",
        tips: "阿波羅噴泉與奧林帕斯橋是超人氣婚紗與打卡聖地，館內門票強烈建議提前預訂。",
        image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-att-3",
        name: "安平古堡與安平老街",
        category: "古蹟老街",
        rating: 4.5,
        reviews: "2.6萬則評價",
        address: "台南市安平區國勝路82號",
        lat: 23.0016,
        lng: 120.1606,
        stayTime: "2 小時",
        openHours: "08:30 - 17:30",
        description: "台灣最早要塞熱蘭遮城遺跡，古紅磚殘壁見證大航海時代興衰；老街洋溢熱鬧古早童玩與蝦餅香氣。",
        tips: "登上瞭望台可遠眺安平港海景，老街內別錯過尋找傳統安平劍獅祈福辟邪。",
        image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-att-4",
        name: "神農街 (北勢街)",
        category: "老屋文創",
        rating: 4.6,
        reviews: "1.8萬則評價",
        address: "台南市中西區神農街",
        lat: 22.9978,
        lng: 120.1963,
        stayTime: "1.5 小時",
        openHours: "全天開放 (文創小店約13:00後營業)",
        description: "台南保存最完整的清代五條港老街，斑駁木門、紅磚燈籠與進駐的青年獨立文創咖啡店完美共融。",
        tips: "黃昏入夜後紅燈籠亮起時最迷人，是攝影愛好者捕捉懷舊溫暖情調的首選。",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-att-5",
        name: "四草綠色隧道",
        category: "生態景觀",
        rating: 4.6,
        reviews: "2.2萬則評價",
        address: "台南市安南區大眾路360號",
        lat: 23.0195,
        lng: 120.1368,
        stayTime: "1.5 小時",
        openHours: "08:30 - 16:30",
        description: "被譽為『台灣袖珍版亞馬遜河』，乘膠筏穿梭於百年紅樹林形成的碧綠水上樹冠隧道。",
        tips: "坐在竹筏最前排視野最佳，請戴斗笠防曬並小心頭頂低矮樹枝。",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "tnn-res-1",
        name: "文章牛肉湯 (安平旗艦店)",
        category: "台南溫體牛肉湯",
        rating: 4.5,
        reviews: "2.5萬則評價",
        priceRange: "$$",
        address: "台南市安平區安平路300號",
        lat: 22.9995,
        lng: 120.1741,
        openHours: "10:30 - 02:00 (週一14:00至週二10:30休)",
        signature: "招牌溫體牛肉湯、牛肉燥飯、蔥爆牛肉、牛雜湯",
        vibe: "每日善化新鮮直送的現宰溫體牛，熱高湯瞬間淋上生牛肉，肉質軟嫩甘醇至極。",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-res-2",
        name: "阿堂鹹粥",
        category: "傳統在地台南早點",
        rating: 4.1,
        reviews: "1.2萬則評價",
        priceRange: "$$",
        address: "台南市中西區西門路一段728號 (小西門圓環)",
        lat: 22.9882,
        lng: 120.1979,
        openHours: "06:00 - 12:30 (週二公休)",
        signature: "綜合鹹粥、虱目魚肚粥、香煎魚腸、油條",
        vibe: "台南澎湃系早餐代表，滿滿鮮甜虱目魚與蚵仔熬煮的高湯飯湯，搭配香脆油條一絕。",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-res-3",
        name: "富盛號碗粿",
        category: "台南百年傳統小吃",
        rating: 4.3,
        reviews: "1.4萬則評價",
        priceRange: "$",
        address: "台南市中西區民族路三段11號 (永樂市場)",
        lat: 22.9979,
        lng: 120.1989,
        openHours: "07:00 - 17:00 (週四公休)",
        signature: "黑糖色傳統碗粿、魚羹湯",
        vibe: "走過八十載風霜的國華街老味，在來米漿包裹豬後腿肉與肉燥，以竹籤舀食風味獨特。",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-res-4",
        name: "同記安平豆花",
        category: "古早味傳統甜品",
        rating: 4.4,
        reviews: "1.8萬則評價",
        priceRange: "$",
        address: "台南市安平區安北路433號",
        lat: 23.0033,
        lng: 120.1537,
        openHours: "09:00 - 23:00",
        signature: "傳統白豆花(紅豆/珍珠)、黑豆花、竹炭黑豆花",
        vibe: "安平必吃消暑冰品，非基改黃豆古法凝固，口感綿密順滑，甘蔗糖水香甜不膩口。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "tnn-res-5",
        name: "阿江炒鱔魚",
        category: "大火快炒深夜食堂",
        rating: 4.2,
        reviews: "7,800則評價",
        priceRange: "$$",
        address: "台南市中西區民族路三段89號",
        lat: 22.9981,
        lng: 120.1965,
        openHours: "17:00 - 00:00",
        signature: "生炒鱔魚意麵、乾炒鱔魚、清湯鱔魚",
        vibe: "猛烈炭火與大鼎翻炒，鱔魚脆彈無腥味，酸甜焦香帶有濃郁洋蔥鑊氣，老台南真滋味。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      }
    ]
  },
  "東京": {
    city: "東京都 (Tokyo)",
    country: "日本",
    center: [35.6762, 139.6503],
    zoom: 12,
    description: "傳統江戶風韻與尖端前衛潮流交織的世界頂級繁華大都會。",
    weatherTip: "四季分明，春秋舒適宜人；地鐵線路密集，步行量較大，請備好舒適球鞋。",
    transportTip: "必備 Suica (西瓜卡) 或 Pasmo，搭配東京地鐵 24/48/72 小時通票最划算。",
    attractions: [
      {
        id: "tyo-att-1",
        name: "淺草寺與雷門 (Senso-ji)",
        category: "古寺信仰",
        rating: 4.7,
        reviews: "6.8萬則評價",
        address: "東京都台東區淺草2-3-1",
        lat: 35.7148,
        lng: 139.7967,
        stayTime: "2 小時",
        openHours: "06:00 - 17:00 (境內全天開放)",
        description: "東京都內最古老的寺廟，巨大的紅色『雷門』燈籠是東京最具代表性的文化圖騰。",
        tips: "穿過仲見世通商店街可品嚐人形燒與炸饅頭，亦可租賃和服漫步拍照。",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-att-2",
        name: "澀谷 SHIBUYA SKY",
        category: "高空觀景",
        rating: 4.8,
        reviews: "3.9萬則評價",
        address: "東京都澀谷區澀谷2-24-12 (Scramble Square)",
        lat: 35.6580,
        lng: 139.7016,
        stayTime: "1.5 小時",
        openHours: "10:00 - 22:30",
        description: "坐落於澀谷229公尺高空的露天全景展望台，俯瞰著名的澀谷十字路口與東京鐵塔。",
        tips: "夕陽轉夜景時段最熱門，通常需提早2至4週於官方網站搶訂指定場次門票。",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-att-3",
        name: "明治神宮 (Meiji Jingu)",
        category: "神聖神社與森林",
        rating: 4.6,
        reviews: "4.2萬則評價",
        address: "東京都澀谷區代代木神園町1-1",
        lat: 35.6764,
        lng: 139.6993,
        stayTime: "2 小時",
        openHours: "日出至日落 (依季節變動)",
        description: "供奉明治天皇與昭憲皇太后的神社，被70公頃人工蓊鬱森林包圍，在喧囂都會中開闢出靜謐綠洲。",
        tips: "巨型木造大鳥居與滿牆奉納清酒桶是打卡熱點，週末常有機會巧遇莊嚴傳統神前婚禮。",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-att-4",
        name: "東京鐵塔 (Tokyo Tower)",
        category: "浪漫經典地標",
        rating: 4.6,
        reviews: "5.1萬則評價",
        address: "東京都港區芝公園4-2-8",
        lat: 35.6586,
        lng: 139.7454,
        stayTime: "1.5 小時",
        openHours: "09:00 - 22:30",
        description: "高332.9公尺的紅白相間電視電波塔，無數日劇的浪漫象徵，在夜色中散發溫暖金黃橘光。",
        tips: "周邊的芝公園與地下停車場樓梯口是拍攝東京鐵塔同框的網紅秘密私房機位。",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-att-5",
        name: "秋葉原電器街與動漫商圈",
        category: "次文化與科技",
        rating: 4.5,
        reviews: "3.1萬則評價",
        address: "東京都千代田區外神田",
        lat: 35.6983,
        lng: 139.7731,
        stayTime: "2 小時",
        openHours: "各店家約 10:00 - 20:30",
        description: "全球動漫迷、手辦收藏家與電子產品愛好者的聖地，街頭女僕咖啡廳與霓虹看板林立。",
        tips: "週末中央通會實施步行者天國（禁止車輛通行），逛街拍照最舒服自由。",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "tyo-res-1",
        name: "今半壽喜燒 (淺草本店)",
        category: "百年黑毛和牛壽喜燒",
        rating: 4.7,
        reviews: "7,800則評價",
        priceRange: "$$$$",
        address: "東京都台東區淺草1-19-7",
        lat: 35.7128,
        lng: 139.7942,
        openHours: "11:30 - 21:30",
        signature: "特選黑毛和牛壽喜燒套餐、秘製甘醇醬汁、新鮮生生蛋汁裹牛肉",
        vibe: "自明治28年創業的肉料理殿堂，由和服女將桌邊貼心烹煮，牛肉油花如雪融於舌尖。",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-res-2",
        name: "一蘭拉麵 (澀谷店)",
        category: "經典天然豚骨拉麵",
        rating: 4.5,
        reviews: "1.9萬則評價",
        priceRange: "$$",
        address: "東京都澀谷區神南1-22-7 岩本大樓 B1F",
        lat: 35.6608,
        lng: 139.7011,
        openHours: "24 小時營業",
        signature: "天然豚骨湯頭拉麵、特製赤紅秘傳醬汁、半熟鹽煮蛋",
        vibe: "極具特色的『味集中座位』隔板設計，可完全客製化麵條硬度、蒜泥濃度與辣度。",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-res-3",
        name: "敘敘苑燒肉 (新宿歌舞伎町店)",
        category: "頂級日式燒肉",
        rating: 4.6,
        reviews: "9,500則評價",
        priceRange: "$$$",
        address: "東京都新宿區歌舞伎町1-10-7",
        lat: 35.6946,
        lng: 139.7025,
        openHours: "11:30 - 03:00",
        signature: "特選牛舌、壺漬牛五花、招牌敘敘苑特製沙拉、抹茶冰淇淋",
        vibe: "日本燒肉界天花板代表，服務優雅細膩，肉質醃漬入味，午間商業套餐性價比極高。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-res-4",
        name: "HARBS (六本木之丘店)",
        category: "日系奢華水果蛋糕甜品",
        rating: 4.6,
        reviews: "8,100則評價",
        priceRange: "$$",
        address: "東京都港區六本木6-10-2 六本木之丘 Hillside 1F",
        lat: 35.6605,
        lng: 139.7301,
        openHours: "11:00 - 21:00",
        signature: "招牌千層水果蛋糕 (Mille Crepes)、洋梨千層派、大吉嶺紅茶",
        vibe: "層層薄薄蛋皮夾入新鮮草莓、奇異果、香蕉、哈密瓜與細緻清爽鮮奶油，甜度恰到好處。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "tyo-res-5",
        name: "大和壽司 (豐洲市場店)",
        category: "江戶前現捏握壽司",
        rating: 4.7,
        reviews: "6,300則評價",
        priceRange: "$$$",
        address: "東京都江東區豐洲6-5-1 5號館1樓",
        lat: 35.6468,
        lng: 139.7852,
        openHours: "06:00 - 13:00 (週日、週三公休)",
        signature: "廚師發辦握壽司套餐 (Omakase)、極品黑鮪魚中腹、海膽軍艦",
        vibe: "傳承自築地市場的超人氣名店，由壽司職人現場以當晨最新鮮漁獲手捏製作，鮮甜無比。",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop"
      }
    ]
  },
  "京都": {
    city: "京都市 (Kyoto)",
    country: "日本",
    center: [35.0116, 135.7681],
    zoom: 13,
    description: "千座神社佛寺與千年古都氣韻，石疊小路與四季庭園之美令人流連忘返。",
    weatherTip: "冬冷夏熱，春秋氣候宜人；市區景點多石子路階梯，建議穿著便於步行的平底鞋。",
    transportTip: "京都市營巴士與地下鐵一日券最實惠，熱門景點亦可搭配租借自行車漫遊。",
    attractions: [
      {
        id: "kyo-att-1",
        name: "清水寺 (Kiyomizu-dera)",
        category: "世界文化遺產",
        rating: 4.8,
        reviews: "6.2萬則評價",
        address: "京都府京都市東山區清水1-294",
        lat: 34.9949,
        lng: 135.7850,
        stayTime: "2.5 小時",
        openHours: "06:00 - 18:00",
        description: "依音羽山斷崖而建的宏偉清水舞台，完全不使用一根釘子搭建，俯瞰京都盆地四季錦繡。",
        tips: "順著二年坂、三年坂漫步可見京都傳統老屋，並在音羽之瀑祈求健康、學業或良緣。",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-att-2",
        name: "伏見稻荷大社 (千本鳥居)",
        category: "神社神道文化",
        rating: 4.7,
        reviews: "7.1萬則評價",
        address: "京都府京都市伏見區深草藪之內町68",
        lat: 34.9671,
        lng: 135.7727,
        stayTime: "2 小時",
        openHours: "全天開放",
        description: "全日本三萬餘座稻荷神社總本社，沿稻荷山蜿蜒而上的朱紅色『千本鳥居』壯麗神聖震撼人心。",
        tips: "清晨或傍晚遊客較少，光影穿透鳥居縫隙宛如神秘紅色隧道；狐狸御守非常受歡迎。",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-att-3",
        name: "金閣寺 (鹿苑寺)",
        category: "禪宗名剎",
        rating: 4.6,
        reviews: "4.8萬則評價",
        address: "京都府京都市北區金閣寺町1",
        lat: 35.0394,
        lng: 135.7292,
        stayTime: "1 小時",
        openHours: "09:00 - 17:00",
        description: "貼滿純金箔的三層樓舍利殿倒映在鏡湖池上，融合武士、貴族與禪宗建築精髓。",
        tips: "上午陽光順光照耀在金閣寺正面時最為耀眼璀璨，門票是特別的吉祥符咒御守。",
        image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-att-4",
        name: "嵐山竹林小徑與渡月橋",
        category: "自然名勝",
        rating: 4.7,
        reviews: "4.5萬則評價",
        address: "京都府京都市右京區嵐山",
        lat: 35.0166,
        lng: 135.6713,
        stayTime: "2.5 小時",
        openHours: "全天開放",
        description: "高聳入雲的蒼翠竹林，微風吹拂伴隨竹葉摩挲沙沙清響，渡月橋跨越大堰川倒映嵐山青山紅葉。",
        tips: "可順道參觀世界遺產天龍寺庭園，或搭乘浪漫的嵯峨野觀光小火車穿梭保津川峽谷。",
        image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-att-5",
        name: "二條城 (Nijo Castle)",
        category: "江戶幕府城堡",
        rating: 4.6,
        reviews: "3.2萬則評價",
        address: "京都府京都市中京區二條通堀川西入二條城町541",
        lat: 35.0142,
        lng: 135.7482,
        stayTime: "1.5 小時",
        openHours: "08:45 - 16:00",
        description: "德川家康在京都的居所與『大政奉還』歷史現場，二之丸御殿的『鶯聲地板』走動時會鳴響防刺客。",
        tips: "殿內金碧輝煌的狩野派障壁畫與迴遊式庭園極為考究，非常具有歷史厚度。",
        image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "kyo-res-1",
        name: "三鳩亭 (Mishima-tei 總店)",
        category: "頂級黑毛和牛壽喜燒",
        rating: 4.7,
        reviews: "5,400則評價",
        priceRange: "$$$$",
        address: "京都府京都市中京區寺町通三條下ル",
        lat: 35.0084,
        lng: 135.7672,
        openHours: "11:30 - 21:00 (週三公休)",
        signature: "特選和牛壽喜燒、特製黑糖調味、生蛋汁和牛盛宴",
        vibe: "創立於明治6年的木造八角樓老鋪，古色古香榻榻米個室，女將熟練以糖煎烤頂級和牛。",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-res-2",
        name: "廣川鰻魚飯 (Unagi Hirokawa)",
        category: "嵐山米其林一星名物鰻魚飯",
        rating: 4.6,
        reviews: "4,200則評價",
        priceRange: "$$$",
        address: "京都府京都市右京區嵯峨天龍寺北造路町44-1",
        lat: 35.0151,
        lng: 135.6775,
        openHours: "11:30 - 14:30, 17:00 - 20:00 (需預約)",
        signature: "特級炭烤鰻重、鰻魚肝湯、香烤鰻魚骨酥",
        vibe: "嚴選日本國產活鰻，關東式先蒸後炭烤，淋上獨門甘美秘醬，肉質肥美鬆軟無比。",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-res-3",
        name: "中村藤吉 (京都車站店)",
        category: "宇治抹茶甜品聖地",
        rating: 4.6,
        reviews: "8,900則評價",
        priceRange: "$$",
        address: "京都府京都市下京區烏丸通鹽小路下ル (JR京都伊勢丹 3F)",
        lat: 34.9858,
        lng: 135.7588,
        openHours: "11:00 - 21:00",
        signature: "生茶果凍(抹茶/焙茶口味)、特濃抹茶霜淇淋芭菲、抹茶蕎麥麵",
        vibe: "源自宇治安政元年的頂級抹茶名家，茶香濃郁高雅，甜而不膩，竹筒容器造型精緻古典。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-res-4",
        name: "錦市場美食行 (Nishiki Market)",
        category: "京都廚房街頭小吃",
        rating: 4.4,
        reviews: "3.1萬則評價",
        address: "京都府京都市中京區錦小路通",
        lat: 35.0051,
        lng: 135.7645,
        openHours: "10:00 - 18:00",
        signature: "三木雞卵高湯玉子燒、鮮炸豆乳甜甜圈、章魚燒、京漬物",
        vibe: "擁有400年歷史的狹長拱頂商店街，匯聚上百家京都傳統熟食、乾貨與精緻海鮮串燒。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      },
      {
        id: "kyo-res-5",
        name: "南禪寺 順正 (Junsei)",
        category: "京都經典湯豆腐懷石料理",
        rating: 4.5,
        reviews: "3,800則評價",
        priceRange: "$$$",
        address: "京都府京都市左京區南禪寺草川町60",
        lat: 35.0112,
        lng: 135.7928,
        openHours: "11:00 - 20:30",
        signature: "花仙湯豆腐宴席、生麩田樂燒、季節野菜天婦羅",
        vibe: "坐落於江戶時期歷史名園『順正書院』內，品嚐甘醇昆布高湯熬煮之手作豆腐，優雅靜心。",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop"
      }
    ]
  },
  "曼谷": {
    city: "曼谷 (Bangkok)",
    country: "泰國",
    center: [13.7563, 100.5018],
    zoom: 13,
    description: "金碧輝煌的佛寺宮殿、熱情澎湃的水上市集與世界頂尖平價米其林美食之都。",
    weatherTip: "氣候炎熱潮濕，請著輕便吸汗服飾並隨時防曬；進入寺廟需著長褲遮肩以示尊重。",
    transportTip: "搭乘 BTS 輕軌與 MRT 地鐵可避開曼谷交通壅塞，湄南河遊船亦是愜意觀光選擇。",
    attractions: [
      {
        id: "bkk-att-1",
        name: "大皇宮與玉佛寺 (Grand Palace)",
        category: "皇家宮殿與信仰",
        rating: 4.7,
        reviews: "8.3萬則評價",
        address: "Na Phra Lan Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok",
        lat: 13.7500,
        lng: 100.4913,
        stayTime: "2.5 小時",
        openHours: "08:30 - 15:30",
        description: "曼谷地標古蹟，金光耀眼的尖頂佛塔、五彩琉璃馬賽克鑲嵌，玉佛寺內供奉整塊翡翠雕琢的國寶玉佛。",
        tips: "服裝規範嚴格，禁止無袖、短褲短裙與破洞褲，門口有提供租借沙龍。",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-att-2",
        name: "鄭王廟 (黎明寺 / Wat Arun)",
        category: "佛教歷史古蹟",
        rating: 4.7,
        reviews: "6.9萬則評價",
        address: "158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok",
        lat: 13.7437,
        lng: 100.4889,
        stayTime: "1.5 小時",
        openHours: "08:00 - 18:00",
        description: "湄南河畔宏偉的白色巴揚式大舍利塔，鑲嵌無數彩色碎陶瓷，在晨光與夕陽映照下熠熠生輝。",
        tips: "周邊有眾多泰服體驗租賃店，換上傳統泰服在塔前拍照是目前超火紅行程。",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-att-3",
        name: "ICONSIAM 暹羅天地",
        category: "旗艦級河畔百貨",
        rating: 4.8,
        reviews: "7.5萬則評價",
        address: "299 Charoen Nakhon Rd, Khlong Ton Sai, Khlong San, Bangkok",
        lat: 13.7267,
        lng: 100.5108,
        stayTime: "3 小時",
        openHours: "10:00 - 22:00",
        description: "將傳統泰國水上市集完美搬入冷氣商場底層（SookSiam），集合全泰國77府代表工藝與道地街邊美食。",
        tips: "傍晚戶外河岸花園有壯觀的水舞音樂噴泉秀，亦可在此搭乘免費接駁船至對岸輕軌站。",
        image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-att-4",
        name: "恰圖恰週末市集 (Chatuchak Market)",
        category: "世界級跳蚤市集",
        rating: 4.6,
        reviews: "8.9萬則評價",
        address: "Kamphaeng Phet 2 Rd, Chatuchak, Bangkok",
        lat: 13.7999,
        lng: 100.5504,
        stayTime: "3 小時",
        openHours: "週六、週日 09:00 - 18:00",
        description: "全球最大戶外市集之一，擁有超過一萬五千個攤位，從服飾手工藝、古董家具到奇珍香氛應有盡有。",
        tips: "面積龐大容易迷路，以市集中央鐘塔為定位地標；看到喜歡的商品建議直接殺價入手。",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-att-5",
        name: "水門寺大佛 (Wat Paknam Phasi Charoen)",
        category: "壯觀當代佛雕",
        rating: 4.7,
        reviews: "2.1萬則評價",
        address: "300 Ratchamongkhon Prasat Alley, Pak Khlong Phasi Charoen, Phasi Charoen, Bangkok",
        lat: 13.7219,
        lng: 100.4702,
        stayTime: "1.5 小時",
        openHours: "08:00 - 18:00",
        description: "高69公尺（近20層樓高）的純銅鍍金巨大坐佛像，白塔內部五樓還有夢幻翡翠綠琉璃佛塔與星空穹頂。",
        tips: "可搭乘長尾船從河道視角欣賞大佛與周邊傳統水上高腳屋共存的奇妙構圖。",
        image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "bkk-res-1",
        name: "建興酒家 (Somboon Seafood)",
        category: "經典泰式海鮮名廚",
        rating: 4.5,
        reviews: "1.4萬則評價",
        priceRange: "$$$",
        address: "169 / 7-12 Surawong Rd, Suriya Wong, Bang Rak, Bangkok",
        lat: 13.7289,
        lng: 100.5262,
        openHours: "11:00 - 22:00",
        signature: "招牌黃金咖哩炒蟹、冬蔭功酸辣海鮮湯、蒜香炸大蝦、炒空心菜",
        vibe: "泰國咖哩炒蟹創始老字號，濃郁蛋液與特製咖哩香料包裹飽滿蟹肉，拌飯極品停不下來。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-res-2",
        name: "Jeh O Chula (媽媽麵熱炒)",
        category: "米其林必比登街頭傳奇",
        rating: 4.4,
        reviews: "1.8萬則評價",
        priceRange: "$$",
        address: "113 Soi Charat Mueang, Rong Muang, Pathum Wan, Bangkok",
        lat: 13.7426,
        lng: 100.5235,
        openHours: "16:30 - 00:00",
        signature: "傳奇海鮮酸辣媽媽麵鍋、脆皮燒肉、生鮭魚刺身沙拉",
        vibe: "曼谷最具人氣的宵夜熱炒排隊神店，鐵鍋端出滿載大頭蝦、花枝、炸肉丸與生蛋黃的冬蔭功泡麵。",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-res-3",
        name: "Thip Samai (鬼門泰式炒河粉)",
        category: "國寶級 Pad Thai 老字號",
        rating: 4.4,
        reviews: "1.3萬則評價",
        priceRange: "$$",
        address: "313 Maha Chai Rd, Samran Rat, Phra Nakhon, Bangkok",
        lat: 13.7527,
        lng: 100.5048,
        openHours: "09:00 - 00:00",
        signature: "經典蛋包泰式大蝦炒河粉、每日現榨帶果肉鮮柳橙汁",
        vibe: "泰國總理指定國宴炒河粉，炭火大鍋熱炒，極薄蛋皮包覆彈牙河粉，附贈檸檬、花生碎與生韭菜。",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-res-4",
        name: "Mae Varee 芒果糯米飯",
        category: "曼谷第一芒果甜點名店",
        rating: 4.6,
        reviews: "6,700則評價",
        priceRange: "$",
        address: "1 Thong Lo, Khlong Tan Nuea, Watthana, Bangkok (BTS Thong Lo 站旁)",
        lat: 13.7242,
        lng: 100.5786,
        openHours: "06:00 - 22:00",
        signature: "三色三味芒果糯米飯 (蝶豆花/斑蘭葉/原味)、金黃甜芒果",
        vibe: "泰國在地人心目中的芒果糯米飯天花板，嚴選頂級水仙芒，淋上微鹹濃稠椰奶，滋味層次完美。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "bkk-res-5",
        name: "藍象餐廳 (Blue Elephant Bangkok)",
        category: "宮廷泰菜殿堂",
        rating: 4.6,
        reviews: "4,900則評價",
        priceRange: "$$$$",
        address: "233 S Sathon Rd, Yan Nawa, Sathon, Bangkok",
        lat: 13.7196,
        lng: 100.5218,
        openHours: "11:30 - 22:00",
        signature: "古法馬薩曼咖哩羊膝、香煎鵝肝配甜羅望子醬、泰皇御用椰奶雞湯",
        vibe: "百年殖民風格古典黃色洋樓建築，精雕細琢的皇家擺盤與尊榮服務，泰國國寶級餐飲旗艦。",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
      }
    ]
  }
};

/**
 * Generates an optimized, logical 09:00 - 19:00 one-day itinerary schedule.
 * Accurately sequences attractions and restaurants with realistic transit times,
 * lunch at noon (12:00-13:30), afternoon tea/dessert (15:30-16:30), and dinner (18:00-19:00).
 */
function buildOneDayTimeline(cityData) {
  const atts = cityData.attractions || [];
  const ress = cityData.restaurants || [];

  const a1 = atts[0] || { name: "經典地標景點", stayTime: "2小時", tips: "建議早起避開排隊人潮" };
  const a2 = atts[1] || { name: "文化歷史園區", stayTime: "1.5小時", tips: "拍照打卡絕佳角度" };
  const a3 = atts[2] || { name: "自然景觀或老街漫步", stayTime: "1.5小時", tips: "感受在地生活氣息" };

  const r1 = ress[0] || { name: "特色道地早午餐/招牌名店", signature: "人氣主廚招牌料理" };
  const r2 = ress[3] || ress[1] || { name: "特色午後甜品/質感咖啡館", signature: "招牌手作甜點與在地茗茶" };
  const r3 = ress[2] || ress[1] || { name: "口碑晚宴/精緻饗宴", signature: "招牌經典名菜" };

  return [
    {
      time: "09:00 - 09:45",
      period: "早晨啟程",
      badge: "集合 & 早晨時光",
      type: "start",
      icon: "fa-sun",
      title: "一日旅程活力集合 & 晨間出發",
      location: "當地市中心交通樞紐 / 精選早餐",
      description: "於飯店或市區便捷站點集合，精神飽滿地展開一整天充實探索。建議先喝杯咖啡提神，確認今日隨身行囊與交通卡。",
      transitTip: "建議搭乘大眾捷運、地鐵或包車前往首個核心景點，避開尖峰車流。",
      estimatedTime: "45 分鐘"
    },
    {
      time: "09:45 - 11:45",
      period: "上午深度探索",
      badge: "熱門景點 #1",
      type: "attraction",
      icon: "fa-landmark",
      title: `探索第一站：【${a1.name}】`,
      location: a1.name,
      targetId: a1.id,
      description: a1.description || "探訪最具代表性的指標性建築或自然美景，早晨人潮相對舒適，視野最為開闊清爽。",
      highlight: `必看特色：${a1.tips || "深入欣賞館藏建築與經典視角"}`,
      transitTip: "停留約2小時，建議於參觀完畢後徒步或短程車程前往午餐餐廳。",
      estimatedTime: "2 小時"
    },
    {
      time: "11:45 - 12:15",
      period: "過渡移步",
      badge: "街區漫步",
      type: "transit",
      icon: "fa-person-walking",
      title: "周邊歷史街區漫步與文化穿梭",
      location: "周邊街區散步廊道",
      description: "在景點周邊漫步放慢步伐，沿途欣賞在地建築風貌、小巧市集櫥窗與人文街景，享受旅行中的不期而遇。",
      transitTip: "步行約15-20分鐘，剛好促進食慾，準時抵達預約餐廳。",
      estimatedTime: "30 分鐘"
    },
    {
      time: "12:15 - 13:45",
      period: "舌尖午饗",
      badge: "五大推薦餐廳 #1",
      type: "dining",
      icon: "fa-utensils",
      title: `午餐饗宴：【${r1.name}】`,
      location: r1.name,
      targetId: r1.id,
      description: `正午品嚐在地極具聲譽的代表美食。${r1.vibe || "餐廳氣氛舒適道地，深獲在地老饕與國際旅客推崇。"}`,
      highlight: `必點招牌推薦：${r1.signature || "主廚私房招牌菜"}`,
      transitTip: "享用豐盛午餐後稍作休息，補充水分再出發。",
      estimatedTime: "1.5 小時"
    },
    {
      time: "13:45 - 15:30",
      period: "午後重點參訪",
      badge: "熱門景點 #2",
      type: "attraction",
      icon: "fa-camera-retro",
      title: `午後深度巡禮：【${a2.name}】`,
      location: a2.name,
      targetId: a2.id,
      description: a2.description || "午後走訪人文薈萃的文創園區、藝術展館或古蹟名勝，在濃郁的文化藝術氣息中洗滌身心。",
      highlight: `參訪指南：${a2.tips || "可前往最佳拍照機位留下紀念美照"}`,
      transitTip: "此景點具豐富館藏或戶外園林，適宜悠閒漫步約1.5小時至2小時。",
      estimatedTime: "1 小時 45 分鐘"
    },
    {
      time: "15:30 - 16:30",
      period: "午後微歇時光",
      badge: "五大推薦甜品/咖啡 #2",
      type: "cafe",
      icon: "fa-mug-hot",
      title: `人氣下午茶休憩：【${r2.name}】`,
      location: r2.name,
      targetId: r2.id,
      description: `午後三點半，正是歇歇腳、品味精緻甜點或香醇咖啡的最佳時刻。${r2.vibe || "環境清幽舒適，為午後注入滿滿元氣。"}`,
      highlight: `推薦品嚐：${r2.signature || "招牌手工甜點與特色冷熱特調"}`,
      transitTip: "稍作歇息、整理稍早拍下的美照，準備迎接黃昏黃金魔幻時刻。",
      estimatedTime: "1 小時"
    },
    {
      time: "16:30 - 18:00",
      period: "黃昏魔幻時光",
      badge: "熱門景點 #3",
      type: "attraction",
      icon: "fa-mountain-sun",
      title: `夕陽餘暉與晚霞勝景：【${a3.name}】`,
      location: a3.name,
      targetId: a3.id,
      description: a3.description || "趁著夕陽西下時分登高俯瞰城市天際線，或是漫步於河岸古街，金黃餘暉灑落，景色令人沉醉。",
      highlight: `拍照黃金時段：${a3.tips || "建議於 17:00 前後就定位，拍攝黃昏晚霞色彩變化"}`,
      transitTip: "日落後氣溫轉為涼爽，漫步下山或搭車前往晚餐餐廳。",
      estimatedTime: "1.5 小時"
    },
    {
      time: "18:00 - 19:00",
      period: "晚霞盛宴與一日總結",
      badge: "五大推薦餐廳 #3",
      type: "dinner",
      icon: "fa-wine-glass",
      title: `圓滿晚餐大餐：【${r3.name}】`,
      location: r3.name,
      targetId: r3.id,
      description: `為精彩的一日行程劃下完美句點！在優雅或熱鬧的餐館中舉杯歡聚，回味整日精彩回憶。${r3.vibe || "環境溫馨，菜品美味道地。"}`,
      highlight: `必嚐主廚料理：${r3.signature || "特色經典晚餐合菜/套餐"}`,
      transitTip: "19:00 順利完成一日精華巡禮，可就近回飯店休憩，或自選續攤夜市/高空酒吧！",
      estimatedTime: "1 小時"
    }
  ];
}

/**
 * Intelligent Dynamic Destination Generator
 * Uses OpenStreetMap Nominatim for live coordinates and generates tailored spots for ANY custom destination entered by user.
 */
async function fetchOrSynthesizeDestination(cityName, userApiKey = "") {
  const cleanName = cityName.trim();

  // 1. Check local preset catalog first
  for (const key of Object.keys(PRESET_DESTINATIONS)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      const data = JSON.parse(JSON.stringify(PRESET_DESTINATIONS[key]));
      data.timeline = buildOneDayTimeline(data);
      return data;
    }
  }

  // 2. If Gemini API key is provided, use real AI generation
  if (userApiKey && userApiKey.trim().length > 10) {
    try {
      const aiData = await callGeminiTripPlanner(cleanName, userApiKey.trim());
      if (aiData && aiData.attractions && aiData.restaurants) {
        aiData.timeline = buildOneDayTimeline(aiData);
        return aiData;
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart geocoding synthesizer:", err);
    }
  }

  // 3. Smart Geocoding & Contextual Synthesizer via OpenStreetMap Nominatim
  let center = [25.0330, 121.5654];
  let displayName = cleanName;
  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanName)}&format=json&limit=1`, {
      headers: { "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8" }
    });
    if (geoRes.ok) {
      const geoList = await geoRes.json();
      if (geoList && geoList.length > 0) {
        center = [parseFloat(geoList[0].lat), parseFloat(geoList[0].lon)];
        displayName = geoList[0].display_name.split(',')[0] || cleanName;
      }
    }
  } catch (e) {
    console.warn("Geocoding notice:", e);
  }

  // Generate customized high-grade itinerary for this specific destination
  const lat = center[0];
  const lng = center[1];

  const generatedData = {
    city: displayName,
    country: "全球精選目的地",
    center: center,
    zoom: 13,
    description: `探索【${displayName}】的自然風光、人文韻味與在地絕佳美食，體驗專屬的文化旅程。`,
    weatherTip: "建議出發前查詢當日即時氣溫與降雨機率，穿著輕便好步行的運動鞋與合適外衣。",
    transportTip: "市區內建議搭配大眾交通工具、步行散策或在地計程車接駁，遊覽更輕鬆有彈性。",
    attractions: [
      {
        id: "gen-att-1",
        name: `${displayName} 歷史文化古蹟 / 核心中心園區`,
        category: "人文歷史",
        rating: 4.8,
        reviews: "1.5萬則好評",
        address: `${displayName} 市中心核心景觀區`,
        lat: lat + 0.008,
        lng: lng + 0.005,
        stayTime: "2 小時",
        openHours: "09:00 - 17:30",
        description: `見證【${displayName}】發展軌跡的指標性核心人文地標，保存良好之經典建築與歷史展陳，展現深厚歷史底蘊。`,
        tips: "建議早晨第一批參觀，晨光灑落時建築外觀最美，可避開午後大批觀光團客。",
        image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-att-2",
        name: `${displayName} 知名觀光地標與全景觀景台`,
        category: "地標觀景",
        rating: 4.7,
        reviews: "2.1萬則好評",
        address: `${displayName} 核心地標大道`,
        lat: lat - 0.006,
        lng: lng + 0.008,
        stayTime: "1.5 小時",
        openHours: "09:30 - 21:00",
        description: `來到【${displayName}】絕對不可錯過的代表性拍照地標，可在此將整座城鎮與周圍山水天際線盡收眼底。`,
        tips: "頂樓觀景視野極佳，記得準備廣角鏡頭，捕捉開闊無遮蔽的明信片級全景。",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-att-3",
        name: `${displayName} 藝術特區與文創漫步街`,
        category: "文創美學",
        rating: 4.6,
        reviews: "9,800則好評",
        address: `${displayName} 藝文聚落街區`,
        lat: lat + 0.005,
        lng: lng - 0.009,
        stayTime: "2 小時",
        openHours: "10:00 - 18:30",
        description: `由老舊街區或廠房活化而成的當代藝術文創空間，匯聚眾多青年設計師手作店舖、戶外裝置藝術與藝廊。`,
        tips: "街巷處處有驚喜彩繪與個性小舖，非常適合放慢腳步散策，尋找特色旅行紀念品。",
        image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-att-4",
        name: `${displayName} 自然生態公園與水岸親水步道`,
        category: "自然漫步",
        rating: 4.7,
        reviews: "1.2萬則好評",
        address: `${displayName} 綠色親水廊道`,
        lat: lat - 0.012,
        lng: lng - 0.004,
        stayTime: "1.5 小時",
        openHours: "全天開放",
        description: `綠草如茵的大型親水綠地，林蔭大道與波光粼粼的湖水/河畔相互映襯，是在地人最愛的休憩洗滌去處。`,
        tips: "推薦午後微風徐徐時漫步，沿著環湖木棧道走走，感受大自然的寧靜與微風吹拂。",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-att-5",
        name: `${displayName} 懷舊老街與傳統民俗聚落`,
        category: "老街市集",
        rating: 4.5,
        reviews: "1.8萬則好評",
        address: `${displayName} 歷史老街大道`,
        lat: lat + 0.014,
        lng: lng - 0.002,
        stayTime: "2 小時",
        openHours: "全天開放 (市集約11:00起熱鬧)",
        description: `保留數十年甚至百年以上的傳統古建築街道，紅磚瓦舍交錯，沿途小吃飄香，散發濃烈純樸的在地人情味。`,
        tips: "傍晚店鋪燈籠亮起時最別具一番古韻，是品嚐傳統手作點心與採買伴手禮的最佳地點。",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop"
      }
    ],
    restaurants: [
      {
        id: "gen-res-1",
        name: `${displayName} 正宗百年老字號特色餐館`,
        category: "在地傳統名菜",
        rating: 4.7,
        reviews: "8,900則推薦",
        priceRange: "$$$",
        address: `${displayName} 美食名店街區`,
        lat: lat + 0.007,
        lng: lng + 0.006,
        openHours: "11:30 - 14:30, 17:30 - 21:00",
        signature: `【${displayName}】秘製特色手作大菜、在地時令鮮蔬、鮮美清燉湯品`,
        vibe: "傳承數代烹調工藝，選用在地最頂級產地食材，是體驗當地代表性風味的首選老牌殿堂。",
        image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-res-2",
        name: `${displayName} 必吃人氣排隊小吃名店`,
        category: "排隊道地小吃",
        rating: 4.6,
        reviews: "1.2萬則推薦",
        priceRange: "$",
        address: `${displayName} 傳統美食商圈`,
        lat: lat + 0.002,
        lng: lng + 0.003,
        openHours: "06:30 - 14:00 (賣完為止)",
        signature: "手切鮮肉招牌主食、老滷豆腐、招牌熱騰騰濃郁高湯",
        vibe: "座無虛席的平民美食傳奇，現點現做鍋氣撲鼻，價格實在份量十足，深受在地老饕喜愛。",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-res-3",
        name: `${displayName} 景觀私房庭園餐廳`,
        category: "創意美饌 / 晚宴饗宴",
        rating: 4.8,
        reviews: "4,600則推薦",
        priceRange: "$$$$",
        address: `${displayName} 綠意山景/河岸旁`,
        lat: lat - 0.008,
        lng: lng + 0.012,
        openHours: "12:00 - 15:00, 17:30 - 22:00",
        signature: "主廚特製炭火熟成排餐、手作無菜單料理、精選佐餐紅白酒",
        vibe: "坐擁大片綠意或璀璨夜景的景觀私房餐廳，環境浪漫高雅，極為適合一日行程圓滿慶祝。",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-res-4",
        name: `${displayName} 質感文青手作甜點咖啡館`,
        category: "午後精品咖啡與甜點",
        rating: 4.6,
        reviews: "5,300則推薦",
        priceRange: "$$",
        address: `${displayName} 藝文巷弄內`,
        lat: lat + 0.004,
        lng: lng - 0.007,
        openHours: "11:00 - 19:00",
        signature: "每日限量千層蛋糕、手作焦糖香草布丁、單品手沖咖啡",
        vibe: "木質暖調裝潢搭配柔和爵士樂，午後陽光透過玻璃灑落，是放慢步調享受下午茶的秘密基地。",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop"
      },
      {
        id: "gen-res-5",
        name: `${displayName} 經典海味 / 炭火炙烤居食屋`,
        category: "炭火燒烤 / 在地熱炒",
        rating: 4.5,
        reviews: "6,800則推薦",
        priceRange: "$$",
        address: `${displayName} 繁華美食街區`,
        lat: lat + 0.011,
        lng: lng - 0.005,
        openHours: "17:00 - 00:00",
        signature: "現撈海鮮炭烤拼盤、特調醬烤串燒盛合、酥脆炸物與生啤酒",
        vibe: "炭火香氣四溢、人聲鼎沸充滿活力的深夜名店，料理鑊氣十足，聚餐氛圍無拘無束。",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"
      }
    ]
  };

  generatedData.timeline = buildOneDayTimeline(generatedData);
  return generatedData;
}

/**
 * Optional Gemini API Call to get ultra-specific, live structured JSON itinerary
 */
async function callGeminiTripPlanner(cityName, apiKey) {
  const prompt = `請針對所在地「${cityName}」規劃旅遊行程，並嚴格以繁體中文且標準 JSON 格式回傳，不可包含 Markdown 標籤之外的額外雜訊。
JSON 結構必須包含：
{
  "city": "城市名稱 (含國家或地區)",
  "country": "國家或地區名稱",
  "center": [緯度數值, 經度數值],
  "zoom": 13,
  "description": "城市的特色概述(50-80字)",
  "weatherTip": "氣候與穿著建議",
  "transportTip": "最推薦的市區交通建議",
  "attractions": [
    // 恰好五個最熱門觀光景點
    {
      "id": "att-1",
      "name": "景點真實名稱",
      "category": "分類(如: 歷史古蹟、地標觀景、自然步道、文創美學)",
      "rating": 4.7,
      "reviews": "評論數量",
      "address": "大致地址或街區",
      "lat": 緯度浮點數,
      "lng": 經度浮點數,
      "stayTime": "建議停留時間(如: 2小時)",
      "openHours": "開放營業時間",
      "description": "簡介此景點吸引人之處(60-100字)",
      "tips": "遊覽訣竅或拍照機位",
      "image": "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&auto=format&fit=crop"
    }
  ],
  "restaurants": [
    // 恰好五個最受好評特色餐廳/小吃
    {
      "id": "res-1",
      "name": "餐廳真實名稱",
      "category": "美食分類",
      "rating": 4.6,
      "reviews": "好評則數",
      "priceRange": "$$ 或 $$$",
      "address": "大致地址或位置",
      "lat": 緯度浮點數,
      "lng": 經度浮點數,
      "openHours": "營業時段",
      "signature": "必點招牌名菜(2-4道)",
      "vibe": "餐廳特色與用餐氛圍(50-80字)",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
    }
  ]
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API HTTP status: ${response.status}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini API");

  return JSON.parse(text);
}
