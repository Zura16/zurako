import { card, s, w, type Unit } from "../author";

/**
 * Foundations, modules 8–13: question words, everyday 해요 verbs, likes and
 * dislikes, negation with 안, native numbers, and Sino-Korean numbers.
 */

const B = { level: "BEGINNER" as const, sp: "POLITE" as const };

const sentences = [
  // ---- Module 8: question words
  s("f-who-is-that", "저 사람 누구예요?", "Who is that person?", B, [
    w("저", "that (over there)", { c: ["g.demonstratives"] }),
    w("사람", "person", { c: ["v.사람"] }),
    w("누구예요", "is who", {
      parts: [
        ["누구", "who", "word"],
        ["예요", "is", "ending"],
      ],
      c: ["v.누구", "g.ida"],
    }),
  ]),
  s("f-my-friend", "제 친구예요.", "That's my friend.", B, [
    w("제", "my", { note: "저 + 의 → 제." }),
    w("친구예요", "is (a) friend", { c: ["v.친구", "g.ida"] }),
  ]),
  s("f-when-come", "언제 와요?", "When are you coming?", B, [
    w("언제", "when", { c: ["v.언제"] }),
    w("와요", "come", { base: "오다", note: "오 + 아요 → 와요.", c: ["v.오다"] }),
  ]),
  s("f-when-come-hon", "언제 오세요?", "When are you coming?", { ...B, ctx: "To someone older or senior: -세요 honors them." }, [
    w("언제", "when", { c: ["v.언제"] }),
    w("오세요", "come (honorific)", { base: "오다", c: ["v.오다", "g.honorific-si"] }),
  ]),
  s("f-coming-tomorrow", "내일 와요.", "I'm coming tomorrow.", B, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("와요", "come", { c: ["v.오다"] }),
  ]),
  s("f-why", "왜요?", "Why?", B, [
    w("왜요", "why?", {
      parts: [
        ["왜", "why", "word"],
        ["요", "polite", "ending"],
      ],
      c: ["v.왜", "g.noun-iyo"],
    }),
  ]),
  s("f-just-because", "그냥요.", "Just because.", B, [w("그냥요", "just because", { c: ["v.그냥", "g.noun-iyo"] })]),
  s("f-how-get-there", "거기 어떻게 가요?", "How do I get there?", B, [
    w("거기", "there", { c: ["v.거기"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s(
    "f-how-many-hon",
    "몇 분이세요?",
    "How many in your party?",
    { ...B, ctx: "What restaurant staff ask at the door. 분 is the honorific counter for people." },
    [
      w("몇", "how many", { c: ["v.몇"] }),
      w("분이세요", "people are (you), honorific", { note: "분 is the honorific form of 명 (people).", c: ["g.honorific-si"] }),
    ],
  ),
  s("f-two-of-us", "두 명이요.", "Two of us.", B, [
    w("두", "two", { note: "둘 → 두 before a counter.", c: ["g.native-numbers"] }),
    w("명이요", "people, please", { c: ["v.명", "g.noun-iyo"] }),
  ]),
  s("f-this-way", "이쪽으로 오세요.", "This way, please.", B, [
    w("이쪽으로", "this way", {
      parts: [
        ["이쪽", "this side", "word"],
        ["으로", "toward", "particle"],
      ],
      c: ["g.means-ro", "g.demonstratives"],
    }),
    w("오세요", "come (please)", { c: ["v.오다", "g.command-seyo"] }),
  ]),

  // ---- Module 9: everyday verbs in 해요
  s("f-eating", "밥 먹어요.", "I'm eating.", B, [
    w("밥", "a meal", { c: ["v.밥"] }),
    w("먹어요", "eat", {
      base: "먹다",
      parts: [
        ["먹", "eat", "stem"],
        ["어요", "polite ending", "ending"],
      ],
      c: ["v.먹다", "g.haeyo"],
    }),
  ]),
  s("f-drinking-water", "물 마셔요.", "I'm drinking water.", B, [
    w("물", "water", { c: ["v.물"] }),
    w("마셔요", "drink", {
      base: "마시다",
      parts: [
        ["마시", "drink", "stem"],
        ["어요 → 셔요", "polite, merged with 시", "ending"],
      ],
      c: ["v.마시다", "g.haeyo"],
    }),
  ]),
  s("f-watch-drama", "드라마 봐요.", "I'm watching a drama.", B, [
    w("드라마", "drama", { c: ["v.드라마"] }),
    w("봐요", "watch", {
      base: "보다",
      parts: [
        ["보", "see, watch", "stem"],
        ["아요 → 봐요", "polite, merged", "ending"],
      ],
      c: ["v.보다", "g.haeyo"],
    }),
  ]),
  s("f-sleeping", "자요.", "I'm sleeping. / I'm going to bed.", B, [w("자요", "sleep", { base: "자다", c: ["v.자다", "g.haeyo"] })]),
  s("f-studying", "공부해요.", "I'm studying.", B, [w("공부해요", "study", { base: "공부하다", c: ["v.공부하다", "g.haeyo"] })]),
  s("f-working", "일해요.", "I'm working.", B, [w("일해요", "work", { base: "일하다", c: ["v.일하다", "g.haeyo"] })]),
  s("f-exercising", "운동해요.", "I'm exercising.", B, [w("운동해요", "exercise", { base: "운동하다", c: ["v.운동하다", "g.haeyo"] })]),
  s("f-reading", "책 읽어요.", "I'm reading a book.", B, [
    w("책", "book", { c: ["v.책"] }),
    w("읽어요", "read", { base: "읽다", note: "Pronounced [일거요].", c: ["v.읽다", "g.haeyo"] }),
  ]),
  s("f-learning-korean", "한국어 배워요.", "I'm learning Korean.", B, [
    w("한국어", "Korean", { c: ["v.한국어"] }),
    w("배워요", "learn", { base: "배우다", note: "우 + 어요 → 워요.", c: ["v.배우다", "g.haeyo"] }),
  ]),
  s("f-studying-korean", "한국어 공부해요.", "I'm studying Korean.", B, [
    w("한국어", "Korean", { c: ["v.한국어"] }),
    w("공부해요", "study", { c: ["v.공부하다", "g.haeyo"] }),
  ]),

  // ---- Module 10: likes and dislikes
  s("f-like-kpop", "저는 케이팝을 좋아해요.", "I like K-pop.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("케이팝을", "K-pop (object)", {
      parts: [
        ["케이팝", "K-pop", "word"],
        ["을", "object marker", "particle"],
      ],
      c: ["g.object"],
    }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-like-coffee-q", "커피 좋아해요?", "Do you like coffee?", { ...B, group: "f-like-coffee" }, [
    w("커피", "coffee", { c: ["v.커피", "g.drop-particle"] }),
    w("좋아해요", "like?", { c: ["v.좋아하다"] }),
  ]),
  s("f-like-coffee-formal", "커피 좋아하십니까?", "Do you like coffee?", { level: "BEGINNER", sp: "FORMAL", group: "f-like-coffee" }, [
    w("커피", "coffee", { c: ["v.커피"] }),
    w("좋아하십니까", "do (you) like (formal, honorific)", { c: ["v.좋아하다", "g.hapsyo", "g.honorific-si"] }),
  ]),
  s("f-like-kimchi", "김치 좋아해요.", "I like kimchi.", B, [
    w("김치", "kimchi", { c: ["v.김치"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-like-kimchi-full", "저는 김치를 좋아해요.", "I like kimchi.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("김치를", "kimchi (object)", { c: ["v.김치", "g.object"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-dont-like-spicy", "저는 매운 거 안 좋아해요.", "I don't like spicy food.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("매운", "spicy", { base: "맵다", c: ["v.맵다"] }),
    w("거", "thing (food)", { c: ["g.contraction"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-not-really", "별로요.", "Not really.", B, [w("별로요", "not really", { c: ["e.byeollo", "g.noun-iyo"] })]),
  s("f-what-food", "무슨 음식 좋아해요?", "What kind of food do you like?", B, [
    w("무슨", "what kind of", { c: ["v.무슨"] }),
    w("음식", "food", { c: ["v.음식"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-really-like", "진짜 좋아해요.", "I really like it.", B, [
    w("진짜", "really", { c: ["v.진짜"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-hate-cucumber", "오이 싫어해요.", "I hate cucumber.", B, [
    w("오이", "cucumber"),
    w("싫어해요", "dislike", { base: "싫어하다", c: ["v.싫어하다"] }),
  ]),

  // ---- Module 11: negation with 안
  s("f-not-going-today", "오늘 안 가요.", "I'm not going today.", B, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("f-no-meat", "저는 고기 안 먹어요.", "I don't eat meat.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("고기", "meat", { c: ["v.고기"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("먹어요", "eat", { c: ["v.먹다"] }),
  ]),
  s("f-no-meat-short", "고기 안 먹어요.", "I don't eat meat.", B, [
    w("고기", "meat", { c: ["v.고기"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("먹어요", "eat", { c: ["v.먹다"] }),
  ]),
  s("f-not-busy", "안 바빠요.", "I'm not busy.", B, [
    w("안", "not", { c: ["g.neg-an"] }),
    w("바빠요", "busy", { base: "바쁘다", c: ["v.바쁘다"] }),
  ]),
  s("f-expensive", "비싸요.", "It's expensive.", B, [w("비싸요", "is expensive", { base: "비싸다", c: ["v.비싸다"] })]),
  s("f-not-expensive", "안 비싸요.", "It's not expensive.", B, [
    w("안", "not", { c: ["g.neg-an"] }),
    w("비싸요", "expensive", { c: ["v.비싸다"] }),
  ]),
  s("f-no-alcohol", "술 안 마셔요.", "I don't drink.", B, [
    w("술", "alcohol", { c: ["v.술"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("마셔요", "drink", { c: ["v.마시다"] }),
  ]),
  s("f-no-study", "공부 안 해요.", "I don't study.", B, [
    w("공부", "study", { c: ["v.공부하다"] }),
    w("안", "not", { note: "With 하다 verbs, 안 goes between the noun and 해요.", c: ["g.neg-an"] }),
    w("해요", "do", { c: ["v.하다"] }),
  ]),
  s("f-no-coffee", "커피 안 마셔요.", "I don't drink coffee.", B, [
    w("커피", "coffee", { c: ["v.커피"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("마셔요", "drink", { c: ["v.마시다"] }),
  ]),

  // ---- Module 12: native numbers
  s("f-one-please", "하나 주세요.", "One, please.", B, [
    w("하나", "one", { c: ["g.native-numbers"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-two-please", "두 개 주세요.", "Two, please.", B, [
    w("두", "two", { c: ["g.native-numbers"] }),
    w("개", "items (counter)", { c: ["v.개"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-two-items", "두 개요.", "Two, please.", B, [
    w("두", "two", { c: ["g.native-numbers"] }),
    w("개요", "items, please", { c: ["v.개", "g.noun-iyo"] }),
  ]),
  s("f-three-of-us", "세 명이에요.", "There are three of us.", B, [
    w("세", "three", { note: "셋 → 세 before a counter.", c: ["g.native-numbers"] }),
    w("명이에요", "people", { c: ["v.명", "g.ida"] }),
  ]),
  s("f-four-of-us", "네 명이요.", "Four of us.", B, [
    w("네", "four", { note: "넷 → 네 before a counter. (Not the 네 that means yes.)", c: ["g.native-numbers"] }),
    w("명이요", "people", { c: ["v.명", "g.noun-iyo"] }),
  ]),
  s("f-im-twenty", "저는 스무 살이에요.", "I'm twenty.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("스무", "twenty", { note: "스물 → 스무 before a counter.", c: ["g.native-numbers"] }),
    w("살이에요", "years old", { c: ["v.살", "g.ida"] }),
  ]),
  s("f-what-time", "지금 몇 시예요?", "What time is it now?", B, [
    w("지금", "now", { c: ["v.지금"] }),
    w("몇", "what (number)", { c: ["v.몇"] }),
    w("시예요", "o'clock is it", { c: ["v.시", "g.ida"] }),
  ]),
  s("f-three-oclock", "세 시예요.", "It's three o'clock.", B, [
    w("세", "three", { c: ["g.native-numbers"] }),
    w("시예요", "o'clock", { c: ["v.시", "g.ida"] }),
  ]),
  s("f-how-many", "몇 개예요?", "How many?", B, [w("몇", "how many", { c: ["v.몇"] }), w("개예요", "items", { c: ["v.개", "g.ida"] })]),

  // ---- Module 13: Sino-Korean numbers
  s("f-5000-won", "오천 원이에요.", "It's 5,000 won.", B, [
    w("오천", "five thousand", { c: ["g.sino-numbers"] }),
    w("원이에요", "won, it is", { c: ["v.원", "g.ida"] }),
  ]),
  s("f-15-minutes", "십오 분 걸려요.", "It takes fifteen minutes.", B, [
    w("십오", "fifteen", { c: ["g.sino-numbers"] }),
    w("분", "minutes", { c: ["v.분"] }),
    w("걸려요", "takes", { base: "걸리다", c: ["v.걸리다"] }),
  ]),
  s("f-three-thirty", "세 시 삼십 분이에요.", "It's three thirty.", B, [
    w("세", "three", { note: "Hours use native numbers.", c: ["g.native-numbers"] }),
    w("시", "o'clock", { c: ["v.시"] }),
    w("삼십", "thirty", { note: "Minutes use Sino-Korean numbers.", c: ["g.sino-numbers"] }),
    w("분이에요", "minutes, it is", { c: ["v.분", "g.ida"] }),
  ]),
  s("f-two-oclock", "두 시예요.", "It's two o'clock.", B, [
    w("두", "two", { c: ["g.native-numbers"] }),
    w("시예요", "o'clock", { c: ["v.시", "g.ida"] }),
  ]),
  s("f-hangul-day", "오늘은 시월 구 일이에요.", "Today is October 9th.", B, [
    w("오늘은", "today (topic)", { c: ["v.오늘", "g.topic"] }),
    w("시월", "October", { note: "Not 십월: 10월 is said 시월, and 6월 is 유월.", c: ["g.sino-numbers"] }),
    w("구", "nine", { c: ["g.sino-numbers"] }),
    w("일이에요", "th (day), it is", { c: ["g.ida"] }),
  ]),
  s("f-phone-number", "제 번호는 공일공 일이삼사 오육칠팔이에요.", "My number is 010-1234-5678.", B, [
    w("제", "my"),
    w("번호는", "number (topic)", { c: ["v.번호", "g.topic"] }),
    w("공일공", "zero-one-zero", { note: "0 is read 공 in phone numbers.", c: ["g.sino-numbers"] }),
    w("일이삼사", "one-two-three-four", { c: ["g.sino-numbers"] }),
    w("오육칠팔이에요", "five-six-seven-eight", { c: ["g.sino-numbers", "g.ida"] }),
  ]),
  s("f-altogether", "다 해서 얼마예요?", "How much is it altogether?", B, [
    w("다", "all"),
    w("해서", "together", { note: "다 해서 = 'all together'." }),
    w("얼마예요", "is how much", { c: ["v.얼마"] }),
  ]),
];

const F = { level: "BEGINNER" as const, topic: "Foundations" };

const cards = [
  // Module 8
  card("VOCAB", {
    ...F,
    id: "f-vocab-who",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.누구"],
    payload: {
      concept: "v.누구",
      examples: ["s.f-who-is-that", "s.f-who-goes"],
      memoryHook: "누구 + 가 becomes 누가: 누가 가요? 'Who's going?'",
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-when",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.언제"],
    payload: {
      concept: "v.언제",
      examples: ["s.f-when-come", "s.f-when-come-hon"],
      memoryHook: "To someone senior, honor them: 언제 오세요?",
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-why",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.왜"],
    payload: {
      concept: "v.왜",
      examples: ["s.f-why", "s.f-just-because"],
      memoryHook: "왜요? can sound blunt with a falling tone. Say it gently, rising.",
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-how",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.어떻게"],
    payload: {
      concept: "v.어떻게",
      examples: ["s.f-how-get-there", "s.how-gangnam"],
      memoryHook: "Place + 어떻게 가요? asks for directions to anywhere.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-who-is-that",
    module: 8,
    skills: ["conversation"],
    teaches: ["v.누구"],
    payload: { sentence: "s.f-who-is-that", tip: "저 사람 means 'that person over there'. Point with your whole hand, not a finger." },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-restaurant-door",
    module: 8,
    skills: ["conversation", "listening"],
    teaches: ["v.몇"],
    interest: 0.6,
    payload: {
      title: "At the restaurant door",
      setting: "Staff greet you as you walk in.",
      speakers: { staff: "직원", you: "나" },
      lines: [
        { speaker: "staff", sentence: "s.f-how-many-hon" },
        { speaker: "you", sentence: "s.f-two-of-us" },
        { speaker: "staff", sentence: "s.f-this-way" },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-when",
    module: 8,
    skills: ["listening"],
    teaches: ["v.언제"],
    payload: { sentence: "s.f-when-come", question: "What did they ask?", options: ["언제 와요?", "어디 가요?", "왜 와요?"], answer: 0 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-who",
    module: 8,
    skills: ["listening"],
    teaches: ["v.누구"],
    payload: {
      sentence: "s.f-who-is-that",
      question: "What are they asking about?",
      options: ["A person", "A place", "A time"],
      answer: 0,
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-why",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.왜"],
    payload: {
      prompt: "You want to ask the reason for something. Which word do you need?",
      options: [
        { text: "왜", correct: true, why: "왜 = why." },
        { text: "언제", why: "언제 = when." },
        { text: "어디", why: "어디 = where." },
      ],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-who",
    module: 8,
    skills: ["vocabulary"],
    teaches: ["v.누구"],
    payload: { sentence: "s.f-who-is-that", blank: "누구", options: ["누구", "어디", "언제"] },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-when",
    module: 8,
    skills: ["speaking"],
    teaches: ["v.언제"],
    payload: {
      prompt: "Ask: 'When are you coming?'",
      context: "Polite.",
      accepted: ["s.f-when-come", "s.f-when-come-hon"],
      checks: [{ label: "When", anyOf: ["언제"] }],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-just-because",
    module: 8,
    skills: ["conversation"],
    teaches: ["v.그냥"],
    payload: { sentence: "s.f-just-because", tip: "The answer to 왜요? when there's no real reason." },
  }),

  // Module 9
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-haeyo",
    module: 9,
    skills: ["grammar"],
    teaches: ["g.haeyo"],
    interest: 0.5,
    payload: {
      concept: "g.haeyo",
      hook: "Everyday polite verbs: drop 다 and add 아요 or 어요. Every 하다 verb becomes 해요.",
      formation: [
        { base: "먹다", result: "먹어요" },
        { base: "보다", result: "봐요" },
        { base: "마시다", result: "마셔요" },
        { base: "하다", result: "해요" },
      ],
      examples: ["s.f-eating", "s.f-watch-drama", "s.f-studying"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-learning-korean",
    module: 9,
    skills: ["conversation"],
    teaches: ["v.배우다"],
    interest: 0.6,
    payload: { sentence: "s.f-learning-korean", tip: "Expect a delighted 와, 한국어 잘하시네요! in return." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-reading",
    module: 9,
    skills: ["vocabulary"],
    teaches: ["v.읽다"],
    payload: { sentence: "s.f-reading", tip: "읽어요 sounds like [일거요]: the ㄹ stays and ㄱ moves onto the next syllable." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-masyeoyo",
    module: 9,
    skills: ["grammar"],
    teaches: ["g.haeyo"],
    payload: { sentence: "s.f-drinking-water", blank: "마셔요", options: ["마셔요", "마시어요", "마셔다"], hint: "시 + 어요 merges." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-bwayo",
    module: 9,
    skills: ["grammar"],
    teaches: ["g.haeyo"],
    payload: { sentence: "s.f-watch-drama", blank: "봐요", options: ["봐요", "보요", "봐다"], hint: "보 + 아요 merges." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-haeyo",
    module: 9,
    skills: ["grammar"],
    teaches: ["g.haeyo"],
    payload: {
      prompt: "What's 하다 ('to do') in everyday polite form?",
      options: [
        { text: "해요", correct: true, why: "Every 하다 verb ends in 해요: 공부해요, 운동해요." },
        { text: "하요", why: "Not a form. 하다 is irregular here." },
        { text: "하어요", why: "하 + 여요 contracts to 해요." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-exercise",
    module: 9,
    skills: ["listening"],
    teaches: ["v.운동하다"],
    payload: { sentence: "s.f-exercising", question: "What did they say?", options: ["운동해요.", "공부해요.", "일해요."], answer: 0 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-reading",
    module: 9,
    skills: ["listening"],
    teaches: ["v.책"],
    payload: { sentence: "s.f-reading", question: "What are they doing?", options: ["Reading", "Sleeping", "Working"], answer: 0 },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-learning",
    module: 9,
    skills: ["speaking"],
    teaches: ["v.배우다"],
    payload: {
      prompt: "Say: 'I'm learning Korean.'",
      accepted: ["s.f-learning-korean", "s.f-studying-korean"],
      checks: [{ label: "Korean", anyOf: ["한국어"] }],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-what-doing",
    module: 9,
    skills: ["conversation"],
    teaches: ["v.먹다"],
    payload: {
      title: "What are you up to?",
      setting: "A coworker calls you at lunchtime.",
      speakers: { a: "동료", b: "나" },
      lines: [
        { speaker: "a", sentence: "s.what-doing-now-polite" },
        { speaker: "b", sentence: "s.f-eating" },
        { speaker: "a", sentence: "s.f-is-it-good" },
        { speaker: "b", sentence: "s.f-sure" },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-watch-drama",
    module: 9,
    skills: ["conversation"],
    teaches: ["v.드라마"],
    payload: { sentence: "s.f-watch-drama", tip: "Korean dramas are called 드라마, or 케이드라마 abroad." },
  }),

  // Module 10
  card("VOCAB", {
    ...F,
    id: "f-vocab-like",
    module: 10,
    skills: ["vocabulary"],
    teaches: ["v.좋아하다"],
    interest: 0.6,
    payload: {
      concept: "v.좋아하다",
      examples: ["s.f-like-kpop", "s.f-like-coffee-q", "s.f-like-kimchi"],
      memoryHook: "좋아요 = 'it's good'. 좋아해요 = 'I like it'. Both are everywhere.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-not-really",
    module: 10,
    skills: ["conversation"],
    teaches: ["e.byeollo"],
    interest: 0.7,
    payload: { sentence: "s.f-not-really", tip: "The polite way to say you don't like something much. Softer than 싫어요." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-what-food",
    module: 10,
    skills: ["conversation"],
    teaches: ["v.음식"],
    payload: { sentence: "s.f-what-food", tip: "A favorite small-talk question. Have an answer ready: 김치찌개, 비빔밥…" },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-not-really",
    module: 10,
    skills: ["conversation"],
    teaches: ["e.byeollo"],
    payload: {
      prompt: "Someone asks 커피 좋아해요? You don't really like coffee. You answer:",
      options: [
        { text: "별로요.", correct: true, why: "'Not really.' Polite and natural." },
        { text: "네, 좋아해요.", why: "That says you do like it." },
        { text: "커피예요.", why: "'It's coffee.'" },
      ],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-kpop",
    module: 10,
    skills: ["grammar"],
    teaches: ["g.object"],
    payload: { sentence: "s.f-like-kpop", blank: "을", options: ["을", "를", "이"], hint: "케이팝 ends in a consonant." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-spicy",
    module: 10,
    skills: ["listening"],
    teaches: ["v.좋아하다"],
    payload: {
      sentence: "s.f-dont-like-spicy",
      question: "How do they feel about spicy food?",
      options: ["They like it", "They don't like it", "They've never tried it"],
      answer: 1,
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-like-kimchi",
    module: 10,
    skills: ["speaking"],
    teaches: ["v.좋아하다"],
    payload: {
      prompt: "Say that you like kimchi.",
      accepted: ["s.f-like-kimchi", "s.f-like-kimchi-full"],
      checks: [
        { label: "Kimchi", anyOf: ["김치"] },
        { label: "Like", anyOf: ["좋아해"] },
      ],
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-like",
    module: 10,
    skills: ["honorifics"],
    teaches: ["v.좋아하다"],
    payload: {
      situation: "'Do you like coffee?'",
      variants: [
        { level: "CASUAL", sentence: "s.coffee-casual", when: "A friend." },
        { level: "POLITE", sentence: "s.f-like-coffee-q", when: "A classmate or coworker." },
        { level: "FORMAL", sentence: "s.f-like-coffee-formal", when: "An interview or a very senior guest." },
      ],
      takeaway: "The question is the same. Only the ending changes with the relationship.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-hate-cucumber",
    module: 10,
    skills: ["vocabulary"],
    teaches: ["v.싫어하다"],
    interest: 0.7,
    payload: { sentence: "s.f-hate-cucumber", tip: "Disliking cucumber (오이) is a famous, hotly debated food opinion in Korea." },
  }),

  // Module 11
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-an",
    module: 11,
    skills: ["grammar"],
    teaches: ["g.neg-an"],
    payload: {
      concept: "g.neg-an",
      hook: "Put 안 right before the verb to say 'don't' or 'not'.",
      formation: [
        { base: "가요", result: "안 가요" },
        { base: "먹어요", result: "안 먹어요" },
        { base: "공부해요", result: "공부 안 해요" },
      ],
      examples: ["s.f-not-going-today", "s.f-no-meat", "s.f-no-study"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-no-meat",
    module: 11,
    skills: ["conversation"],
    teaches: ["v.고기"],
    payload: { sentence: "s.f-no-meat", tip: "Handy for dietary needs. Many dishes have meat-based broth, so ask: 고기 들어가요?" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-no-alcohol",
    module: 11,
    skills: ["conversation"],
    teaches: ["v.술"],
    payload: { sentence: "s.f-no-alcohol", tip: "A polite, complete reason to decline a drink. Nobody should push after this." },
  }),
  card("MISTAKE", {
    ...F,
    id: "f-mistake-an-hada",
    module: 11,
    skills: ["grammar"],
    teaches: ["g.neg-an"],
    interest: 0.6,
    payload: {
      situation: "Telling a friend you don't study on weekends",
      learnerSays: "주말에 안 공부해요.",
      question: "What's off?",
      options: [
        {
          text: "With 하다 verbs, 안 goes between the noun and 해요: 공부 안 해요",
          correct: true,
          why: "공부하다 splits: 공부 + 안 + 해요.",
        },
        { text: "안 should be 아니에요", why: "아니에요 negates nouns, not verbs." },
        { text: "주말에 should be 주말을", why: "에 marks the time. It's right." },
      ],
      better: "s.f-no-study",
    },
  }),
  card("TRANSFORM", {
    ...F,
    id: "f-tf-not-expensive",
    module: 11,
    skills: ["grammar"],
    teaches: ["g.neg-an"],
    payload: {
      instruction: "Make it negative: 'It's not expensive.'",
      from: "s.f-expensive",
      tiles: ["안", "비싸요", "못", "아니에요"],
      accepted: ["s.f-not-expensive"],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-an",
    module: 11,
    skills: ["grammar"],
    teaches: ["g.neg-an"],
    payload: { sentence: "s.f-not-going-today", blank: "안", options: ["안", "못", "아니"], hint: "You choose not to go." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-not-busy",
    module: 11,
    skills: ["listening"],
    teaches: ["g.neg-an"],
    payload: { sentence: "s.f-not-busy", question: "What did they say?", options: ["안 바빠요.", "바빠요.", "안 비싸요."], answer: 0 },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-no-coffee",
    module: 11,
    skills: ["grammar"],
    teaches: ["g.neg-an"],
    payload: {
      prompt: "Which means 'I don't drink coffee'?",
      options: [
        { text: "커피 안 마셔요.", correct: true, why: "안 before the verb." },
        { text: "커피 마셔요.", why: "'I drink coffee.'" },
        { text: "커피 아니에요.", why: "'It isn't coffee.'" },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-no-meat",
    module: 11,
    skills: ["speaking"],
    teaches: ["g.neg-an"],
    payload: {
      prompt: "Say: 'I don't eat meat.'",
      accepted: ["s.f-no-meat", "s.f-no-meat-short"],
      checks: [
        { label: "Meat", anyOf: ["고기"] },
        { label: "안 (not)", anyOf: ["안"] },
      ],
    },
  }),

  // Module 12
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-native",
    module: 12,
    skills: ["grammar", "vocabulary"],
    teaches: ["g.native-numbers"],
    interest: 0.6,
    payload: {
      concept: "g.native-numbers",
      hook: "Native numbers (하나, 둘, 셋…) count things, people, age and hours. Some shorten before a counter.",
      formation: [
        { base: "하나 + 개", result: "한 개" },
        { base: "둘 + 명", result: "두 명" },
        { base: "셋 + 시", result: "세 시" },
        { base: "스물 + 살", result: "스무 살" },
      ],
      examples: ["s.f-two-please", "s.f-three-of-us", "s.f-im-twenty"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-what-time",
    module: 12,
    skills: ["conversation"],
    teaches: ["v.시"],
    payload: { sentence: "s.f-what-time", tip: "몇 asks 'how many' or 'what number'. Answer with a native number + 시." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-one-please",
    module: 12,
    skills: ["conversation"],
    teaches: ["g.native-numbers"],
    payload: { sentence: "s.f-one-please", tip: "Without a counter, the full number stays: 하나, 둘. With one: 한 개, 두 개." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-three",
    module: 12,
    skills: ["listening"],
    teaches: ["v.시"],
    payload: { sentence: "s.f-three-oclock", question: "What time is it?", options: ["2:00", "3:00", "4:00"], answer: 1 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-two",
    module: 12,
    skills: ["listening"],
    teaches: ["v.개"],
    payload: { sentence: "s.f-two-please", question: "How many do they want?", options: ["One", "Two", "Three"], answer: 1 },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-se",
    module: 12,
    skills: ["grammar"],
    teaches: ["g.native-numbers"],
    payload: { sentence: "s.f-three-of-us", blank: "세", options: ["세", "셋", "삼"], hint: "셋 shortens before a counter." },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-seumu",
    module: 12,
    skills: ["grammar"],
    teaches: ["g.native-numbers"],
    payload: {
      sentence: "s.f-im-twenty",
      blank: "스무",
      options: ["스무", "스물", "이십"],
      hint: "Age uses native numbers, and 스물 shortens.",
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-four",
    module: 12,
    skills: ["grammar"],
    teaches: ["v.명"],
    payload: {
      prompt: "There are four of you. Staff ask 몇 분이세요? You say:",
      options: [
        { text: "네 명이요.", correct: true, why: "넷 → 네 before a counter." },
        { text: "넷 명이요.", why: "넷 shortens to 네 before a counter." },
        { text: "사 명이요.", why: "People are counted with native numbers." },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-two",
    module: 12,
    skills: ["speaking"],
    teaches: ["v.개"],
    payload: {
      prompt: "Order two of something: 'Two, please.'",
      accepted: ["s.f-two-please", "s.f-two-items"],
      checks: [{ label: "Two", anyOf: ["두"] }],
    },
  }),
  card("CULTURE", {
    ...F,
    id: "f-culture-age",
    module: 12,
    skills: ["conversation"],
    teaches: ["v.살"],
    interest: 0.8,
    payload: {
      title: "Korean age, retired",
      body: "Korea used to count everyone as one year old at birth, adding a year every New Year's Day. Since June 2023, official documents use international age. You'll still hear older people mention their 'Korean age'.",
      sentence: "s.f-im-twenty",
    },
  }),

  // Module 13
  card("GRAMMAR", {
    ...F,
    id: "f-grammar-sino",
    module: 13,
    skills: ["grammar", "vocabulary"],
    teaches: ["g.sino-numbers"],
    interest: 0.6,
    payload: {
      concept: "g.sino-numbers",
      hook: "Sino-Korean numbers (일, 이, 삼…) are for money, minutes, dates and phone numbers.",
      formation: [
        { base: "5,000원", result: "오천 원" },
        { base: "15분", result: "십오 분" },
        { base: "10월 9일", result: "시월 구 일" },
      ],
      examples: ["s.f-5000-won", "s.f-15-minutes", "s.f-hangul-day"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-three-thirty",
    module: 13,
    skills: ["conversation"],
    teaches: ["v.분"],
    interest: 0.6,
    payload: {
      sentence: "s.f-three-thirty",
      tip: "Hours are native (세 시), minutes are Sino-Korean (삼십 분). Two number systems in one sentence.",
    },
  }),
  card("CULTURE", {
    ...F,
    id: "f-culture-hangul-day",
    module: 13,
    skills: ["conversation"],
    interest: 0.9,
    payload: {
      title: "October 9 is Hangul Day",
      body: "한글날 celebrates the alphabet King Sejong introduced in 1446. It's a national holiday. Note 시월: ten (십) loses its ㅂ in the month name, just as 육월 becomes 유월.",
      sentence: "s.f-hangul-day",
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-5000",
    module: 13,
    skills: ["listening"],
    teaches: ["v.원"],
    payload: { sentence: "s.f-5000-won", question: "How much is it?", options: ["₩500", "₩5,000", "₩50,000"], answer: 1 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-330",
    module: 13,
    skills: ["listening"],
    teaches: ["v.분"],
    payload: { sentence: "s.f-three-thirty", question: "What time is it?", options: ["3:30", "4:30", "3:13"], answer: 0 },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-samsip",
    module: 13,
    skills: ["grammar"],
    teaches: ["g.sino-numbers"],
    payload: { sentence: "s.f-three-thirty", blank: "삼십", options: ["삼십", "서른", "세"], hint: "Minutes use Sino-Korean numbers." },
  }),
  card("MISTAKE", {
    ...F,
    id: "f-mistake-two-oclock",
    module: 13,
    skills: ["grammar"],
    teaches: ["g.native-numbers"],
    payload: {
      situation: "Telling a friend what time it is",
      learnerSays: "이 시예요.",
      question: "What's off?",
      options: [
        { text: "Hours use native numbers: 두 시", correct: true, why: "이 (Sino-Korean 2) is right for minutes or money, not hours." },
        { text: "시예요 should be 시이에요", why: "시 ends in a vowel, so 예요 is right." },
        { text: "Nothing, it's natural", why: "Koreans would understand, but it sounds wrong." },
      ],
      better: "s.f-two-oclock",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-phone-number",
    module: 13,
    skills: ["vocabulary"],
    teaches: ["v.번호"],
    payload: {
      sentence: "s.f-phone-number",
      tip: "Phone numbers are read digit by digit, with 공 for zero. Korean mobiles start with 010.",
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-altogether",
    module: 13,
    skills: ["speaking"],
    teaches: ["v.얼마"],
    payload: {
      prompt: "At the counter, ask how much it is altogether.",
      accepted: ["s.f-altogether", "s.how-much-short"],
      checks: [{ label: "How much", anyOf: ["얼마"] }],
    },
  }),
];

export const foundations3: Unit = { sentences, cards };
