import { card, s, w, type Unit } from "../author";

/** High-frequency words, each shown across several real sentences. */

const sentences = [
  s("you-first", "먼저 가세요.", "Go ahead, after you.", { level: "A2", sp: "POLITE" }, [
    w("먼저", "first, ahead", { c: ["v.먼저"] }),
    w("가세요", "please go", { base: "가다", c: ["v.가다", "g.command-seyo"] }),
  ]),
  s("see-you-later", "이따 봐!", "See you later!", { level: "A2", sp: "CASUAL" }, [
    w("이따", "later (today)", { c: ["v.이따"] }),
    w("봐", "see (you)", { base: "보다", c: ["v.보다", "g.banmal"] }),
  ]),
  s("please-contact", "시간 되면 연락 주세요.", "Get in touch when you have time.", { level: "A2", sp: "POLITE" }, [
    w("시간", "time", { c: ["v.시간", "g.drop-particle"] }),
    w("되면", "if it works", { base: "되다", c: ["g.if-eumyeon"] }),
    w("연락", "contact", { c: ["v.연락하다"] }),
    w("주세요", "please give", { c: ["v.주다", "g.request-juseyo"] }),
  ]),
  s("know-them", "그 사람 알아요?", "Do you know that person?", { level: "A1", sp: "POLITE" }, [
    w("그", "that"),
    w("사람", "person", { c: ["v.사람", "g.drop-particle"] }),
    w("알아요", "know", { base: "알다", c: ["v.알다", "g.haeyo"] }),
  ]),
  s("coming-right-away", "바로 갈게요!", "I'll be right there!", { level: "A2", sp: "POLITE" }, [
    w("바로", "right away", { c: ["v.바로"] }),
    w("갈게요", "I'll go", { base: "가다", c: ["v.가다", "g.promise-ge"] }),
  ]),
  s("keeps-raining", "요즘 계속 비가 와요.", "It keeps raining these days.", { level: "A2", sp: "POLITE" }, [
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("계속", "continuously", { c: ["v.계속"] }),
    w("비가", "rain", { c: ["v.비", "g.subject"] }),
    w("와요", "comes", { base: "오다", c: ["v.오다"] }),
  ]),
  s("what-up-lately", "요즘 어떻게 지내?", "How have you been lately?", { level: "A2", sp: "CASUAL" }, [
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("지내", "are you getting along", { base: "지내다" }),
  ]),
  s("so-good-really", "진짜 맛있다. 진짜로.", "This is so good. Seriously.", { level: "A2", sp: "CASUAL" }, [
    w("진짜", "really", { c: ["v.진짜"] }),
    w("맛있다", "delicious!", { c: ["v.맛있다", "g.plain-da"] }),
    w("진짜로", "for real", { note: "진짜 + 로: an adverb, 'for real'.", c: ["v.진짜"] }),
  ]),
  s("our-school", "우리 학교 앞에 맛집 많아요.", "There are lots of great restaurants near my school.", { level: "B1", sp: "POLITE" }, [
    w("우리", "our → my", { c: ["v.우리", "c.uri"] }),
    w("학교", "school", { c: ["v.학교"] }),
    w("앞에", "in front of", { c: ["g.place-e"] }),
    w("맛집", "great restaurant", { note: "맛 (taste) + 집 (house): a restaurant known for being good." }),
    w("많아요", "are many", { base: "많다" }),
  ]),
  s(
    "together-sometime",
    "언제 한번 같이 밥 먹어요.",
    "Let's grab a meal sometime.",
    { level: "A2", sp: "POLITE", ctx: "Often a friendly nicety rather than a firm plan." },
    [
      w("언제", "sometime", { c: ["v.언제"] }),
      w("한번", "once (sometime)"),
      w("같이", "together", { c: ["v.같이"] }),
      w("밥", "a meal", { c: ["v.밥"] }),
      w("먹어요", "let's eat", { base: "먹다", c: ["v.먹다"] }),
    ],
  ),
];

