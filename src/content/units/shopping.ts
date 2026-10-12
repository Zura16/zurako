import { card, s, w, type Unit } from "../author";

const sentences = [
  s("welcome", "어서 오세요!", "Welcome!", { level: "A1", sp: "POLITE", ctx: "Said by staff as you walk in." }, [
    w("어서", "quickly, please"),
    w("오세요", "come (honorific)", { base: "오다", c: ["v.오다", "g.command-seyo"] }),
  ]),
  s("how-much", "이거 얼마예요?", "How much is this?", { level: "A1", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.contraction"] }),
    w("얼마예요", "is how much", {
      parts: [
        ["얼마", "how much", "word"],
        ["예요", "is (polite)", "ending"],
      ],
      c: ["v.얼마", "g.haeyo"],
    }),
  ]),
  s("how-much-short", "얼마예요?", "How much?", { level: "A1", sp: "POLITE" }, [w("얼마예요", "is how much", { c: ["v.얼마"] })]),
  s("how-much-this-one", "이건 얼마예요?", "And how much is this one?", { level: "A1", sp: "POLITE" }, [
    w("이건", "this one (topic)", {
      parts: [
        ["이거", "this", "contraction"],
        ["ㄴ", "topic 는, merged", "particle"],
      ],
      c: ["g.contraction", "g.topic"],
    }),
    w("얼마예요", "is how much", { c: ["v.얼마"] }),
  ]),
  s("price-15000", "만 오천 원이에요.", "It's 15,000 won.", { level: "A2", sp: "POLITE" }, [
    w("만", "ten thousand", { note: "Korean counts in units of 만 (10,000), so 15,000 is 만 오천: 'one man, five thousand'." }),
    w("오천", "five thousand"),
    w("원이에요", "won, it is", { c: ["v.원"] }),
  ]),
  s("bit-pricey", "좀 비싸네요… 조금만 깎아 주세요.", "That's a bit pricey… could you knock a little off?", { level: "B1", sp: "POLITE" }, [
    w("좀", "a bit", { c: ["v.좀"] }),
    w("비싸네요", "is expensive (I notice)", { base: "비싸다", c: ["v.비싸다", "g.discovery-ne"] }),
    w("조금만", "just a little", { c: ["g.only-man"] }),
    w("깎아 주세요", "please cut (the price)", {
      base: "깎다",
      note: "깎다 means 'to shave or trim'. Prices get 'trimmed'.",
      c: ["g.request-juseyo"],
    }),
  ]),
  s("ok-13000", "그럼 만 삼천 원에 드릴게요.", "Okay, I'll let you have it for 13,000 won.", { level: "B1", sp: "POLITE" }, [
    w("그럼", "then"),
    w("만", "ten thousand"),
    w("삼천", "three thousand"),
    w("원에", "for … won", { c: ["v.원", "g.place-e"] }),
    w("드릴게요", "I'll give (humble)", { base: "드리다", c: ["g.humble", "g.promise-ge"] }),
  ]),
  s("card-ok", "카드 돼요?", "Do you take cards?", { level: "A2", sp: "POLITE", lit: "card works?" }, [
    w("카드", "card"),
    w("돼요", "works, is possible", { base: "되다", note: "되다 'to become / to work out' covers 'is it possible?' in short questions." }),
  ]),
  s("just-looking", "그냥 구경하는 거예요.", "I'm just looking.", { level: "B1", sp: "POLITE" }, [
    w("그냥", "just", { c: ["v.그냥"] }),
    w("구경하는", "browsing", { base: "구경하다" }),
    w("거예요", "it's (that)", { c: ["g.contraction"] }),
  ]),

  // Running late (texting)
  s("where-are-you-casual", "어디야?", "Where are you?", { level: "A1", sp: "CASUAL", group: "where-are-you" }, [
    w("어디야", "where is (it)", {
      parts: [
        ["어디", "where", "word"],
        ["야", "is (casual)", "ending"],
      ],
      c: ["v.어디", "g.banmal"],
    }),
  ]),
  s(
    "where-are-you-polite",
    "어디세요?",
    "Where are you?",
    { level: "A2", sp: "POLITE", group: "where-are-you", ctx: "On the phone with someone you speak politely to." },
    [
      w("어디세요", "where are you (honorific)", {
        parts: [
          ["어디", "where", "word"],
          ["세요", "is (honorific polite)", "ending"],
        ],
        c: ["v.어디", "g.honorific-si"],
      }),
    ],
  ),
  s(
    "where-are-you-formal",
    "지금 어디 계십니까?",
    "Where are you at the moment?",
    { level: "B1", sp: "FORMAL", group: "where-are-you", ctx: "A driver or assistant to an important client." },
    [
      w("지금", "now", { c: ["v.지금"] }),
      w("어디", "where", { c: ["v.어디"] }),
      w("계십니까", "are you (honorific formal)", { base: "계시다", c: ["g.hon-vocab", "g.hapsyo"] }),
    ],
  ),
  s("on-my-way", "미안, 지금 가고 있어!", "Sorry, I'm on my way!", { level: "A2", sp: "CASUAL" }, [
    w("미안", "sorry"),
    w("지금", "now", { c: ["v.지금"] }),
    w("가고 있어", "am going", { base: "가다", c: ["v.가다", "g.progressive"] }),
  ]),
  s("how-long", "얼마나 걸려?", "How long will it take?", { level: "A2", sp: "CASUAL" }, [
    w("얼마나", "how much / how long", { c: ["v.얼마"] }),
    w("걸려", "does it take (time)", { base: "걸리다" }),
  ]),
  s("ten-minutes", "10분만 기다려 줘.", "Just give me ten minutes.", { level: "A2", sp: "CASUAL" }, [
    w("10분만", "just 10 minutes", {
      parts: [
        ["10분", "ten minutes (십 분)", "word"],
        ["만", "just", "particle"],
      ],
      c: ["g.only-man"],
    }),
    w("기다려 줘", "wait for me", { base: "기다리다", c: ["v.기다리다", "g.request-juseyo", "g.banmal"] }),
  ]),
  s("ok-take-time", "ㅇㅋ 천천히 와.", "OK, take your time.", { level: "A2", sp: "CASUAL", nat: "SLANG" }, [
    w("ㅇㅋ", "OK", { note: "Typed OK: 오케이 → ㅇㅋ.", c: ["e.kk"] }),
    w("천천히", "slowly", { c: ["v.천천히"] }),
    w("와", "come", { base: "오다", c: ["v.오다", "g.banmal"] }),
  ]),

  // Mistakes
  s("cant-swim", "저 수영 못 해요.", "I can't swim.", { level: "A2", sp: "POLITE" }, [
    w("저", "I", { c: ["v.저"] }),
    w("수영", "swimming"),
    w("못", "can't", { c: ["g.neg-mot"] }),
    w("해요", "do", { c: ["v.하다"] }),
  ]),
  s("rain-take-umbrella", "비가 오니까 우산 가져가세요.", "It's raining, so take an umbrella.", { level: "B1", sp: "POLITE" }, [
    w("비가", "rain (subject)", { c: ["v.비", "g.subject"] }),
    w("오니까", "is coming, so", { base: "오다", note: "Rain 'comes' in Korean: 비가 오다.", c: ["v.오다", "g.because-nikka"] }),
    w("우산", "umbrella", { c: ["v.우산", "g.drop-particle"] }),
    w("가져가세요", "please take (with you)", { base: "가져가다", c: ["g.command-seyo"] }),
  ]),
  s("weather-nice", "오늘 날씨 진짜 좋다!", "The weather's gorgeous today!", { level: "A1", sp: "CASUAL" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("날씨", "weather", { c: ["v.날씨", "g.drop-particle"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("좋다", "is nice!", { base: "좋다", c: ["v.좋다", "g.plain-da"] }),
  ]),
  s("contact-later-polite", "이따 연락할게요.", "I'll get in touch later.", { level: "A2", sp: "POLITE" }, [
    w("이따", "later (today)", { c: ["v.이따"] }),
    w("연락할게요", "I'll contact you", { base: "연락하다", c: ["v.연락하다", "g.promise-ge"] }),
  ]),
  s(
    "contact-later-humble",
    "나중에 연락드릴게요.",
    "I'll contact you later.",
    { level: "B1", sp: "POLITE", ctx: "To a senior or client: 드리다 lowers yourself." },
    [
      w("나중에", "later", { c: ["v.나중"] }),
      w("연락드릴게요", "I'll contact you (humble)", { base: "연락드리다", c: ["g.humble", "g.promise-ge"] }),
    ],
  ),
];

const cards = [
  card("DIALOGUE", {
    id: "dlg-market",
    level: "B1",
    topic: "Shopping",
    skills: ["conversation", "listening"],
    teaches: ["v.얼마"],
    interest: 0.8,
    payload: {
      title: "At the market stall",
      setting: "A clothing stall at a traditional market, where a bit of bargaining is normal.",
      speakers: { staff: "사장님", you: "손님" },
      lines: [
        { speaker: "staff", sentence: "s.welcome" },
        { speaker: "you", sentence: "s.how-much" },
        { speaker: "staff", sentence: "s.price-15000" },
        { speaker: "you", sentence: "s.bit-pricey" },
        { speaker: "staff", sentence: "s.ok-13000" },
      ],
    },
  }),
  card("PHRASE", {
    id: "how-much",
    level: "A1",
    topic: "Shopping",
    skills: ["conversation"],
    teaches: ["v.얼마"],
    interest: 0.6,
    payload: { sentence: "s.how-much", tip: "Point and ask. 이건 얼마예요? ('and this one?') compares prices." },
  }),
  card("PHRASE", {
    id: "card-ok",
    level: "A2",
    topic: "Shopping",
    skills: ["conversation"],
    payload: { sentence: "s.card-ok", tip: "Cards are accepted almost everywhere in Korea, even for small amounts." },
  }),
  card("PHRASE", {
    id: "just-looking",
    level: "B1",
    topic: "Shopping",
    skills: ["conversation"],
    teaches: ["v.그냥"],
    payload: { sentence: "s.just-looking", tip: "For when staff follow you around the store. Say it with a smile." },
  }),
  card("CULTURE", {
    id: "culture-haggling",
    level: "B1",
    topic: "Shopping",
    skills: ["conversation"],
    interest: 0.8,
    payload: {
      title: "Where you can haggle",
      body: "At traditional markets like 남대문 or 동대문, asking for a small discount is normal and friendly. In department stores, chains, and convenience stores, prices are fixed. Market owners are called 사장님 ('boss') as a polite form of address.",
      sentence: "s.bit-pricey",
    },
  }),
  card("LISTENING", {
    id: "listen-price",
    level: "A2",
    topic: "Shopping",
    skills: ["listening", "vocabulary"],
    teaches: ["v.원"],
    interest: 0.6,
    payload: { sentence: "s.price-15000", question: "How much is it?", options: ["₩5,000", "₩15,000", "₩50,000"], answer: 1 },
  }),
  card("SPEAKING", {
    id: "speak-how-much",
    level: "A1",
    topic: "Shopping",
    skills: ["speaking"],
    teaches: ["v.얼마"],
    payload: {
      prompt: "Ask how much this is.",
      context: "Polite, to the shop owner.",
      accepted: ["s.how-much", "s.how-much-short", "s.how-much-this-one"],
      checks: [
        { label: "How much", anyOf: ["얼마"] },
        { label: "Polite ending", anyOf: ["요"] },
      ],
    },
  }),
  card("DIALOGUE", {
    id: "dlg-running-late",
    level: "A2",
    topic: "Texting",
    skills: ["reading", "conversation"],
    teaches: ["g.only-man"],
    interest: 0.8,
    payload: {
      title: "Running late",
      setting: "KakaoTalk between friends. Short, casual, and a little slangy.",
      speakers: { a: "하은", b: "준" },
      lines: [
        { speaker: "a", sentence: "s.where-are-you-casual" },
        { speaker: "b", sentence: "s.on-my-way" },
        { speaker: "a", sentence: "s.how-long" },
        { speaker: "b", sentence: "s.ten-minutes" },
        { speaker: "a", sentence: "s.ok-take-time" },
      ],
    },
  }),
  card("SPEECH_LEVELS", {
    id: "levels-where-are-you",
    level: "A2",
    topic: "Speech levels",
    skills: ["honorifics", "conversation"],
    teaches: ["g.honorific-si"],
    payload: {
      situation: "'Where are you?' on the phone",
      variants: [
        { level: "CASUAL", sentence: "s.where-are-you-casual", when: "A friend who's late." },
        { level: "POLITE", sentence: "s.where-are-you-polite", when: "A coworker, a delivery driver, a parent's friend." },
        { level: "FORMAL", sentence: "s.where-are-you-formal", when: "A chauffeur or assistant to a VIP." },
      ],
      takeaway: "어디세요? is short and honorific at once. It's the everyday polite way to ask on the phone.",
    },
  }),
  card("MISTAKE", {
    id: "mistake-an-mot",
    level: "A2",
    topic: "Negation",
    skills: ["grammar"],
    teaches: ["g.neg-mot"],
    interest: 0.6,
    payload: {
      situation: "A friend invites you to the pool. You never learned to swim.",
      learnerSays: "저는 수영 안 해요.",
      question: "Why might your friend be confused?",
      options: [
        {
          text: "안 means you choose not to swim. For 'can't', use 못",
          correct: true,
          why: "안 해요 sounds like you just don't feel like swimming. 수영 못 해요 says you're not able to.",
        },
        { text: "수영 needs the object marker 을", why: "Dropping 을 is natural here." },
        { text: "It should be past tense", why: "Present tense is right for an ability." },
      ],
      better: "s.cant-swim",
    },
  }),
  card("MISTAKE", {
    id: "mistake-aseo-command",
    level: "B1",
    topic: "Connectors",
    skills: ["grammar"],
    teaches: ["g.because-nikka"],
    interest: 0.6,
    payload: {
      situation: "Your coworker is heading out and it's pouring.",
      learnerSays: "비가 와서 우산 가져가세요.",
      question: "What's the problem?",
      options: [
        {
          text: "-아서 can't be followed by a request or command. Use -(으)니까",
          correct: true,
          why: "This is one of the most common learner mistakes. Reasons before commands, requests, and suggestions take -(으)니까.",
        },
        { text: "비 needs 는, not 가", why: "가 is right: rain is new information here." },
        { text: "가져가세요 is too formal", why: "-세요 is polite and fine for a coworker." },
      ],
      better: "s.rain-take-umbrella",
    },
  }),
  card("GRAMMAR", {
    id: "grammar-nikka",
    level: "B1",
    topic: "Connectors",
    skills: ["grammar"],
    teaches: ["g.because-nikka"],
    payload: {
      concept: "g.because-nikka",
      hook: "-(으)니까 gives a reason, and unlike -아서 it can come before a request or suggestion.",
      formation: [
        { base: "오다", result: "오니까" },
        { base: "바쁘다", result: "바쁘니까" },
        { base: "있다", result: "있으니까" },
      ],
      examples: ["s.rain-take-umbrella"],
    },
  }),
  card("PHRASE", {
    id: "weather-nice",
    level: "A1",
    topic: "Weather",
    skills: ["conversation"],
    teaches: ["v.날씨"],
    payload: { sentence: "s.weather-nice", tip: "Weather talk is safe small talk in any speech level." },
  }),
  card("SPEAKING", {
    id: "speak-contact-later",
    level: "A2",
    topic: "Work",
    skills: ["speaking", "honorifics"],
    teaches: ["g.promise-ge"],
    payload: {
      prompt: "Tell a coworker you'll get in touch later.",
      context: "Polite.",
      accepted: ["s.contact-later-polite", "s.contact-later-humble"],
      checks: [
        { label: "I'll (promise)", anyOf: ["게요"] },
        { label: "Contact", anyOf: ["연락"] },
      ],
    },
  }),
];

export const shopping: Unit = { sentences, cards };
