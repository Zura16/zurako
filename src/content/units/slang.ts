import { card, s, w, type Unit } from "../author";

const sentences = [
  s("daebak", "대박! 진짜 잘했다.", "No way! You did amazing.", { level: "A2", sp: "CASUAL", nat: "SLANG" }, [
    w("대박", "amazing!", { c: ["e.daebak"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("잘했다", "did well!", { base: "잘하다", c: ["v.잘", "g.past", "g.plain-da"] }),
  ]),
  s("heol", "헐, 진짜?", "Wait, seriously?", { level: "A2", sp: "CASUAL", nat: "SLANG" }, [
    w("헐", "what?!", { c: ["e.heol"] }),
    w("진짜", "really?", { c: ["v.진짜"] }),
  ]),
  s("noljam", "그 영화 완전 노잼이었어.", "That movie was so boring.", { level: "B1", sp: "CASUAL", nat: "SLANG" }, [
    w("그", "that"),
    w("영화", "movie", { c: ["v.영화"] }),
    w("완전", "totally", { c: ["v.완전"] }),
    w("노잼이었어", "was no-fun", {
      parts: [
        ["노잼", "no + 재미 (fun)", "word"],
        ["이었어", "was (casual)", "ending"],
      ],
      c: ["e.noljam", "g.past"],
    }),
  ]),
  s("kkuljam", "어제 노래방 꿀잼이었어!", "Karaoke last night was so much fun!", { level: "B1", sp: "CASUAL", nat: "SLANG" }, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("노래방", "karaoke room", { c: ["v.노래방"] }),
    w("꿀잼이었어", "was honey-fun", {
      parts: [
        ["꿀잼", "꿀 (honey) + 잼 (fun)", "word"],
        ["이었어", "was", "ending"],
      ],
      c: ["e.noljam", "g.past"],
    }),
  ]),
  s("ilgssip", "걔가 내 카톡 읽씹했어.", "They left my KakaoTalk on read.", { level: "B1", sp: "CASUAL", nat: "SLANG" }, [
    w("걔가", "that person (subject)", {
      parts: [
        ["걔", "그 애: that kid/person", "contraction"],
        ["가", "subject", "particle"],
      ],
      c: ["g.contraction", "g.subject"],
    }),
    w("내", "my", { note: "나 + 의 → 내." }),
    w("카톡", "KakaoTalk message", { c: ["c.texting"] }),
    w("읽씹했어", "read and ignored", {
      parts: [
        ["읽씹", "읽다 (read) + 씹다 (chew → ignore)", "word"],
        ["했어", "did", "ending"],
      ],
      c: ["e.ilgssip", "g.past"],
    }),
  ]),
  s("honbap", "오늘은 혼밥 할래.", "I'm going to eat alone today.", { level: "B1", sp: "CASUAL", nat: "SLANG" }, [
    w("오늘은", "today (at least)", { c: ["v.오늘", "g.topic"] }),
    w("혼밥", "eating alone", { note: "혼자 (alone) + 밥 (meal). Also 혼술, drinking alone.", c: ["e.honbap"] }),
    w("할래", "I'll do", { base: "하다", c: ["v.하다", "g.will-eullae"] }),
  ]),
  s(
    "jmt",
    "여기 떡볶이 진짜 JMT야.",
    "The tteokbokki here is insanely good.",
    { level: "B2", sp: "CASUAL", nat: "SLANG", spoken: "여기 떡볶이 진짜 제이엠티야." },
    [
      w("여기", "here"),
      w("떡볶이", "tteokbokki", { c: ["v.떡볶이"] }),
      w("진짜", "really", { c: ["v.진짜"] }),
      w("JMT야", "is JMT", { note: "JMT = 존맛탱, a crude intensifier + 맛. Fine with friends, never at work.", c: ["e.jonmat"] }),
    ],
  ),
  s("gabunssa", "갑자기 분위기 싸해졌어.", "The mood suddenly went cold.", { level: "B2", sp: "CASUAL", nat: "COLLOQUIAL" }, [
    w("갑자기", "suddenly"),
    w("분위기", "mood, atmosphere"),
    w("싸해졌어", "became chilly", { base: "싸하다", note: "Abbreviated into the slang 갑분싸.", c: ["e.gabunssa", "g.past"] }),
  ]),
  s("text-ok", "ㅇㅇ 알겠어 ㅎㅎ", "Yep, got it :)", { level: "A2", sp: "CASUAL", nat: "SLANG" }, [
    w("ㅇㅇ", "yep", { note: "응응, typed as initial consonants.", c: ["e.kk"] }),
    w("알겠어", "got it", { base: "알다", c: ["v.알다", "g.guess-get"] }),
    w("ㅎㅎ", "hehe / :)", { c: ["e.kk"] }),
  ]),
  s("text-lol", "ㅋㅋㅋ 미쳤다", "LOL that's insane", { level: "B1", sp: "CASUAL", nat: "SLANG" }, [
    w("ㅋㅋㅋ", "lol", { note: "More ㅋ = more laughing. A single ㅋ can read as dry.", c: ["e.kk"] }),
    w("미쳤다", "is crazy!", {
      base: "미치다",
      note: "Literally 'went crazy'. Among friends it's praise or shock.",
      c: ["g.plain-da", "g.past"],
    }),
  ]),
  s("text-sad", "나 내일 시험이야 ㅠㅠ", "I have an exam tomorrow :(", { level: "A2", sp: "CASUAL", nat: "SLANG" }, [
    w("나", "I", { c: ["v.나"] }),
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("시험이야", "is (an) exam"),
    w("ㅠㅠ", "crying eyes", { c: ["e.kk"] }),
  ]),
  s("mukbang", "요즘 먹방 보는 게 취미야.", "Watching mukbangs is my hobby these days.", { level: "B1", sp: "CASUAL" }, [
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("먹방", "mukbang", { note: "먹는 방송, 'eating broadcast'.", c: ["e.mukbang"] }),
    w("보는", "watching", { base: "보다", c: ["v.보다"] }),
    w("게", "thing (subject)", { note: "것이 → 게.", c: ["g.contraction"] }),
    w("취미야", "is (my) hobby"),
  ]),
  s("gukrul", "ㅋㅋㅋ 그거 국룰이지.", "LOL, that's the classic move.", { level: "B2", sp: "CASUAL", nat: "SLANG" }, [
    w("ㅋㅋㅋ", "lol", { c: ["e.kk"] }),
    w("그거", "that", { c: ["g.contraction"] }),
    w("국룰이지", "is the national rule, obviously", {
      parts: [
        ["국룰", "국민 (national) + rule", "word"],
        ["이지", "of course it is", "ending"],
      ],
      c: ["e.gukrul", "g.agree-jyo"],
    }),
  ]),
];

const cards = [
  card("EXPRESSION", {
    id: "expr-daebak",
    level: "A2",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.daebak"],
    interest: 0.8,
    payload: {
      concept: "e.daebak",
      sentence: "s.daebak",
      usage: "Big surprise, usually good. 대박이다! 대박 사건!",
      avoid: "Too casual for a serious moment with your boss.",
    },
  }),
  card("EXPRESSION", {
    id: "expr-heol",
    level: "A2",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.heol"],
    interest: 0.7,
    payload: {
      concept: "e.heol",
      sentence: "s.heol",
      usage: "Shocked disbelief. Mostly used by younger people and in texting.",
      avoid: "With elders it can sound flippant.",
    },
  }),
  card("EXPRESSION", {
    id: "expr-noljam",
    level: "B1",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.noljam"],
    interest: 0.8,
    payload: {
      concept: "e.noljam",
      sentence: "s.noljam",
      usage: "노잼 (no fun) and 꿀잼 (honey fun) rate movies, classes, people. 잼 is short for 재미.",
    },
  }),
  card("PHRASE", {
    id: "kkuljam",
    level: "B1",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.noljam", "v.노래방"],
    interest: 0.7,
    payload: { sentence: "s.kkuljam", tip: "노래방 nights are a whole culture: private rooms, tambourines, scoring machines." },
  }),
  card("EXPRESSION", {
    id: "expr-ilgssip",
    level: "B1",
    topic: "Texting",
    skills: ["slang"],
    teaches: ["e.ilgssip"],
    interest: 0.9,
    payload: {
      concept: "e.ilgssip",
      sentence: "s.ilgssip",
      usage: "KakaoTalk shows a little '1' until a message is read, so everyone knows. 안읽씹 = not even reading it.",
    },
  }),
  card("EXPRESSION", {
    id: "expr-honbap",
    level: "B1",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.honbap"],
    interest: 0.8,
    payload: {
      concept: "e.honbap",
      sentence: "s.honbap",
      usage: "Eating alone used to feel awkward in a group-dining culture. Now it's a whole lifestyle with solo-friendly restaurants.",
    },
  }),
  card("EXPRESSION", {
    id: "expr-jmt",
    level: "B2",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.jonmat"],
    interest: 0.8,
    payload: {
      concept: "e.jonmat",
      sentence: "s.jmt",
      usage: "Food reviews and friends. 존 is a crude intensifier, so JMT feels lighter in text.",
      avoid: "Never with elders, at work, or with people you don't know well.",
    },
  }),
  card("EXPRESSION", {
    id: "expr-gabunssa",
    level: "B2",
    topic: "Slang",
    skills: ["slang"],
    teaches: ["e.gabunssa"],
    interest: 0.8,
    payload: {
      concept: "e.gabunssa",
      sentence: "s.gabunssa",
      usage: "Someone tells a bad joke and the room goes silent: 갑분싸. A four-syllable abbreviation, very typical of Korean slang.",
    },
  }),
  card("CULTURE", {
    id: "culture-texting",
    level: "A2",
    topic: "Texting",
    skills: ["slang", "reading"],
    teaches: ["c.texting", "e.kk"],
    interest: 0.9,
    payload: {
      title: "ㅋㅋ, ㅎㅎ, ㅠㅠ, ㅇㅇ",
      body: "Texting uses bare consonants and vowels: ㅋㅋ (laughing), ㅎㅎ (a softer smile), ㅠㅠ (crying eyes), ㅇㅇ (yep). A bare 응 or ㅇ with nothing else can read as cold, so people add ㅎㅎ to sound friendly.",
      sentence: "s.text-ok",
    },
  }),
  card("PHRASE", {
    id: "text-lol",
    level: "B1",
    topic: "Texting",
    skills: ["slang", "reading"],
    teaches: ["e.kk"],
    interest: 0.8,
    payload: { sentence: "s.text-lol", tip: "미쳤다 between friends usually means 'that's amazing' or 'that's wild', not an insult." },
  }),
  card("PHRASE", {
    id: "text-sad",
    level: "A2",
    topic: "Texting",
    skills: ["slang", "reading"],
    teaches: ["e.kk"],
    payload: { sentence: "s.text-sad", tip: "ㅠㅠ softens complaints and makes them cute." },
  }),
  card("EXPRESSION", {
    id: "expr-mukbang",
    level: "A2",
    topic: "Korean media",
    skills: ["slang", "vocabulary"],
    teaches: ["e.mukbang"],
    interest: 0.7,
    payload: {
      concept: "e.mukbang",
      sentence: "s.mukbang",
      usage: "먹방 has spread worldwide. The same pattern gives 겜방 (gaming streams) and 공방 (study-with-me).",
    },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-slang-boss",
    level: "B1",
    topic: "Slang",
    skills: ["slang", "honorifics"],
    teaches: ["e.daebak"],
    interest: 0.7,
    payload: {
      prompt: "Your manager shows you excellent quarterly results. What's a good reaction?",
      options: [
        { text: "와, 정말 대단하네요!", correct: true, why: "'Wow, that's impressive!' Enthusiastic and polite." },
        { text: "헐 대박", why: "Slang reactions like this are too casual for a manager." },
        { text: "JMT네요", why: "Crude slang, and about food." },
      ],
    },
  }),
  card("LISTENING", {
    id: "listen-noljam",
    level: "B1",
    topic: "Slang",
    skills: ["listening", "slang"],
    teaches: ["e.noljam"],
    payload: {
      sentence: "s.noljam",
      question: "What did they think of the movie?",
      options: ["It was really fun", "It was boring", "They haven't seen it"],
      answer: 1,
    },
  }),
];

export const slang: Unit = { sentences, cards };
