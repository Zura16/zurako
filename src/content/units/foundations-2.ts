import { card, s, w, type Unit } from "../author";

/** Foundations, modules 5–7: 있다/없다, this/that/where, and the first particles. */

const sentences = [
  // ---- Module 5: 있어요 / 없어요
  s("f-have-time", "시간 있어요?", "Do you have time?", { level: "BEGINNER", sp: "POLITE" }, [
    w("시간", "time", { c: ["v.시간", "g.drop-particle"] }),
    w("있어요", "have / is there", { base: "있다", c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-no-time", "아니요, 시간 없어요.", "No, I don't have time.", { level: "BEGINNER", sp: "POLITE" }, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("시간", "time", { c: ["v.시간"] }),
    w("없어요", "don't have", { base: "없다", c: ["v.없다", "g.itda-eopda"] }),
  ]),
  s("f-yes-have-time", "네, 있어요.", "Yes, I do.", { level: "BEGINNER", sp: "POLITE" }, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("있어요", "have", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-water-q", "물 있어요?", "Do you have water?", { level: "BEGINNER", sp: "POLITE" }, [
    w("물", "water", { c: ["v.물"] }),
    w("있어요", "is there", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-sold-out", "지금 없어요.", "We don't have any right now.", { level: "BEGINNER", sp: "POLITE" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("없어요", "there isn't", { c: ["v.없다", "g.itda-eopda"] }),
  ]),
  s("f-here-you-go", "여기 있어요.", "Here you go.", { level: "BEGINNER", sp: "POLITE", lit: "it's here" }, [
    w("여기", "here", { c: ["v.여기"] }),
    w("있어요", "is", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-where-store", "편의점 어디 있어요?", "Where's a convenience store?", { level: "BEGINNER", sp: "POLITE" }, [
    w("편의점", "convenience store", { c: ["v.편의점"] }),
    w("어디", "where", { c: ["v.어디"] }),
    w("있어요", "is", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-fun", "재미있어요.", "It's fun.", { level: "BEGINNER", sp: "POLITE", lit: "has fun" }, [
    w("재미있어요", "is fun", {
      parts: [
        ["재미", "fun", "word"],
        ["있어요", "has", "ending"],
      ],
      c: ["v.재미있다", "g.itda-eopda"],
    }),
  ]),
  s("f-not-fun", "재미없어요.", "It's boring.", { level: "BEGINNER", sp: "POLITE", lit: "has no fun" }, [
    w("재미없어요", "is boring", {
      parts: [
        ["재미", "fun", "word"],
        ["없어요", "doesn't have", "ending"],
      ],
      c: ["v.재미있다", "g.itda-eopda"],
    }),
  ]),
  s("f-siblings-q", "형제 있어요?", "Do you have any siblings?", { level: "BEGINNER", sp: "POLITE" }, [
    w("형제", "siblings"),
    w("있어요", "have", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-1000-won", "천 원이에요.", "It's 1,000 won.", { level: "BEGINNER", sp: "POLITE" }, [
    w("천", "a thousand"),
    w("원이에요", "won, it is", { c: ["v.원", "g.ida"] }),
  ]),
  s("f-how-much", "얼마예요?", "How much is it?", { level: "BEGINNER", sp: "POLITE" }, [
    w("얼마예요", "is how much", { c: ["v.얼마", "g.ida"] }),
  ]),

  // ---- Module 6: this, that, where
  s("f-what-is-that-you", "그거 뭐예요?", "What's that? (near you)", { level: "BEGINNER", sp: "POLITE" }, [
    w("그거", "that (near you)", { c: ["g.demonstratives"] }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-what-is-that-far", "저거 뭐예요?", "What's that? (over there)", { level: "BEGINNER", sp: "POLITE" }, [
    w("저거", "that (over there)", { c: ["g.demonstratives"] }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-this-please", "이거 주세요.", "This one, please.", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("주세요", "please give", { c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("f-this-one-please", "이걸로 주세요.", "I'll take this one.", { level: "BEGINNER", sp: "POLITE", lit: "give (me) with this" }, [
    w("이걸로", "this one", {
      parts: [
        ["이거", "this", "word"],
        ["ㄹ로", "with (으)로, merged", "particle"],
      ],
      c: ["g.demonstratives", "g.contraction"],
    }),
    w("주세요", "please give", { c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("f-over-there", "저기 있어요.", "It's over there.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저기", "over there", { c: ["v.저기"] }),
    w("있어요", "is", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-right-here", "여기예요.", "It's right here.", { level: "BEGINNER", sp: "POLITE" }, [
    w("여기예요", "it's here", {
      parts: [
        ["여기", "here", "word"],
        ["예요", "is", "ending"],
      ],
      c: ["v.여기", "g.ida"],
    }),
  ]),
  s("f-where-are-we", "여기 어디예요?", "Where are we?", { level: "BEGINNER", sp: "POLITE", lit: "here is where?" }, [
    w("여기", "here", { c: ["v.여기"] }),
    w("어디예요", "is where", { c: ["v.어디", "g.ida"] }),
  ]),
  s("f-this-or-that", "이거요? 아니면 저거요?", "This one? Or that one?", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거요", "this one?", { c: ["g.demonstratives", "g.noun-iyo"] }),
    w("아니면", "or", { c: ["v.아니면"] }),
    w("저거요", "that one?", { c: ["g.demonstratives", "g.noun-iyo"] }),
  ]),
  s("f-thats-kimbap", "그거 김밥이에요.", "That's gimbap.", { level: "BEGINNER", sp: "POLITE" }, [
    w("그거", "that (near you)", { c: ["g.demonstratives"] }),
    w("김밥이에요", "is gimbap", { c: ["v.김밥", "g.ida"] }),
  ]),
  s("f-sure", "네!", "Sure!", { level: "BEGINNER", sp: "POLITE" }, [w("네", "sure / yes", { c: ["e.ne-aniyo"] })]),

  // ---- Module 7: first particles
  s("f-like-coffee", "저는 커피를 좋아해요.", "I like coffee.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("커피를", "coffee (object)", {
      parts: [
        ["커피", "coffee", "word"],
        ["를", "object marker (after a vowel)", "particle"],
      ],
      c: ["v.커피", "g.object"],
    }),
    w("좋아해요", "like", { base: "좋아하다", c: ["v.좋아하다"] }),
  ]),
  s("f-eat-bread", "빵을 먹어요.", "I eat bread.", { level: "BEGINNER", sp: "POLITE" }, [
    w("빵을", "bread (object)", {
      parts: [
        ["빵", "bread", "word"],
        ["을", "object marker (after a consonant)", "particle"],
      ],
      c: ["v.빵", "g.object"],
    }),
    w("먹어요", "eat", { base: "먹다", c: ["v.먹다"] }),
  ]),
  s("f-weather-good", "날씨가 좋아요.", "The weather is nice.", { level: "BEGINNER", sp: "POLITE" }, [
    w("날씨가", "the weather (subject)", {
      parts: [
        ["날씨", "weather", "word"],
        ["가", "subject marker (after a vowel)", "particle"],
      ],
      c: ["v.날씨", "g.subject"],
    }),
    w("좋아요", "is good", { c: ["v.좋다"] }),
  ]),
  s("f-minsu-goes", "민수가 가요.", "Minsu is going.", { level: "BEGINNER", sp: "POLITE" }, [
    w("민수가", "Minsu (subject)", { c: ["g.subject"] }),
    w("가요", "goes", { c: ["v.가다"] }),
  ]),
  s("f-who-goes", "누가 가요?", "Who's going?", { level: "BEGINNER", sp: "POLITE" }, [
    w("누가", "who (subject)", {
      parts: [
        ["누구", "who", "word"],
        ["가 → 누가", "subject marker, merged", "particle"],
      ],
      c: ["v.누구", "g.subject"],
    }),
    w("가요", "goes", { c: ["v.가다"] }),
  ]),
  s("f-go-school", "학교에 가요.", "I'm going to school.", { level: "BEGINNER", sp: "POLITE" }, [
    w("학교에", "to school", {
      parts: [
        ["학교", "school", "word"],
        ["에", "to", "particle"],
      ],
      c: ["v.학교", "g.place-e"],
    }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("f-i-go-school", "저는 학교에 가요.", "I go to school.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("학교에", "to school", { c: ["v.학교", "g.place-e"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("f-at-home", "집에 있어요.", "I'm at home.", { level: "BEGINNER", sp: "POLITE" }, [
    w("집에", "at home", {
      parts: [
        ["집", "home", "word"],
        ["에", "at (where something is)", "particle"],
      ],
      c: ["v.집", "g.place-e"],
    }),
    w("있어요", "am", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-me-tea", "저는 차를 마셔요.", "I'll have tea. (I drink tea)", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "as for me", { note: "는 here contrasts: others may want coffee, but I…", c: ["v.저", "g.topic"] }),
    w("차를", "tea (object)", { c: ["v.차", "g.object"] }),
    w("마셔요", "drink", { base: "마시다", c: ["v.마시다"] }),
  ]),
];

const F = { level: "BEGINNER" as const, topic: "Foundations" };

const cards = [
  // Module 5
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-itda",
    module: 5,
    skills: ["grammar"],
    teaches: ["g.itda-eopda"],
    interest: 0.5,
    payload: {
      concept: "g.itda-eopda",
      hook: "있어요 means 'there is' or 'I have'. 없어요 is the opposite.",
      formation: [
        { base: "시간", result: "시간 있어요? / 시간 없어요" },
        { base: "물", result: "물 있어요?" },
        { base: "재미", result: "재미있어요 / 재미없어요" },
      ],
      examples: ["s.f-have-time", "s.f-no-time", "s.f-water-q"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-here-you-go",
    module: 5,
    skills: ["conversation"],
    teaches: ["v.여기"],
    interest: 0.6,
    payload: { sentence: "s.f-here-you-go", tip: "Say it when handing over money, a card, or a passport." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-water-q",
    module: 5,
    skills: ["conversation"],
    teaches: ["g.itda-eopda"],
    payload: { sentence: "s.f-water-q", tip: "'Do you have X?' is just X 있어요? Works in every shop." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-where-store",
    module: 5,
    skills: ["conversation"],
    teaches: ["v.편의점"],
    payload: { sentence: "s.f-where-store", tip: "Place + 어디 있어요? asks where anything is." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-sold-out",
    module: 5,
    skills: ["listening"],
    teaches: ["v.없다"],
    payload: {
      sentence: "s.f-sold-out",
      question: "What did the clerk say?",
      options: ["We're out right now", "It's over there", "Here you go"],
      answer: 0,
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-eopseoyo",
    module: 5,
    skills: ["grammar"],
    teaches: ["g.itda-eopda"],
    payload: {
      sentence: "s.f-no-time",
      blank: "없어요",
      options: ["없어요", "있어요", "아니에요"],
      hint: "The answer starts with 아니요.",
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-free",
    module: 5,
    skills: ["conversation"],
    teaches: ["g.itda-eopda"],
    payload: {
      prompt: "A friend asks 시간 있어요? You're free. You answer:",
      options: [
        { text: "네, 있어요.", correct: true, why: "'Yes, I have (time).'" },
        { text: "네, 없어요.", why: "That says you don't have time." },
        { text: "네, 시간이에요.", why: "'Yes, it's time.' A different meaning." },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-water",
    module: 5,
    skills: ["speaking"],
    teaches: ["v.물"],
    payload: {
      prompt: "Ask the server for water.",
      context: "Polite.",
      accepted: ["s.f-water-q", "s.water-please"],
      checks: [{ label: "Water", anyOf: ["물"] }],
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-fun",
    module: 5,
    skills: ["vocabulary"],
    teaches: ["v.재미있다"],
    payload: {
      concept: "v.재미있다",
      examples: ["s.f-fun", "s.f-not-fun"],
      memoryHook: "재미 (fun) + 있다 (have) = fun. 재미 + 없다 = boring.",
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-shop",
    module: 5,
    skills: ["conversation", "listening"],
    teaches: ["v.얼마"],
    interest: 0.6,
    payload: {
      title: "At the convenience store",
      setting: "Buying a bottle of water.",
      speakers: { you: "나", clerk: "직원" },
      lines: [
        { speaker: "you", sentence: "s.f-water-q" },
        { speaker: "clerk", sentence: "s.f-here-you-go" },
        { speaker: "you", sentence: "s.f-how-much" },
        { speaker: "clerk", sentence: "s.f-1000-won" },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-siblings",
    module: 5,
    skills: ["conversation"],
    teaches: ["v.있다"],
    payload: { sentence: "s.f-siblings-q", tip: "A common getting-to-know-you question. Answer: 네, 있어요 or 아니요, 없어요." },
  }),

  // Module 6
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-this-that",
    module: 6,
    skills: ["grammar"],
    teaches: ["g.demonstratives"],
    interest: 0.6,
    payload: {
      concept: "g.demonstratives",
      hook: "이 = near me. 그 = near you. 저 = over there, away from both of us.",
      formation: [
        { base: "이 + 거", result: "이거 (this)" },
        { base: "그 + 거", result: "그거 (that, near you)" },
        { base: "저 + 거", result: "저거 (that, over there)" },
      ],
      examples: ["s.f-what-is-that-you", "s.f-what-is-that-far", "s.f-this-please"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-this-please",
    module: 6,
    skills: ["conversation"],
    teaches: ["g.request-juseyo"],
    interest: 0.6,
    payload: { sentence: "s.f-this-please", tip: "Point and say this, and you can order almost anything." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-where-are-we",
    module: 6,
    skills: ["conversation"],
    teaches: ["v.여기"],
    payload: { sentence: "s.f-where-are-we", tip: "Useful in a taxi or when you're lost." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-this-or-that",
    module: 6,
    skills: ["conversation"],
    teaches: ["v.아니면"],
    payload: { sentence: "s.f-this-or-that", tip: "Adding 요 to a word keeps a short question polite." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-far",
    module: 6,
    skills: ["grammar"],
    teaches: ["g.demonstratives"],
    payload: {
      prompt: "The thing you want to ask about is on a shelf across the room. You ask:",
      options: [
        { text: "저거 뭐예요?", correct: true, why: "저 = away from both of you." },
        { text: "이거 뭐예요?", why: "이 = something near you, the speaker." },
        { text: "그거 뭐예요?", why: "그 = something near the listener." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-over-there",
    module: 6,
    skills: ["listening"],
    teaches: ["v.저기"],
    payload: { sentence: "s.f-over-there", question: "Where is it?", options: ["Right here", "Near you", "Over there"], answer: 2 },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-jeogeo",
    module: 6,
    skills: ["grammar"],
    teaches: ["g.demonstratives"],
    payload: { sentence: "s.f-what-is-that-far", blank: "저거", options: ["저거", "이거", "여기"], hint: "It's across the room." },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-this-one",
    module: 6,
    skills: ["speaking"],
    teaches: ["g.demonstratives"],
    payload: {
      prompt: "Point at a menu item: 'This one, please.'",
      accepted: ["s.f-this-please", "s.f-this-one-please"],
      checks: [
        { label: "This", anyOf: ["이거", "이걸"] },
        { label: "Please", anyOf: ["주세요"] },
      ],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-pointing",
    module: 6,
    skills: ["conversation"],
    teaches: ["v.김밥"],
    payload: {
      title: "Pointing at the menu",
      setting: "A snack bar. The owner is standing next to the dish you point at.",
      speakers: { you: "나", owner: "사장님" },
      lines: [
        { speaker: "you", sentence: "s.f-what-is-that-you" },
        { speaker: "owner", sentence: "s.f-thats-kimbap" },
        { speaker: "you", sentence: "s.f-this-one-please" },
        { speaker: "owner", sentence: "s.f-sure" },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-over-there",
    module: 6,
    skills: ["conversation"],
    teaches: ["v.저기"],
    payload: {
      sentence: "s.f-over-there",
      tip: "여기 (here), 거기 (there, near you), 저기 (over there) follow the same 이/그/저 pattern.",
    },
  }),

  // Module 7
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-topic",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.topic"],
    interest: 0.5,
    payload: {
      concept: "g.topic",
      hook: "은/는 marks what you're talking about: 'as for me…'. It often suggests a contrast.",
      formation: [
        { base: "저", result: "저는" },
        { base: "선생님", result: "선생님은" },
      ],
      examples: ["s.f-like-coffee", "s.f-me-tea", "s.im-student"],
    },
  }),
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-subject",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.subject"],
    payload: {
      concept: "g.subject",
      hook: "이/가 points at the subject, especially new information or the answer to 'who?'.",
      formation: [
        { base: "날씨", result: "날씨가" },
        { base: "학생", result: "학생이" },
        { base: "누구", result: "누가 (special)" },
      ],
      examples: ["s.f-weather-good", "s.f-who-goes", "s.f-minsu-goes"],
    },
  }),
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-object",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.object"],
    payload: {
      concept: "g.object",
      hook: "을/를 marks the thing an action is done to.",
      formation: [
        { base: "빵", result: "빵을" },
        { base: "커피", result: "커피를" },
      ],
      examples: ["s.f-eat-bread", "s.f-like-coffee"],
    },
  }),
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-e",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.place-e"],
    payload: {
      concept: "g.place-e",
      hook: "에 marks where you go, or where something is.",
      formation: [
        { base: "학교", result: "학교에 가요" },
        { base: "집", result: "집에 있어요" },
      ],
      examples: ["s.f-go-school", "s.f-at-home"],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-eul",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.object"],
    payload: { sentence: "s.f-eat-bread", blank: "을", options: ["을", "를", "이"], hint: "빵 ends in a consonant." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-reul",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.object"],
    payload: { sentence: "s.f-like-coffee", blank: "를", options: ["를", "을", "가"], hint: "커피 ends in a vowel." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-e",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.place-e"],
    payload: { sentence: "s.f-go-school", blank: "에", options: ["에", "을", "는"], hint: "Where you're going." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-who",
    module: 7,
    skills: ["grammar"],
    teaches: ["g.subject"],
    interest: 0.6,
    payload: {
      prompt: "Someone asks 누가 가요? ('Who's going?'). Minsu is. You answer:",
      sentence: "s.f-who-goes",
      options: [
        { text: "민수가 가요.", correct: true, why: "The answer to 'who?' takes 이/가." },
        { text: "민수는 가요.", why: "는 suggests a contrast: 'Minsu is going (but others aren't)'." },
        { text: "민수를 가요.", why: "을/를 marks objects, not the person doing it." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-home",
    module: 7,
    skills: ["listening"],
    teaches: ["g.place-e"],
    payload: { sentence: "s.f-at-home", question: "Where are they?", options: ["At home", "At school", "At a café"], answer: 0 },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-school",
    module: 7,
    skills: ["speaking"],
    teaches: ["g.place-e"],
    payload: {
      prompt: "Say: 'I'm going to school.'",
      accepted: ["s.f-go-school", "s.f-i-go-school"],
      checks: [
        { label: "School", anyOf: ["학교"] },
        { label: "에 (to)", anyOf: ["학교에"] },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-me-tea",
    module: 7,
    skills: ["conversation"],
    teaches: ["v.마시다"],
    payload: { sentence: "s.f-me-tea", tip: "Ordering in a group? 저는 차, 친구는 커피: the 는 sorts out who gets what." },
  }),
];

export const foundations2: Unit = { sentences, cards };
