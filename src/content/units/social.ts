import { card, s, w, type Unit } from "../author";

const sentences = [
  // Hongdae dialogue
  s("dlg-what-today", "오늘 뭐 해?", "What are you doing today?", { level: "BEGINNER", sp: "CASUAL" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해", "do", { base: "하다", c: ["v.하다", "g.banmal"] }),
  ]),
  s("meeting-friend", "친구 만나.", "Meeting a friend.", { level: "A1", sp: "CASUAL" }, [
    w("친구", "friend", { c: ["v.친구", "g.drop-particle"], note: "친구를 → 친구." }),
    w("만나", "meet", { base: "만나다", c: ["v.만나다", "g.banmal"] }),
  ]),
  s("where-at", "어디서?", "Where?", { level: "A1", sp: "CASUAL" }, [
    w("어디서", "where (at)", { parts: [["어디", "where", "word"], ["서", "short for 에서", "particle"]], c: ["v.어디", "g.place-eseo"] }),
  ]),
  s("hongdae-at", "홍대에서.", "In Hongdae.", { level: "A1", sp: "CASUAL" }, [
    w("홍대에서", "in Hongdae", { parts: [["홍대", "Hongdae (area near Hongik Univ.)", "word"], ["에서", "at", "particle"]], c: ["g.place-eseo"] }),
  ]),
  s("nice-envy", "오, 좋겠다!", "Oh, nice! Lucky you.", { level: "A2", sp: "CASUAL" }, [
    w("오", "oh"),
    w("좋겠다", "that must be nice", { base: "좋다", note: "-겠- guesses at someone else's experience. The friendly 'jealous!'", c: ["v.좋다", "g.guess-get", "g.plain-da"] }),
  ]),
  s("met-friend", "친구 만났어.", "I met a friend.", { level: "A1", sp: "CASUAL" }, [
    w("친구", "friend", { c: ["v.친구"] }),
    w("만났어", "met", { base: "만나다", c: ["v.만나다", "g.past"] }),
  ]),
  s("met-friend-yesterday", "어제 친구 만났어.", "I met a friend yesterday.", { level: "A1", sp: "CASUAL" }, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("친구", "friend", { c: ["v.친구"] }),
    w("만났어", "met", { base: "만나다", c: ["v.만나다", "g.past"] }),
  ]),

  // Making plans
  s("if-time-movie", "시간 있으면 같이 영화 볼래?", "If you're free, want to see a movie together?", { level: "A2", sp: "CASUAL" }, [
    w("시간", "time", { c: ["v.시간", "g.drop-particle"] }),
    w("있으면", "if (you) have", { base: "있다", c: ["v.있다", "g.if-eumyeon"] }),
    w("같이", "together", { c: ["v.같이"] }),
    w("영화", "movie", { c: ["v.영화"] }),
    w("볼래", "want to watch?", { base: "보다", c: ["v.보다", "g.will-eullae"] }),
  ]),
  s("sounds-good", "좋아, 몇 시에 만날까?", "Sure, what time should we meet?", { level: "A2", sp: "CASUAL" }, [
    w("좋아", "sure", { base: "좋다", c: ["v.좋다"] }),
    w("몇", "what (number)"),
    w("시에", "o'clock (at)", { c: ["g.place-e"] }),
    w("만날까", "shall we meet", { base: "만나다", c: ["v.만나다", "g.shall-eulkkayo"] }),
  ]),
  s("seven-ok", "일곱 시 어때?", "How about seven?", { level: "A2", sp: "CASUAL" }, [
    w("일곱", "seven (native)", { note: "Hours use native Korean numbers: 한 시, 두 시 … 일곱 시." }),
    w("시", "o'clock"),
    w("어때", "how is it", { base: "어떻다", c: ["v.어떻다"] }),
  ]),
  s("ok-see-then", "그래, 그때 보자!", "Okay, see you then!", { level: "A2", sp: "CASUAL" }, [
    w("그래", "okay"),
    w("그때", "then"),
    w("보자", "let's see (each other)", { base: "보다", c: ["v.보다", "g.lets-ja"] }),
  ]),

  // Reactions
  s("really", "진짜?", "Really?", { level: "A1", sp: "CASUAL" }, [w("진짜", "really?", { c: ["v.진짜", "e.jjinja"] })]),
  s("no-way", "말도 안 돼!", "No way!", { level: "A2", sp: "CASUAL", lit: "even words don't work" }, [
    w("말도", "even words", { c: ["v.말", "g.also"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("돼", "work", { base: "되다", c: ["e.mal-do-an-dwae"] }),
  ]),
  s("right-right", "맞아, 맞아.", "Right, exactly.", { level: "A1", sp: "CASUAL" }, [
    w("맞아", "right", { base: "맞다" }),
    w("맞아", "right", { base: "맞다" }),
  ]),
  s("i-know-right", "그러게 말이야.", "Tell me about it.", { level: "B1", sp: "CASUAL" }, [
    w("그러게", "I know", { c: ["e.geureoke"] }),
    w("말이야", "I'm saying", { note: "Adds emphasis: 'that's what I'm saying.'", c: ["v.말"] }),
  ]),
  s("i-see-casual", "아, 그렇구나.", "Oh, I see.", { level: "B1", sp: "CASUAL" }, [
    w("아", "oh"),
    w("그렇구나", "so that's how it is", { base: "그렇다", c: ["g.realize-guna"] }),
  ]),
  s("aigo", "아이고, 어떡해.", "Oh no, what are you going to do?", { level: "A2", sp: "CASUAL", ctx: "Sympathy when something bad happens to someone." }, [
    w("아이고", "oh dear", { c: ["e.aigo"] }),
    w("어떡해", "what to do", { note: "Contraction of 어떻게 해. A sympathetic 'oh no!'", c: ["g.contraction"] }),
  ]),

  // New coworker dialogue
  s("new-coworker-intro", "안녕하세요, 이번에 새로 온 김지민이에요.", "Hi, I'm Kim Jimin. I just joined.", { level: "B1", sp: "POLITE" }, [
    w("안녕하세요", "hello"),
    w("이번에", "this time", { c: ["v.이번"] }),
    w("새로", "newly"),
    w("온", "who came", { base: "오다", note: "오다 + past modifier -ㄴ: 'who came'.", c: ["v.오다"] }),
    w("김지민이에요", "am Kim Jimin", { parts: [["김지민", "Kim Jimin", "word"], ["이에요", "am (polite)", "ending"]], c: ["g.haeyo"] }),
  ]),
  s("nice-to-meet-polite", "아, 반가워요! 저는 박서준이에요.", "Oh, nice to meet you! I'm Park Seojun.", { level: "A1", sp: "POLITE" }, [
    w("아", "oh"),
    w("반가워요", "nice to meet you", { base: "반갑다", c: ["v.반갑다"] }),
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("박서준이에요", "am Park Seojun"),
  ]),
  s("look-forward", "앞으로 잘 부탁드려요.", "I look forward to working with you.", { level: "A2", sp: "POLITE", lit: "from now on, I ask (humbly) that you treat me well" }, [
    w("앞으로", "from now on"),
    w("잘", "well", { c: ["v.잘"] }),
    w("부탁드려요", "I ask (humbly)", { base: "부탁드리다", note: "드리다 is the humble form of 주다.", c: ["e.jal-butak", "g.humble"] }),
  ]),
  s("ask-anytime", "저도요. 모르는 거 있으면 언제든지 물어보세요.", "Same here. If there's anything you don't know, ask anytime.", { level: "B1", sp: "POLITE" }, [
    w("저도요", "me too", { parts: [["저", "I", "word"], ["도", "too", "particle"], ["요", "polite", "ending"]], c: ["g.also", "g.noun-iyo"] }),
    w("모르는", "that (you) don't know", { base: "모르다", c: ["v.모르다"] }),
    w("거", "thing", { c: ["g.contraction"] }),
    w("있으면", "if there is", { base: "있다", c: ["v.있다", "g.if-eumyeon"] }),
    w("언제든지", "anytime", { c: ["v.언제"] }),
    w("물어보세요", "please ask", { base: "물어보다", c: ["g.command-seyo"] }),
  ]),
  s("nice-to-meet", "만나서 반가워요.", "Nice to meet you.", { level: "A1", sp: "POLITE", lit: "having met, I'm glad" }, [
    w("만나서", "having met", { base: "만나다", c: ["v.만나다", "g.because-aseo"] }),
    w("반가워요", "(I'm) glad", { base: "반갑다", c: ["v.반갑다"] }),
  ]),

  // Titles
  s("hyung-help", "형, 이것 좀 도와줘.", "Hyung, help me with this.", { level: "A2", sp: "CASUAL", ctx: "A guy to an older male friend." }, [
    w("형", "older brother / older male friend", { c: ["v.형", "c.age-titles"] }),
    w("이것", "this", { note: "Full form of 이거." }),
    w("좀", "please (softener)", { c: ["v.좀"] }),
    w("도와줘", "help me", { base: "돕다", note: "돕다 + 아 주다 → 도와주다.", c: ["g.request-juseyo", "g.banmal"] }),
  ]),
  s("how-old", "혹시 나이가 어떻게 되세요?", "If you don't mind me asking, how old are you?", { level: "B1", sp: "POLITE" }, [
    w("혹시", "by any chance", { note: "Softens a question that could feel personal." }),
    w("나이가", "age (subject)", { c: ["g.subject"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("되세요", "is it (honorific)", { c: ["g.honorific-si"] }),
  ]),
];

const cards = [
  card("DIALOGUE", {
    id: "dlg-hongdae", level: "A1", topic: "Friends", skills: ["conversation", "listening"], teaches: ["v.만나다"], interest: 0.7,
    payload: {
      title: "Plans for today",
      setting: "Two friends texting. Everything is 반말 and compressed.",
      speakers: { a: "A", b: "B" },
      lines: [
        { speaker: "a", sentence: "s.dlg-what-today" },
        { speaker: "b", sentence: "s.meeting-friend" },
        { speaker: "a", sentence: "s.where-at" },
        { speaker: "b", sentence: "s.hongdae-at" },
        { speaker: "a", sentence: "s.nice-envy" },
      ],
    },
  }),
  card("DIALOGUE", {
    id: "dlg-plans", level: "A2", topic: "Friends", skills: ["conversation"], teaches: ["g.will-eullae", "g.lets-ja"], interest: 0.6,
    payload: {
      title: "Movie tonight?",
      setting: "Friends making plans.",
      speakers: { a: "지우", b: "민재" },
      lines: [
        { speaker: "a", sentence: "s.if-time-movie" },
        { speaker: "b", sentence: "s.sounds-good" },
        { speaker: "a", sentence: "s.seven-ok" },
        { speaker: "b", sentence: "s.ok-see-then" },
      ],
    },
  }),
  card("DIALOGUE", {
    id: "dlg-new-coworker", level: "B1", topic: "Work", skills: ["conversation", "honorifics"], teaches: ["e.jal-butak"], interest: 0.6,
    payload: {
      title: "First day at work",
      setting: "Meeting a coworker of similar rank. Polite, warm, not stiff.",
      speakers: { a: "지민", b: "서준" },
      lines: [
        { speaker: "a", sentence: "s.new-coworker-intro" },
        { speaker: "b", sentence: "s.nice-to-meet-polite" },
        { speaker: "a", sentence: "s.look-forward" },
        { speaker: "b", sentence: "s.ask-anytime" },
      ],
    },
  }),
  card("TRANSFORM", {
    id: "tf-met-past", level: "A1", topic: "Tense & aspect", skills: ["grammar"], teaches: ["g.past"],
    payload: { instruction: "Put it in the past: 'I met a friend.'", from: "s.meeting-friend", tiles: ["친구", "만났어", "만나", "만날", "어제"], accepted: ["s.met-friend", "s.met-friend-yesterday"] },
  }),
  card("EXPRESSION", {
    id: "expr-no-way", level: "A2", topic: "Reactions", skills: ["conversation"], teaches: ["e.mal-do-an-dwae"], interest: 0.7,
    payload: { concept: "e.mal-do-an-dwae", sentence: "s.no-way", usage: "Disbelief, good or bad. Polite: 말도 안 돼요." },
  }),
  card("EXPRESSION", {
    id: "expr-geureoke", level: "B1", topic: "Reactions", skills: ["conversation"], teaches: ["e.geureoke"], interest: 0.6,
    payload: { concept: "e.geureoke", sentence: "s.i-know-right", usage: "Agreeing with a complaint. On its own, 그러게 is a sighing 'I know, right.'" },
  }),
  card("EXPRESSION", {
    id: "expr-aigo", level: "A2", topic: "Reactions", skills: ["conversation"], teaches: ["e.aigo"], interest: 0.7,
    payload: { concept: "e.aigo", sentence: "s.aigo", usage: "Sympathy, surprise, or the groan you make standing up. All ages use it, grandmothers most of all.", avoid: "어떡해 can sound flippant if the news is truly serious." },
  }),
  card("PHRASE", {
    id: "i-see", level: "B1", topic: "Reactions", skills: ["conversation"], teaches: ["g.realize-guna"],
    payload: { sentence: "s.i-see-casual", tip: "To a senior, 아, 그렇구나 can sound like you're evaluating them. Use 아, 그렇군요 or 아, 네." },
  }),
  card("PHRASE", {
    id: "right-right", level: "A1", topic: "Reactions", skills: ["conversation"],
    payload: { sentence: "s.right-right", tip: "Repeating is natural: 맞아 맞아, 진짜 진짜. Polite: 맞아요." },
  }),
  card("MISTAKE", {
    id: "mistake-nice-meet", level: "A1", topic: "Social", skills: ["conversation", "vocabulary"], teaches: ["v.반갑다"], interest: 0.6,
    payload: {
      situation: "Meeting someone for the first time",
      learnerSays: "만나서 좋아요.",
      question: "What's off?",
      options: [
        { text: "Korean uses 반갑다 ('glad to see') here, not 좋다", correct: true, why: "만나서 반가워요 is the set phrase. 좋다 sounds like a translation." },
        { text: "만나서 should be 만나고", why: "-아서 is right: 'having met (you), I'm glad.'" },
        { text: "It needs a subject", why: "Subjects are naturally dropped here." },
      ],
      better: "s.nice-to-meet",
    },
  }),
  card("CULTURE", {
    id: "culture-titles", level: "A2", topic: "Social", skills: ["honorifics", "conversation"], teaches: ["c.age-titles", "v.형", "v.언니"], interest: 0.9,
    payload: {
      title: "형, 누나, 오빠, 언니",
      body: "Friends a little older than you are called by family titles instead of their names. Which word depends on your gender: men say 형/누나, women say 오빠/언니. It signals closeness and respect at once.",
      sentence: "s.hyung-help",
    },
  }),
  card("CULTURE", {
    id: "culture-age", level: "B1", topic: "Social", skills: ["honorifics"], teaches: ["c.age-titles"], interest: 0.8,
    payload: {
      title: "Why people ask your age",
      body: "Age decides speech levels and titles, so it often comes up early. It isn't nosy. It sets up how to talk to each other. The polite way to ask uses 혹시 and the honorific 되세요.",
      sentence: "s.how-old",
    },
  }),
  card("FILL_BLANK", {
    id: "fill-eullae", level: "A2", topic: "Intentions & wishes", skills: ["grammar"], teaches: ["g.will-eullae"],
    payload: { sentence: "s.if-time-movie", blank: "볼래", options: ["볼래", "봤어", "봐요"], hint: "Inviting: 'want to watch?'" },
  }),
  card("SPEAKING", {
    id: "speak-met-friend", level: "A1", topic: "Friends", skills: ["speaking", "grammar"], teaches: ["g.past"],
    payload: {
      prompt: "Tell a friend: 'I met a friend yesterday.'",
      context: "Casual.",
      accepted: ["s.met-friend-yesterday", "s.met-friend"],
      checks: [{ label: "Past tense", anyOf: ["만났"] }, { label: "Friend", anyOf: ["친구"] }],
    },
  }),
];

export const social: Unit = { sentences, cards };