const cards = [
  card("VOCAB", {
    id: "vocab-jinjja",
    level: "A1",
    topic: "Reactions",
    skills: ["vocabulary", "conversation"],
    teaches: ["v.진짜"],
    interest: 0.7,
    payload: {
      concept: "v.진짜",
      examples: ["s.really", "s.so-good-really", "s.cold-today"],
      memoryHook: "진짜? is 'really?', 진짜 + adjective is 'so…'. The most-used intensifier in casual Korean.",
    },
  }),
  card("VOCAB", {
    id: "vocab-jom",
    level: "A1",
    topic: "Requests & suggestions",
    skills: ["vocabulary"],
    teaches: ["v.좀"],
    interest: 0.6,
    payload: {
      concept: "v.좀",
      examples: ["s.water-please", "s.hyung-help", "s.if-tired-rest"],
      memoryHook: "좀 literally means 'a little', but in requests it works like 'please', softening what you ask.",
    },
  }),
  card("VOCAB", {
    id: "vocab-uri",
    level: "A2",
    topic: "Culture",
    skills: ["vocabulary"],
    teaches: ["v.우리"],
    payload: {
      concept: "v.우리",
      examples: ["s.uri-mom", "s.our-school", "s.lets-talk-casual"],
      memoryHook: "우리 엄마, 우리 학교, 우리 집: 'our' where English says 'my'.",
    },
  }),
  card("VOCAB", {
    id: "vocab-yojeum",
    level: "A2",
    topic: "Daily life",
    skills: ["vocabulary"],
    teaches: ["v.요즘"],
    payload: {
      concept: "v.요즘",
      examples: ["s.what-up-lately", "s.so-busy", "s.keeps-raining"],
      memoryHook: "요즘 어떻게 지내? is the standard catch-up opener.",
    },
  }),
  card("VOCAB", {
    id: "vocab-meonjeo",
    level: "A2",
    topic: "Daily life",
    skills: ["vocabulary"],
    teaches: ["v.먼저"],
    payload: {
      concept: "v.먼저",
      examples: ["s.you-first", "s.leaving-first"],
      memoryHook: "먼저 가세요 at a door; 먼저 들어가 보겠습니다 when leaving work before others.",
    },
  }),
  card("VOCAB", {
    id: "vocab-itta",
    level: "A2",
    topic: "Texting",
    skills: ["vocabulary"],
    teaches: ["v.이따"],
    payload: {
      concept: "v.이따",
      examples: ["s.see-you-later", "s.text-later", "s.contact-later-polite"],
      memoryHook: "이따 is later today. For another day, use 나중에.",
    },
  }),
  card("VOCAB", {
    id: "vocab-yeollak",
    level: "A2",
    topic: "Texting",
    skills: ["vocabulary"],
    teaches: ["v.연락하다"],
    payload: {
      concept: "v.연락하다",
      examples: ["s.please-contact", "s.text-later", "s.contact-later-humble"],
      memoryHook: "연락 covers texts, calls and DMs. You rarely need a more specific verb.",
    },
  }),
  card("VOCAB", {
    id: "vocab-al-da",
    level: "A1",
    topic: "Daily life",
    skills: ["vocabulary"],
    teaches: ["v.알다"],
    payload: {
      concept: "v.알다",
      examples: ["s.know-them", "s.text-ok"],
      memoryHook: "알겠어요 means 'got it / understood'. 알아요 means 'I know (already)'.",
    },
  }),
  card("VOCAB", {
    id: "vocab-baro",
    level: "A2",
    topic: "Daily life",
    skills: ["vocabulary"],
    teaches: ["v.바로"],
    payload: {
      concept: "v.바로",
      examples: ["s.coming-right-away", "s.bus-4"],
      memoryHook: "바로 = right away, or exactly: 바로 여기 'right here'.",
    },
  }),
  card("VOCAB", {
    id: "vocab-gachi",
    level: "A1",
    topic: "Food",
    skills: ["vocabulary"],
    teaches: ["v.같이"],
    payload: {
      concept: "v.같이",
      examples: ["s.together-eat", "s.together-sometime", "s.lets-go-together"],
      memoryHook: "같이 sounds like [가치]. 언제 한번 같이 밥 먹어요 is often politeness, not a firm plan.",
    },
  }),
  card("CULTURE", {
    id: "culture-bap-promise",
    level: "B1",
    topic: "Culture",
    skills: ["conversation"],
    interest: 0.9,
    payload: {
      title: "'Let's eat sometime' isn't a plan",
      body: "언제 한번 밥 먹어요 is a warm way to end a conversation. It means 'I like you', not 'check your calendar'. A real plan comes with a day: 이번 주 금요일 어때요?",
      sentence: "s.together-sometime",
    },
  }),
  card("PHRASE", {
    id: "what-up-lately",
    level: "A2",
    topic: "Friends",
    skills: ["conversation"],
    teaches: ["v.요즘"],
    payload: { sentence: "s.what-up-lately", tip: "Common answers: 그냥 그렇지 ('same old'), 바빠 죽겠어 ('crazy busy')." },
  }),
];

export const words: Unit = { sentences, cards };
