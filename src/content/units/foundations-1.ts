import { card, s, w, type Unit } from "../author";

/**
 * Foundations, modules 1–4: greetings, introducing yourself, yes/no and
 * reactions, and 이다/아니다. Short sentences, one new idea per card.
 */

const sentences = [
  // ---- Module 1: greetings and courtesy
  s(
    "f-hello",
    "안녕하세요.",
    "Hello.",
    { level: "BEGINNER", sp: "POLITE", group: "f-hello", ctx: "Any time of day, with almost anyone." },
    [w("안녕하세요", "hello", { base: "안녕하다", note: "Literally 'are you at peace?'. Add a small bow.", c: ["e.annyeong", "g.haeyo"] })],
  ),
  s(
    "f-hello-casual",
    "안녕!",
    "Hi! / Bye!",
    { level: "BEGINNER", sp: "CASUAL", group: "f-hello", ctx: "Friends and kids. Works for hello and goodbye." },
    [w("안녕", "hi / bye", { c: ["e.annyeong", "g.banmal"] })],
  ),
  s(
    "f-hello-formal",
    "안녕하십니까?",
    "Good day.",
    { level: "BEGINNER", sp: "FORMAL", group: "f-hello", ctx: "Presenters, staff at formal venues, the military." },
    [w("안녕하십니까", "hello (formal)", { base: "안녕하다", c: ["e.annyeong", "g.hapsyo"] })],
  ),
  s("f-bye-leaving", "안녕히 가세요.", "Goodbye. (to someone who is leaving)", { level: "BEGINNER", sp: "POLITE", lit: "go in peace" }, [
    w("안녕히", "in peace"),
    w("가세요", "go (please)", { base: "가다", c: ["v.가다", "e.annyeong"] }),
  ]),
  s("f-bye-staying", "안녕히 계세요.", "Goodbye. (to someone who is staying)", { level: "BEGINNER", sp: "POLITE", lit: "stay in peace" }, [
    w("안녕히", "in peace"),
    w("계세요", "stay (please)", { base: "계시다", note: "계시다 is the honorific of 있다 'to be/stay'.", c: ["e.annyeong"] }),
  ]),
  s("f-sorry-formal", "죄송합니다.", "I'm sorry.", { level: "BEGINNER", sp: "FORMAL", group: "f-sorry" }, [
    w("죄송합니다", "I'm sorry", { base: "죄송하다", c: ["e.sorry", "g.hapsyo"] }),
  ]),
  s("f-sorry-polite", "미안해요.", "Sorry.", { level: "BEGINNER", sp: "POLITE", group: "f-sorry" }, [
    w("미안해요", "sorry", { base: "미안하다", c: ["e.sorry", "g.haeyo"] }),
  ]),
  s("f-sorry-casual", "미안해.", "Sorry.", { level: "BEGINNER", sp: "CASUAL", group: "f-sorry" }, [
    w("미안해", "sorry", { base: "미안하다", c: ["e.sorry", "g.banmal"] }),
  ]),
  s("f-its-okay", "괜찮아요.", "It's okay.", { level: "BEGINNER", sp: "POLITE" }, [
    w("괜찮아요", "it's okay", { base: "괜찮다", c: ["v.괜찮다"] }),
  ]),
  s(
    "f-excuse-me",
    "저기요.",
    "Excuse me.",
    { level: "BEGINNER", sp: "POLITE", lit: "over there!", ctx: "Getting a stranger's or a server's attention." },
    [
      w("저기요", "excuse me", {
        parts: [
          ["저기", "over there", "word"],
          ["요", "polite", "ending"],
        ],
        c: ["e.yeogiyo", "v.저기"],
      }),
    ],
  ),

  // ---- Module 2: introducing yourself
  s("f-im-minji", "저는 민지예요.", "I'm Minji.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", {
      parts: [
        ["저", "I", "word"],
        ["는", "topic marker", "particle"],
      ],
      c: ["v.저", "g.topic"],
    }),
    w("민지예요", "am Minji", {
      parts: [
        ["민지", "Minji", "word"],
        ["예요", "am (after a vowel)", "ending"],
      ],
      c: ["g.ida"],
    }),
  ]),
  s("f-im-jihun", "저는 지훈이에요.", "I'm Jihun.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("지훈이에요", "am Jihun", {
      parts: [
        ["지훈", "Jihun", "word"],
        ["이에요", "am (after a consonant)", "ending"],
      ],
      c: ["g.ida"],
    }),
  ]),
  s("f-office-worker", "저는 회사원이에요.", "I'm an office worker.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("회사원이에요", "am an office worker", {
      parts: [
        ["회사원", "office worker", "word"],
        ["이에요", "am", "ending"],
      ],
      c: ["v.회사원", "g.ida"],
    }),
  ]),
  s("f-student-short", "학생이에요.", "I'm a student.", { level: "BEGINNER", sp: "POLITE" }, [
    w("학생이에요", "(I) am a student", { c: ["v.학생", "g.ida", "g.drop-subject"] }),
  ]),
  s("f-american", "저는 미국 사람이에요.", "I'm American.", { level: "BEGINNER", sp: "POLITE", lit: "I am an America person" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("미국", "America"),
    w("사람이에요", "am a person (from)", {
      note: "Country + 사람 = a person from that country: 한국 사람, 영국 사람.",
      c: ["v.사람", "g.ida"],
    }),
  ]),
  s(
    "f-which-country",
    "어느 나라 사람이에요?",
    "Where are you from?",
    { level: "BEGINNER", sp: "POLITE", lit: "which country person are (you)?" },
    [w("어느", "which"), w("나라", "country", { c: ["v.나라"] }), w("사람이에요", "person are (you)", { c: ["v.사람", "g.ida"] })],
  ),
  s("f-hi-im-minji", "안녕하세요. 저는 민지예요.", "Hi. I'm Minji.", { level: "BEGINNER", sp: "POLITE" }, [
    w("안녕하세요", "hello", { c: ["e.annyeong"] }),
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("민지예요", "am Minji", { c: ["g.ida"] }),
  ]),
  s("f-hi-im-jihun", "안녕하세요, 저는 지훈이에요.", "Hello, I'm Jihun.", { level: "BEGINNER", sp: "POLITE" }, [
    w("안녕하세요", "hello", { c: ["e.annyeong"] }),
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("지훈이에요", "am Jihun", { c: ["g.ida"] }),
  ]),
  s("f-me-too", "저도요.", "Me too.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저도요", "me too", {
      parts: [
        ["저", "I", "word"],
        ["도", "too", "particle"],
        ["요", "polite", "ending"],
      ],
      c: ["g.also", "g.noun-iyo"],
    }),
  ]),
  s("f-nice-casual", "만나서 반가워.", "Nice to meet you.", { level: "BEGINNER", sp: "CASUAL", group: "f-nice" }, [
    w("만나서", "having met", { c: ["v.만나다"] }),
    w("반가워", "(I'm) glad", { base: "반갑다", c: ["v.반갑다", "g.banmal"] }),
  ]),
  s("f-nice-formal", "만나서 반갑습니다.", "Pleased to meet you.", { level: "BEGINNER", sp: "FORMAL", group: "f-nice" }, [
    w("만나서", "having met", { c: ["v.만나다"] }),
    w("반갑습니다", "(I'm) glad (formal)", { base: "반갑다", c: ["v.반갑다", "g.hapsyo"] }),
  ]),

  // ---- Module 3: yes, no and reactions
  s("f-yes", "네.", "Yes.", { level: "BEGINNER", sp: "POLITE", group: "f-yes" }, [w("네", "yes", { c: ["e.ne-aniyo"] })]),
  s("f-yes-casual", "응.", "Yeah.", { level: "BEGINNER", sp: "CASUAL", group: "f-yes" }, [
    w("응", "yeah", { c: ["e.ne-aniyo", "g.banmal"] }),
  ]),
  s(
    "f-yes-formal",
    "예.",
    "Yes.",
    { level: "BEGINNER", sp: "FORMAL", group: "f-yes", ctx: "More formal than 네; common in service and the military." },
    [w("예", "yes", { c: ["e.ne-aniyo"] })],
  ),
  s("f-no", "아니요.", "No.", { level: "BEGINNER", sp: "POLITE", group: "f-no" }, [w("아니요", "no", { c: ["e.ne-aniyo"] })]),
  s("f-no-casual", "아니.", "No.", { level: "BEGINNER", sp: "CASUAL", group: "f-no" }, [
    w("아니", "no", { c: ["e.ne-aniyo", "g.banmal"] }),
  ]),
  s("f-no-formal", "아닙니다.", "No, it's not.", { level: "BEGINNER", sp: "FORMAL", group: "f-no" }, [
    w("아닙니다", "is not (formal)", { base: "아니다", c: ["e.ne-aniyo", "g.hapsyo"] }),
  ]),
  s("f-oh-really", "아, 그래요?", "Oh, really?", { level: "BEGINNER", sp: "POLITE" }, [
    w("아", "oh"),
    w("그래요", "is that so?", { base: "그렇다", c: ["g.haeyo"] }),
  ]),
  s("f-thats-right", "맞아요.", "That's right.", { level: "BEGINNER", sp: "POLITE" }, [
    w("맞아요", "(that's) right", { base: "맞다", c: ["v.맞다", "g.haeyo"] }),
  ]),
  s("f-not-at-all", "아니에요.", "Not at all. / No, it isn't.", { level: "BEGINNER", sp: "POLITE" }, [
    w("아니에요", "it isn't (so)", { base: "아니다", note: "Also the modest reply to 감사합니다: 'not at all'.", c: ["g.anida"] }),
  ]),
  s("f-well", "글쎄요…", "Hmm, well…", { level: "BEGINNER", sp: "POLITE" }, [
    w("글쎄요", "well…", { note: "Buys time, or softly avoids saying no.", c: ["e.geulsse"] }),
  ]),
  s("f-not-going", "네, 안 가요.", "Right, I'm not going.", { level: "BEGINNER", sp: "POLITE" }, [
    w("네", "yes / right", { c: ["e.ne-aniyo"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("f-not-going-q", "오늘 학교 안 가요?", "Aren't you going to school today?", { level: "BEGINNER", sp: "POLITE" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("학교", "school", { c: ["v.학교"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("가요", "go?", { c: ["v.가다"] }),
  ]),
  s("f-jinjjayo", "진짜요?", "Really?", { level: "BEGINNER", sp: "POLITE" }, [w("진짜요", "really?", { c: ["v.진짜", "g.noun-iyo"] })]),

  // ---- Module 4: 이다 / 아니다
  s("f-this-coffee", "이거 커피예요.", "This is coffee.", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("커피예요", "is coffee", {
      parts: [
        ["커피", "coffee", "word"],
        ["예요", "is", "ending"],
      ],
      c: ["v.커피", "g.ida"],
    }),
  ]),
  s("f-not-coffee", "이거 커피 아니에요.", "This isn't coffee.", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("커피", "coffee", { note: "가 is often dropped in speech: 커피가 아니에요 → 커피 아니에요.", c: ["v.커피", "g.drop-particle"] }),
    w("아니에요", "is not", { c: ["g.anida"] }),
  ]),
  s("f-not-coffee-ga", "이거 커피가 아니에요.", "This isn't coffee.", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("커피가", "coffee (subject)", { c: ["v.커피", "g.subject"] }),
    w("아니에요", "is not", { c: ["g.anida"] }),
  ]),
  s("f-its-tea", "차예요.", "It's tea.", { level: "BEGINNER", sp: "POLITE" }, [
    w("차예요", "it's tea", {
      parts: [
        ["차", "tea", "word"],
        ["예요", "is", "ending"],
      ],
      c: ["v.차", "g.ida"],
    }),
  ]),
  s("f-is-this-water", "이거 물이에요?", "Is this water?", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("물이에요", "is water?", {
      parts: [
        ["물", "water", "word"],
        ["이에요", "is", "ending"],
      ],
      c: ["v.물", "g.ida"],
    }),
  ]),
  s("f-not-student", "저는 학생이 아니에요.", "I'm not a student.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("학생이", "a student", { c: ["v.학생", "g.subject"] }),
    w("아니에요", "am not", { c: ["g.anida"] }),
  ]),
  s("f-teacher-q", "선생님이에요?", "Are you a teacher?", { level: "BEGINNER", sp: "POLITE" }, [
    w("선생님이에요", "(you) are a teacher?", { c: ["v.선생님", "g.ida", "g.drop-subject"] }),
  ]),
  s("f-no-office", "아니요, 회사원이에요.", "No, I'm an office worker.", { level: "BEGINNER", sp: "POLITE" }, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("회사원이에요", "am an office worker", { c: ["v.회사원", "g.ida"] }),
  ]),
  s("f-what-is-this", "이거 뭐예요?", "What is this?", { level: "BEGINNER", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("뭐예요", "is what", {
      parts: [
        ["뭐", "what", "word"],
        ["예요", "is", "ending"],
      ],
      c: ["v.뭐", "g.ida"],
    }),
  ]),
  s("f-what-is-this-ge", "이게 뭐예요?", "What's this?", { level: "BEGINNER", sp: "POLITE" }, [
    w("이게", "this (subject)", {
      parts: [
        ["이거", "this", "contraction"],
        ["이 → 게", "subject marker, merged", "particle"],
      ],
      c: ["g.demonstratives", "g.contraction"],
    }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-what-is-this-geon", "이건 뭐예요?", "And what's this one?", { level: "BEGINNER", sp: "POLITE" }, [
    w("이건", "this one (topic)", { c: ["g.demonstratives", "g.contraction"] }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-its-tteok", "떡이에요.", "It's rice cake.", { level: "BEGINNER", sp: "POLITE" }, [
    w("떡이에요", "it's rice cake", {
      parts: [
        ["떡", "rice cake", "word"],
        ["이에요", "is", "ending"],
      ],
      c: ["v.떡", "g.ida"],
    }),
  ]),
  s("f-is-it-good", "맛있어요?", "Is it good?", { level: "BEGINNER", sp: "POLITE" }, [
    w("맛있어요", "is (it) tasty?", { base: "맛있다", c: ["v.맛있다"] }),
  ]),
  s("f-yes-so-good", "네, 진짜 맛있어요.", "Yes, it's really good.", { level: "BEGINNER", sp: "POLITE" }, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("맛있어요", "is tasty", { c: ["v.맛있다"] }),
  ]),
  s("f-not-my-bag", "제 가방이 아니에요.", "That's not my bag.", { level: "BEGINNER", sp: "POLITE" }, [
    w("제", "my (humble)", { note: "저 + 의 → 제." }),
    w("가방이", "bag", { c: ["v.가방", "g.subject"] }),
    w("아니에요", "is not", { c: ["g.anida"] }),
  ]),
];

const F = { level: "BEGINNER" as const, topic: "Foundations" };

const cards = [
  // Module 1
  card("PHRASE", {
    ...F,
    id: "f-hello",
    module: 1,
    skills: ["conversation"],
    teaches: ["e.annyeong"],
    interest: 0.5,
    payload: { sentence: "s.f-hello", tip: "The one phrase you'll use most. Morning, noon or night, to almost anyone." },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-hello",
    module: 1,
    skills: ["honorifics", "conversation"],
    teaches: ["g.haeyo"],
    interest: 0.6,
    payload: {
      situation: "Saying hello",
      variants: [
        { level: "CASUAL", sentence: "s.f-hello-casual", when: "Friends, kids, people who are close to you." },
        { level: "POLITE", sentence: "s.f-hello", when: "Everyone else. When in doubt, use this." },
        { level: "FORMAL", sentence: "s.f-hello-formal", when: "Formal events, announcements, the military." },
      ],
      takeaway: "Korean changes the ending to match who you're talking to. 안녕하세요 is safe with almost anyone.",
    },
  }),
  card("CULTURE", {
    ...F,
    id: "f-two-goodbyes",
    module: 1,
    skills: ["conversation"],
    teaches: ["e.annyeong"],
    interest: 0.8,
    payload: {
      title: "Two goodbyes",
      body: "Korean has two goodbyes. To someone leaving, say 안녕히 가세요 ('go in peace'). If you're the one leaving and they stay, say 안녕히 계세요 ('stay in peace').",
      sentence: "s.f-bye-staying",
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-goodbye",
    module: 1,
    skills: ["conversation"],
    teaches: ["e.annyeong"],
    payload: {
      prompt: "You're leaving a small shop. The owner stays behind the counter. You say:",
      options: [
        { text: "안녕히 계세요.", correct: true, why: "You leave, they stay: 'stay in peace'." },
        { text: "안녕히 가세요.", why: "That's what the owner says to you, since you're the one going." },
        { text: "안녕!", why: "Too casual for a shop owner." },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-sorry",
    module: 1,
    skills: ["conversation"],
    teaches: ["e.sorry"],
    payload: {
      sentence: "s.f-sorry-formal",
      tip: "For bumping into a stranger or apologizing to someone senior. 미안해요 is softer and more personal.",
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-sorry",
    module: 1,
    skills: ["honorifics"],
    teaches: ["e.sorry"],
    payload: {
      situation: "Saying sorry",
      variants: [
        { level: "CASUAL", sentence: "s.f-sorry-casual", when: "A friend or sibling." },
        { level: "POLITE", sentence: "s.f-sorry-polite", when: "Someone you know, about something small." },
        {
          level: "FORMAL",
          sentence: "s.f-sorry-formal",
          when: "Strangers, customers, seniors. Also the everyday 'excuse me' when you bump someone.",
        },
      ],
      takeaway: "죄송합니다 isn't only for big apologies. You'll hear it constantly on crowded subways.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-excuse-me",
    module: 1,
    skills: ["conversation"],
    teaches: ["v.저기"],
    payload: { sentence: "s.f-excuse-me", tip: "To stop a stranger and ask something, or to call a server. Literally 'over there!'" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-its-okay",
    module: 1,
    skills: ["conversation"],
    teaches: ["v.괜찮다"],
    payload: { sentence: "s.f-its-okay", tip: "The natural reply when someone says sorry to you." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-goodbye",
    module: 1,
    skills: ["listening"],
    teaches: ["e.annyeong"],
    payload: {
      sentence: "s.f-bye-leaving",
      question: "What did they say?",
      options: ["안녕하세요.", "안녕히 가세요.", "안녕히 계세요."],
      answer: 1,
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-sorry",
    module: 1,
    skills: ["listening"],
    teaches: ["e.sorry"],
    payload: { sentence: "s.f-sorry-formal", question: "What did they say?", options: ["Thank you", "I'm sorry", "Hello"], answer: 1 },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-hello",
    module: 1,
    skills: ["speaking"],
    teaches: ["e.annyeong"],
    payload: {
      prompt: "Greet a shopkeeper.",
      context: "Polite.",
      accepted: ["s.f-hello"],
      checks: [{ label: "Hello", anyOf: ["안녕하세요"] }],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-sorry",
    module: 1,
    skills: ["speaking"],
    teaches: ["e.sorry"],
    payload: {
      prompt: "You bumped into a stranger. Apologize.",
      context: "Polite or formal.",
      accepted: ["s.f-sorry-formal", "s.f-sorry-polite"],
      checks: [{ label: "Apology", anyOf: ["죄송", "미안"] }],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-goodbye",
    module: 1,
    skills: ["grammar", "conversation"],
    teaches: ["e.annyeong"],
    payload: { sentence: "s.f-bye-staying", blank: "계세요", options: ["계세요", "가세요", "하세요"], hint: "You're leaving; they stay." },
  }),

  // Module 2
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-ida",
    module: 2,
    skills: ["grammar"],
    teaches: ["g.ida"],
    interest: 0.5,
    payload: {
      concept: "g.ida",
      hook: "Noun + 이에요/예요 means 'is', 'am' or 'are'.",
      formation: [
        { base: "민지", result: "민지예요" },
        { base: "지훈", result: "지훈이에요" },
        { base: "학생", result: "학생이에요" },
      ],
      examples: ["s.f-im-minji", "s.f-im-jihun", "s.f-office-worker"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-im-minji",
    module: 2,
    skills: ["conversation"],
    teaches: ["g.ida"],
    payload: { sentence: "s.f-im-minji", tip: "Names ending in a vowel take 예요; names ending in a consonant take 이에요." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-whats-your-name",
    module: 2,
    skills: ["conversation"],
    teaches: ["v.이름"],
    payload: { sentence: "s.name-polite", tip: "Simple and friendly. With customers or elders, staff say 성함이 어떻게 되세요?" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-american",
    module: 2,
    skills: ["conversation"],
    teaches: ["v.사람"],
    payload: { sentence: "s.f-american", tip: "Country + 사람: 한국 사람, 영국 사람, 캐나다 사람." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-which-country",
    module: 2,
    skills: ["conversation"],
    teaches: ["v.나라"],
    payload: { sentence: "s.f-which-country", tip: "A common first question for foreigners in Korea." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-ieyo",
    module: 2,
    skills: ["grammar"],
    teaches: ["g.ida"],
    payload: { sentence: "s.f-im-jihun", blank: "이에요", options: ["이에요", "예요", "에요"], hint: "지훈 ends in a consonant (ㄴ)." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-yeyo",
    module: 2,
    skills: ["grammar"],
    teaches: ["g.ida"],
    payload: { sentence: "s.f-im-minji", blank: "예요", options: ["예요", "이에요", "이다"], hint: "민지 ends in a vowel." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-teacher",
    module: 2,
    skills: ["grammar"],
    teaches: ["g.ida"],
    payload: {
      prompt: "How do you say 'I'm a teacher' (선생님)?",
      options: [
        { text: "저는 선생님이에요.", correct: true, why: "선생님 ends in a consonant, so it takes 이에요." },
        { text: "저는 선생님예요.", why: "예요 only follows a vowel." },
        { text: "저는 선생님 있어요.", why: "있어요 means 'have' or 'there is', not 'am'." },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-student",
    module: 2,
    skills: ["speaking"],
    teaches: ["g.ida"],
    payload: {
      prompt: "Say: 'I'm a student.'",
      context: "Polite.",
      accepted: ["s.im-student", "s.f-student-short"],
      checks: [
        { label: "Student", anyOf: ["학생"] },
        { label: "이에요", anyOf: ["이에요"] },
      ],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-intro",
    module: 2,
    skills: ["conversation", "listening"],
    teaches: ["g.also"],
    interest: 0.6,
    payload: {
      title: "First meeting",
      setting: "Two people meet at a language exchange.",
      speakers: { a: "민지", b: "지훈" },
      lines: [
        { speaker: "a", sentence: "s.f-hi-im-minji" },
        { speaker: "b", sentence: "s.f-hi-im-jihun" },
        { speaker: "a", sentence: "s.nice-to-meet" },
        { speaker: "b", sentence: "s.f-me-too" },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-country",
    module: 2,
    skills: ["listening"],
    teaches: ["v.사람"],
    payload: { sentence: "s.f-american", question: "Where is the speaker from?", options: ["Korea", "America", "Japan"], answer: 1 },
  }),
  card("MISTAKE", {
    ...F,
    id: "f-mistake-ssi",
    module: 2,
    skills: ["honorifics"],
    teaches: ["g.ida"],
    interest: 0.6,
    payload: {
      situation: "Introducing yourself to a new classmate",
      learnerSays: "저는 민지 씨예요.",
      question: "What's off?",
      options: [
        {
          text: "씨 shows respect to someone else. Never use it with your own name",
          correct: true,
          why: "Say 저는 민지예요. Others call you 민지 씨.",
        },
        { text: "예요 should be 이에요", why: "민지 ends in a vowel, so 예요 is right." },
        { text: "저는 should be 나는", why: "저 is the polite 'I'. It's right here." },
      ],
      better: "s.f-im-minji",
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-nice",
    module: 2,
    skills: ["honorifics"],
    teaches: ["v.반갑다"],
    payload: {
      situation: "Nice to meet you",
      variants: [
        { level: "CASUAL", sentence: "s.f-nice-casual", when: "Kids, or someone your age once you're using 반말." },
        { level: "POLITE", sentence: "s.nice-to-meet", when: "Most first meetings." },
        { level: "FORMAL", sentence: "s.f-nice-formal", when: "Business meetings, interviews, speeches." },
      ],
      takeaway: "Same words, three endings. The ending carries the politeness.",
    },
  }),

  // Module 3
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-yes",
    module: 3,
    skills: ["honorifics", "conversation"],
    teaches: ["e.ne-aniyo"],
    payload: {
      situation: "Saying yes",
      variants: [
        { level: "CASUAL", sentence: "s.f-yes-casual", when: "Friends and family." },
        { level: "POLITE", sentence: "s.f-yes", when: "Everyone else." },
        { level: "FORMAL", sentence: "s.f-yes-formal", when: "Service staff, the military, very formal settings." },
      ],
      takeaway: "네 also means 'I'm listening' or 'pardon?' (said with a rising tone).",
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-no",
    module: 3,
    skills: ["honorifics"],
    teaches: ["e.ne-aniyo"],
    payload: {
      situation: "Saying no",
      variants: [
        { level: "CASUAL", sentence: "s.f-no-casual", when: "Friends and family." },
        { level: "POLITE", sentence: "s.f-no", when: "Everyone else." },
        { level: "FORMAL", sentence: "s.f-no-formal", when: "Formal settings. Also a modest 'not at all'." },
      ],
      takeaway: "아니요 is often shortened to 아뇨 in speech.",
    },
  }),
  card("CULTURE", {
    ...F,
    id: "f-ne-negative",
    module: 3,
    skills: ["conversation"],
    teaches: ["e.ne-aniyo"],
    interest: 0.9,
    payload: {
      title: "When 네 means 'no'",
      body: "Answering a negative question, 네 means 'right'. Asked 오늘 학교 안 가요? ('Aren't you going to school today?'), 네 means 'Right, I'm not going.' English speakers often get this backwards.",
      sentence: "s.f-not-going",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-oh-really",
    module: 3,
    skills: ["conversation"],
    payload: { sentence: "s.f-oh-really", tip: "Keeps a conversation going. With friends: 아, 그래?" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-thats-right",
    module: 3,
    skills: ["conversation"],
    teaches: ["v.맞다"],
    payload: { sentence: "s.f-thats-right", tip: "Agreeing politely. Repeat it for emphasis: 맞아요, 맞아요." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-not-at-all",
    module: 3,
    skills: ["conversation"],
    teaches: ["g.anida"],
    payload: { sentence: "s.f-not-at-all", tip: "Someone thanks you? 아니에요 means 'not at all'." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-well",
    module: 3,
    skills: ["conversation"],
    teaches: ["e.geulsse"],
    payload: { sentence: "s.f-well", tip: "A gentle way to hesitate, or to avoid saying no directly." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-thanks-reply",
    module: 3,
    skills: ["conversation"],
    teaches: ["g.anida"],
    payload: {
      prompt: "You held the door and someone says 감사합니다. A natural reply:",
      options: [
        { text: "아니에요.", correct: true, why: "'Not at all.' Modest and natural." },
        { text: "맞아요.", why: "'That's right' sounds like you agree you deserve thanks." },
        { text: "글쎄요…", why: "'Hmm, well…' sounds unsure." },
      ],
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-negative-q",
    module: 3,
    skills: ["conversation"],
    teaches: ["e.ne-aniyo"],
    interest: 0.7,
    payload: {
      prompt: "Someone asks 오늘 학교 안 가요? ('Aren't you going to school today?'). You're NOT going. You answer:",
      options: [
        { text: "네, 안 가요.", correct: true, why: "네 agrees with the question: 'Right, I'm not going.'" },
        { text: "아니요, 안 가요.", why: "아니요 would disagree with 'you're not going', which contradicts 안 가요." },
        { text: "네, 가요.", why: "That says you are going." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-really",
    module: 3,
    skills: ["listening"],
    payload: { sentence: "s.f-oh-really", question: "What did they say?", options: ["아, 그래요?", "아, 네.", "아니요."], answer: 0 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-yes-level",
    module: 3,
    skills: ["listening", "honorifics"],
    teaches: ["e.ne-aniyo"],
    payload: {
      sentence: "s.f-yes-casual",
      question: "Which speech level was that?",
      options: ["Casual (반말)", "Polite (해요체)", "Formal (하십시오체)"],
      answer: 0,
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-right",
    module: 3,
    skills: ["speaking"],
    teaches: ["v.맞다"],
    payload: { prompt: "Agree politely: 'That's right.'", accepted: ["s.f-thats-right"], checks: [{ label: "Right", anyOf: ["맞아"] }] },
  }),
  card("TRANSFORM", {
    ...F,
    id: "f-tf-no-thanks",
    module: 3,
    skills: ["conversation"],
    teaches: ["e.ne-aniyo"],
    payload: {
      instruction: "Politely decline: 'No, it's okay.'",
      from: "s.f-no-casual",
      tiles: ["아니요", "괜찮아요", "아니", "괜찮아", "네"],
      accepted: ["s.no-thanks"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-jinjjayo",
    module: 3,
    skills: ["conversation"],
    teaches: ["v.진짜"],
    payload: { sentence: "s.f-jinjjayo", tip: "Polite surprise. With friends, just 진짜?" },
  }),

  // Module 4
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-anida",
    module: 4,
    skills: ["grammar"],
    teaches: ["g.anida"],
    interest: 0.5,
    payload: {
      concept: "g.anida",
      hook: "To say something is NOT a noun, use 아니에요.",
      formation: [
        { base: "학생이에요", result: "학생이 아니에요" },
        { base: "커피예요", result: "커피가 아니에요" },
      ],
      examples: ["s.f-not-student", "s.f-not-coffee"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-what-is-this",
    module: 4,
    skills: ["conversation"],
    teaches: ["v.뭐"],
    interest: 0.6,
    payload: { sentence: "s.f-what-is-this", tip: "Point and ask. Probably the most useful question at a market." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-is-this-water",
    module: 4,
    skills: ["conversation"],
    teaches: ["v.물"],
    payload: { sentence: "s.f-is-this-water", tip: "Make a statement a question by raising your voice at the end." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-teacher-q",
    module: 4,
    skills: ["conversation"],
    teaches: ["v.선생님"],
    payload: { sentence: "s.f-teacher-q", tip: "No 'you' needed. Koreans usually leave it out." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-anieyo",
    module: 4,
    skills: ["grammar"],
    teaches: ["g.anida"],
    payload: { sentence: "s.f-not-student", blank: "아니에요", options: ["아니에요", "이에요", "없어요"], hint: "'Not' with a noun." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-not-bag",
    module: 4,
    skills: ["grammar"],
    teaches: ["g.anida", "v.가방"],
    payload: {
      prompt: "Someone hands you a bag that isn't yours. You say:",
      options: [
        { text: "제 가방이 아니에요.", correct: true, why: "'It's not my bag.'" },
        { text: "제 가방이에요.", why: "'It's my bag.'" },
        { text: "제 가방 없어요.", why: "'I don't have my bag.' A different meaning." },
      ],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-whats-this",
    module: 4,
    skills: ["conversation", "listening"],
    teaches: ["v.떡"],
    interest: 0.6,
    payload: {
      title: "At the market",
      setting: "Pointing at something on a stall.",
      speakers: { you: "나", seller: "사장님" },
      lines: [
        { speaker: "you", sentence: "s.f-what-is-this" },
        { speaker: "seller", sentence: "s.f-its-tteok" },
        { speaker: "you", sentence: "s.f-is-it-good" },
        { speaker: "seller", sentence: "s.f-yes-so-good" },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-water",
    module: 4,
    skills: ["listening"],
    teaches: ["v.물"],
    payload: {
      sentence: "s.f-is-this-water",
      question: "What did they ask?",
      options: ["이거 물이에요?", "이거 뭐예요?", "이거 커피예요?"],
      answer: 0,
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-whats-this",
    module: 4,
    skills: ["speaking"],
    teaches: ["v.뭐"],
    payload: {
      prompt: "Point at something and ask what it is.",
      accepted: ["s.f-what-is-this", "s.f-what-is-this-ge", "s.f-what-is-this-geon"],
      checks: [{ label: "What", anyOf: ["뭐"] }],
    },
  }),
  card("TRANSFORM", {
    ...F,
    id: "f-tf-not-coffee",
    module: 4,
    skills: ["grammar"],
    teaches: ["g.anida"],
    payload: {
      instruction: "Make it negative: 'This isn't coffee.'",
      from: "s.f-this-coffee",
      tiles: ["이거", "커피", "커피가", "아니에요", "예요", "안"],
      accepted: ["s.f-not-coffee", "s.f-not-coffee-ga"],
    },
  }),
  card("MISTAKE", {
    ...F,
    id: "f-mistake-an-ida",
    module: 4,
    skills: ["grammar"],
    teaches: ["g.anida"],
    payload: {
      situation: "Telling someone you're not a student",
      learnerSays: "저는 학생 안이에요.",
      question: "What's the problem?",
      options: [
        {
          text: "Nouns are negated with 아니에요, not 안",
          correct: true,
          why: "안 goes before verbs (안 가요). For 'is not', use 아니에요.",
        },
        { text: "학생 should be 선생님", why: "The noun is fine." },
        { text: "It needs past tense", why: "Present tense is right." },
      ],
      better: "s.f-not-student",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-its-tea",
    module: 4,
    skills: ["vocabulary"],
    teaches: ["v.차"],
    payload: { sentence: "s.f-its-tea", tip: "차 means both 'tea' and 'car'. Context tells you which." },
  }),
];

export const foundations1: Unit = { sentences, cards };
