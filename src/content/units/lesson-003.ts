import { s, w, type Unit } from "../author";

/** Full sentences from Learn lesson 003 (everyday tenses). */

const P = { level: "A1" as const, sp: "POLITE" as const };

const sentences = [
  s("l3-did-yesterday", "어제 뭐 했어요?", "What did you do yesterday?", P, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("했어요", "did", {
      base: "하다",
      forms: [
        ["Present", "해요"],
        ["Past", "했어요"],
        ["Future", "할 거예요"],
      ],
      c: ["v.하다", "g.past"],
    }),
  ]),
  s("l3-met-friend", "친구 만났어요.", "I met a friend.", P, [
    w("친구", "a friend", { c: ["v.친구"] }),
    w("만났어요", "met", {
      base: "만나다",
      parts: [
        ["만나", "meet", "stem"],
        ["았 → ㅆ", "past, merged", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["v.만나다", "g.past"],
    }),
  ]),
  s("l3-rested-home", "집에서 쉬었어요.", "I rested at home.", P, [
    w("집에서", "at home", { c: ["v.집", "g.place-eseo"] }),
    w("쉬었어요", "rested", { base: "쉬다", c: ["v.쉬다", "g.past"] }),
  ]),
  s("l3-tomorrow-plan", "내일 뭐 할 거예요?", "What will you do tomorrow?", P, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("할 거예요", "will do", {
      base: "하다",
      parts: [
        ["하", "do", "stem"],
        ["ㄹ 거예요", "will, going to", "ending"],
      ],
      c: ["v.하다", "g.future"],
    }),
  ]),
  s("l3-will-rest", "집에서 쉴 거예요.", "I'm going to rest at home.", P, [
    w("집에서", "at home", { c: ["v.집", "g.place-eseo"] }),
    w("쉴 거예요", "will rest", { base: "쉬다", c: ["v.쉬다", "g.future"] }),
  ]),
  s("l3-met-yesterday", "어제 친구 만났어요.", "I met a friend yesterday.", P, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("친구", "a friend", { c: ["v.친구"] }),
    w("만났어요", "met", { c: ["v.만나다", "g.past"] }),
  ]),
  s("l3-meet-today", "오늘 친구 만나요.", "I'm meeting a friend today.", P, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("친구", "a friend", { c: ["v.친구"] }),
    w("만나요", "meet", { c: ["v.만나다", "g.haeyo"] }),
  ]),
  s("l3-meet-tomorrow", "내일 친구 만날 거예요.", "I'm going to meet a friend tomorrow.", P, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("친구", "a friend", { c: ["v.친구"] }),
    w("만날 거예요", "am going to meet", { c: ["v.만나다", "g.future"] }),
  ]),
  s("l3-coffee-yesterday", "어제 커피 마셨어요.", "I drank coffee yesterday.", P, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("커피", "coffee", { c: ["v.커피"] }),
    w("마셨어요", "drank", { base: "마시다", c: ["v.마시다", "g.past"] }),
  ]),
  s("l3-coffee-today", "오늘 커피 마셔요.", "I'm drinking coffee today.", P, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("커피", "coffee", { c: ["v.커피"] }),
    w("마셔요", "drink", { c: ["v.마시다", "g.haeyo"] }),
  ]),
  s("l3-coffee-tomorrow", "내일 커피 마실 거예요.", "I'll drink coffee tomorrow.", P, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("커피", "coffee", { c: ["v.커피"] }),
    w("마실 거예요", "will drink", { c: ["v.마시다", "g.future"] }),
  ]),
  s("l3-what-ate", "뭐 먹었어요?", "What did you eat?", P, [
    w("뭐", "what", { c: ["v.뭐"] }),
    w("먹었어요", "ate", { c: ["v.먹다", "g.past"] }),
  ]),
  s("l3-ate-pasta", "파스타 먹었어요.", "I ate pasta.", P, [w("파스타", "pasta"), w("먹었어요", "ate", { c: ["v.먹다", "g.past"] })]),
  s("l3-will-study", "공부할 거예요.", "I'm going to study.", P, [
    w("공부할 거예요", "am going to study", { base: "공부하다", c: ["v.공부하다", "g.future"] }),
  ]),
  s("l3-where-study", "어디에서 공부할 거예요?", "Where will you study?", P, [
    w("어디에서", "where (at)", { c: ["v.어디", "g.place-eseo"] }),
    w("공부할 거예요", "will study", { c: ["v.공부하다", "g.future"] }),
  ]),
  s("l3-at-home-will", "집에서 할 거예요.", "I'll do it at home.", P, [
    w("집에서", "at home", { c: ["v.집", "g.place-eseo"] }),
    w("할 거예요", "will do", { c: ["v.하다", "g.future"] }),
  ]),
  s("l3-usually-up", "보통 몇 시에 일어나요?", "What time do you usually get up?", P, [
    w("보통", "usually"),
    w("몇", "what (number)", { c: ["v.몇"] }),
    w("시에", "o'clock (at)", { c: ["v.시", "g.place-e"] }),
    w("일어나요", "get up", { base: "일어나다", c: ["v.일어나다", "g.haeyo"] }),
  ]),
  s("l3-up-at-7", "7시에 일어나요.", "I get up at 7.", { ...P, spoken: "일곱 시에 일어나요." }, [
    w("7시에", "at 7 o'clock", { note: "Read 일곱 시: hours use native Korean numbers.", c: ["v.시", "g.native-numbers", "g.place-e"] }),
    w("일어나요", "get up", { c: ["v.일어나다"] }),
  ]),
  s("l3-up-at-7-today", "오늘도 7시에 일어났어요?", "Did you get up at 7 today, too?", { ...P, spoken: "오늘도 일곱 시에 일어났어요?" }, [
    w("오늘도", "today too", { c: ["v.오늘", "g.also"] }),
    w("7시에", "at 7 o'clock", { c: ["v.시", "g.native-numbers"] }),
    w("일어났어요", "got up", { base: "일어나다", c: ["v.일어나다", "g.past"] }),
  ]),
  s("l3-up-at-8", "아니요, 8시에 일어났어요.", "No, I got up at 8.", { ...P, spoken: "아니요, 여덟 시에 일어났어요." }, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("8시에", "at 8 o'clock", { note: "Read 여덟 시.", c: ["v.시", "g.native-numbers"] }),
    w("일어났어요", "got up", { c: ["v.일어나다", "g.past"] }),
  ]),
];

export const lesson003Sentences: Unit = { sentences, cards: [] };
