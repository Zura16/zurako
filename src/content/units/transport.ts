import { card, s, w, type Unit } from "../author";

const sentences = [
  s("how-gangnam", "강남역 어떻게 가요?", "How do I get to Gangnam Station?", { level: "A1", sp: "POLITE" }, [
    w("강남역", "Gangnam Station", { parts: [["강남", "Gangnam", "word"], ["역", "station", "word"]], note: "에 dropped: 강남역에 → 강남역.", c: ["v.역", "g.drop-particle"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("가요", "go", { base: "가다", c: ["v.가다", "g.haeyo"] }),
  ]),
  s("transfer-next", "다음 역에서 갈아타세요.", "Transfer at the next station.", { level: "A2", sp: "POLITE" }, [
    w("다음", "next", { c: ["v.다음"] }),
    w("역에서", "at the station", { parts: [["역", "station", "word"], ["에서", "at", "particle"]], c: ["v.역", "g.place-eseo"] }),
    w("갈아타세요", "please transfer", { base: "갈아타다", parts: [["갈아타", "transfer (change + ride)", "stem"], ["세요", "polite instruction", "ending"]], c: ["v.갈아타다", "g.command-seyo"] }),
  ]),
  s("get-off-next", "다음 역에서 내리세요.", "Get off at the next station.", { level: "A2", sp: "POLITE" }, [
    w("다음", "next", { c: ["v.다음"] }),
    w("역에서", "at the station", { c: ["v.역", "g.place-eseo"] }),
    w("내리세요", "please get off", { base: "내리다", c: ["v.내리다", "g.command-seyo"] }),
  ]),
  s("announce-gangnam", "이번 역은 강남, 강남역입니다.", "This stop is Gangnam, Gangnam Station.", { level: "A2", sp: "FORMAL", ctx: "Subway announcement." }, [
    w("이번", "this (coming)", { c: ["v.이번"] }),
    w("역은", "station (topic)", { c: ["v.역", "g.topic"] }),
    w("강남", "Gangnam"),
    w("강남역입니다", "is Gangnam Station", { parts: [["강남역", "Gangnam Station", "word"], ["입니다", "is (formal)", "ending"]], c: ["g.hapsyo"] }),
  ]),
  s("door-right", "내리실 문은 오른쪽입니다.", "The doors will open on the right.", { level: "B1", sp: "FORMAL", lit: "the door you will (honorably) exit is the right side", ctx: "Subway announcement." }, [
    w("내리실", "(you) will get off (honorific)", { base: "내리다", parts: [["내리", "get off", "stem"], ["시", "honorific", "infix"], ["ㄹ", "future modifier", "ending"]], c: ["v.내리다", "g.honorific-si"] }),
    w("문은", "door (topic)", { c: ["g.topic"] }),
    w("오른쪽입니다", "is the right side", { c: ["g.hapsyo"] }),
  ]),
  s("where-bathroom", "화장실 어디예요?", "Where's the bathroom?", { level: "A1", sp: "POLITE" }, [
    w("화장실", "bathroom", { c: ["v.화장실", "g.drop-particle"] }),
    w("어디예요", "is where", { parts: [["어디", "where", "word"], ["예요", "is (polite)", "ending"]], c: ["v.어디", "g.haeyo"] }),
  ]),
  s("where-bathroom-excuse", "저기요, 화장실 어디예요?", "Excuse me, where's the bathroom?", { level: "A1", sp: "POLITE" }, [
    w("저기요", "excuse me", { c: ["e.yeogiyo"] }),
    w("화장실", "bathroom", { c: ["v.화장실"] }),
    w("어디예요", "is where", { c: ["v.어디"] }),
  ]),
  s("where-bathroom-full", "화장실이 어디에 있어요?", "Where is the bathroom?", { level: "A1", sp: "POLITE" }, [
    w("화장실이", "bathroom (subject)", { c: ["v.화장실", "g.subject"] }),
    w("어디에", "where (at)", { c: ["v.어디", "g.place-e"] }),
    w("있어요", "is (located)", { base: "있다", c: ["v.있다"] }),
  ]),
  s("by-subway", "지하철로 가면 빨라요.", "It's faster if you go by subway.", { level: "A2", sp: "POLITE" }, [
    w("지하철로", "by subway", { parts: [["지하철", "subway", "word"], ["로", "by (means)", "particle"]], c: ["v.지하철", "g.means-ro"] }),
    w("가면", "if (you) go", { base: "가다", c: ["v.가다", "g.if-eumyeon"] }),
    w("빨라요", "is fast", { base: "빠르다", note: "르-irregular: 빠르 + 아요 → 빨라요." }),
  ]),
  s("taxi-here", "여기서 세워 주세요.", "Please stop here.", { level: "A2", sp: "POLITE", ctx: "To a taxi driver." }, [
    w("여기서", "here (at)", { parts: [["여기", "here", "word"], ["서", "short for 에서", "particle"]], c: ["g.place-eseo"] }),
    w("세워 주세요", "please stop (the car)", { base: "세우다", c: ["g.request-juseyo"] }),
  ]),
  s("taxi-to", "홍대입구역으로 가 주세요.", "To Hongik University Station, please.", { level: "A2", sp: "POLITE", ctx: "Getting into a taxi." }, [
    w("홍대입구역으로", "to Hongik Univ. Station", { parts: [["홍대입구역", "Hongik University Station", "word"], ["으로", "toward", "particle"]], c: ["g.means-ro"] }),
    w("가 주세요", "please go", { base: "가다", c: ["v.가다", "g.request-juseyo"] }),
  ]),
  s("traffic-bad", "길이 너무 막혀요.", "The traffic is terrible.", { level: "A2", sp: "POLITE", lit: "the road is too blocked" }, [
    w("길이", "road (subject)", { c: ["v.길", "g.subject"] }),
    w("너무", "too", { c: ["v.너무"] }),
    w("막혀요", "is blocked", { base: "막히다" }),
  ]),
];

const cards = [
  card("PHRASE", {
    id: "how-gangnam", level: "A1", topic: "Transport", skills: ["conversation"], teaches: ["v.어떻게", "v.역"],
    payload: { sentence: "s.how-gangnam", tip: "Swap in any place: 명동 어떻게 가요? 공항 어떻게 가요?" },
  }),
  card("LISTENING", {
    id: "listen-transfer", level: "A2", topic: "Transport", skills: ["listening"], teaches: ["v.갈아타다"], interest: 0.5,
    payload: { sentence: "s.transfer-next", question: "What should you do?", options: ["다음 역에서 갈아타세요.", "다음 역에서 내리세요.", "이번 역에서 갈아타세요."], answer: 0 },
  }),
  card("LISTENING", {
    id: "listen-door", level: "B1", topic: "Transport", skills: ["listening"], teaches: ["v.내리다"], interest: 0.6,
    payload: { sentence: "s.door-right", question: "Which side do the doors open on?", options: ["Left", "Right", "Both sides"], answer: 1 },
  }),
  card("CULTURE", {
    id: "culture-announcements", level: "A2", topic: "Transport", skills: ["listening", "honorifics"], teaches: ["g.hapsyo"],
    payload: {
      title: "Announcements are 하십시오체",
      body: "Subway, airport and store announcements all use the formal -ㅂ니다 style, often with honorific -시- toward passengers. This is where formal speech is most natural, so listen for it.",
      sentence: "s.announce-gangnam",
    },
  }),
  card("PHRASE", {
    id: "door-right", level: "B1", topic: "Transport", skills: ["reading", "honorifics"], teaches: ["g.honorific-si"],
    payload: { sentence: "s.door-right", tip: "내리실 honors you, the passenger. Tap it to see the -시- inside." },
  }),
  card("SPEAKING", {
    id: "speak-bathroom", level: "A1", topic: "Travel", skills: ["speaking"], teaches: ["v.화장실"],
    payload: {
      prompt: "Ask a stranger where the bathroom is.",
      context: "Polite.",
      accepted: ["s.where-bathroom", "s.where-bathroom-excuse", "s.where-bathroom-full"],
      checks: [{ label: "Bathroom", anyOf: ["화장실"] }, { label: "Where", anyOf: ["어디"] }],
    },
  }),
  card("PHRASE", {
    id: "taxi-to", level: "A2", topic: "Transport", skills: ["conversation"], teaches: ["g.means-ro"],
    payload: { sentence: "s.taxi-to", tip: "(으)로 marks the direction. Then at the end: 여기서 세워 주세요." },
  }),
  card("GRAMMAR", {
    id: "grammar-if", level: "A2", topic: "Conditions & ability", skills: ["grammar"], teaches: ["g.if-eumyeon"],
    payload: {
      concept: "g.if-eumyeon",
      hook: "-(으)면 = if, or when.",
      formation: [{ base: "가다", result: "가면" }, { base: "있다", result: "있으면" }, { base: "피곤하다", result: "피곤하면" }],
      examples: ["s.by-subway"],
    },
  }),
  card("FILL_BLANK", {
    id: "fill-means", level: "A2", topic: "Particles", skills: ["grammar"], teaches: ["g.means-ro"],
    payload: { sentence: "s.by-subway", blank: "로", options: ["로", "에", "를"], hint: "By what means?" },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-taxi-stop", level: "A2", topic: "Transport", skills: ["conversation"], teaches: ["g.request-juseyo"],
    payload: {
      prompt: "Your taxi is right outside your hotel. What do you say?",
      options: [
        { text: "여기서 세워 주세요.", correct: true, why: "'Please stop here.' Exactly right." },
        { text: "여기서 갈아타세요.", why: "That tells the driver to transfer trains." },
        { text: "여기 가요.", why: "'I'm going here.' Unclear." },
      ],
    },
  }),
];

export const transport: Unit = { sentences, cards };
