import { s, w, type Unit } from "../author";

/** Full sentences from Learn lessons 002-1 (casual Korean) and 002-2 (everyday conversation). */

const C = { level: "BEGINNER" as const, sp: "CASUAL" as const };
const P = { level: "BEGINNER" as const, sp: "POLITE" as const };

const sentences = [
  s("l2-eat", "밥 먹어.", "I'm eating. (Also: Eat!)", C, [
    w("밥", "a meal", { c: ["v.밥", "g.drop-particle"] }),
    w("먹어", "eat", {
      base: "먹다",
      note: "Casual -아/어 works as a statement, a question, or a friendly command, depending on tone.",
      c: ["v.먹다", "g.banmal"],
    }),
  ]),
  s("l2-eat-q", "밥 먹어?", "Are you eating?", C, [w("밥", "a meal", { c: ["v.밥"] }), w("먹어", "eat?", { c: ["v.먹다", "g.banmal"] })]),
  s("l2-coffee", "커피 마셔.", "I drink coffee. (Also: Drink coffee!)", C, [
    w("커피", "coffee", { c: ["v.커피", "g.drop-particle"] }),
    w("마셔", "drink", { base: "마시다", c: ["v.마시다", "g.banmal"] }),
  ]),
  s("l2-coffee-q", "커피 마셔?", "Do you drink coffee?", C, [
    w("커피", "coffee", { c: ["v.커피"] }),
    w("마셔", "drink?", { c: ["v.마시다", "g.banmal"] }),
  ]),
  s("l2-english", "영어 공부해.", "I study English. (Also: Study English!)", C, [
    w("영어", "English", { c: ["v.영어", "g.drop-particle"] }),
    w("공부해", "study", { base: "공부하다", c: ["v.공부하다", "g.banmal"] }),
  ]),
  s("l2-english-q", "영어 공부해?", "Do you study English?", C, [
    w("영어", "English", { c: ["v.영어"] }),
    w("공부해", "study?", { c: ["v.공부하다", "g.banmal"] }),
  ]),
  s("l2-movie-q", "영화 봐?", "Are you watching a movie?", C, [
    w("영화", "a movie", { c: ["v.영화"] }),
    w("봐", "watch?", { base: "보다", c: ["v.보다", "g.banmal"] }),
  ]),
  s("l2-yeah-movie", "응, 영화 봐!", "Yeah, I'm watching a movie!", C, [
    w("응", "yeah", { c: ["e.ne-aniyo"] }),
    w("영화", "a movie", { c: ["v.영화"] }),
    w("봐", "watch", { c: ["v.보다", "g.banmal"] }),
  ]),
  s("l2-yeah-eat", "응, 밥 먹어.", "Yeah, I'm eating.", C, [
    w("응", "yeah", { c: ["e.ne-aniyo"] }),
    w("밥", "a meal", { c: ["v.밥"] }),
    w("먹어", "eat", { c: ["v.먹다", "g.banmal"] }),
  ]),
  s("l2-coffee-too-q", "커피도 마셔?", "Do you drink coffee, too?", C, [
    w("커피도", "coffee too", {
      parts: [
        ["커피", "coffee", "word"],
        ["도", "too, also", "particle"],
      ],
      c: ["v.커피", "g.also"],
    }),
    w("마셔", "drink?", { c: ["v.마시다", "g.banmal"] }),
  ]),
  s("l2-no-coffee", "아니, 커피 안 마셔.", "No, I don't drink coffee.", C, [
    w("아니", "no", { c: ["e.ne-aniyo"] }),
    w("커피", "coffee", { c: ["v.커피"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("마셔", "drink", { c: ["v.마시다", "g.banmal"] }),
  ]),
  // 002-2: everyday conversation patterns
  s("l2-these-days", "요즘 어때요?", "How are things these days?", P, [
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("어때요", "how is it", { base: "어떻다", c: ["v.어떻다", "g.haeyo"] }),
  ]),
  s("l2-good-but-busy", "좋아요. 근데 좀 바빠요.", "Good, but I'm a little busy.", P, [
    w("좋아요", "good", { c: ["v.좋다"] }),
    w("근데", "but", { note: "Conversational form of 그런데.", c: ["g.contraction"] }),
    w("좀", "a little", { c: ["v.좀"] }),
    w("바빠요", "busy", { c: ["v.바쁘다"] }),
  ]),
  s("l2-just-resting", "그냥 쉬고 있어요.", "I'm just relaxing.", P, [
    w("그냥", "just", { c: ["v.그냥"] }),
    w("쉬고 있어요", "am resting", { base: "쉬다", c: ["v.쉬다", "g.progressive"] }),
  ]),
  s("l2-lucky-you", "아, 좋겠다!", "Ah, lucky you!", P, [
    w("아", "ah"),
    w("좋겠다", "that must be nice", {
      base: "좋다",
      note: "A reaction in plain form. Fine even in a polite conversation.",
      c: ["v.좋다", "g.guess-get", "g.plain-da"],
    }),
  ]),
  s("l2-eaten-q", "밥 먹었어요?", "Have you eaten?", P, [
    w("밥", "a meal", { c: ["v.밥"] }),
    w("먹었어요", "ate", { base: "먹다", c: ["v.먹다", "g.past"] }),
  ]),
  s("l2-yes-eaten", "네, 먹었어요.", "Yes, I have.", P, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("먹었어요", "ate", { c: ["v.먹다", "g.past"] }),
  ]),
  s("l2-not-yet", "아직 안 먹었어요.", "I haven't eaten yet.", P, [
    w("아직", "yet, still"),
    w("안", "not", { c: ["g.neg-an"] }),
    w("먹었어요", "ate", { c: ["v.먹다", "g.past"] }),
  ]),
  s("l2-weekend", "주말에 뭐 해요?", "What are you doing this weekend?", P, [
    w("주말에", "on the weekend", { c: ["v.주말", "g.place-e"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("해요", "do", { c: ["v.하다", "g.haeyo"] }),
  ]),
  s("l2-will-meet", "친구 만날 거예요.", "I'm going to meet a friend.", P, [
    w("친구", "a friend", { c: ["v.친구"] }),
    w("만날 거예요", "am going to meet", { base: "만나다", c: ["v.만나다", "g.future"] }),
  ]),
  s("l2-sounds-nice", "좋네요!", "Sounds nice!", P, [w("좋네요", "that's nice!", { base: "좋다", c: ["v.좋다", "g.discovery-ne"] })]),
  s("l2-cafe-nice", "이 카페 좋아요.", "This café is nice.", P, [
    w("이", "this"),
    w("카페", "café", { c: ["v.카페", "g.drop-particle"] }),
    w("좋아요", "is nice", { c: ["v.좋다"] }),
  ]),
  s("l2-right-coffee", "맞아요. 커피도 맛있어요.", "Right. The coffee is good, too.", P, [
    w("맞아요", "right", { c: ["v.맞다"] }),
    w("커피도", "the coffee too", { c: ["v.커피", "g.also"] }),
    w("맛있어요", "is delicious", { c: ["v.맛있다"] }),
  ]),
  s("l2-come-again", "다음에 또 와요!", "Let's come again!", P, [
    w("다음에", "next time", { c: ["v.다음"] }),
    w("또", "again"),
    w("와요", "let's come", { base: "오다", note: "The 해요 form doubles as a gentle 'let's'.", c: ["v.오다"] }),
  ]),
];

export const lesson002Sentences: Unit = { sentences, cards: [] };
