import { card, s, w, type Unit } from "../author";

const sentences = [
  s("good-polite", "좋아요!", "Sounds good!", { level: "BEGINNER", sp: "POLITE" }, [
    w("좋아요", "(it's) good", { base: "좋다", note: "Pronounced [조아요]: ㅎ goes silent between vowels.", c: ["v.좋다", "g.haeyo"] }),
  ]),
  s("many-thanks", "정말 많이 배웠어요.", "I learned so much.", { level: "A2", sp: "POLITE" }, [
    w("정말", "truly"),
    w("많이", "a lot", { note: "Pronounced [마니]." }),
    w("배웠어요", "learned", { base: "배우다", c: ["g.past"] }),
  ]),
  s("eat-what-thing", "지금 먹는 거 뭐야?", "What's that you're eating?", { level: "A2", sp: "CASUAL" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("먹는", "eating", { base: "먹다", note: "Pronounced [멍는].", c: ["v.먹다"] }),
    w("거", "thing", { c: ["g.contraction"] }),
    w("뭐야", "is what", { c: ["v.뭐"] }),
  ]),
  s("all-fine", "다 괜찮아요.", "It's all fine.", { level: "A1", sp: "POLITE" }, [
    w("다", "all"),
    w("괜찮아요", "fine", { base: "괜찮다", note: "Pronounced [괜차나요]: ㅎ in ㄶ drops.", c: ["v.괜찮다"] }),
  ]),
  s("korean-fun", "한국어 진짜 재미있어요.", "Korean is really fun.", { level: "A1", sp: "POLITE" }, [
    w("한국어", "Korean", { note: "Pronounced [한구거]: ㄱ slides onto the next vowel.", c: ["v.한국어"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("재미있어요", "is fun", { base: "재미있다", note: "Pronounced [재미이써요].", c: ["v.재미있다"] }),
  ]),
  s("hate-it", "그거 싫어요.", "I don't like that.", { level: "A1", sp: "POLITE" }, [
    w("그거", "that", { c: ["g.contraction"] }),
    w("싫어요", "dislike", { base: "싫다", note: "Pronounced [시러요]." }),
  ]),
  s("lets-go-together", "같이 가요!", "Let's go together!", { level: "A1", sp: "POLITE" }, [
    w("같이", "together", { note: "Pronounced [가치].", c: ["v.같이"] }),
    w("가요", "go", { base: "가다", c: ["v.가다"] }),
  ]),
  s("independence", "독립문역에서 내려요.", "I get off at Dongnimmun Station.", { level: "B1", sp: "POLITE" }, [
    w("독립문역에서", "at Dongnimmun Station", {
      note: "Pronounced [동님문녀게서]: nasalization, then ㄴ insertion before 역.",
      c: ["v.역", "g.place-eseo"],
    }),
    w("내려요", "get off", { base: "내리다", c: ["v.내리다"] }),
  ]),
  s("wear-clothes", "옷이 예뻐요.", "Your clothes are pretty.", { level: "A1", sp: "POLITE" }, [
    w("옷이", "clothes (subject)", {
      note: "Pronounced [오시]: ㅅ batchim moves onto the vowel and keeps its ㅅ sound.",
      c: ["g.subject"],
    }),
    w("예뻐요", "are pretty", { base: "예쁘다" }),
  ]),
];

const cards = [
  card("PRONUNCIATION", {
    id: "pron-gachi",
    level: "A1",
    topic: "Pronunciation",
    skills: ["listening", "speaking"],
    teaches: ["v.같이"],
    interest: 0.6,
    payload: {
      sentence: "s.lets-go-together",
      written: "같이",
      sounds: "[가치]",
      rule: "When a ㄷ or ㅌ final consonant meets 이, it turns into ㅈ or ㅊ.",
      more: [
        { written: "굳이", sounds: "[구지]" },
        { written: "해돋이", sounds: "[해도지]" },
        { written: "붙이다", sounds: "[부치다]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    id: "pron-nasal",
    level: "A1",
    topic: "Pronunciation",
    skills: ["listening", "speaking"],
    teaches: ["g.hapsyo"],
    interest: 0.6,
    payload: {
      sentence: "s.thanks-formal",
      written: "감사합니다",
      sounds: "[감사함니다]",
      rule: "ㄱ, ㄷ, ㅂ before ㄴ or ㅁ become ㅇ, ㄴ, ㅁ. That's why every -ㅂ니다 sounds like -ㅁ니다.",
      more: [
        { written: "먹는", sounds: "[멍는]" },
        { written: "입니다", sounds: "[임니다]" },
        { written: "박물관", sounds: "[방물관]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    id: "pron-h-drop",
    level: "A1",
    topic: "Pronunciation",
    skills: ["listening", "speaking"],
    teaches: ["v.좋다"],
    interest: 0.5,
    payload: {
      sentence: "s.good-polite",
      written: "좋아요",
      sounds: "[조아요]",
      rule: "ㅎ goes silent between vowels, or between ㄴ/ㄹ and a vowel.",
      more: [
        { written: "괜찮아요", sounds: "[괜차나요]" },
        { written: "많이", sounds: "[마니]" },
        { written: "싫어요", sounds: "[시러요]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    id: "pron-linking",
    level: "BEGINNER",
    topic: "Pronunciation",
    skills: ["listening"],
    teaches: ["v.한국어"],
    interest: 0.5,
    payload: {
      sentence: "s.korean-fun",
      written: "한국어",
      sounds: "[한구거]",
      rule: "A final consonant slides onto a following vowel. Korean flows syllable to syllable.",
      more: [
        { written: "맛있어요", sounds: "[마시써요]" },
        { written: "음악", sounds: "[으막]" },
        { written: "옷이", sounds: "[오시]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    id: "pron-meongneun",
    level: "A2",
    topic: "Pronunciation",
    skills: ["listening"],
    teaches: ["v.먹다"],
    payload: {
      sentence: "s.eat-what-thing",
      written: "먹는",
      sounds: "[멍는]",
      rule: "Nasalization again: ㄱ + ㄴ → ㅇ + ㄴ. It happens across almost every -는 form.",
      more: [
        { written: "읽는", sounds: "[잉는]" },
        { written: "작년", sounds: "[장년]" },
        { written: "국물", sounds: "[궁물]" },
      ],
    },
  }),
  card("PRONUNCIATION", {
    id: "pron-n-insertion",
    level: "B1",
    topic: "Pronunciation",
    skills: ["listening"],
    teaches: ["v.역"],
    interest: 0.5,
    payload: {
      sentence: "s.independence",
      written: "독립문역",
      sounds: "[동님문녁]",
      rule: "Several rules stack: ㄱ+ㄹ → ㅇ+ㄴ, then ㄴ inserts before 역. Station names are great practice.",
      more: [
        { written: "서울역", sounds: "[서울력]" },
        { written: "부산역", sounds: "[부산녁]" },
      ],
    },
  }),
  card("LISTENING", {
    id: "listen-joayo",
    level: "BEGINNER",
    topic: "Pronunciation",
    skills: ["listening"],
    teaches: ["v.좋다"],
    payload: { sentence: "s.all-fine", question: "What did you hear?", options: ["다 괜찮아요.", "다 좋아요.", "다 싫어요."], answer: 0 },
  }),
  card("LISTENING", {
    id: "listen-hate",
    level: "A1",
    topic: "Pronunciation",
    skills: ["listening"],
    payload: {
      sentence: "s.hate-it",
      question: "How do they feel about it?",
      options: ["They like it", "They don't like it", "They haven't tried it"],
      answer: 1,
    },
  }),
  card("PHRASE", {
    id: "learned-a-lot",
    level: "A2",
    topic: "Learner survival",
    skills: ["conversation"],
    payload: { sentence: "s.many-thanks", tip: "A nice thing to say to a teacher or a helpful friend. 많이 sounds like [마니]." },
  }),
];

export const pronunciation: Unit = { sentences, cards };
