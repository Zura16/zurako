import { card, s, w, type Unit } from "../author";

const sentences = [
  // Going home
  s("home-textbook", "저는 집에 갑니다.", "I am going home.", { level: "A1", sp: "FORMAL", nat: "TEXTBOOK", group: "home" }, [
    w("저는", "I (topic)", {
      parts: [
        ["저", "I (humble)", "word"],
        ["는", "topic marker", "particle"],
      ],
      c: ["v.저", "g.topic"],
    }),
    w("집에", "to home", {
      parts: [
        ["집", "home", "word"],
        ["에", "to", "particle"],
      ],
      c: ["v.집", "g.place-e"],
    }),
    w("갑니다", "go (formal)", {
      base: "가다",
      parts: [
        ["가", "go", "stem"],
        ["ㅂ니다", "formal statement", "ending"],
      ],
      c: ["v.가다", "g.hapsyo"],
    }),
  ]),
  s("home-polite", "저 집에 가요.", "I'm heading home.", { level: "A1", sp: "POLITE", group: "home" }, [
    w("저", "I", { note: "는 dropped: the topic is obvious.", c: ["v.저", "g.drop-particle"] }),
    w("집에", "to home", { c: ["v.집", "g.place-e"] }),
    w("가요", "go (polite)", { base: "가다", c: ["v.가다", "g.haeyo"] }),
  ]),
  s("home-casual", "나 집 가.", "I'm going home.", { level: "A1", sp: "CASUAL", nat: "COLLOQUIAL", group: "home" }, [
    w("나", "I (casual)", { c: ["v.나", "g.drop-particle"] }),
    w("집", "home", { note: "에 dropped too.", c: ["v.집", "g.drop-particle"] }),
    w("가", "go", { base: "가다", c: ["v.가다", "g.banmal"] }),
  ]),
  s("home-casual-e", "나 집에 가.", "I'm going home.", { level: "A1", sp: "CASUAL", group: "home" }, [
    w("나", "I (casual)", { c: ["v.나"] }),
    w("집에", "to home", { c: ["v.집", "g.place-e"] }),
    w("가", "go", { base: "가다", c: ["v.가다", "g.banmal"] }),
  ]),

  // Name
  s("name-textbook", "당신의 이름은 무엇입니까?", "What is your name?", { level: "A1", sp: "FORMAL", nat: "TEXTBOOK", group: "name" }, [
    w("당신의", "your", {
      parts: [
        ["당신", "you", "word"],
        ["의", "possessive 's", "particle"],
      ],
      note: "당신 to someone's face can sound cold, or like a fight. Couples and song lyrics are the exceptions.",
      c: ["c.dangsin"],
    }),
    w("이름은", "name (topic)", { c: ["v.이름", "g.topic"] }),
    w("무엇입니까", "is what (formal)", { c: ["v.무엇", "g.hapsyo"] }),
  ]),
  s("name-polite", "이름이 뭐예요?", "What's your name?", { level: "BEGINNER", sp: "POLITE", group: "name" }, [
    w("이름이", "name (subject)", {
      parts: [
        ["이름", "name", "word"],
        ["이", "subject marker", "particle"],
      ],
      c: ["v.이름", "g.subject"],
    }),
    w("뭐예요", "is what", {
      parts: [
        ["뭐", "what", "word"],
        ["예요", "is (polite)", "ending"],
      ],
      c: ["v.뭐", "g.haeyo"],
    }),
  ]),
  s(
    "name-respectful",
    "성함이 어떻게 되세요?",
    "May I ask your name?",
    { level: "B1", sp: "POLITE", group: "name", lit: "honored-name how does-it-become?", ctx: "Customers, elders, formal introductions." },
    [
      w("성함이", "your (honored) name", {
        parts: [
          ["성함", "name (honorific)", "word"],
          ["이", "subject", "particle"],
        ],
        c: ["g.hon-vocab"],
      }),
      w("어떻게", "how", { c: ["v.어떻게"] }),
      w("되세요", "is it (honorific)", {
        base: "되다",
        note: "'How does it become?' is a soft, indirect way to ask for personal details.",
        c: ["g.honorific-si"],
      }),
    ],
  ),
  s("name-casual", "이름 뭐야?", "What's your name?", { level: "BEGINNER", sp: "CASUAL", group: "name" }, [
    w("이름", "name", { c: ["v.이름", "g.drop-particle"] }),
    w("뭐야", "is what", { c: ["v.뭐", "g.banmal"] }),
  ]),

  // Hungry
  s("hungry-textbook", "저는 배가 고픕니다.", "I am hungry.", { level: "A1", sp: "FORMAL", nat: "TEXTBOOK", group: "hungry" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("배가", "stomach (subject)", {
      parts: [
        ["배", "stomach", "word"],
        ["가", "subject marker", "particle"],
      ],
      c: ["g.subject"],
    }),
    w("고픕니다", "is empty/hungry (formal)", { base: "고프다", c: ["g.hapsyo"] }),
  ]),
  s("hungry-polite", "배고파요.", "I'm hungry.", { level: "A1", sp: "POLITE", group: "hungry" }, [
    w("배고파요", "(I'm) hungry", {
      base: "배고프다",
      note: "No subject, no particle. 배고프다 works as one word.",
      c: ["v.배고프다", "g.drop-subject", "g.haeyo"],
    }),
  ]),
  s(
    "hungry-casual",
    "아, 배고파 죽겠다.",
    "Ugh, I'm starving.",
    { level: "B1", sp: "CASUAL", nat: "COLLOQUIAL", group: "hungry", lit: "ah, hungry, I'm going to die" },
    [
      w("아", "ugh"),
      w("배고파", "hungry", { base: "배고프다", c: ["v.배고프다"] }),
      w("죽겠다", "I'm dying", {
        base: "죽다",
        note: "-아/어 죽겠다 is everyday exaggeration: 피곤해 죽겠다, 더워 죽겠다.",
        c: ["g.plain-da", "g.guess-get"],
      }),
    ],
  ),

  // Do you like coffee?
  s(
    "coffee-textbook",
    "당신은 커피를 좋아합니까?",
    "Do you like coffee?",
    { level: "A1", sp: "FORMAL", nat: "TEXTBOOK", group: "coffee" },
    [
      w("당신은", "you (topic)", { c: ["c.dangsin", "g.topic"] }),
      w("커피를", "coffee (object)", { c: ["v.커피", "g.object"] }),
      w("좋아합니까", "like (formal question)", { base: "좋아하다", c: ["g.hapsyo"] }),
    ],
  ),
  s("coffee-polite", "커피 좋아하세요?", "Do you like coffee?", { level: "A2", sp: "POLITE", group: "coffee" }, [
    w("커피", "coffee", { c: ["v.커피", "g.drop-particle"] }),
    w("좋아하세요", "(do you) like (honorific)", { base: "좋아하다", c: ["g.honorific-si", "g.drop-subject"] }),
  ]),
  s("coffee-casual", "커피 좋아해?", "You like coffee?", { level: "A1", sp: "CASUAL", group: "coffee" }, [
    w("커피", "coffee", { c: ["v.커피", "g.drop-particle"] }),
    w("좋아해", "like", { base: "좋아하다", c: ["g.banmal"] }),
  ]),

  // I don't have time
  s("no-time-textbook", "저는 시간이 없습니다.", "I do not have time.", { level: "A1", sp: "FORMAL", nat: "TEXTBOOK", group: "no-time" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("시간이", "time (subject)", { c: ["v.시간", "g.subject"] }),
    w("없습니다", "doesn't exist (formal)", { base: "없다", c: ["v.없다", "g.hapsyo"] }),
  ]),
  s(
    "no-time-natural",
    "아, 오늘은 시간이 좀 없는데…",
    "Ah, I don't really have time today…",
    { level: "B1", sp: "CASUAL", group: "no-time", ctx: "Turning down a plan without saying no." },
    [
      w("아", "ah"),
      w("오늘은", "today (at least)", { note: "은 here contrasts: today specifically, maybe another day.", c: ["v.오늘", "g.topic"] }),
      w("시간이", "time", { c: ["v.시간", "g.subject"] }),
      w("좀", "a bit", { c: ["v.좀"] }),
      w("없는데", "don't have, so…", {
        base: "없다",
        note: "Trailing -는데 leaves the refusal unspoken. Very Korean.",
        c: ["v.없다", "g.background-neunde"],
      }),
    ],
  ),
];

