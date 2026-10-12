import { card, s, w, type Unit } from "../author";

const sentences = [
  s("ate-reply", "응, 먹었어. 너는?", "Yeah, I ate. You?", { level: "A1", sp: "CASUAL" }, [
    w("응", "yeah"),
    w("먹었어", "ate", { base: "먹다", c: ["v.먹다", "g.past"] }),
    w("너는", "and you?", { parts: [["너", "you (casual)", "word"], ["는", "topic: 'what about…'", "particle"]], c: ["v.너", "g.topic"] }),
  ]),
  s("nunchi-fast", "걔는 눈치가 진짜 빨라.", "They're really quick at reading the room.", { level: "B1", sp: "CASUAL" }, [
    w("걔는", "that person (topic)", { c: ["g.contraction", "g.topic"] }),
    w("눈치가", "social sense (subject)", { c: ["c.nunchi", "g.subject"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("빨라", "is fast", { base: "빠르다" }),
  ]),
  s("nunchi-none", "너 진짜 눈치 없다.", "You really can't read the room.", { level: "B1", sp: "CASUAL" }, [
    w("너", "you", { c: ["v.너"] }),
    w("진짜", "really", { c: ["v.진짜"] }),
    w("눈치", "social sense", { c: ["c.nunchi"] }),
    w("없다", "don't have", { base: "없다", c: ["v.없다", "g.plain-da"] }),
  ]),
  s("uri-mom", "우리 엄마가 그랬어.", "My mom said so.", { level: "A2", sp: "CASUAL", lit: "our mom did so" }, [
    w("우리", "our → my", { c: ["v.우리", "c.uri"] }),
    w("엄마가", "mom (subject)", { c: ["v.엄마", "g.subject"] }),
    w("그랬어", "said / did so", { base: "그러다", c: ["g.past"] }),
  ]),
  s("hurry-up", "빨리빨리 하자!", "Let's hurry up!", { level: "A2", sp: "CASUAL" }, [
    w("빨리빨리", "quickly quickly", { c: ["c.ppalli"] }),
    w("하자", "let's do", { base: "하다", c: ["v.하다", "g.lets-ja"] }),
  ]),
  s("pour-two-hands", "제가 한 잔 따라 드릴게요.", "Let me pour you a glass.", { level: "B1", sp: "POLITE" }, [
    w("제가", "I (subject, humble)", { parts: [["저", "I", "word"], ["가 → 제가", "subject marker", "particle"]], c: ["v.저", "g.subject"] }),
    w("한", "one"),
    w("잔", "glass", { c: ["v.잔"] }),
    w("따라 드릴게요", "will pour for you (humble)", { base: "따르다", note: "드리다 is the humble form of 주다: doing something for a senior.", c: ["g.humble", "g.promise-ge"] }),
  ]),
];

const cards = [
  card("CULTURE", {
    id: "culture-bap", level: "A1", topic: "Culture", skills: ["conversation"], teaches: ["c.bap-greeting"], interest: 0.9,
    payload: {
      title: "밥 먹었어? often just means 'hi'",
      body: "Between friends and family, asking whether someone has eaten works like 'How are you?'. A short answer is fine: 응, 먹었어. 너는? Nobody expects a menu.",
      sentence: "s.ate-casual",
    },
  }),
  card("PHRASE", {
    id: "ate-reply", level: "A1", topic: "Culture", skills: ["conversation"], teaches: ["v.너"],
    payload: { sentence: "s.ate-reply", tip: "너는? turns the question back: 'and you?'. Polite: 저는요? or just 네, 먹었어요." },
  }),
  card("CULTURE", {
    id: "culture-nunchi", level: "B1", topic: "Culture", skills: ["conversation"], teaches: ["c.nunchi"], interest: 1,
    payload: {
      title: "눈치: this app's name",
      body: "눈치 is the skill of sensing what people think and feel without being told: when to leave, when someone's refusal means no, who should speak first. Speech levels are 눈치 written into the grammar.",
      sentence: "s.nunchi-fast",
    },
  }),
  card("PHRASE", {
    id: "nunchi-none", level: "B1", topic: "Culture", skills: ["conversation", "slang"], teaches: ["c.nunchi"], interest: 0.8,
    payload: { sentence: "s.nunchi-none", tip: "눈치 없다 is a common, slightly harsh criticism. 눈치 보다 means 'to walk on eggshells'." },
  }),
  card("CULTURE", {
    id: "culture-uri", level: "A2", topic: "Culture", skills: ["conversation"], teaches: ["c.uri", "v.우리"], interest: 0.8,
    payload: {
      title: "우리 엄마: 'our' mom, even if you're an only child",
      body: "Koreans say 우리 ('our') for family, home, school, country: 우리 엄마, 우리 집, 우리 회사. Using 내 엄마 sounds odd. It reflects a sense of belonging to a group.",
      sentence: "s.uri-mom",
    },
  }),
  card("CULTURE", {
    id: "culture-ppalli", level: "A2", topic: "Culture", skills: ["conversation"], teaches: ["c.ppalli"], interest: 0.7,
    payload: {
      title: "빨리빨리",
      body: "'Hurry hurry' culture: same-day delivery, instant internet, elevators with an always-pressed close button. Koreans joke about it themselves.",
      sentence: "s.hurry-up",
    },
  }),
  card("CULTURE", {
    id: "culture-drinking", level: "B1", topic: "Culture", skills: ["honorifics"], teaches: ["c.drinking", "g.humble"], interest: 0.8,
    payload: {
      title: "Pouring for a senior",
      body: "At a 술자리 (drinking gathering), you pour for seniors with two hands and receive their pour with two hands. Juniors often turn their head slightly away to drink. Nobody pours their own glass.",
      sentence: "s.pour-two-hands",
    },
  }),
  card("CULTURE", {
    id: "culture-dangsin", level: "A2", topic: "Culture", skills: ["honorifics"], teaches: ["c.dangsin"], interest: 0.9,
    payload: {
      title: "Why Koreans almost never say 'you'",
      body: "당신 exists, but aimed at someone can sound cold, like the start of an argument. Couples, song lyrics, and ads use it. Day to day, people drop 'you' or use a name or title: 팀장님, 선배, 지민 씨.",
      sentence: "s.lunch-hon",
    },
  }),
];

export const cultureUnit: Unit = { sentences, cards };
