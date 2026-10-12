import { card, s, w, type Unit } from "../author";

/**
 * Foundations, modules 14–20: days and time, family, ordering food,
 * directions, classroom survival, first sound rules, and a first look at
 * speech levels.
 */

const B = { level: "BEGINNER" as const, sp: "POLITE" as const };

const sentences = [
  // ---- Module 14: days and time
  s("f-what-day", "오늘 무슨 요일이에요?", "What day is it today?", B, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("무슨", "what", { c: ["v.무슨"] }),
    w("요일이에요", "day of the week is it", { c: ["v.요일", "g.ida"] }),
  ]),
  s("f-friday", "금요일이에요.", "It's Friday.", B, [
    w("금요일이에요", "it's Friday", {
      parts: [
        ["금요일", "Friday (metal day)", "word"],
        ["이에요", "is", "ending"],
      ],
      c: ["v.요일", "g.ida"],
    }),
  ]),
  s("f-see-monday", "월요일에 봐요.", "See you Monday.", B, [
    w("월요일에", "on Monday", {
      parts: [
        ["월요일", "Monday (moon day)", "word"],
        ["에", "on (time)", "particle"],
      ],
      c: ["v.요일", "g.place-e"],
    }),
    w("봐요", "see (you)", { c: ["v.보다"] }),
  ]),
  s("f-meet-monday", "월요일에 만나요.", "Let's meet on Monday.", B, [
    w("월요일에", "on Monday", { c: ["v.요일", "g.place-e"] }),
    w("만나요", "let's meet", { note: "The 해요 form also works as a gentle 'let's'.", c: ["v.만나다"] }),
  ]),
  s("f-every-day", "매일 운동해요.", "I exercise every day.", B, [
    w("매일", "every day", { c: ["v.매일"] }),
    w("운동해요", "exercise", { c: ["v.운동하다"] }),
  ]),
  s("f-busy-tomorrow-q", "내일 바빠요?", "Are you busy tomorrow?", B, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("바빠요", "busy?", { c: ["v.바쁘다"] }),
  ]),
  s("f-no-not-busy", "아니요, 안 바빠요.", "No, I'm not busy.", B, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("바빠요", "busy", { c: ["v.바쁘다"] }),
  ]),
  s("f-meet-evening", "그럼 저녁에 만나요!", "Then let's meet this evening!", B, [
    w("그럼", "then"),
    w("저녁에", "in the evening", { c: ["v.저녁", "g.place-e"] }),
    w("만나요", "let's meet", { c: ["v.만나다"] }),
  ]),
  s("f-morning-coffee", "아침에 커피 마셔요.", "I drink coffee in the morning.", B, [
    w("아침에", "in the morning", { c: ["v.아침", "g.place-e"] }),
    w("커피", "coffee", { c: ["v.커피"] }),
    w("마셔요", "drink", { c: ["v.마시다"] }),
  ]),
  s("f-see-later", "나중에 봐요.", "See you later.", B, [
    w("나중에", "later", { c: ["v.나중"] }),
    w("봐요", "see (you)", { c: ["v.보다"] }),
  ]),

  // ---- Module 15: family
  s("f-family-four", "우리 가족은 네 명이에요.", "There are four of us in my family.", B, [
    w("우리", "our → my", { c: ["v.우리", "c.uri"] }),
    w("가족은", "family (topic)", { c: ["v.가족", "g.topic"] }),
    w("네", "four", { c: ["g.native-numbers"] }),
    w("명이에요", "people", { c: ["v.명", "g.ida"] }),
  ]),
  s("f-younger-brother", "남동생이 있어요.", "I have a younger brother.", B, [
    w("남동생이", "a younger brother", {
      parts: [
        ["남", "male", "word"],
        ["동생", "younger sibling", "word"],
        ["이", "subject", "particle"],
      ],
      c: ["v.동생", "g.subject"],
    }),
    w("있어요", "have", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-yes-younger-brother", "네, 남동생이 있어요.", "Yes, I have a younger brother.", B, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("남동생이", "a younger brother", { c: ["v.동생", "g.subject"] }),
    w("있어요", "have", { c: ["v.있다"] }),
  ]),
  s("f-younger-sister", "여동생이 있어요.", "I have a younger sister.", B, [
    w("여동생이", "a younger sister", {
      parts: [
        ["여", "female", "word"],
        ["동생", "younger sibling", "word"],
        ["이", "subject", "particle"],
      ],
      c: ["v.동생", "g.subject"],
    }),
    w("있어요", "have", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("f-younger-sister-full", "저는 여동생이 있어요.", "I have a younger sister.", B, [
    w("저는", "as for me", { c: ["v.저", "g.topic"] }),
    w("여동생이", "a younger sister", { c: ["v.동생", "g.subject"] }),
    w("있어요", "have", { c: ["v.있다"] }),
  ]),
  s("f-dad-office", "아빠는 회사원이에요.", "My dad is an office worker.", B, [
    w("아빠는", "dad (topic)", { c: ["v.아빠", "g.topic"] }),
    w("회사원이에요", "is an office worker", { c: ["v.회사원", "g.ida"] }),
  ]),
  s("f-mom-teacher", "엄마는 선생님이에요.", "My mom is a teacher.", B, [
    w("엄마는", "mom (topic)", { c: ["v.엄마", "g.topic"] }),
    w("선생님이에요", "is a teacher", { c: ["v.선생님", "g.ida"] }),
  ]),
  s("f-only-child", "저는 외동이에요.", "I'm an only child.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("외동이에요", "am an only child", { c: ["g.ida"] }),
  ]),
  s("f-grandma-busan", "할머니는 부산에 계세요.", "My grandmother lives in Busan.", { ...B, lit: "grandma is (honorably) in Busan" }, [
    w("할머니는", "grandma (topic)", { c: ["v.할머니", "g.topic"] }),
    w("부산에", "in Busan", { c: ["g.place-e"] }),
    w("계세요", "is (honorific)", {
      base: "계시다",
      note: "계시다 is the honorific of 있다: you use it about elders.",
      c: ["g.hon-vocab"],
    }),
  ]),
  s("f-parents-america", "부모님은 미국에 계세요.", "My parents are in America.", B, [
    w("부모님은", "parents (topic)", { c: ["v.부모님", "g.topic"] }),
    w("미국에", "in America", { c: ["g.place-e"] }),
    w("계세요", "are (honorific)", { c: ["g.hon-vocab"] }),
  ]),
  s("f-sibling-student-q", "동생은 학생이에요?", "Is your sibling a student?", B, [
    w("동생은", "younger sibling (topic)", { c: ["v.동생", "g.topic"] }),
    w("학생이에요", "is a student?", { c: ["v.학생", "g.ida"] }),
  ]),
  s("f-yes-university", "네, 대학생이에요.", "Yes, a university student.", B, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("대학생이에요", "is a university student", {
      parts: [
        ["대학생", "university student", "word"],
        ["이에요", "is", "ending"],
      ],
      c: ["g.ida"],
    }),
  ]),

  // ---- Module 16: food and ordering
  s("f-menu-please", "메뉴 주세요.", "Can I have the menu, please?", B, [
    w("메뉴", "menu", { c: ["v.메뉴"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-bibimbap-one", "비빔밥 하나 주세요.", "One bibimbap, please.", B, [
    w("비빔밥", "bibimbap", { c: ["v.비빔밥"] }),
    w("하나", "one", { c: ["g.native-numbers"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-bibimbap-bowl", "비빔밥 한 그릇 주세요.", "One bowl of bibimbap, please.", B, [
    w("비빔밥", "bibimbap", { c: ["v.비빔밥"] }),
    w("한", "one", { c: ["g.native-numbers"] }),
    w("그릇", "bowl (counter)"),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-not-spicy-please", "안 맵게 해 주세요.", "Please make it not spicy.", B, [
    w("안", "not", { c: ["g.neg-an"] }),
    w("맵게", "spicy (-ly)", { base: "맵다", c: ["v.맵다"] }),
    w("해 주세요", "please make it", { c: ["g.request-juseyo"] }),
  ]),
  s("f-water-self", "물은 셀프예요.", "Water is self-service.", B, [
    w("물은", "water (topic)", { c: ["v.물", "g.topic"] }),
    w("셀프예요", "is self(-service)", { c: ["g.ida"] }),
  ]),
  s("f-to-go-short", "포장이요.", "To go, please.", B, [w("포장이요", "takeout, please", { c: ["g.noun-iyo"] })]),
  s("f-eat-here", "먹고 갈게요.", "I'll eat here.", { ...B, lit: "I'll eat and go" }, [
    w("먹고", "eat and", { c: ["v.먹다", "g.and-go"] }),
    w("갈게요", "I'll go", { c: ["v.가다", "g.promise-ge"] }),
  ]),
  s("f-by-card", "카드로 할게요.", "I'll pay by card.", B, [
    w("카드로", "by card", { c: ["g.means-ro"] }),
    w("할게요", "I'll do", { c: ["v.하다", "g.promise-ge"] }),
  ]),
  s("f-ramyeon-q", "라면 있어요?", "Do you have ramyeon?", B, [
    w("라면", "ramyeon", { c: ["v.라면"] }),
    w("있어요", "is there", { c: ["v.있다", "g.itda-eopda"] }),
  ]),

  // ---- Module 17: places and directions
  s("f-where-station", "지하철역 어디예요?", "Where's the subway station?", B, [
    w("지하철역", "subway station", { c: ["v.지하철", "v.역"] }),
    w("어디예요", "is where", { c: ["v.어디", "g.ida"] }),
  ]),
  s("f-go-straight", "쭉 가세요.", "Go straight.", B, [
    w("쭉", "straight", { c: ["v.쭉"] }),
    w("가세요", "please go", { c: ["v.가다", "g.command-seyo"] }),
  ]),
  s("f-go-right", "오른쪽으로 가세요.", "Go right.", B, [
    w("오른쪽으로", "to the right", { c: ["v.오른쪽", "g.means-ro"] }),
    w("가세요", "please go", { c: ["v.가다", "g.command-seyo"] }),
  ]),
  s("f-go-left", "왼쪽으로 가세요.", "Go left.", B, [
    w("왼쪽으로", "to the left", { c: ["v.왼쪽", "g.means-ro"] }),
    w("가세요", "please go", { c: ["v.가다", "g.command-seyo"] }),
  ]),
  s("f-next-to-cafe", "카페 옆에 있어요.", "It's next to the café.", B, [
    w("카페", "café", { c: ["v.카페"] }),
    w("옆에", "next to", { c: ["v.옆", "g.place-e"] }),
    w("있어요", "is", { c: ["v.있다"] }),
  ]),
  s("f-front-of-school", "학교 앞에 있어요.", "It's in front of the school.", B, [
    w("학교", "school", { c: ["v.학교"] }),
    w("앞에", "in front of", { c: ["v.앞", "g.place-e"] }),
    w("있어요", "is", { c: ["v.있다"] }),
  ]),
  s("f-behind-bank", "은행 뒤에 있어요.", "It's behind the bank.", B, [
    w("은행", "bank"),
    w("뒤에", "behind", { c: ["v.뒤", "g.place-e"] }),
    w("있어요", "is", { c: ["v.있다"] }),
  ]),
  s("f-is-it-far", "멀어요?", "Is it far?", B, [w("멀어요", "is (it) far?", { base: "멀다", c: ["v.멀다"] })]),
  s("f-far-from-here", "여기서 멀어요?", "Is it far from here?", B, [
    w("여기서", "from here", { c: ["v.여기", "g.place-eseo"] }),
    w("멀어요", "far?", { c: ["v.멀다"] }),
  ]),
  s("f-its-close", "아니요, 가까워요.", "No, it's close.", B, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("가까워요", "is close", { base: "가깝다", note: "ㅂ-irregular: 가깝 + 어요 → 가까워요.", c: ["v.가깝다"] }),
  ]),
  s("f-five-min-walk", "걸어서 오 분이에요.", "It's a five-minute walk.", B, [
    w("걸어서", "on foot", { base: "걷다" }),
    w("오", "five", { c: ["g.sino-numbers"] }),
    w("분이에요", "minutes", { c: ["v.분", "g.ida"] }),
  ]),

  // ---- Module 18: classroom and survival
  s("f-sorry-what", "네? 뭐라고요?", "Sorry, what was that?", B, [
    w("네", "yes? / pardon?", { c: ["e.ne-aniyo"] }),
    w("뭐라고요", "what did you say?", { c: ["e.mworago"] }),
  ]),
  s("f-one-more-time", "한 번 더 말해 주세요.", "Please say it one more time.", B, [
    w("한", "one", { c: ["g.native-numbers"] }),
    w("번", "time"),
    w("더", "more"),
    w("말해 주세요", "please say", { c: ["v.말하다", "g.request-juseyo"] }),
  ]),
  s("f-in-korean", "이거 한국어로 뭐예요?", "What's this in Korean?", B, [
    w("이거", "this", { c: ["g.demonstratives"] }),
    w("한국어로", "in Korean", { c: ["v.한국어", "g.means-ro"] }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-in-korean-short", "한국어로 뭐예요?", "How do you say it in Korean?", B, [
    w("한국어로", "in Korean", { c: ["v.한국어", "g.means-ro"] }),
    w("뭐예요", "is what", { c: ["v.뭐", "g.ida"] }),
  ]),
  s("f-little-korean", "한국어 조금 해요.", "I speak a little Korean.", B, [
    w("한국어", "Korean", { c: ["v.한국어"] }),
    w("조금", "a little", { c: ["v.조금"] }),
    w("해요", "do (speak)", { c: ["v.하다"] }),
  ]),
  s("f-english-q", "영어 할 수 있어요?", "Can you speak English?", B, [
    w("영어", "English", { c: ["v.영어"] }),
    w("할 수 있어요", "can (you) do", { c: ["v.하다", "g.can-eulsu"] }),
  ]),
  s("f-write-here", "여기 써 주세요.", "Could you write it here, please?", B, [
    w("여기", "here", { c: ["v.여기"] }),
    w("써 주세요", "please write", { base: "쓰다", c: ["v.쓰다", "g.request-juseyo"] }),
  ]),
  s("f-got-it", "알겠어요.", "Got it.", { ...B, group: "f-got-it" }, [
    w("알겠어요", "understood", { base: "알다", c: ["v.알다", "g.haeyo"] }),
  ]),
  s("f-dont-know-blunt", "몰라요.", "I don't know.", B, [w("몰라요", "don't know", { base: "모르다", c: ["v.모르다"] })]),
  s("f-help", "도와주세요!", "Help!", B, [w("도와주세요", "please help", { base: "돕다", c: ["g.request-juseyo"] })]),

  // ---- Module 19: first sound rules
  s("f-like-music", "음악 좋아해요.", "I like music.", B, [
    w("음악", "music", { note: "Pronounced [으막].", c: ["v.음악", "g.sound-linking"] }),
    w("좋아해요", "like", { c: ["v.좋아하다"] }),
  ]),
  s("f-going-school-sound", "학교 가요.", "I'm going to school.", B, [
    w("학교", "school", { note: "Pronounced [학꾜].", c: ["v.학교", "g.sound-tense"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("f-where-restaurant", "식당 어디예요?", "Where's the restaurant?", B, [
    w("식당", "restaurant", { note: "Pronounced [식땅].", c: ["v.식당", "g.sound-tense"] }),
    w("어디예요", "is where", { c: ["v.어디"] }),
  ]),
  s("f-please-contact", "연락 주세요.", "Please get in touch.", B, [
    w("연락", "contact", { note: "Pronounced [열락].", c: ["v.연락하다", "g.sound-liquid"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("f-buy-clothes", "옷 사요.", "I'm buying clothes.", B, [
    w("옷", "clothes", { note: "Pronounced [옫]: final ㅅ sounds like ㄷ.", c: ["v.옷", "g.sound-final"] }),
    w("사요", "buy", { c: ["v.사다"] }),
  ]),

  // ---- Module 20: a first look at speech levels
  s("f-got-it-casual", "알겠어.", "Got it.", { level: "BEGINNER", sp: "CASUAL", group: "f-got-it" }, [
    w("알겠어", "understood", { c: ["v.알다", "g.banmal"] }),
  ]),
  s(
    "f-got-it-formal",
    "알겠습니다.",
    "Understood.",
    { level: "BEGINNER", sp: "FORMAL", group: "f-got-it", ctx: "The standard reply to a boss or a customer." },
    [w("알겠습니다", "understood (formal)", { c: ["v.알다", "g.hapsyo"] })],
  ),
  s("f-tasty-casual", "맛있어.", "It's good.", { level: "BEGINNER", sp: "CASUAL", group: "f-tasty" }, [
    w("맛있어", "tasty", { c: ["v.맛있다", "g.banmal"] }),
  ]),
  s("f-tasty-formal", "맛있습니다.", "It's delicious.", { level: "BEGINNER", sp: "FORMAL", group: "f-tasty" }, [
    w("맛있습니다", "tasty (formal)", { c: ["v.맛있다", "g.hapsyo"] }),
  ]),
  s("f-yeah-tasty", "응, 맛있어.", "Yeah, it's good.", { level: "BEGINNER", sp: "CASUAL" }, [
    w("응", "yeah", { c: ["e.ne-aniyo"] }),
    w("맛있어", "tasty", { c: ["v.맛있다", "g.banmal"] }),
  ]),
  s("f-good-night-hon", "안녕히 주무세요.", "Good night. (to an elder)", { ...B, lit: "sleep in peace (honorific)" }, [
    w("안녕히", "in peace"),
    w("주무세요", "sleep (honorific)", { base: "주무시다", note: "주무시다 is the honorific word for 자다.", c: ["g.hon-vocab"] }),
  ]),
  s("f-good-night-casual", "잘 자!", "Good night!", { level: "BEGINNER", sp: "CASUAL" }, [
    w("잘", "well", { c: ["v.잘"] }),
    w("자", "sleep", { base: "자다", c: ["v.자다", "g.banmal"] }),
  ]),
];

const F = { level: "BEGINNER" as const, topic: "Foundations" };

const cards = [
  // Module 14
  card("VOCAB", {
    ...F,
    id: "f-vocab-days",
    module: 14,
    skills: ["vocabulary"],
    teaches: ["v.요일"],
    interest: 0.7,
    payload: {
      concept: "v.요일",
      examples: ["s.f-friday", "s.f-see-monday", "s.f-what-day"],
      memoryHook: "월화수목금토일: moon, fire, water, wood, metal, earth, sun. Monday to Sunday.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-what-day",
    module: 14,
    skills: ["conversation"],
    teaches: ["v.요일"],
    payload: { sentence: "s.f-what-day", tip: "무슨 요일 asks the day of the week. For the date: 며칠이에요?" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-see-monday",
    module: 14,
    skills: ["conversation"],
    teaches: ["g.place-e"],
    payload: { sentence: "s.f-see-monday", tip: "Time words take 에: 월요일에, 아침에, 세 시에. But not 오늘, 내일, 어제." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-every-day",
    module: 14,
    skills: ["vocabulary"],
    teaches: ["v.매일"],
    payload: { sentence: "s.f-every-day", tip: "매 means 'every': 매일 (every day), 매주 (every week), 매년 (every year)." },
  }),
  card("CULTURE", {
    ...F,
    id: "f-culture-days",
    module: 14,
    skills: ["vocabulary"],
    teaches: ["v.요일"],
    interest: 0.8,
    payload: {
      title: "The week is the sky",
      body: "Korean weekdays come from the sun, moon and five planets: 월 moon, 화 Mars (fire), 수 Mercury (water), 목 Jupiter (wood), 금 Venus (metal), 토 Saturn (earth), 일 sun. Friday is 금요일, 'metal day'.",
      sentence: "s.f-friday",
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-friday",
    module: 14,
    skills: ["listening"],
    teaches: ["v.요일"],
    payload: { sentence: "s.f-friday", question: "What day is it?", options: ["Monday", "Wednesday", "Friday"], answer: 2 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-evening",
    module: 14,
    skills: ["listening"],
    teaches: ["v.저녁"],
    payload: {
      sentence: "s.f-meet-evening",
      question: "When will they meet?",
      options: ["In the morning", "At lunch", "In the evening"],
      answer: 2,
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-time-e",
    module: 14,
    skills: ["grammar"],
    teaches: ["g.place-e"],
    payload: { sentence: "s.f-morning-coffee", blank: "에", options: ["에", "을", "이"], hint: "Time words take this particle." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-after-thursday",
    module: 14,
    skills: ["vocabulary"],
    teaches: ["v.요일"],
    payload: {
      prompt: "Which day comes after 목요일 (Thursday)?",
      options: [
        { text: "금요일", correct: true, why: "Friday, 'metal day'." },
        { text: "화요일", why: "That's Tuesday." },
        { text: "일요일", why: "That's Sunday." },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-monday",
    module: 14,
    skills: ["speaking"],
    teaches: ["v.요일"],
    payload: {
      prompt: "Say: 'See you Monday.'",
      accepted: ["s.f-see-monday", "s.f-meet-monday"],
      checks: [{ label: "Monday", anyOf: ["월요일"] }],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-plans",
    module: 14,
    skills: ["conversation"],
    teaches: ["v.저녁"],
    interest: 0.6,
    payload: {
      title: "Making plans",
      setting: "Two classmates after class.",
      speakers: { a: "수아", b: "나" },
      lines: [
        { speaker: "a", sentence: "s.f-busy-tomorrow-q" },
        { speaker: "b", sentence: "s.f-no-not-busy" },
        { speaker: "a", sentence: "s.f-meet-evening" },
        { speaker: "b", sentence: "s.good-polite" },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-see-later",
    module: 14,
    skills: ["conversation"],
    teaches: ["v.나중"],
    payload: { sentence: "s.f-see-later", tip: "나중에 is 'some time later'. For later today, 이따가 is more precise." },
  }),

  // Module 15
  card("VOCAB", {
    ...F,
    id: "f-vocab-family",
    module: 15,
    skills: ["vocabulary"],
    teaches: ["v.가족"],
    payload: {
      concept: "v.가족",
      examples: ["s.f-family-four", "s.f-dad-office", "s.f-mom-teacher"],
      memoryHook: "우리 가족 'our family' is how you say 'my family'.",
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-sibling",
    module: 15,
    skills: ["vocabulary"],
    teaches: ["v.동생"],
    payload: {
      concept: "v.동생",
      examples: ["s.f-younger-brother", "s.f-younger-sister"],
      memoryHook: "남 (male) + 동생 = younger brother, 여 (female) + 동생 = younger sister.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-only-child",
    module: 15,
    skills: ["conversation"],
    payload: { sentence: "s.f-only-child", tip: "외동 = only child. 외동딸 (only daughter), 외동아들 (only son)." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-grandma-busan",
    module: 15,
    skills: ["honorifics"],
    teaches: ["g.hon-vocab"],
    interest: 0.6,
    payload: { sentence: "s.f-grandma-busan", tip: "About elders, 있어요 becomes 계세요. A small word that shows respect." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-parents-america",
    module: 15,
    skills: ["honorifics"],
    teaches: ["v.부모님"],
    payload: { sentence: "s.f-parents-america", tip: "부모님 already includes the honorific 님, so it fits with 계세요." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-family",
    module: 15,
    skills: ["listening"],
    teaches: ["v.가족"],
    payload: {
      sentence: "s.f-family-four",
      question: "How many people are in their family?",
      options: ["Three", "Four", "Five"],
      answer: 1,
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-mom",
    module: 15,
    skills: ["listening"],
    teaches: ["v.선생님"],
    payload: {
      sentence: "s.f-mom-teacher",
      question: "What does their mom do?",
      options: ["She's a teacher", "She's an office worker", "She's a student"],
      answer: 0,
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-dad",
    module: 15,
    skills: ["grammar"],
    teaches: ["g.topic"],
    payload: { sentence: "s.f-dad-office", blank: "는", options: ["는", "를", "에"], hint: "What you're talking about." },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-grandma",
    module: 15,
    skills: ["honorifics"],
    teaches: ["g.hon-vocab"],
    payload: {
      prompt: "You're telling a friend your grandmother lives in Busan. Which is respectful?",
      options: [
        { text: "할머니는 부산에 계세요.", correct: true, why: "계세요 honors your grandmother." },
        { text: "할머니는 부산에 있어요.", why: "Understandable, but missing the respect Koreans expect for elders." },
        { text: "할머니는 부산이에요.", why: "'Grandma is Busan.'" },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-sister",
    module: 15,
    skills: ["speaking"],
    teaches: ["v.동생"],
    payload: {
      prompt: "Say: 'I have a younger sister.'",
      accepted: ["s.f-younger-sister", "s.f-younger-sister-full"],
      checks: [
        { label: "Younger sister", anyOf: ["여동생"] },
        { label: "Have", anyOf: ["있어요"] },
      ],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-family",
    module: 15,
    skills: ["conversation"],
    teaches: ["v.동생"],
    payload: {
      title: "Any siblings?",
      setting: "Getting to know a new classmate.",
      speakers: { a: "지우", b: "나" },
      lines: [
        { speaker: "a", sentence: "s.f-siblings-q" },
        { speaker: "b", sentence: "s.f-yes-younger-brother" },
        { speaker: "a", sentence: "s.f-sibling-student-q" },
        { speaker: "b", sentence: "s.f-yes-university" },
      ],
    },
  }),

  // Module 16
  card("PHRASE", {
    ...F,
    id: "f-menu-please",
    module: 16,
    skills: ["conversation"],
    teaches: ["v.메뉴"],
    payload: { sentence: "s.f-menu-please", tip: "Many places have the menu on the wall or a tablet on the table instead." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-bibimbap-one",
    module: 16,
    skills: ["conversation"],
    teaches: ["v.비빔밥"],
    interest: 0.6,
    payload: { sentence: "s.f-bibimbap-one", tip: "Dish + number + 주세요 is all you need to order." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-not-spicy-please",
    module: 16,
    skills: ["conversation"],
    teaches: ["v.맵다"],
    interest: 0.7,
    payload: { sentence: "s.f-not-spicy-please", tip: "Worth memorizing. Even 'mild' Korean food can be spicy." },
  }),
  card("CULTURE", {
    ...F,
    id: "f-culture-self",
    module: 16,
    skills: ["conversation"],
    interest: 0.7,
    payload: {
      title: "물은 셀프",
      body: "In many casual restaurants, water, side-dish refills and napkins are self-service. Look for a sign with 셀프. Side dishes (반찬) are free, and refills are normal.",
      sentence: "s.f-water-self",
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-to-go",
    module: 16,
    skills: ["listening"],
    teaches: ["g.noun-iyo"],
    payload: {
      sentence: "s.f-to-go-short",
      question: "Are they eating in or taking it away?",
      options: ["Eating in", "Taking it away", "They didn't say"],
      answer: 1,
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-bibimbap",
    module: 16,
    skills: ["listening"],
    teaches: ["v.비빔밥"],
    payload: {
      sentence: "s.f-bibimbap-one",
      question: "What did they order?",
      options: ["비빔밥 하나 주세요.", "비빔밥 두 개 주세요.", "김밥 하나 주세요."],
      answer: 0,
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-bibimbap",
    module: 16,
    skills: ["speaking"],
    teaches: ["v.비빔밥"],
    payload: {
      prompt: "Order one bibimbap.",
      accepted: ["s.f-bibimbap-one", "s.f-bibimbap-bowl"],
      checks: [
        { label: "Bibimbap", anyOf: ["비빔밥"] },
        { label: "Please", anyOf: ["주세요"] },
      ],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-card",
    module: 16,
    skills: ["grammar"],
    teaches: ["g.means-ro"],
    payload: { sentence: "s.f-by-card", blank: "로", options: ["로", "를", "에"], hint: "By what means?" },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-bill",
    module: 16,
    skills: ["conversation"],
    teaches: ["g.request-juseyo"],
    payload: {
      prompt: "You've finished eating and want to pay. You say:",
      options: [
        { text: "계산해 주세요.", correct: true, why: "'The bill, please.' Many places expect you to pay at the counter on the way out." },
        { text: "메뉴 주세요.", why: "That asks for the menu." },
        { text: "물 주세요.", why: "That asks for water." },
      ],
    },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-ordering",
    module: 16,
    skills: ["conversation", "listening"],
    teaches: ["v.비빔밥"],
    interest: 0.6,
    payload: {
      title: "Ordering lunch",
      setting: "A small restaurant at lunchtime.",
      speakers: { staff: "직원", you: "나" },
      lines: [
        { speaker: "staff", sentence: "s.would-you-order" },
        { speaker: "you", sentence: "s.f-bibimbap-one" },
        { speaker: "staff", sentence: "s.for-here" },
        { speaker: "you", sentence: "s.f-eat-here" },
      ],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-ramyeon-q",
    module: 16,
    skills: ["conversation"],
    teaches: ["v.라면"],
    payload: { sentence: "s.f-ramyeon-q", tip: "Convenience stores have hot water and seating for instant ramyeon. A Korean classic." },
  }),

  // Module 17
  card("VOCAB", {
    ...F,
    id: "f-vocab-right-left",
    module: 17,
    skills: ["vocabulary"],
    teaches: ["v.오른쪽", "v.왼쪽"],
    payload: {
      concept: "v.오른쪽",
      examples: ["s.f-go-right", "s.f-go-left"],
      memoryHook: "오른쪽 right, 왼쪽 left. Add 으로 for 'toward'.",
    },
  }),
  card("VOCAB", {
    ...F,
    id: "f-vocab-next-to",
    module: 17,
    skills: ["vocabulary"],
    teaches: ["v.옆", "v.앞", "v.뒤"],
    payload: {
      concept: "v.옆",
      examples: ["s.f-next-to-cafe", "s.f-front-of-school", "s.f-behind-bank"],
      memoryHook: "Place + 앞/옆/뒤 + 에 있어요: in front of / next to / behind.",
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-where-station",
    module: 17,
    skills: ["conversation"],
    teaches: ["v.지하철"],
    payload: { sentence: "s.f-where-station", tip: "Start with 저기요 to get a stranger's attention." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-go-straight",
    module: 17,
    skills: ["conversation"],
    teaches: ["v.쭉"],
    payload: { sentence: "s.f-go-straight", tip: "You'll hear 쭉 가세요 in almost every set of directions." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-is-it-far",
    module: 17,
    skills: ["conversation"],
    teaches: ["v.멀다"],
    payload: { sentence: "s.f-is-it-far", tip: "Answers: 가까워요 (close), 좀 멀어요 (a bit far)." },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-left",
    module: 17,
    skills: ["listening"],
    teaches: ["v.왼쪽"],
    payload: { sentence: "s.f-go-left", question: "Which way?", options: ["Left", "Right", "Straight"], answer: 0 },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-walk",
    module: 17,
    skills: ["listening"],
    teaches: ["v.분"],
    payload: {
      sentence: "s.f-five-min-walk",
      question: "How far is it?",
      options: ["A five-minute walk", "A fifteen-minute walk", "Five minutes by bus"],
      answer: 0,
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-yeop",
    module: 17,
    skills: ["vocabulary"],
    teaches: ["v.옆"],
    payload: { sentence: "s.f-next-to-cafe", blank: "옆에", options: ["옆에", "앞에", "뒤에"] },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-behind",
    module: 17,
    skills: ["vocabulary"],
    teaches: ["v.뒤"],
    payload: {
      prompt: "Someone says 은행 뒤에 있어요. Where is it?",
      sentence: "s.f-behind-bank",
      options: [
        { text: "Behind the bank", correct: true, why: "뒤 = behind." },
        { text: "Next to the bank", why: "That's 옆." },
        { text: "In front of the bank", why: "That's 앞." },
      ],
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-far",
    module: 17,
    skills: ["speaking"],
    teaches: ["v.멀다"],
    payload: { prompt: "Ask: 'Is it far?'", accepted: ["s.f-is-it-far", "s.f-far-from-here"], checks: [{ label: "Far", anyOf: ["멀어"] }] },
  }),
  card("DIALOGUE", {
    ...F,
    id: "f-dlg-directions",
    module: 17,
    skills: ["conversation", "listening"],
    teaches: ["v.가깝다"],
    payload: {
      title: "Asking the way",
      setting: "You stop someone on the street.",
      speakers: { you: "나", local: "행인" },
      lines: [
        { speaker: "you", sentence: "s.f-where-station" },
        { speaker: "local", sentence: "s.f-go-straight" },
        { speaker: "you", sentence: "s.f-is-it-far" },
        { speaker: "local", sentence: "s.f-its-close" },
      ],
    },
  }),

  // Module 18
  card("PHRASE", {
    ...F,
    id: "f-sorry-what",
    module: 18,
    skills: ["conversation"],
    teaches: ["e.mworago"],
    interest: 0.6,
    payload: { sentence: "s.f-sorry-what", tip: "네? alone, with a rising tone, already means 'sorry?'." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-one-more-time",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.말하다"],
    payload: { sentence: "s.f-one-more-time", tip: "Pair it with 천천히 ('slowly') when needed." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-in-korean",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.한국어"],
    interest: 0.7,
    payload: { sentence: "s.f-in-korean", tip: "The best learning question there is. Point at anything and ask." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-little-korean",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.조금"],
    payload: { sentence: "s.f-little-korean", tip: "Modest and true. People will slow down for you." },
  }),
  card("PHRASE", {
    ...F,
    id: "f-write-here",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.쓰다"],
    payload: { sentence: "s.f-write-here", tip: "Hand over your phone or a notebook. Reading is often easier than listening." },
  }),
  card("CULTURE", {
    ...F,
    id: "f-culture-help",
    module: 18,
    skills: ["conversation"],
    interest: 0.6,
    payload: {
      title: "In an emergency",
      body: "Call 112 for the police and 119 for fire or an ambulance. Both have interpreters. 도와주세요! ('Help!') gets attention fast.",
      sentence: "s.f-help",
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-slowly",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.천천히"],
    payload: {
      prompt: "Someone is speaking too fast for you. You say:",
      options: [
        { text: "천천히 말해 주세요.", correct: true, why: "'Please speak slowly.'" },
        { text: "빨리 말해 주세요.", why: "'Please speak faster.'" },
        { text: "말해 주세요.", why: "'Please say it.' Doesn't ask them to slow down." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-got-it",
    module: 18,
    skills: ["listening"],
    teaches: ["v.알다"],
    payload: { sentence: "s.f-got-it", question: "What did they say?", options: ["알겠어요.", "몰라요.", "괜찮아요."], answer: 0 },
  }),
  card("MISTAKE", {
    ...F,
    id: "f-mistake-molla",
    module: 18,
    skills: ["conversation"],
    teaches: ["v.모르다"],
    payload: {
      situation: "Your teacher asks a question you can't answer",
      learnerSays: "몰라요.",
      question: "Why might this sound a bit blunt?",
      options: [
        {
          text: "몰라요 can sound like 'dunno'. 잘 모르겠어요 is softer",
          correct: true,
          why: "The -겠- softens it: 'I'm not really sure.'",
        },
        { text: "It's the wrong verb", why: "모르다 is right. It's the tone." },
        { text: "It should be in the past tense", why: "Present is right." },
      ],
      better: "s.i-dont-know",
    },
  }),
  card("SPEAKING", {
    ...F,
    id: "f-speak-in-korean",
    module: 18,
    skills: ["speaking"],
    teaches: ["v.한국어"],
    payload: {
      prompt: "Point at something and ask what it's called in Korean.",
      accepted: ["s.f-in-korean", "s.f-in-korean-short"],
      checks: [{ label: "In Korean", anyOf: ["한국어로"] }],
    },
  }),
  card("FILL_BLANK", {
    ...F,
    id: "f-fill-hangugeoro",
    module: 18,
    skills: ["grammar"],
    teaches: ["g.means-ro"],
    payload: { sentence: "s.f-in-korean", blank: "로", options: ["로", "를", "에"], hint: "'In' a language uses (으)로." },
  }),

  // Module 19
  card("PRONUNCIATION", {
    ...F,
    id: "f-pron-linking",
    module: 19,
    skills: ["listening", "speaking"],
    teaches: ["g.sound-linking"],
    payload: {
      sentence: "s.f-like-music",
      written: "음악",
      sounds: "[으막]",
      rule: "A final consonant moves onto a following vowel. Korean flows from syllable to syllable.",
      more: [
        { written: "한국어", sounds: "[한구거]" },
        { written: "읽어요", sounds: "[일거요]" },
        { written: "옷이", sounds: "[오시]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    ...F,
    id: "f-pron-tense",
    module: 19,
    skills: ["listening", "speaking"],
    teaches: ["g.sound-tense"],
    payload: {
      sentence: "s.f-going-school-sound",
      written: "학교",
      sounds: "[학꾜]",
      rule: "After ㄱ, ㄷ or ㅂ, the next ㄱ ㄷ ㅂ ㅅ ㅈ turns tense: ㄲ ㄸ ㅃ ㅆ ㅉ.",
      more: [
        { written: "식당", sounds: "[식땅]" },
        { written: "학생", sounds: "[학쌩]" },
        { written: "잡지", sounds: "[잡찌]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    ...F,
    id: "f-pron-liquid",
    module: 19,
    skills: ["listening", "speaking"],
    teaches: ["g.sound-liquid"],
    payload: {
      sentence: "s.f-please-contact",
      written: "연락",
      sounds: "[열락]",
      rule: "ㄴ next to ㄹ becomes ㄹ.",
      more: [
        { written: "설날", sounds: "[설랄]" },
        { written: "신라", sounds: "[실라]" },
        { written: "편리", sounds: "[펼리]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    ...F,
    id: "f-pron-final",
    module: 19,
    skills: ["listening", "speaking"],
    teaches: ["g.sound-final"],
    payload: {
      sentence: "s.f-buy-clothes",
      written: "옷",
      sounds: "[옫]",
      rule: "At the end of a syllable, consonants collapse to 7 sounds: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      more: [
        { written: "부엌", sounds: "[부억]" },
        { written: "밖", sounds: "[박]" },
        { written: "꽃", sounds: "[꼳]" },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-restaurant",
    module: 19,
    skills: ["listening"],
    teaches: ["v.식당"],
    payload: {
      sentence: "s.f-where-restaurant",
      question: "What did they ask about?",
      options: ["식당 어디예요?", "식탁 어디예요?", "시장 어디예요?"],
      answer: 0,
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-school-sound",
    module: 19,
    skills: ["listening"],
    teaches: ["g.sound-tense"],
    payload: {
      sentence: "s.f-going-school-sound",
      question: "Where are they going?",
      options: ["학교 가요.", "학원 가요.", "회사 가요."],
      answer: 0,
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-yeollak",
    module: 19,
    skills: ["listening"],
    teaches: ["g.sound-liquid"],
    payload: {
      prompt: "How is 연락 ('contact') pronounced?",
      options: [
        { text: "[열락]", correct: true, why: "ㄴ before ㄹ becomes ㄹ." },
        { text: "[연낙]", why: "That's a different rule. ㄹ doesn't turn into ㄴ here." },
        { text: "[연락], as written", why: "Korean smooths this cluster." },
      ],
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-hakgyo",
    module: 19,
    skills: ["listening"],
    teaches: ["g.sound-tense"],
    payload: {
      prompt: "How is 학교 pronounced?",
      options: [
        { text: "[학꾜]", correct: true, why: "ㄱ after ㄱ turns tense." },
        { text: "[하교]", why: "The ㄱ doesn't disappear." },
        { text: "[항교]", why: "That's nasalization, which happens before ㄴ or ㅁ." },
      ],
    },
  }),

  // Module 20
  card("CULTURE", {
    ...F,
    id: "f-culture-three-ways",
    module: 20,
    skills: ["honorifics"],
    teaches: ["g.banmal", "g.hapsyo"],
    interest: 0.8,
    payload: {
      title: "Three ways to talk",
      body: "Every Korean sentence ends in a speech level. 반말 (casual) is for close friends. 해요체 (polite) is the default with everyone else. 하십시오체 (formal) is for work, announcements and ceremonies. Age and relationship decide which one, not the topic.",
      sentence: "s.what-do-polite",
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-got-it",
    module: 20,
    skills: ["honorifics"],
    teaches: ["v.알다"],
    interest: 0.6,
    payload: {
      situation: "'Got it.'",
      variants: [
        { level: "CASUAL", sentence: "s.f-got-it-casual", when: "A friend asks you to bring something." },
        { level: "POLITE", sentence: "s.f-got-it", when: "A coworker or classmate." },
        { level: "FORMAL", sentence: "s.f-got-it-formal", when: "Your boss, a customer, a client. Used all day at work." },
      ],
      takeaway: "알겠습니다 is the sound of a Korean office.",
    },
  }),
  card("SPEECH_LEVELS", {
    ...F,
    id: "f-levels-tasty",
    module: 20,
    skills: ["honorifics"],
    teaches: ["v.맛있다"],
    payload: {
      situation: "'It's delicious.'",
      variants: [
        { level: "CASUAL", sentence: "s.f-tasty-casual", when: "Eating with friends." },
        { level: "POLITE", sentence: "s.delicious-polite", when: "With anyone you don't use 반말 with." },
        { level: "FORMAL", sentence: "s.f-tasty-formal", when: "A formal dinner, or thanking a senior host." },
      ],
      takeaway: "맛있어 → 맛있어요 → 맛있습니다. Same word, three relationships.",
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-boss-task",
    module: 20,
    skills: ["honorifics"],
    teaches: ["g.hapsyo"],
    payload: {
      prompt: "Your manager hands you a task. You reply:",
      options: [
        { text: "알겠습니다.", correct: true, why: "The standard workplace reply." },
        { text: "알겠어.", why: "반말 to a manager is rude." },
        { text: "응.", why: "Casual 'yeah'. Only for friends." },
      ],
    },
  }),
  card("MULTIPLE_CHOICE", {
    ...F,
    id: "f-mc-friend-tasty",
    module: 20,
    skills: ["honorifics"],
    teaches: ["g.banmal"],
    payload: {
      prompt: "A close friend (you already use 반말) asks if the food is good. You say:",
      options: [
        { text: "응, 맛있어.", correct: true, why: "Casual with a casual friend. Natural." },
        { text: "네, 맛있습니다.", why: "Formal with a close friend sounds like a joke, or cold." },
        { text: "맛있어요?", why: "That's a question, and polite." },
      ],
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-formal",
    module: 20,
    skills: ["listening", "honorifics"],
    teaches: ["g.hapsyo"],
    payload: {
      sentence: "s.f-got-it-formal",
      question: "Which speech level was that?",
      options: ["Casual (반말)", "Polite (해요체)", "Formal (하십시오체)"],
      answer: 2,
    },
  }),
  card("LISTENING", {
    ...F,
    id: "f-listen-casual",
    module: 20,
    skills: ["listening", "honorifics"],
    teaches: ["g.banmal"],
    payload: {
      sentence: "s.f-tasty-casual",
      question: "Which speech level was that?",
      options: ["Casual (반말)", "Polite (해요체)", "Formal (하십시오체)"],
      answer: 0,
    },
  }),
  card("TRANSFORM", {
    ...F,
    id: "f-tf-tasty-polite",
    module: 20,
    skills: ["honorifics"],
    teaches: ["g.haeyo"],
    payload: {
      instruction: "Make it polite (해요체).",
      from: "s.f-tasty-casual",
      tiles: ["맛있어요", "맛있어", "맛있습니다"],
      accepted: ["s.delicious-polite"],
    },
  }),
  card("PHRASE", {
    ...F,
    id: "f-good-night-hon",
    module: 20,
    skills: ["honorifics"],
    teaches: ["g.hon-vocab"],
    interest: 0.6,
    payload: { sentence: "s.f-good-night-hon", tip: "To parents or grandparents. To a friend: 잘 자!" },
  }),
  card("PHRASE", {
    ...F,
    id: "f-good-night-casual",
    module: 20,
    skills: ["conversation"],
    teaches: ["v.자다"],
    payload: { sentence: "s.f-good-night-casual", tip: "The last KakaoTalk message of many nights. Polite: 잘 자요." },
  }),
];

export const foundations4: Unit = { sentences, cards };
