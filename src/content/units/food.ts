import { card, s, w, type Unit } from "../author";

const sentences = [
  s("order-americano", "아이스 아메리카노 한 잔 주세요.", "One iced americano, please.", { level: "A1", sp: "POLITE" }, [
    w("아이스", "iced"),
    w("아메리카노", "americano"),
    w("한", "one", { note: "하나 → 한 before a counter." }),
    w("잔", "cup (counter)", { c: ["v.잔"] }),
    w("주세요", "please give", { base: "주다", c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("order-americano-hana", "아이스 아메리카노 하나 주세요.", "One iced americano, please.", { level: "A1", sp: "POLITE" }, [
    w("아이스", "iced"),
    w("아메리카노", "americano"),
    w("하나", "one", { note: "No counter needed. Very common when ordering." }),
    w("주세요", "please give", { base: "주다", c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("order-aa", "아아 한 잔이요.", "One iced americano.", { level: "A2", sp: "POLITE", nat: "SLANG" }, [
    w("아아", "iced americano", { note: "Short for 아이스 아메리카노.", c: ["e.aa"] }),
    w("한", "one"),
    w("잔이요", "cup, please", {
      parts: [
        ["잔", "cup", "word"],
        ["이요", "polite tag", "ending"],
      ],
      c: ["v.잔", "g.noun-iyo"],
    }),
  ]),
  s("water-please", "물 좀 주세요.", "Could I get some water, please?", { level: "A1", sp: "POLITE" }, [
    w("물", "water", { c: ["v.물"] }),
    w("좀", "a little / please", { c: ["v.좀"], note: "Softens the request." }),
    w("주세요", "please give", { c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("excuse-me-here", "여기요!", "Excuse me! (to staff)", { level: "A1", sp: "POLITE", lit: "here!" }, [
    w("여기요", "over here, please", {
      parts: [
        ["여기", "here", "word"],
        ["요", "polite", "ending"],
      ],
      c: ["e.yeogiyo", "g.noun-iyo"],
    }),
  ]),
  s("check-please", "계산해 주세요.", "Can I get the check, please?", { level: "A2", sp: "POLITE" }, [
    w("계산해 주세요", "please calculate (the bill)", { base: "계산하다", c: ["g.request-juseyo"] }),
  ]),
  s("would-you-order", "주문하시겠어요?", "Are you ready to order?", { level: "A2", sp: "POLITE" }, [
    w("주문하시겠어요", "would you like to order", {
      base: "주문하다",
      parts: [
        ["주문하", "order", "stem"],
        ["시", "honorific", "infix"],
        ["겠", "softener", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["v.주문하다", "g.honorific-si", "g.guess-get"],
    }),
  ]),
  s("for-here", "드시고 가세요?", "For here?", { level: "B1", sp: "POLITE", lit: "(will you) eat and go?" }, [
    w("드시고", "eat (honorific) and", { base: "드시다", c: ["g.hon-vocab", "g.and-go"] }),
    w("가세요", "go (honorific)", { base: "가다", c: ["v.가다", "g.honorific-si"] }),
  ]),
  s("to-go", "아니요, 포장해 주세요.", "No, to go please.", { level: "A2", sp: "POLITE" }, [
    w("아니요", "no"),
    w("포장해 주세요", "please wrap it (to go)", { base: "포장하다", c: ["g.request-juseyo"] }),
  ]),
  s("one-moment", "네, 잠시만 기다려 주세요.", "Sure, one moment please.", { level: "A2", sp: "POLITE" }, [
    w("네", "yes / sure"),
    w("잠시만", "just a moment", {
      parts: [
        ["잠시", "a moment", "word"],
        ["만", "just", "particle"],
      ],
      c: ["g.only-man"],
    }),
    w("기다려 주세요", "please wait", { base: "기다리다", c: ["v.기다리다", "g.request-juseyo"] }),
  ]),
  s("delicious-wow", "와, 진짜 맛있다!", "Wow, this is so good!", { level: "A1", sp: "CASUAL" }, [
    w("와", "wow"),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("맛있다", "is delicious!", {
      base: "맛있다",
      note: "Plain -다 form: a reaction, said even when you speak politely otherwise.",
      c: ["v.맛있다", "g.plain-da"],
    }),
  ]),
  s("delicious-polite", "맛있어요.", "It's delicious.", { level: "BEGINNER", sp: "POLITE" }, [
    w("맛있어요", "(it's) delicious", { base: "맛있다", c: ["v.맛있다", "g.haeyo"] }),
  ]),
  s(
    "cant-spicy",
    "저 매운 거 잘 못 먹어요.",
    "I can't really handle spicy food.",
    { level: "A2", sp: "POLITE", lit: "I spicy thing well can't eat" },
    [
      w("저", "I", { c: ["v.저", "g.drop-particle"] }),
      w("매운", "spicy", { base: "맵다", note: "ㅂ-irregular: 맵다 → 매운 (describing a noun).", c: ["v.맵다"] }),
      w("거", "thing (food)", { note: "Spoken 것.", c: ["g.contraction"] }),
      w("잘", "well", { c: ["v.잘"] }),
      w("못 먹어요", "can't eat", { base: "먹다", c: ["v.먹다", "g.neg-mot"] }),
    ],
  ),
  s("not-spicy-q", "이거 많이 매워요?", "Is this very spicy?", { level: "A2", sp: "POLITE" }, [
    w("이거", "this", { c: ["g.contraction"] }),
    w("많이", "a lot"),
    w("매워요", "is spicy", { base: "맵다", c: ["v.맵다"] }),
  ]),
  s("want-tteokbokki", "떡볶이 먹고 싶어요.", "I want to eat tteokbokki.", { level: "A1", sp: "POLITE" }, [
    w("떡볶이", "tteokbokki", { c: ["v.떡볶이", "g.drop-particle"] }),
    w("먹고 싶어요", "want to eat", {
      base: "먹다",
      parts: [
        ["먹", "eat", "stem"],
        ["고 싶", "want to", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["v.먹다", "g.want-go-sipda"],
    }),
  ]),
  s("what-eat-casual", "뭐 먹을래?", "What do you wanna eat?", { level: "A2", sp: "CASUAL" }, [
    w("뭐", "what", { c: ["v.뭐"] }),
    w("먹을래", "do you want to eat", { base: "먹다", c: ["v.먹다", "g.will-eullae"] }),
  ]),
  s("chimaek", "오늘 치맥 어때?", "How about chicken and beer tonight?", { level: "A2", sp: "CASUAL" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("치맥", "chicken + beer", { note: "치킨 + 맥주. A national institution.", c: ["v.치킨", "v.맥주"] }),
    w("어때", "how about", { base: "어떻다", c: ["v.어떻다"] }),
  ]),
  s("together-eat", "같이 먹을래?", "Want to eat together?", { level: "A2", sp: "CASUAL" }, [
    w("같이", "together", { c: ["v.같이"] }),
    w("먹을래", "want to eat?", { base: "먹다", c: ["v.먹다", "g.will-eullae"] }),
  ]),
  s("shall-we-lunch", "점심 같이 먹을까요?", "Shall we have lunch together?", { level: "A2", sp: "POLITE" }, [
    w("점심", "lunch", { c: ["v.점심"] }),
    w("같이", "together", { c: ["v.같이"] }),
    w("먹을까요", "shall we eat", { base: "먹다", c: ["v.먹다", "g.shall-eulkkayo"] }),
  ]),
  s("before-meal", "잘 먹겠습니다!", "Thank you for the meal! (before eating)", { level: "A1", sp: "FORMAL", lit: "I will eat well" }, [
    w("잘", "well", { c: ["v.잘"] }),
    w("먹겠습니다", "I will eat", { base: "먹다", c: ["v.먹다", "g.hapsyo", "e.jal-meokgetseumnida"] }),
  ]),
  s("after-meal", "잘 먹었습니다!", "Thank you for the meal! (after eating)", { level: "A1", sp: "FORMAL", lit: "I ate well" }, [
    w("잘", "well", { c: ["v.잘"] }),
    w("먹었습니다", "I ate", { base: "먹다", c: ["v.먹다", "g.past", "g.hapsyo"] }),
  ]),
  s("try-this", "언니, 이거 먹어 봐!", "Unnie, try this!", { level: "A2", sp: "CASUAL" }, [
    w("언니", "older sister / older female friend", { c: ["v.언니", "c.age-titles"] }),
    w("이거", "this", { c: ["g.contraction"] }),
    w("먹어 봐", "try eating", { base: "먹다", c: ["v.먹다", "g.try-aboda"] }),
  ]),
  s("ice-cold", "아, 시원하다!", "Ahh, that hits the spot!", { level: "A2", sp: "CASUAL", lit: "ah, refreshing/cool!" }, [
    w("아", "ahh"),
    w("시원하다", "refreshing!", {
      base: "시원하다",
      note: "Also said about hot soup and a good massage. 시원하다 is relief, not only coolness.",
      c: ["g.plain-da"],
    }),
  ]),
];

const cards = [
  card("PHRASE", {
    id: "order-americano",
    level: "A1",
    topic: "Café",
    skills: ["conversation"],
    teaches: ["g.request-juseyo", "v.잔"],
    interest: 0.6,
    payload: { sentence: "s.order-americano", tip: "N + 주세요 means 'N, please.' Everyone says 아아 for short." },
  }),
  card("EXPRESSION", {
    id: "expr-aa",
    level: "A2",
    topic: "Café",
    skills: ["slang", "conversation"],
    teaches: ["e.aa"],
    interest: 0.8,
    payload: {
      concept: "e.aa",
      sentence: "s.order-aa",
      usage:
        "아아 is iced americano, 뜨아 is hot. Staff understand it. Korea drinks iced americano even in winter, hence the saying 얼죽아 ('I'd rather freeze to death than drink hot').",
    },
  }),
  card("PHRASE", {
    id: "water-please",
    level: "A1",
    topic: "Restaurant",
    skills: ["conversation"],
    teaches: ["v.좀", "v.물"],
    payload: { sentence: "s.water-please", tip: "Water is usually self-service (셀프). Look for the 물은 셀프입니다 sign." },
  }),
  card("CULTURE", {
    id: "culture-yeogiyo",
    level: "A1",
    topic: "Restaurant",
    skills: ["conversation"],
    teaches: ["e.yeogiyo"],
    interest: 0.7,
    payload: {
      title: "Calling the server out loud is normal",
      body: "In Korean restaurants you raise your hand and call 여기요! ('over here!') or 저기요! ('excuse me!'). It isn't rude. Many tables have a call button too.",
      sentence: "s.excuse-me-here",
    },
  }),
  card("CULTURE", {
    id: "culture-meal-phrases",
    level: "A1",
    topic: "Restaurant",
    skills: ["conversation"],
    teaches: ["e.jal-meokgetseumnida"],
    interest: 0.7,
    payload: {
      title: "잘 먹겠습니다 / 잘 먹었습니다",
      body: "Said before and after a meal someone else is paying for or cooked. It thanks the host, not the food. Among close friends: 잘 먹을게! and 잘 먹었어!",
      sentence: "s.before-meal",
    },
  }),
  card("DIALOGUE", {
    id: "dlg-cafe-order",
    level: "A2",
    topic: "Café",
    skills: ["listening", "conversation"],
    teaches: ["v.주문하다"],
    interest: 0.6,
    payload: {
      title: "Ordering at a café",
      setting: "A busy café counter. Staff use honorific service speech; the customer stays polite.",
      speakers: { staff: "직원", you: "손님" },
      lines: [
        { speaker: "staff", sentence: "s.would-you-order" },
        { speaker: "you", sentence: "s.order-americano" },
        { speaker: "staff", sentence: "s.for-here" },
        { speaker: "you", sentence: "s.to-go" },
        { speaker: "staff", sentence: "s.one-moment" },
      ],
    },
  }),
  card("LISTENING", {
    id: "listen-order",
    level: "A1",
    topic: "Café",
    skills: ["listening"],
    teaches: ["v.잔"],
    payload: {
      sentence: "s.order-americano",
      question: "What did they order?",
      options: ["One iced americano", "Two iced americanos", "One hot americano"],
      answer: 0,
    },
  }),
  card("LISTENING", {
    id: "listen-spicy",
    level: "A2",
    topic: "Restaurant",
    skills: ["listening"],
    teaches: ["g.neg-mot"],
    payload: {
      sentence: "s.cant-spicy",
      question: "What did they say about spicy food?",
      options: ["They love it", "They can't really handle it", "They don't want any today"],
      answer: 1,
    },
  }),
  card("SPEAKING", {
    id: "speak-order",
    level: "A1",
    topic: "Café",
    skills: ["speaking"],
    teaches: ["g.request-juseyo"],
    payload: {
      prompt: "Order one iced americano.",
      context: "Polite, at the counter.",
      accepted: ["s.order-americano", "s.order-americano-hana", "s.order-aa"],
      checks: [
        { label: "Iced americano", anyOf: ["아메리카노", "아아"] },
        { label: "Polite ending", anyOf: ["주세요", "요"] },
      ],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-neg-mot",
    level: "A2",
    topic: "Negation",
    skills: ["grammar"],
    teaches: ["g.neg-mot", "g.neg-an"],
    interest: 0.5,
    payload: {
      concept: "g.neg-mot",
      hook: "안 = don't (your choice). 못 = can't (not able to).",
      formation: [
        { base: "먹다", result: "안 먹어요 / 못 먹어요" },
        { base: "가다", result: "안 가요 / 못 가요" },
      ],
      examples: ["s.cant-spicy"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-want",
    level: "A1",
    topic: "Intentions & wishes",
    skills: ["grammar"],
    teaches: ["g.want-go-sipda"],
    payload: {
      concept: "g.want-go-sipda",
      hook: "-고 싶다 = want to do something.",
      formation: [
        { base: "먹다", result: "먹고 싶어요" },
        { base: "가다", result: "가고 싶어요" },
        { base: "자다", result: "자고 싶다" },
      ],
      examples: ["s.want-tteokbokki"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-eullae",
    level: "A2",
    topic: "Intentions & wishes",
    skills: ["grammar", "conversation"],
    teaches: ["g.will-eullae"],
    payload: {
      concept: "g.will-eullae",
      hook: "-(으)ㄹ래 asks what someone feels like doing. It's casual and friendly.",
      formation: [
        { base: "먹다", result: "먹을래?" },
        { base: "가다", result: "갈래?" },
        { base: "마시다", result: "마실래?" },
      ],
      examples: ["s.what-eat-casual", "s.together-eat"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-eulkkayo",
    level: "A2",
    topic: "Requests & suggestions",
    skills: ["grammar", "conversation"],
    teaches: ["g.shall-eulkkayo"],
    payload: {
      concept: "g.shall-eulkkayo",
      hook: "-(으)ㄹ까요? proposes something: 'shall we…?'",
      formation: [
        { base: "먹다", result: "먹을까요?" },
        { base: "하다", result: "할까요?" },
        { base: "가다", result: "갈까요?" },
      ],
      examples: ["s.shall-we-lunch", "s.lets-talk-casual"],
    },
  }),
  card("PHRASE", {
    id: "chimaek",
    level: "A2",
    topic: "Food",
    skills: ["conversation", "vocabulary"],
    teaches: ["v.치킨", "v.맥주"],
    interest: 0.8,
    payload: { sentence: "s.chimaek", tip: "어때? is the easiest way to suggest anything: 영화 어때? 내일 어때?" },
  }),
  card("PHRASE", {
    id: "delicious-wow",
    level: "A1",
    topic: "Food",
    skills: ["conversation"],
    teaches: ["g.plain-da", "v.맛있다"],
    interest: 0.6,
    payload: { sentence: "s.delicious-wow", tip: "Reactions use the plain -다 form, even from people who otherwise speak politely." },
  }),
  card("PHRASE", {
    id: "siwonhada",
    level: "A2",
    topic: "Food",
    skills: ["conversation", "vocabulary"],
    teaches: ["g.plain-da"],
    interest: 0.8,
    payload: { sentence: "s.ice-cold", tip: "Koreans say 시원하다 after hot soup too. It means relief or refreshment, not only cold." },
  }),
  card("PHRASE", {
    id: "try-this",
    level: "A2",
    topic: "Food",
    skills: ["conversation"],
    teaches: ["g.try-aboda"],
    payload: { sentence: "s.try-this", tip: "-아/어 보다 means 'try doing.' 먹어 봐 = 'try it', 가 봐 = 'go and see'." },
  }),
  card("FILL_BLANK", {
    id: "fill-mot",
    level: "A2",
    topic: "Negation",
    skills: ["grammar"],
    teaches: ["g.neg-mot"],
    payload: { sentence: "s.cant-spicy", blank: "못", options: ["못", "안", "잘"], hint: "Not able to, rather than choosing not to." },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-spicy-q",
    level: "A2",
    topic: "Restaurant",
    skills: ["conversation"],
    teaches: ["v.맵다"],
    payload: {
      prompt: "You want to check whether a dish is very spicy before ordering. What do you ask?",
      options: [
        { text: "이거 많이 매워요?", correct: true, why: "'Is this very spicy?' Natural and polite." },
        { text: "이거 매운 거 못 먹어요?", why: "That asks whether the dish can't eat spicy food." },
        { text: "많이 맵습니까?", why: "Understandable, but formal and stiff for a restaurant." },
      ],
    },
  }),
];

export const food: Unit = { sentences, cards };
