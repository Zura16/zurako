import { card, s, w, type Unit } from "../author";

const sentences = [
  // 뭐 해?
  s(
    "what-do-casual",
    "뭐 해?",
    "What are you doing?",
    { level: "BEGINNER", sp: "CASUAL", group: "what-do", ctx: "Texting a friend, asking a sibling." },
    [
      w("뭐", "what", { c: ["v.뭐"] }),
      w("해", "do", {
        base: "하다",
        forms: [
          ["Dictionary", "하다"],
          ["Casual", "해"],
          ["Polite", "해요"],
          ["Formal + honorific", "하십니까"],
        ],
        c: ["v.하다", "g.banmal"],
      }),
    ],
  ),
  s("what-do-polite", "뭐 해요?", "What are you doing?", { level: "BEGINNER", sp: "POLITE", group: "what-do" }, [
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해요", "do (polite)", { base: "하다", c: ["v.하다", "g.haeyo"] }),
  ]),
  s(
    "what-do-formal",
    "무엇을 하십니까?",
    "What are you doing? (formal)",
    { level: "A2", sp: "FORMAL", group: "what-do", nat: "TEXTBOOK" },
    [
      w("무엇을", "what (object)", {
        parts: [
          ["무엇", "what", "word"],
          ["을", "object marker", "particle"],
        ],
        c: ["v.무엇", "g.object"],
      }),
      w("하십니까", "do (honorific, formal)", {
        base: "하다",
        parts: [
          ["하", "do", "stem"],
          ["시", "honorific", "infix"],
          ["ㅂ니까", "formal question", "ending"],
        ],
        c: ["v.하다", "g.honorific-si", "g.hapsyo"],
      }),
    ],
  ),

  // 고마워
  s("thanks-casual", "고마워.", "Thanks.", { level: "BEGINNER", sp: "CASUAL", group: "thanks" }, [
    w("고마워", "thanks", { base: "고맙다", note: "ㅂ-irregular: 고맙 + 어 → 고마워.", c: ["v.고맙다", "g.banmal"] }),
  ]),
  s("thanks-polite", "고마워요.", "Thank you.", { level: "BEGINNER", sp: "POLITE", group: "thanks" }, [
    w("고마워요", "thank you", { base: "고맙다", c: ["v.고맙다", "g.haeyo"] }),
  ]),
  s("thanks-formal", "감사합니다.", "Thank you.", { level: "BEGINNER", sp: "FORMAL", group: "thanks" }, [
    w("감사합니다", "thank you", {
      base: "감사하다",
      parts: [
        ["감사", "gratitude (Sino-Korean)", "word"],
        ["합니다", "do (formal)", "ending"],
      ],
      c: ["g.hapsyo"],
    }),
  ]),

  // 밥 먹었어?
  s(
    "ate-casual",
    "밥 먹었어?",
    "Have you eaten?",
    { level: "A1", sp: "CASUAL", group: "ate", ctx: "Friends and family. Often just means 'hi, how are you?'" },
    [
      w("밥", "a meal (lit. rice)", { c: ["v.밥", "g.drop-particle"] }),
      w("먹었어", "ate", {
        base: "먹다",
        parts: [
          ["먹", "eat", "stem"],
          ["었", "past", "infix"],
          ["어", "casual", "ending"],
        ],
        c: ["v.먹다", "g.past", "g.banmal"],
      }),
    ],
  ),
  s(
    "ate-polite-hon",
    "식사하셨어요?",
    "Have you had your meal?",
    { level: "B1", sp: "POLITE", group: "ate", ctx: "A senior coworker, an older neighbor, a client." },
    [
      w("식사하셨어요", "did you have a meal (honorific)", {
        base: "식사하다",
        parts: [
          ["식사", "meal (polite word)", "word"],
          ["하", "do", "stem"],
          ["셨", "honorific 시 + past 었", "infix"],
          ["어요", "polite", "ending"],
        ],
        note: "Two changes from the casual version: the word (밥 → 식사) and the honorific -시-.",
        c: ["v.식사", "g.honorific-si", "g.past", "g.hon-vocab"],
      }),
    ],
  ),
  s(
    "ate-formal",
    "식사하셨습니까?",
    "Have you had your meal? (formal)",
    { level: "B1", sp: "FORMAL", group: "ate", ctx: "Formal workplace, military, addressing a VIP." },
    [
      w("식사하셨습니까", "did you have a meal (honorific, formal)", {
        base: "식사하다",
        parts: [
          ["식사하", "have a meal", "stem"],
          ["셨", "honorific + past", "infix"],
          ["습니까", "formal question", "ending"],
        ],
        c: ["v.식사", "g.honorific-si", "g.hapsyo"],
      }),
    ],
  ),
  s("lunch-hon", "점심 드셨어요?", "Did you have lunch?", { level: "B1", sp: "POLITE", ctx: "A coworker, especially a senior one." }, [
    w("점심", "lunch", { c: ["v.점심"] }),
    w("드셨어요", "ate (honorific)", {
      base: "드시다",
      parts: [
        ["드시", "eat (honorific of 먹다)", "stem"],
        ["었", "past", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["g.hon-vocab", "g.past"],
    }),
  ]),

  // 어디 가?
  s("where-go-casual", "어디 가?", "Where are you going?", { level: "BEGINNER", sp: "CASUAL", group: "where-go" }, [
    w("어디", "where", { c: ["v.어디"] }),
    w("가", "go", { base: "가다", c: ["v.가다", "g.banmal"] }),
  ]),
  s(
    "where-go-polite-hon",
    "어디 가세요?",
    "Where are you headed?",
    { level: "A2", sp: "POLITE", group: "where-go", ctx: "An older neighbor, a taxi driver asking you." },
    [
      w("어디", "where", { c: ["v.어디"] }),
      w("가세요", "go (honorific polite)", {
        base: "가다",
        parts: [
          ["가", "go", "stem"],
          ["세요", "honorific 시 + 어요", "ending"],
        ],
        c: ["v.가다", "g.honorific-si"],
      }),
    ],
  ),
  s("where-go-formal", "어디 가십니까?", "Where are you going, sir/ma'am?", { level: "A2", sp: "FORMAL", group: "where-go" }, [
    w("어디", "where", { c: ["v.어디"] }),
    w("가십니까", "go (honorific formal)", { base: "가다", c: ["v.가다", "g.honorific-si", "g.hapsyo"] }),
  ]),

  // Switching to 반말
  s(
    "lets-talk-casual",
    "우리 말 편하게 할까요?",
    "Shall we drop the formalities?",
    { level: "A2", sp: "POLITE", lit: "we speech comfortably shall-do?" },
    [
      w("우리", "we", { c: ["v.우리"] }),
      w("말", "speech", { c: ["v.말"] }),
      w("편하게", "comfortably", {
        base: "편하다",
        parts: [
          ["편하", "be comfortable", "stem"],
          ["게", "-ly (adverb)", "ending"],
        ],
        c: ["v.편하다"],
      }),
      w("할까요", "shall we do", { base: "하다", c: ["v.하다", "g.shall-eulkkayo", "e.mal-noh"] }),
    ],
  ),
  s(
    "speak-casually-to-me",
    "말 놓으세요.",
    "Feel free to speak casually with me.",
    { level: "B1", sp: "POLITE", lit: "speech put-down (please)" },
    [
      w("말", "speech", { c: ["v.말"] }),
      w("놓으세요", "please put down", {
        base: "놓다",
        note: "말을 놓다, literally 'put down your speech', means dropping honorifics.",
        c: ["e.mal-noh", "g.command-seyo"],
      }),
    ],
  ),
  s("ok-lets", "좋아! 그럼 편하게 하자.", "Sure! Let's keep it casual then.", { level: "A2", sp: "CASUAL" }, [
    w("좋아", "good / sure", { base: "좋다", c: ["v.좋다", "g.banmal"] }),
    w("그럼", "then"),
    w("편하게", "comfortably", { c: ["v.편하다"] }),
    w("하자", "let's do", { base: "하다", c: ["v.하다", "g.lets-ja"] }),
  ]),

  // Honorifics vs. speech level
  s(
    "grandma-sleeping-plain",
    "할머니가 자고 있어.",
    "Grandma is sleeping.",
    { level: "A2", sp: "CASUAL", ctx: "Grammatical, but it doesn't honor grandma." },
    [
      w("할머니가", "grandma (subject)", {
        parts: [
          ["할머니", "grandmother", "word"],
          ["가", "subject marker", "particle"],
        ],
        c: ["v.할머니", "g.subject"],
      }),
      w("자고", "sleeping", { base: "자다", c: ["v.자다", "g.progressive"] }),
      w("있어", "is", { base: "있다", c: ["v.있다", "g.banmal"] }),
    ],
  ),
  s(
    "grandma-sleeping-hon",
    "할머니가 주무시고 계셔.",
    "Grandma is sleeping.",
    { level: "B1", sp: "CASUAL", ctx: "To your younger brother: casual to him, respectful about her." },
    [
      w("할머니가", "grandma (subject)", { c: ["v.할머니", "g.subject"] }),
      w("주무시고", "sleeping (honorific)", { base: "주무시다", note: "주무시다 is the honorific word for 자다.", c: ["g.hon-vocab"] }),
      w("계셔", "is (honorific, casual)", {
        base: "계시다",
        note: "계시다 (honorific 있다) + casual 어 → 계셔.",
        c: ["g.hon-vocab", "g.banmal"],
      }),
    ],
  ),
  s(
    "grandma-sleeping-hon-kkeseo",
    "할머니께서 주무시고 계셔.",
    "Grandma is sleeping.",
    { level: "B1", sp: "CASUAL", ctx: "Extra respectful with 께서. A bit bookish in family talk." },
    [
      w("할머니께서", "grandma (honorific subject)", {
        parts: [
          ["할머니", "grandmother", "word"],
          ["께서", "honorific subject marker", "particle"],
        ],
        c: ["v.할머니", "g.hon-subject"],
      }),
      w("주무시고", "sleeping (honorific)", { base: "주무시다", c: ["g.hon-vocab"] }),
      w("계셔", "is (honorific)", { base: "계시다", c: ["g.hon-vocab"] }),
    ],
  ),

  // 저는 학생이에요
  s("im-student", "저는 학생이에요.", "I'm a student.", { level: "BEGINNER", sp: "POLITE" }, [
    w("저는", "I (topic)", {
      parts: [
        ["저", "I (humble)", "word"],
        ["는", "topic", "particle"],
      ],
      c: ["v.저", "g.topic"],
    }),
    w("학생이에요", "am a student", {
      parts: [
        ["학생", "student", "word"],
        ["이에요", "am / is (polite)", "ending"],
      ],
      c: ["v.학생", "g.haeyo"],
    }),
  ]),
  s(
    "korean-good-hon",
    "한국어 잘하시네요!",
    "Your Korean is really good!",
    { level: "A2", sp: "POLITE", ctx: "What you'll hear right after saying 안녕하세요." },
    [
      w("한국어", "Korean", { c: ["v.한국어", "g.drop-particle"] }),
      w("잘하시네요", "(you) do well!", {
        base: "잘하다",
        parts: [
          ["잘하", "be good at", "stem"],
          ["시", "honorific (you)", "infix"],
          ["네요", "I notice!", "ending"],
        ],
        c: ["v.잘", "g.honorific-si", "g.discovery-ne"],
      }),
    ],
  ),
  s(
    "not-yet-modest",
    "아니에요, 아직 멀었어요.",
    "Oh no, I still have a long way to go.",
    { level: "B1", sp: "POLITE", lit: "no, still far" },
    [
      w("아니에요", "no (it's not so)"),
      w("아직", "still, yet"),
      w("멀었어요", "(I'm) far off", { base: "멀다", note: "Literally 'it was far'. A set modest reply to compliments.", c: ["g.past"] }),
    ],
  ),
];

const cards = [
  card("SPEECH_LEVELS", {
    id: "levels-what-do",
    level: "A1",
    topic: "Speech levels",
    skills: ["honorifics"],
    teaches: ["g.banmal", "g.haeyo", "g.hapsyo"],
    interest: 0.6,
    payload: {
      situation: "'What are you doing?'",
      variants: [
        { level: "CASUAL", sentence: "s.what-do-casual", when: "Friends. Probably the most-typed message on KakaoTalk." },
        { level: "POLITE", sentence: "s.what-do-polite", when: "Anyone you aren't close to yet. The safe default." },
        {
          level: "FORMAL",
          sentence: "s.what-do-formal",
          when: "Rare in real conversation. You'll see it in textbooks and hear it from soldiers.",
        },
      ],
      takeaway: "Adding 요 is the biggest single step from casual to polite. 하십니까 adds both formality and honorific -시-.",
    },
  }),
  card("SPEECH_LEVELS", {
    id: "levels-thanks",
    level: "BEGINNER",
    topic: "Speech levels",
    skills: ["honorifics", "conversation"],
    teaches: ["v.고맙다"],
    interest: 0.6,
    payload: {
      situation: "Saying thank you",
      variants: [
        { level: "CASUAL", sentence: "s.thanks-casual", when: "Friends, younger siblings." },
        { level: "POLITE", sentence: "s.thanks-polite", when: "Friendly but polite, like a coworker your age." },
        { level: "FORMAL", sentence: "s.thanks-formal", when: "Shops, taxis, restaurants, elders. Used constantly." },
      ],
      takeaway:
        "감사합니다 breaks the rule: it's formal, yet it's the everyday thank-you for cashiers and strangers. Formal doesn't always mean rare.",
    },
  }),
  card("SPEECH_LEVELS", {
    id: "levels-ate",
    level: "B1",
    topic: "Honorifics",
    skills: ["honorifics"],
    teaches: ["g.hon-vocab", "v.식사"],
    interest: 0.6,
    payload: {
      situation: "'Have you eaten?' as a greeting",
      variants: [
        { level: "CASUAL", sentence: "s.ate-casual", when: "Friends, family members your age or younger." },
        { level: "POLITE", sentence: "s.ate-polite-hon", when: "Your manager, an older neighbor, a client." },
        { level: "FORMAL", sentence: "s.ate-formal", when: "Very formal workplaces, or greeting someone senior on an official occasion." },
      ],
      takeaway: "Politeness isn't only the ending. Words change too: 밥 becomes 식사, and the honorific -시- appears.",
    },
  }),
  card("SPEECH_LEVELS", {
    id: "levels-where-go",
    level: "A2",
    topic: "Speech levels",
    skills: ["honorifics"],
    teaches: ["g.honorific-si"],
    payload: {
      situation: "'Where are you going?'",
      variants: [
        { level: "CASUAL", sentence: "s.where-go-casual", when: "A friend you bump into." },
        { level: "POLITE", sentence: "s.where-go-polite-hon", when: "An older neighbor. The -세요 honors them." },
        { level: "FORMAL", sentence: "s.where-go-formal", when: "A guard or staff member addressing a visitor." },
      ],
      takeaway: "가요 is polite. 가세요 is polite and honors the person going. With elders, the -시- matters as much as the 요.",
    },
  }),
  card("GRAMMAR", {
    id: "grammar-honorific-si",
    level: "A2",
    topic: "Honorifics",
    skills: ["honorifics", "grammar"],
    teaches: ["g.honorific-si"],
    interest: 0.5,
    payload: {
      concept: "g.honorific-si",
      hook: "-(으)시- honors the person doing the action. It's about who you talk about, not who you talk to.",
      formation: [
        { base: "가다", result: "가세요 / 가셨어요" },
        { base: "하다", result: "하세요 / 하셨어요" },
        { base: "먹다", result: "드세요 (special verb)" },
      ],
      examples: ["s.where-go-polite-hon", "s.korean-good-hon", "s.lunch-hon"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-hapsyo",
    level: "A2",
    topic: "Speech levels",
    skills: ["honorifics", "grammar"],
    teaches: ["g.hapsyo"],
    payload: {
      concept: "g.hapsyo",
      hook: "-(스)ㅂ니다 is the voice of announcements, news, presentations and the military.",
      formation: [
        { base: "가다", result: "갑니다" },
        { base: "먹다", result: "먹습니다" },
        { base: "감사하다", result: "감사합니다" },
      ],
      examples: ["s.thanks-formal", "s.what-do-formal"],
    },
  }),
  card("EXPRESSION", {
    id: "expr-mal-noh",
    level: "A2",
    topic: "Speech levels",
    skills: ["honorifics", "conversation"],
    teaches: ["e.mal-noh"],
    interest: 0.8,
    payload: {
      concept: "e.mal-noh",
      sentence: "s.lets-talk-casual",
      usage:
        "The standard way to propose switching to 반말 with someone around your age. Usually the older person offers. Answer warmly: 좋아! 그럼 편하게 하자.",
      avoid: "Don't just start using 반말 because you found out you're the same age. Ask first.",
    },
  }),
  card("PHRASE", {
    id: "speak-casually",
    level: "B1",
    topic: "Speech levels",
    skills: ["honorifics"],
    teaches: ["e.mal-noh"],
    payload: {
      sentence: "s.speak-casually-to-me",
      tip: "The older person says this to the younger one. It gives permission to drop honorifics.",
    },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-boss-hallway",
    level: "B1",
    topic: "Honorifics",
    skills: ["honorifics"],
    teaches: ["g.hon-vocab"],
    interest: 0.7,
    payload: {
      prompt: "After lunch, you pass your team leader (팀장님) in the hallway. Which fits best?",
      options: [
        { text: "밥 먹었어?", why: "반말 to a superior is rude unless they explicitly asked you to speak casually." },
        { text: "식사하셨어요?", correct: true, why: "Polite, honorific, warm. Natural workplace small talk." },
        { text: "식사하셨습니까?", why: "Not wrong, but stiff for a hallway chat. Some very formal workplaces do use it." },
      ],
    },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-same-age",
    level: "A2",
    topic: "Speech levels",
    skills: ["honorifics", "conversation"],
    teaches: ["e.mal-noh"],
    interest: 0.7,
    payload: {
      prompt: "You've just found out a new classmate is the same age as you. When do you switch to 반말?",
      options: [
        {
          text: "Right away, since you're the same age",
          why: "Being the same age makes 반말 likely, but switching unasked can feel presumptuous.",
        },
        {
          text: "Once one of you suggests it, like 말 편하게 할까요?",
          correct: true,
          why: "Someone proposes it and the other agrees. That's the usual way.",
        },
        { text: "Never. Classmates always use 해요체", why: "Classmates often become friends who use 반말." },
      ],
    },
  }),
  card("MISTAKE", {
    id: "mistake-honor-self",
    level: "A2",
    topic: "Honorifics",
    skills: ["honorifics", "grammar"],
    teaches: ["g.honorific-si"],
    interest: 0.6,
    payload: {
      situation: "Introducing yourself at a language exchange",
      learnerSays: "저는 학생이세요.",
      question: "What's off?",
      options: [
        {
          text: "-세요 honors the subject, and the subject is you",
          correct: true,
          why: "You never use honorific -시- about yourself. Say 저는 학생이에요.",
        },
        { text: "It should be 학생님", why: "님 is for other people, and never for yourself either." },
        { text: "저는 should be 나는", why: "저 is right when speaking politely. 나 is casual." },
      ],
      better: "s.im-student",
    },
  }),
  card("MISTAKE", {
    id: "mistake-dangsin",
    level: "A2",
    topic: "Honorifics",
    skills: ["honorifics", "conversation"],
    teaches: ["c.dangsin"],
    interest: 0.8,
    payload: {
      situation: "You want to ask a new coworker whether they've had lunch",
      learnerSays: "당신은 점심을 먹었어요?",
      question: "What sounds off?",
      options: [
        {
          text: "당신: calling someone 'you' to their face sounds cold or confrontational",
          correct: true,
          why: "Koreans drop 'you' or use a name or title. Add honorific 드시다 and you get 점심 드셨어요?",
        },
        { text: "점심 should be 저녁", why: "Lunch is fine." },
        { text: "먹었어요 should be present tense", why: "Past tense is right: 'did you eat?'" },
      ],
      better: "s.lunch-hon",
    },
  }),
  card("TRANSFORM", {
    id: "tf-what-do-polite",
    level: "BEGINNER",
    topic: "Speech levels",
    skills: ["honorifics", "grammar"],
    teaches: ["g.haeyo"],
    payload: {
      instruction: "Make it polite (해요체) for a coworker.",
      from: "s.what-do-casual",
      tiles: ["뭐", "해요", "해", "하십니까", "무엇을"],
      accepted: ["s.what-do-polite"],
    },
  }),
  card("TRANSFORM", {
    id: "tf-grandma",
    level: "B1",
    topic: "Honorifics",
    skills: ["honorifics"],
    teaches: ["g.hon-vocab"],
    interest: 0.7,
    payload: {
      instruction: "Tell your little brother grandma is napping. Casual to him, respectful about her.",
      from: "s.grandma-sleeping-plain",
      tiles: ["할머니가", "할머니께서", "자고", "주무시고", "있어", "계셔"],
      accepted: ["s.grandma-sleeping-hon", "s.grandma-sleeping-hon-kkeseo"],
    },
  }),
  card("CULTURE", {
    id: "culture-haeyo-default",
    level: "A1",
    topic: "Speech levels",
    skills: ["honorifics"],
    teaches: ["c.haeyo-default"],
    payload: {
      title: "When in doubt, 해요",
      body: "With anyone you've just met, regardless of age, 해요체 is safe. It's polite without sounding stiff. Koreans switch to 반말 only after a relationship forms, and usually only after one person offers.",
      sentence: "s.what-do-polite",
    },
  }),
  card("PHRASE", {
    id: "korean-good",
    level: "A2",
    topic: "Social",
    skills: ["conversation"],
    teaches: ["g.discovery-ne"],
    interest: 0.8,
    payload: {
      sentence: "s.korean-good-hon",
      tip: "You'll hear this a lot, sometimes after two words. A modest reply: 아니에요, 아직 멀었어요.",
    },
  }),
  card("PHRASE", {
    id: "modest-reply",
    level: "B1",
    topic: "Social",
    skills: ["conversation"],
    interest: 0.6,
    payload: {
      sentence: "s.not-yet-modest",
      tip: "Accepting a compliment with 감사합니다 is fine too. Deflecting is the more traditional move.",
    },
  }),
  card("LISTENING", {
    id: "listen-where-go-hon",
    level: "A2",
    topic: "Speech levels",
    skills: ["listening", "honorifics"],
    teaches: ["g.honorific-si"],
    payload: {
      sentence: "s.where-go-polite-hon",
      question: "What did you hear?",
      options: ["어디 가?", "어디 가요?", "어디 가세요?"],
      answer: 2,
    },
  }),
];

export const speech: Unit = { sentences, cards };
