import type { LessonInput } from "./schema";

/** Lesson 005 · Getting around Korea (from "Korean_005_Directions_Transportation_with_Driving_Phrases.pdf"). */
export const lesson005: LessonInput = {
  id: "lesson.005",
  number: "005",
  title: "Getting Around Korea",
  korean: "길 묻기 · 대중교통 · 택시에서 쓰는 한국어",
  goal: "Ask for directions, understand simple directions, use buses and subways, and tell a taxi driver where you want to go. Learn phrases as complete chunks so you can use them outside the classroom.",
  level: "A1",
  teaches: ["v.역", "v.지하철", "v.갈아타다", "v.내리다", "v.오른쪽", "v.왼쪽", "v.쭉", "g.means-ro", "g.command-seyo"],
  corrections: ["Romanization typos fixed: 'naer iseyo' → 'naeriseyo', and 'jjook' → 'jjuk' (as elsewhere in the lesson)."],
  sections: [
    {
      title: "Essential direction phrases",
      emoji: "🧭",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "여기 어디예요?", rom: "yeogi eodiyeyo", en: "Where am I? / What is this place?", sid: "s.f-where-are-we" },
            { ko: "어떻게 가요?", rom: "eotteoke gayo", en: "How do I get there?" },
            { ko: "여기서 멀어요?", rom: "yeogiseo meoreoyo", en: "Is it far from here?", sid: "s.f-far-from-here" },
            { ko: "가까워요?", rom: "gakkawoyo", en: "Is it close?" },
            { ko: "왼쪽으로 가세요.", rom: "oenjjogeuro gaseyo", en: "Go left.", sid: "s.f-go-left" },
            { ko: "오른쪽으로 가세요.", rom: "oreunjjogeuro gaseyo", en: "Go right.", sid: "s.f-go-right" },
            { ko: "쭉 가세요.", rom: "jjuk gaseyo", en: "Go straight.", sid: "s.f-go-straight" },
            { ko: "여기서 내리세요.", rom: "yeogiseo naeriseyo", en: "Get off here.", sid: "s.l5-get-off-here" },
            { ko: "길을 건너세요.", rom: "gireul geonneoseyo", en: "Cross the street.", sid: "s.l5-cross" },
            { ko: "감사합니다.", rom: "gamsahamnida", en: "Thank you.", sid: "s.thanks-formal" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "[Place] + 에 어떻게 가요?",
          text: "How do I get to [place]?",
          examples: [
            { ko: "역에 어떻게 가요?", rom: "yeoge eotteoke gayo?", en: "How do I get to the station?", sid: "s.l5-how-station" },
            {
              ko: "화장실에 어떻게 가요?",
              rom: "hwajangsire eotteoke gayo?",
              en: "How do I get to the restroom?",
              sid: "s.l5-how-restroom",
            },
          ],
        },
      ],
    },
    {
      title: "Places you may need",
      emoji: "📍",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "지하철역", rom: "jihacheol-yeok", en: "subway station" },
            { ko: "버스 정류장", rom: "beoseu jeongnyujang", en: "bus stop" },
            { ko: "기차역", rom: "gichayeok", en: "train station" },
            { ko: "공항", rom: "gonghang", en: "airport" },
            { ko: "화장실", rom: "hwajangsil", en: "restroom" },
            { ko: "편의점", rom: "pyeonuijeom", en: "convenience store" },
            { ko: "약국", rom: "yakguk", en: "pharmacy" },
            { ko: "병원", rom: "byeongwon", en: "hospital" },
            { ko: "카페", rom: "kape", en: "café" },
            { ko: "식당", rom: "sikdang", en: "restaurant" },
            { ko: "호텔", rom: "hotel", en: "hotel" },
            { ko: "출구", rom: "chulgu", en: "exit" },
          ],
        },
      ],
    },
    {
      title: "Direction words and location grammar",
      emoji: "🗺️",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "왼쪽으로 가세요.", en: "왼쪽 = left: Go left.", sid: "s.f-go-left" },
            { ko: "오른쪽으로 가세요.", en: "오른쪽 = right: Go right.", sid: "s.f-go-right" },
            { ko: "은행 앞에 있어요.", en: "앞 = in front: It's in front of the bank." },
            { ko: "건물 뒤에 있어요.", en: "뒤 = behind: It's behind the building." },
            { ko: "카페 옆에 있어요.", en: "옆 = next to: It's next to the café.", sid: "s.f-next-to-cafe" },
            { ko: "은행 맞은편에 있어요.", en: "맞은편 = across from: It's across from the bank." },
            { ko: "역 근처에 있어요.", en: "근처 = nearby: It's near the station." },
            { ko: "화장실은 오른쪽에 있어요.", en: "-에 있어요 = is at, in, on: The restroom is on the right." },
            { ko: "역에서 만나요.", en: "-에서 = at (where an action happens): Let's meet at the station." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Easy way to remember",
          bullets: ["에 있어요 says where something is: 카페 옆에 있어요.", "(으)로 가세요 says which way to go: 오른쪽으로 가세요."],
        },
      ],
    },
    {
      title: "Taking the subway",
      emoji: "🚇",
      blocks: [
        {
          kind: "phrases",
          rows: [
            {
              ko: "이 지하철 강남역에 가요?",
              rom: "i jihacheol gangnamyeoge gayo",
              en: "Does this subway go to Gangnam Station?",
              sid: "s.l5-subway-gangnam",
            },
            { ko: "어디에서 갈아타요?", rom: "eodieseo garatayo", en: "Where do I transfer?", sid: "s.l5-where-transfer" },
            { ko: "몇 호선을 타요?", rom: "myeot hoseoneul tayo", en: "Which line should I take?", sid: "s.l5-which-line" },
            { ko: "몇 번 출구예요?", rom: "myeot beon chulguyeyo", en: "Which exit number is it?", sid: "s.l5-which-exit" },
            { ko: "교통카드 어디서 사요?", rom: "gyotongkadeu eodiseo sayo", en: "Where can I buy a transit card?", sid: "s.l5-buy-card" },
            { ko: "여기서 내려요?", rom: "yeogiseo naeryeoyo", en: "Do I get off here?", sid: "s.l5-off-here-q" },
            { ko: "다음 역이 어디예요?", rom: "daeum yeogi eodiyeyo", en: "What's the next station?", sid: "s.l5-next-station" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Subway verbs",
          text: "타다 = to take, ride. 갈아타다 = to transfer. 내리다 = to get off.",
          examples: [
            { ko: "지하철을 타요.", en: "I take the subway." },
            { ko: "2호선으로 갈아타세요.", en: "Transfer to Line 2.", spoken: "이 호선으로 갈아타세요." },
          ],
        },
      ],
    },
    {
      title: "Taking the bus",
      emoji: "🚌",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "이 버스 홍대에 가요?", rom: "i beoseu hongdae-e gayo", en: "Does this bus go to Hongdae?", sid: "s.l5-bus-hongdae" },
            { ko: "어디에서 내려요?", rom: "eodieseo naeryeoyo", en: "Where should I get off?", sid: "s.l5-where-off" },
            { ko: "이번 정류장이에요?", rom: "ibeon jeongnyujang-ieyo", en: "Is this the stop?", sid: "s.l5-this-stop-q" },
            {
              ko: "다음 정류장에서 내려요.",
              rom: "daeum jeongnyujang-eseo naeryeoyo",
              en: "I'll get off at the next stop.",
              sid: "s.l5-next-stop-off",
            },
            { ko: "교통카드 찍으세요.", rom: "gyotongkadeu jjigeuseyo", en: "Tap your transit card.", sid: "s.l5-tap-card" },
          ],
        },
      ],
    },
    {
      title: "Taking a taxi",
      emoji: "🚕",
      blocks: [
        {
          kind: "dialogue",
          title: "Tell the driver where to go",
          lines: [
            {
              speaker: "Passenger",
              ko: "기사님, 여기로 가 주세요.",
              rom: "gisanim, yeogiro ga juseyo.",
              en: "Driver, please take me here.",
              sid: "s.l5-driver-here",
            },
            {
              speaker: "Passenger",
              ko: "서울역으로 가 주세요.",
              rom: "seoullyeogeuro ga juseyo.",
              en: "Please take me to Seoul Station.",
              sid: "s.l5-seoul-station",
            },
            { speaker: "Driver", ko: "네, 알겠습니다.", rom: "ne, algesseumnida.", en: "Okay, understood.", sid: "s.l5-understood" },
            { speaker: "Passenger", ko: "여기서 세워 주세요.", rom: "yeogiseo sewo juseyo.", en: "Please stop here.", sid: "s.taxi-here" },
            { speaker: "Passenger", ko: "카드 돼요?", rom: "kadeu dwaeyo?", en: "Can I pay by card?", sid: "s.card-ok" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Useful taxi expressions",
          examples: [
            { ko: "천천히 가 주세요.", en: "Please go slowly." },
            { ko: "여기서 내려 주세요.", en: "Please let me off here." },
            { ko: "이 주소로 가 주세요.", en: "Please go to this address." },
            { ko: "얼마나 걸려요?", en: "How long will it take?" },
          ],
        },
      ],
    },
    {
      title: "Useful verbs and adjectives",
      emoji: "🧩",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "가요", rom: "gayo", en: "go" },
            { ko: "타요", rom: "tayo", en: "take, ride" },
            { ko: "내려요", rom: "naeryeoyo", en: "get off, go down" },
            { ko: "갈아타요", rom: "garatayo", en: "transfer" },
            { ko: "걸어요", rom: "georeoyo", en: "walk" },
            { ko: "건너요", rom: "geonneoyo", en: "cross" },
            { ko: "멀어요", rom: "meoreoyo", en: "far" },
            { ko: "가까워요", rom: "gakkawoyo", en: "near, close" },
            { ko: "복잡해요", rom: "bokjaphaeyo", en: "crowded, complicated" },
            { ko: "빨라요", rom: "ppallayo", en: "fast" },
            { ko: "느려요", rom: "neuryeoyo", en: "slow" },
          ],
        },
      ],
    },
    {
      title: "Everyday conversation practice",
      emoji: "🎭",
      blocks: [
        {
          kind: "dialogue",
          title: "Asking for directions",
          lines: [
            {
              speaker: "A",
              ko: "실례합니다. 지하철역에 어떻게 가요?",
              en: "Excuse me. How do I get to the subway station?",
              sid: "s.l5-excuse-station",
            },
            { speaker: "B", ko: "쭉 가다가 오른쪽으로 가세요.", en: "Go straight and then turn right.", sid: "s.l5-straight-then-right" },
            { speaker: "A", ko: "멀어요?", en: "Is it far?", sid: "s.f-is-it-far" },
            { speaker: "B", ko: "아니요, 걸어서 5분 정도 걸려요.", en: "No, it's about five minutes on foot.", sid: "s.l5-five-min" },
            { speaker: "A", ko: "감사합니다!", en: "Thank you!", sid: "s.thanks-formal" },
          ],
        },
        {
          kind: "dialogue",
          title: "On the subway",
          lines: [
            {
              speaker: "A",
              ko: "강남역에 가려면 몇 호선을 타요?",
              en: "Which line do I take to get to Gangnam Station?",
              sid: "s.l5-to-gangnam-line",
            },
            { speaker: "B", ko: "2호선을 타세요.", en: "Take Line 2.", sid: "s.l5-take-line-2" },
            { speaker: "A", ko: "어디에서 갈아타요?", en: "Where do I transfer?", sid: "s.l5-where-transfer" },
            { speaker: "B", ko: "시청역에서 갈아타세요.", en: "Transfer at City Hall Station.", sid: "s.l5-transfer-city-hall" },
          ],
        },
      ],
    },
    {
      title: "Numbers you'll hear when traveling",
      emoji: "🔢",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "1호선", en: "Line 1. Line numbers use Sino-Korean numbers: 일 호선.", spoken: "일 호선" },
            { ko: "2번 출구", en: "Exit 2: 이 번 출구.", spoken: "이 번 출구" },
            { ko: "5분", en: "5 minutes: 오 분.", spoken: "오 분" },
            { ko: "두 정거장", en: "Two stops. Native number + counter." },
            { ko: "한 번", en: "Once. Native numbers count how many times." },
            { ko: "3,000원", en: "3,000 won: 삼천 원.", spoken: "삼천 원" },
          ],
        },
      ],
    },
    {
      title: "Speaking challenge",
      emoji: "🎲",
      blocks: [
        {
          kind: "speaking",
          prompts: [
            { ko: "역에 어떻게 가요?", en: "Ask how to get to the station." },
            { ko: "여기서 멀어요?", en: "Ask whether it's far." },
            { ko: "몇 번 출구예요?", en: "Ask which exit to use." },
            { ko: "서울역으로 가 주세요.", en: "Ask the taxi driver to go to Seoul Station." },
            { ko: "어디에서 갈아타요?", en: "Ask where to transfer." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Swap the destination",
          text: "역 → 공항 → 호텔 → 카페. Say each sentence aloud with the new place.",
        },
      ],
    },
    {
      title: "Practice",
      emoji: "✏️",
      blocks: [
        {
          kind: "match",
          pairs: [
            { ko: "쭉 가세요.", en: "Go straight." },
            { ko: "여기서 멀어요?", en: "Is it far?" },
            { ko: "어디에서 갈아타요?", en: "Where do I transfer?" },
            { ko: "카드 돼요?", en: "Can I pay by card?" },
          ],
        },
        {
          kind: "fill",
          items: [
            { before: "역에 어떻게 ", after: "?", answers: ["가요"], en: "How do I get to the station?" },
            { before: "서울역으로 가 ", after: ".", answers: ["주세요"], en: "Please take me to Seoul Station." },
            { before: "2호선 = ", after: " 호선", answers: ["이"], en: "Read the line number." },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Remember",
          bullets: [
            "Ask the way: [place] + 에 어떻게 가요?",
            "Give directions: 쭉 가세요, 왼쪽으로 가세요, 오른쪽으로 가세요.",
            "Subway: 타다 (ride), 갈아타다 (transfer), 내리다 (get off).",
            "Taxi: [destination] + (으)로 가 주세요.",
            "Learn whole phrases and swap the destination to speak faster.",
          ],
        },
      ],
    },
    {
      title: "Extra: driving words",
      emoji: "🚗",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "Driving in Korea",
          text: "Use these when you're driving, giving directions to a driver, or riding in a taxi. The -세요 command form is a polite way to tell someone what to do.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "좌회전", rom: "jwa-hoe-jeon", en: "left turn" },
            { ko: "우회전", rom: "u-hoe-jeon", en: "right turn" },
            { ko: "직진", rom: "jik-jin", en: "go straight" },
            { ko: "유턴", rom: "yu-teon", en: "U-turn" },
            { ko: "차선", rom: "cha-seon", en: "lane" },
            { ko: "차선 변경", rom: "cha-seon byeon-gyeong", en: "changing lanes" },
            { ko: "신호등", rom: "sin-ho-deung", en: "traffic light" },
            { ko: "교차로", rom: "gyo-cha-ro", en: "intersection" },
            { ko: "횡단보도", rom: "hoeng-dan-bo-do", en: "crosswalk" },
            { ko: "과속방지턱", rom: "gwa-sok-bang-ji-teok", en: "speed bump" },
            { ko: "주차장", rom: "ju-cha-jang", en: "parking lot" },
            { ko: "주차하다", rom: "ju-cha-ha-da", en: "to park" },
            { ko: "후진하다", rom: "hu-jin-ha-da", en: "to reverse, back up" },
            { ko: "브레이크", rom: "beu-re-i-keu", en: "brake" },
            { ko: "액셀", rom: "aek-sel", en: "accelerator" },
            { ko: "깜빡이", rom: "kkam-ppak-i", en: "turn signal (everyday word)" },
            { ko: "비상등", rom: "bi-sang-deung", en: "hazard lights" },
            { ko: "안전벨트", rom: "an-jeon-bel-teu", en: "seat belt" },
            { ko: "내비게이션 / 내비", rom: "nae-bi-ge-i-syeon / nae-bi", en: "GPS navigation" },
            { ko: "목적지", rom: "mok-jeok-jji", en: "destination" },
            { ko: "제한속도", rom: "je-han-sok-do", en: "speed limit" },
          ],
        },
      ],
    },
    {
      title: "Extra: phrases you'll hear in a car",
      emoji: "🛣️",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "좌회전하세요.", rom: "jwa-hoe-jeon-ha-se-yo", en: "Turn left." },
            { ko: "우회전하세요.", rom: "u-hoe-jeon-ha-se-yo", en: "Turn right." },
            { ko: "직진하세요.", rom: "jik-jin-ha-se-yo", en: "Go straight." },
            {
              ko: "다음 신호등에서 좌회전하세요.",
              rom: "da-eum sin-ho-deung-e-seo jwa-hoe-jeon-ha-se-yo",
              en: "Turn left at the next traffic light.",
              sid: "s.l5-left-at-light",
            },
            { ko: "여기서 유턴하세요.", rom: "yeo-gi-seo yu-teon-ha-se-yo", en: "Make a U-turn here." },
            { ko: "천천히 가세요.", rom: "cheon-cheon-hi ga-se-yo", en: "Go slowly." },
            { ko: "속도를 줄이세요.", rom: "sok-do-reul ju-ri-se-yo", en: "Slow down." },
            { ko: "잠깐 세워 주세요.", rom: "jam-kkan se-wo ju-se-yo", en: "Please stop here for a moment." },
            { ko: "여기서 내려 주세요.", rom: "yeo-gi-seo nae-ryeo ju-se-yo", en: "Please let me out here." },
            { ko: "이쪽으로 가 주세요.", rom: "i-jjok-eu-ro ga ju-se-yo", en: "Please go this way." },
            { ko: "길을 잘못 들었어요.", rom: "gi-reul jal-mot deu-reo-sseo-yo", en: "I took the wrong road." },
            { ko: "내비게이션이 뭐라고 해요?", rom: "nae-bi-ge-i-syeo-ni mwo-ra-go hae-yo", en: "What does the GPS say?" },
            { ko: "주차할 곳이 있어요?", rom: "ju-cha-hal go-si i-sseo-yo", en: "Is there somewhere to park?" },
            { ko: "차가 많이 막혀요.", rom: "cha-ga ma-ni ma-kyeo-yo", en: "There's a lot of traffic.", sid: "s.l5-traffic" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Useful sentence patterns",
          bullets: [
            "[Place] + 에서 + action + 하세요: 다음 교차로에서 우회전하세요. (Turn right at the next intersection.)",
            "[Place] + 까지 가 주세요: 서울역까지 가 주세요. (Please take me to Seoul Station.)",
            "[Place] + 에 세워 주세요: 편의점 앞에 세워 주세요. (Please stop in front of the convenience store.)",
          ],
        },
        {
          kind: "dialogue",
          title: "Giving directions",
          lines: [
            { speaker: "A", ko: "다음 신호등에서 어디로 가요?", en: "Which way do I go at the next traffic light?" },
            {
              speaker: "B",
              ko: "우회전하세요. 그리고 쭉 직진하세요.",
              rom: "u-hoe-jeon-ha-se-yo. geu-ri-go jjuk jik-jin-ha-se-yo.",
              en: "Turn right, then go straight.",
              sid: "s.l5-right-then-straight",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "Finding parking",
          lines: [
            { speaker: "A", ko: "근처에 주차장이 있어요?", en: "Is there a parking lot nearby?", sid: "s.l5-parking-q" },
            { speaker: "B", ko: "네, 저 건물 지하에 있어요.", en: "Yes, it's under that building.", sid: "s.l5-parking-basement" },
          ],
        },
        {
          kind: "speaking",
          prompts: [
            { ko: "다음 신호등에서 좌회전하세요.", en: "Turn left at the next traffic light." },
            { ko: "직진하세요.", en: "Go straight." },
            { ko: "편의점 앞에 세워 주세요.", en: "Please stop in front of the convenience store." },
            { ko: "근처에 주차장이 있어요?", en: "Is there a parking lot nearby?" },
            { ko: "차가 많이 막혀요.", en: "There's a lot of traffic." },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "Safety note",
          text: "When driving, follow traffic signs and signals, and don't use your phone. These expressions are for learning Korean, not a substitute for local traffic rules.",
        },
      ],
    },
  ],
};
