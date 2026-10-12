import { card, s, w, type Unit } from "../author";

const sentences = [
  s("today-doing-casual", "오늘 뭐 하고 있어?", "What are you doing today?", {
    level: "A1", sp: "CASUAL", group: "today-doing", lit: "today what doing-be?",
    ctx: "Friends, siblings, anyone you use 반말 with.",
  }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("뭐", "what", { c: ["v.뭐", "g.contraction"], note: "Spoken form of 무엇. In conversation 뭐 is far more common." }),
    w("하고 있어", "doing (right now)", {
      base: "하다",
      parts: [["하", "do (stem)", "stem"], ["고 있", "-고 있다: in progress", "infix"], ["어", "casual ending (반말)", "ending"]],
      forms: [["Dictionary", "하다"], ["In progress", "하고 있다"], ["Casual", "하고 있어"], ["Polite", "하고 있어요"], ["Formal + honorific", "하고 계십니까"]],
      c: ["v.하다", "g.progressive", "g.banmal"],
    }),
  ]),
  s("today-doing-polite", "오늘 뭐 하고 있어요?", "What are you doing today?", {
    level: "A1", sp: "POLITE", group: "today-doing", ctx: "Coworkers, acquaintances, people you've just met.",
  }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("하고 있어요", "doing (right now)", {
      base: "하다",
      parts: [["하", "do (stem)", "stem"], ["고 있", "in progress", "infix"], ["어요", "polite ending (해요체)", "ending"]],
      c: ["v.하다", "g.progressive", "g.haeyo"],
    }),
  ]),
  s("today-doing-formal", "오늘 무엇을 하고 계십니까?", "What are you doing today, sir/ma'am?", {
    level: "B1", sp: "FORMAL", group: "today-doing",
    ctx: "An interviewer, a host on stage, a very formal workplace. Odd between friends.",
  }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("무엇을", "what (object)", { parts: [["무엇", "what (full form)", "word"], ["을", "object marker", "particle"]], c: ["v.무엇", "g.object"] }),
    w("하고 계십니까", "are you doing (honorific, formal)", {
      base: "하다",
      parts: [["하", "do", "stem"], ["고 계시", "-고 있다 with honorific 계시다", "infix"], ["ㅂ니까", "formal question ending", "ending"]],
      note: "계시다 is the honorific of 있다, so -고 있다 becomes -고 계시다 when the doer deserves respect.",
      c: ["v.하다", "g.progressive", "g.hapsyo", "g.hon-vocab"],
    }),
  ]),
  s("eating-now", "지금 밥 먹고 있어.", "I'm eating right now.", { level: "A1", sp: "CASUAL" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("밥", "a meal (lit. rice)", { c: ["v.밥", "g.drop-particle"], note: "밥을 → 밥: the object marker drops in speech." }),
    w("먹고 있어", "eating (right now)", { base: "먹다", parts: [["먹", "eat", "stem"], ["고 있", "in progress", "infix"], ["어", "casual", "ending"]], c: ["v.먹다", "g.progressive"] }),
  ]),
  s("study-cafe", "오늘 친구랑 카페에서 공부했어요.", "I studied at a café with a friend today.", {
    level: "A1", sp: "POLITE", lit: "today friend-with café-at studied",
  }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("친구랑", "with a friend", { parts: [["친구", "friend", "word"], ["랑", "with (casual)", "particle"]], c: ["v.친구", "g.with-rang"] }),
    w("카페에서", "at a café", { parts: [["카페", "café", "word"], ["에서", "at (where an action happens)", "particle"]], c: ["v.카페", "g.place-eseo"] }),
    w("공부했어요", "studied", {
      base: "공부하다",
      parts: [["공부", "study (noun)", "word"], ["했", "did (하 + past 였 → 했)", "infix"], ["어요", "polite ending", "ending"]],
      forms: [["Dictionary", "공부하다"], ["Polite present", "공부해요"], ["Polite past", "공부했어요"], ["Casual past", "공부했어"]],
      c: ["v.공부하다", "g.past", "g.haeyo"],
    }),
  ]),
  s("studying-korean", "저는 한국어를 공부하고 있어요.", "I'm studying Korean.", { level: "A1", sp: "POLITE" }, [
    w("저는", "I (topic)", { parts: [["저", "I (humble)", "word"], ["는", "topic marker", "particle"]], c: ["v.저", "g.topic"] }),
    w("한국어를", "Korean (object)", { parts: [["한국어", "Korean language", "word"], ["를", "object marker", "particle"]], c: ["v.한국어", "g.object"] }),
    w("공부하고 있어요", "am studying", {
      base: "공부하다",
      parts: [["공부하", "study", "stem"], ["고 있", "in progress / these days", "infix"], ["어요", "polite", "ending"]],
      forms: [["Dictionary", "공부하다"], ["Be studying", "공부하고 있다"], ["Polite", "공부하고 있어요"]],
      note: "-고 있다 can also mean 'these days', not only 'this second'.",
      c: ["v.공부하다", "g.progressive", "g.haeyo"],
    }),
  ]),
  s("where-going-now", "지금 어디 가요?", "Where are you going now?", { level: "A1", sp: "POLITE" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("어디", "where (to)", { c: ["v.어디", "g.drop-particle"], note: "Full form 어디에. The 에 usually drops." }),
    w("가요", "go (polite)", { base: "가다", c: ["v.가다", "g.haeyo"] }),
  ]),
  s("what-eat-today", "오늘 뭐 먹어요?", "What are you eating today?", { level: "A1", sp: "POLITE" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("먹어요", "eat (polite)", { base: "먹다", c: ["v.먹다", "g.haeyo"] }),
  ]),
  s("what-doing-now-polite", "지금 뭐 해요?", "What are you doing now?", { level: "A1", sp: "POLITE" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해요", "do (polite)", { base: "하다", c: ["v.하다", "g.haeyo"] }),
  ]),
  s("see-you-tomorrow", "내일 봐!", "See you tomorrow!", { level: "A1", sp: "CASUAL", lit: "tomorrow see" }, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("봐", "see (you)", { base: "보다", note: "보다 'to see' + casual 아 → 봐. Polite: 내일 봬요.", c: ["v.보다", "g.banmal"] }),
  ]),
  s("text-later", "이따 연락할게.", "I'll text you later.", { level: "A2", sp: "CASUAL" }, [
    w("이따", "later (today)", { c: ["v.이따"] }),
    w("연락할게", "I'll contact you", {
      base: "연락하다",
      parts: [["연락하", "contact", "stem"], ["ㄹ게", "I'll (promise)", "ending"]],
      note: "연락 covers texting, calling, messaging. It's the go-to verb.",
      c: ["v.연락하다", "g.promise-ge"],
    }),
  ]),
  s("long-time-casual", "오랜만이야!", "Long time no see!", { level: "A2", sp: "CASUAL", group: "long-time" }, [
    w("오랜만이야", "it's been a long time", { parts: [["오랜만", "a long while", "word"], ["이야", "is (casual)", "ending"]], c: ["v.오랜만", "g.banmal"] }),
  ]),
  s("long-time-polite", "오랜만이에요!", "It's been a while!", { level: "A2", sp: "POLITE", group: "long-time" }, [
    w("오랜만이에요", "it's been a long time", { parts: [["오랜만", "a long while", "word"], ["이에요", "is (polite)", "ending"]], c: ["v.오랜만", "g.haeyo"] }),
  ]),
  s("are-you-okay", "괜찮아요?", "Are you okay?", { level: "A1", sp: "POLITE" }, [
    w("괜찮아요", "(are you) okay", { base: "괜찮다", c: ["v.괜찮다", "g.haeyo", "g.drop-subject"] }),
  ]),
  s("no-thanks", "아니요, 괜찮아요.", "No thanks, I'm good.", { level: "A1", sp: "POLITE" }, [
    w("아니요", "no"),
    w("괜찮아요", "it's fine / no thanks", { base: "괜찮다", c: ["v.괜찮다"] }),
  ]),
  s("its-fine-casual", "괜찮아, 괜찮아.", "It's fine, don't worry about it.", { level: "A1", sp: "CASUAL" }, [
    w("괜찮아", "it's okay", { base: "괜찮다", c: ["v.괜찮다", "g.banmal"] }),
    w("괜찮아", "it's okay", { base: "괜찮다", c: ["v.괜찮다"] }),
  ]),
  s("what-mean", "그게 무슨 뜻이에요?", "What does that mean?", { level: "A2", sp: "POLITE" }, [
    w("그게", "that (subject)", { parts: [["그거", "that thing", "contraction"], ["이 → 게", "subject marker, merged", "particle"]], c: ["g.contraction"] }),
    w("무슨", "what (kind of)", { c: ["v.무슨"] }),
    w("뜻이에요", "is the meaning", { parts: [["뜻", "meaning", "word"], ["이에요", "is (polite)", "ending"]] }),
  ]),
  s("say-again", "다시 한 번 말해 주세요.", "Could you say that again, please?", { level: "A1", sp: "POLITE" }, [
    w("다시", "again", { c: ["v.다시"] }),
    w("한", "one", { note: "Native Korean number 하나 shortens to 한 before a counter." }),
    w("번", "time (counter)"),
    w("말해 주세요", "please say", { base: "말하다", parts: [["말해", "say", "stem"], ["주세요", "please (for me)", "ending"]], c: ["v.말하다", "g.request-juseyo"] }),
  ]),
  s("speak-slowly", "천천히 말해 주세요.", "Please speak slowly.", { level: "A1", sp: "POLITE" }, [
    w("천천히", "slowly", { c: ["v.천천히"] }),
    w("말해 주세요", "please speak", { base: "말하다", c: ["v.말하다", "g.request-juseyo"] }),
  ]),
  s("i-dont-know", "잘 모르겠어요.", "I'm not really sure.", { level: "A2", sp: "POLITE", lit: "well don't-know-(guess)" }, [
    w("잘", "well", { c: ["v.잘"] }),
    w("모르겠어요", "(I) don't know", { base: "모르다", parts: [["모르", "not know", "stem"], ["겠", "softener", "infix"], ["어요", "polite", "ending"]], note: "모르겠어요 sounds softer than 몰라요, which can come off blunt.", c: ["v.모르다", "g.guess-get"] }),
  ]),
  s("get-home-safe", "조심히 가요.", "Get home safe.", { level: "A2", sp: "POLITE", lit: "carefully go" }, [
    w("조심히", "carefully"),
    w("가요", "go", { base: "가다", c: ["v.가다", "e.joshimhi"] }),
  ]),
  s("cold-today", "오늘 진짜 춥네.", "It's really cold today, huh.", { level: "A2", sp: "CASUAL" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("춥네", "is cold (I notice)", { base: "춥다", parts: [["춥", "be cold", "stem"], ["네", "reaction to what you notice", "ending"]], c: ["v.춥다", "g.discovery-ne"] }),
  ]),
  s("so-busy", "요즘 너무 바빠요.", "I've been so busy lately.", { level: "A1", sp: "POLITE" }, [
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("너무", "so, too", { c: ["v.너무"], note: "Originally 'too much', now often just 'very'." }),
    w("바빠요", "am busy", { base: "바쁘다", note: "ㅡ drops before 아/어: 바쁘 + 아요 → 바빠요.", c: ["v.바쁘다"] }),
  ]),
  s("tired-slept-early", "너무 피곤해서 일찍 잤어요.", "I was so tired that I went to bed early.", { level: "A2", sp: "POLITE" }, [
    w("너무", "so", { c: ["v.너무"] }),
    w("피곤해서", "because (I was) tired", { base: "피곤하다", parts: [["피곤해", "be tired", "stem"], ["서", "because / so", "ending"]], c: ["v.피곤하다", "g.because-aseo"] }),
    w("일찍", "early"),
    w("잤어요", "slept", { base: "자다", c: ["v.자다", "g.past"] }),
  ]),
  s("just-curious", "그냥 궁금해서 물어봤어.", "I just asked because I was curious.", { level: "B1", sp: "CASUAL" }, [
    w("그냥", "just", { c: ["v.그냥"] }),
    w("궁금해서", "because (I) wondered", { base: "궁금하다", c: ["v.궁금하다", "g.because-aseo"] }),
    w("물어봤어", "asked", { base: "물어보다", parts: [["물어", "ask", "stem"], ["봤", "try / did (보다, past)", "infix"], ["어", "casual", "ending"]], c: ["g.past", "g.try-aboda"] }),
  ]),
  s("weekend-plans-polite", "주말에 뭐 할 거예요?", "What are you doing this weekend?", { level: "A2", sp: "POLITE" }, [
    w("주말에", "on the weekend", { parts: [["주말", "weekend", "word"], ["에", "at/on (time)", "particle"]], c: ["v.주말", "g.place-e"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("할 거예요", "will (you) do", { base: "하다", parts: [["하", "do", "stem"], ["ㄹ 거예요", "will / going to", "ending"]], c: ["v.하다", "g.future"] }),
  ]),
  s("weekend-plans-casual", "주말에 뭐 해?", "What are you up to this weekend?", { level: "A1", sp: "CASUAL" }, [
    w("주말에", "on the weekend", { c: ["v.주말", "g.place-e"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해", "do", { base: "하다", note: "Present tense covers near-future plans in speech.", c: ["v.하다", "g.banmal"] }),
  ]),
  s("weekend-plans-casual-2", "이번 주말에 뭐 해?", "What are you doing this weekend?", { level: "A1", sp: "CASUAL" }, [
    w("이번", "this (coming)", { c: ["v.이번"] }),
    w("주말에", "weekend-on", { c: ["v.주말"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해", "do", { base: "하다", c: ["v.하다"] }),
  ]),
  s("weekend-plans-casual-3", "주말에 뭐 할 거야?", "What are you gonna do this weekend?", { level: "A2", sp: "CASUAL" }, [
    w("주말에", "weekend-on", { c: ["v.주말"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("할 거야", "going to do", { base: "하다", c: ["v.하다", "g.future", "g.banmal"] }),
  ]),
  s("just-home", "그냥 집에서 쉴 거예요.", "I'm just going to rest at home.", { level: "A2", sp: "POLITE" }, [
    w("그냥", "just", { c: ["v.그냥"] }),
    w("집에서", "at home", { parts: [["집", "home", "word"], ["에서", "at (action)", "particle"]], c: ["v.집", "g.place-eseo"] }),
    w("쉴 거예요", "will rest", { base: "쉬다", c: ["v.쉬다", "g.future"] }),
  ]),
];

const cards = [
  card("PHRASE", {
    id: "today-doing", level: "A1", topic: "Daily life", skills: ["conversation", "grammar"],
    teaches: ["g.progressive", "g.banmal"], interest: 0.6,
    payload: { sentence: "s.today-doing-casual", tip: "Between friends this is a warm 'what are you up to?'. The formal version would sound like an interview." },
  }),
  card("SPEECH_LEVELS", {
    id: "levels-today-doing", level: "A2", topic: "Daily life", skills: ["honorifics", "conversation"],
    teaches: ["g.banmal", "g.haeyo", "g.hapsyo"], interest: 0.7,
    payload: {
      situation: "Asking what someone is up to today",
      variants: [
        { level: "CASUAL", sentence: "s.today-doing-casual", when: "Close friends, siblings, people younger than you who you're close to." },
        { level: "POLITE", sentence: "s.today-doing-polite", when: "A coworker, a classmate you just met, a neighbor." },
        { level: "FORMAL", sentence: "s.today-doing-formal", when: "A TV host interviewing a guest, a very formal business setting." },
      ],
      takeaway: "The formal version is grammatically perfect. Said to a friend, it sounds like a news anchor and creates distance instead of respect.",
    },
  }),
  card("PHRASE", {
    id: "study-cafe", level: "A1", topic: "Daily life", skills: ["reading", "grammar"], teaches: ["g.place-eseo", "g.with-rang"],
    payload: { sentence: "s.study-cafe", tip: "Tap each chunk: 친구랑 and 카페에서 show particles stacking onto nouns." },
  }),
  card("PHRASE", {
    id: "where-going", level: "A1", topic: "Daily life", skills: ["conversation"], teaches: ["v.어디"],
    payload: { sentence: "s.where-going-now", tip: "Koreans ask this as small talk, like 'where are you off to?'. A vague answer like 집에요 is fine." },
  }),
  card("PHRASE", {
    id: "see-you-tomorrow", level: "A1", topic: "Daily life", skills: ["conversation"], teaches: ["v.내일", "v.보다"],
    payload: { sentence: "s.see-you-tomorrow", tip: "To someone you speak politely to: 내일 봬요. (봬요 is a contraction of 뵈어요, from the humble verb 뵈다.)" },
  }),
  card("PHRASE", {
    id: "text-later", level: "A2", topic: "Texting", skills: ["conversation", "grammar"], teaches: ["g.promise-ge", "v.연락하다"],
    payload: { sentence: "s.text-later", tip: "-ㄹ게 promises something to the listener. Polite: 이따 연락할게요." },
  }),
  card("PHRASE", {
    id: "dont-know", level: "A2", topic: "Learner survival", skills: ["conversation"], teaches: ["v.모르다"],
    payload: { sentence: "s.i-dont-know", tip: "The -겠- here softens it. 몰라요 is correct but can sound curt, like 'dunno'." },
  }),
  card("PHRASE", {
    id: "what-mean", level: "A2", topic: "Learner survival", skills: ["conversation"], teaches: ["v.무슨"], interest: 0.4,
    payload: { sentence: "s.what-mean", tip: "Point at a word and ask this. Lifesaver." },
  }),
  card("PHRASE", {
    id: "say-again", level: "A1", topic: "Learner survival", skills: ["conversation"], teaches: ["v.다시"],
    payload: { sentence: "s.say-again", tip: "Shorter, still polite: 네? with a rising tone. Means 'Sorry?'" },
  }),
  card("PHRASE", {
    id: "busy-lately", level: "A1", topic: "Daily life", skills: ["conversation", "vocabulary"], teaches: ["v.요즘", "v.바쁘다"],
    payload: { sentence: "s.so-busy", tip: "요즘 바빠요? ('Busy lately?') is a standard catch-up question." },
  }),
  card("VOCAB", {
    id: "vocab-gwaenchanta", level: "A1", topic: "Daily life", skills: ["vocabulary", "conversation"], teaches: ["v.괜찮다"], interest: 0.6,
    payload: {
      concept: "v.괜찮다",
      examples: ["s.are-you-okay", "s.no-thanks", "s.its-fine-casual"],
      memoryHook: "One word, three jobs: 'Are you okay?', 'It's fine', and a polite 'No thanks'.",
    },
  }),
  card("VOCAB", {
    id: "vocab-geunyang", level: "A2", topic: "Daily life", skills: ["vocabulary"], teaches: ["v.그냥"],
    payload: {
      concept: "v.그냥",
      examples: ["s.just-curious", "s.just-home"],
      memoryHook: "그냥 is the answer to '왜?' when there's no real reason. 'Just because.'",
    },
  }),
  card("LISTENING", {
    id: "listen-where-going", level: "A1", topic: "Daily life", skills: ["listening"], teaches: ["v.어디"],
    payload: { sentence: "s.where-going-now", question: "What did they say?", options: ["지금 뭐 해요?", "지금 어디 가요?", "오늘 뭐 먹어요?"], answer: 1 },
  }),
  card("LISTENING", {
    id: "listen-long-time", level: "A2", topic: "Speech levels", skills: ["listening", "honorifics"], teaches: ["g.haeyo"],
    payload: { sentence: "s.long-time-polite", question: "Which speech level did you hear?", options: ["Casual (반말)", "Polite (해요체)", "Formal (하십시오체)"], answer: 1 },
  }),
  card("SPEAKING", {
    id: "speak-weekend", level: "A1", topic: "Daily life", skills: ["speaking", "conversation"], teaches: ["v.주말"],
    payload: {
      prompt: "Ask a close friend what they're doing this weekend.",
      context: "Casual (반말).",
      accepted: ["s.weekend-plans-casual", "s.weekend-plans-casual-2", "s.weekend-plans-casual-3"],
      checks: [{ label: "Weekend", anyOf: ["주말"] }, { label: "What", anyOf: ["뭐", "무엇"] }],
    },
  }),
  card("FILL_BLANK", {
    id: "fill-eseo", level: "A1", topic: "Particles", skills: ["grammar"], teaches: ["g.place-eseo"],
    payload: { sentence: "s.study-cafe", blank: "에서", options: ["에서", "에", "를"], hint: "Where an action happens." },
  }),
  card("GRAMMAR", {
    id: "grammar-progressive", level: "A2", topic: "Tense & aspect", skills: ["grammar"], teaches: ["g.progressive"], interest: 0.4,
    payload: {
      concept: "g.progressive",
      hook: "-고 있다 means something is in progress: right now, or these days.",
      formation: [{ base: "하다", result: "하고 있어요" }, { base: "먹다", result: "먹고 있어요" }, { base: "자다", result: "자고 있어요" }],
      examples: ["s.eating-now", "s.studying-korean", "s.today-doing-casual"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-future", level: "A2", topic: "Tense & aspect", skills: ["grammar"], teaches: ["g.future"],
    payload: {
      concept: "g.future",
      hook: "-(으)ㄹ 거예요 talks about plans: 'going to'.",
      formation: [{ base: "하다", result: "할 거예요" }, { base: "쉬다", result: "쉴 거예요" }, { base: "먹다", result: "먹을 거예요" }],
      examples: ["s.weekend-plans-polite", "s.just-home"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-because", level: "A2", topic: "Connectors", skills: ["grammar"], teaches: ["g.because-aseo"],
    payload: {
      concept: "g.because-aseo",
      hook: "-아서/어서 gives a reason: 'so…' or 'because…'.",
      formation: [{ base: "피곤하다", result: "피곤해서" }, { base: "궁금하다", result: "궁금해서" }, { base: "바쁘다", result: "바빠서" }],
      examples: ["s.tired-slept-early", "s.just-curious"],
    },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-ne", level: "A2", topic: "Reactions", skills: ["grammar", "conversation"], teaches: ["g.discovery-ne"],
    payload: {
      prompt: "You step outside and the wind hits you. You say to your friend:",
      options: [
        { text: "오늘 진짜 춥네.", correct: true, why: "-네 reacts to something you just noticed. Perfect here." },
        { text: "오늘 진짜 추울 거야.", why: "That's a prediction ('it'll be cold'), not a reaction." },
        { text: "오늘 진짜 춥습니까?", why: "A formal question. Strange to ask a friend about weather you both feel." },
      ],
    },
  }),
];

export const daily: Unit = { sentences, cards };