const cards = [
  card("NATURAL_VS_TEXTBOOK", {
    id: "nat-home",
    level: "A1",
    topic: "Natural speech",
    skills: ["conversation", "grammar"],
    teaches: ["g.drop-particle"],
    interest: 0.8,
    payload: {
      rows: [
        {
          label: "Textbook",
          sentence: "s.home-textbook",
          note: "Every particle in place, formal ending. Correct, and right for a speech or announcement.",
        },
        { label: "Normal polite", sentence: "s.home-polite", note: "는 drops. This is what you'd say to a coworker as you leave." },
        { label: "Casual", sentence: "s.home-casual", note: "에 drops too. Complete and natural between friends." },
      ],
      points: [
        "Particles drop when the meaning is obvious from context.",
        "The textbook version isn't wrong. It belongs to formal settings.",
        "Compression grows as the relationship gets closer.",
      ],
    },
  }),
  card("NATURAL_VS_TEXTBOOK", {
    id: "nat-name",
    level: "A2",
    topic: "Natural speech",
    skills: ["conversation", "honorifics"],
    teaches: ["c.dangsin"],
    interest: 0.9,
    payload: {
      rows: [
        {
          label: "Textbook",
          sentence: "s.name-textbook",
          note: "Grammatical, but 당신 aimed at a stranger can sound cold or confrontational.",
        },
        { label: "Polite", sentence: "s.name-polite", note: "Simple and friendly. No 'you' needed." },
        { label: "Respectful", sentence: "s.name-respectful", note: "What staff say to customers. 성함 is the honorific word for name." },
        { label: "Casual", sentence: "s.name-casual", note: "Kids, or new friends after you've agreed on 반말." },
      ],
      points: [
        "Koreans avoid saying 'you' directly. They drop it or use a name or title.",
        "Asking 'how does it become?' (어떻게 되세요) is an indirect, softer way to ask personal details.",
      ],
    },
  }),
  card("NATURAL_VS_TEXTBOOK", {
    id: "nat-hungry",
    level: "A2",
    topic: "Natural speech",
    skills: ["conversation"],
    teaches: ["g.drop-subject"],
    interest: 0.8,
    payload: {
      rows: [
        {
          label: "Textbook",
          sentence: "s.hungry-textbook",
          note: "Literally 'as for me, my stomach is empty.' Correct, but nobody announces hunger this way.",
        },
        { label: "Normal polite", sentence: "s.hungry-polite", note: "No subject at all. It's obviously you." },
        { label: "Casual", sentence: "s.hungry-casual", note: "Dramatic exaggeration is normal in casual speech." },
      ],
      points: [
        "배가 고프다 fuses into one word, 배고프다, in speech.",
        "The speaker is assumed to be the subject of feelings like hunger.",
      ],
    },
  }),
  card("NATURAL_VS_TEXTBOOK", {
    id: "nat-coffee",
    level: "A2",
    topic: "Natural speech",
    skills: ["conversation", "honorifics"],
    teaches: ["g.drop-particle"],
    payload: {
      rows: [
        { label: "Textbook", sentence: "s.coffee-textbook", note: "Two problems: 당신, and a formal ending for a casual question." },
        { label: "Natural polite", sentence: "s.coffee-polite", note: "Particle dropped, subject dropped, honorific -시- added." },
        { label: "Casual", sentence: "s.coffee-casual", note: "Same shape, no 요." },
      ],
      points: ["Questions about the listener are often honorific (좋아하세요) instead of using 'you'."],
    },
  }),
  card("NATURAL_VS_TEXTBOOK", {
    id: "nat-no-time",
    level: "B1",
    topic: "Natural speech",
    skills: ["conversation"],
    teaches: ["g.background-neunde"],
    interest: 0.8,
    payload: {
      rows: [
        { label: "Textbook", sentence: "s.no-time-textbook", note: "A flat statement of fact." },
        {
          label: "Natural",
          sentence: "s.no-time-natural",
          note: "A soft refusal. 은 suggests 'another day might work', and -는데 trails off so you don't have to say no.",
        },
      ],
      points: ["Koreans often decline indirectly. The listener fills in the rest using 눈치."],
    },
  }),
  card("TRANSFORM", {
    id: "tf-home-casual",
    level: "A1",
    topic: "Natural speech",
    skills: ["conversation", "honorifics"],
    teaches: ["g.banmal"],
    payload: {
      instruction: "Text this to a close friend (반말).",
      from: "s.home-textbook",
      tiles: ["나", "저는", "집", "집에", "가", "갑니다"],
      accepted: ["s.home-casual", "s.home-casual-e"],
    },
  }),
  card("FILL_BLANK", {
    id: "fill-subject-time",
    level: "A1",
    topic: "Particles",
    skills: ["grammar"],
    teaches: ["g.subject"],
    payload: {
      sentence: "s.no-time-textbook",
      blank: "이",
      options: ["이", "을", "에"],
      hint: "시간 is the subject of 없다 ('time doesn't exist').",
    },
  }),
];

export const natural: Unit = { sentences, cards };
