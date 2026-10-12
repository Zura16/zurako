import { s, w, type Unit } from "../author";

/** Full sentences from Learn lesson 001 (daily actions, polite present, questions). */

const B = { level: "BEGINNER" as const, sp: "POLITE" as const };

const sentences = [
  s("l1-eat-bread", "저는 빵을 먹어요.", "I eat bread.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("빵을", "bread (object)", {
      parts: [
        ["빵", "bread", "word"],
        ["을", "object marker, after a consonant", "particle"],
      ],
      c: ["v.빵", "g.object"],
    }),
    w("먹어요", "eat", {
      base: "먹다",
      parts: [
        ["먹", "eat", "stem"],
        ["어요", "polite ending", "ending"],
      ],
      c: ["v.먹다", "g.haeyo"],
    }),
  ]),
  s("l1-drink-coffee", "저는 커피를 마셔요.", "I drink coffee.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("커피를", "coffee (object)", {
      parts: [
        ["커피", "coffee", "word"],
        ["를", "object marker, after a vowel", "particle"],
      ],
      c: ["v.커피", "g.object"],
    }),
    w("마셔요", "drink", { base: "마시다", c: ["v.마시다", "g.haeyo"] }),
  ]),
  s("l1-study-korean", "저는 한국어를 공부해요.", "I study Korean.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("한국어를", "Korean (object)", { c: ["v.한국어", "g.object"] }),
    w("공부해요", "study", { base: "공부하다", c: ["v.공부하다", "g.haeyo"] }),
  ]),
  s("l1-reading-now", "지금 책을 읽어요.", "I'm reading a book now.", B, [
    w("지금", "now", { c: ["v.지금"] }),
    w("책을", "a book (object)", { c: ["v.책", "g.object"] }),
    w("읽어요", "read", { base: "읽다", c: ["v.읽다", "g.haeyo"] }),
  ]),
  s("l1-no-bread", "저는 빵을 안 먹어요.", "I don't eat bread.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("빵을", "bread (object)", { c: ["v.빵", "g.object"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("먹어요", "eat", { c: ["v.먹다"] }),
  ]),
  s("l1-no-coffee", "저는 커피를 안 마셔요.", "I don't drink coffee.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("커피를", "coffee (object)", { c: ["v.커피", "g.object"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("마셔요", "drink", { c: ["v.마시다"] }),
  ]),
  s("l1-no-books", "저는 책을 안 읽어요.", "I don't read books.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("책을", "books (object)", { c: ["v.책", "g.object"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("읽어요", "read", { c: ["v.읽다"] }),
  ]),
  s("l1-no-study-korean", "저는 한국어를 공부 안 해요.", "I don't study Korean.", B, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("한국어를", "Korean (object)", { c: ["v.한국어", "g.object"] }),
    w("공부", "study", { c: ["v.공부하다"] }),
    w("안", "not", { note: "With 하다 verbs, 안 usually goes right before 해요.", c: ["g.neg-an"] }),
    w("해요", "do", { c: ["v.하다"] }),
  ]),
  s("l1-eat-rice", "밥을 먹어요.", "I eat rice.", B, [
    w("밥을", "rice, a meal (object)", { c: ["v.밥", "g.object"] }),
    w("먹어요", "eat", { c: ["v.먹다", "g.haeyo"] }),
  ]),
  s("l1-drink-coffee-short", "커피를 마셔요.", "I drink coffee.", B, [
    w("커피를", "coffee (object)", { c: ["v.커피", "g.object"] }),
    w("마셔요", "drink", { c: ["v.마시다", "g.haeyo"] }),
  ]),
  s("l1-drink-coffee-q", "커피를 마셔요?", "Do you drink coffee?", B, [
    w("커피를", "coffee (object)", { c: ["v.커피", "g.object"] }),
    w("마셔요", "drink?", { note: "Same form as the statement. Raise your voice at the end to ask.", c: ["v.마시다", "g.haeyo"] }),
  ]),
  s("l1-eat-bread-q", "빵을 먹어요?", "Do you eat bread?", B, [
    w("빵을", "bread (object)", { c: ["v.빵", "g.object"] }),
    w("먹어요", "eat?", { c: ["v.먹다", "g.haeyo"] }),
  ]),
  s("l1-yes-eat", "네, 먹어요.", "Yes, I do.", B, [w("네", "yes", { c: ["e.ne-aniyo"] }), w("먹어요", "eat", { c: ["v.먹다"] })]),
  s("l1-no-eat", "아니요, 안 먹어요.", "No, I don't.", B, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("먹어요", "eat", { c: ["v.먹다"] }),
  ]),
];

export const lesson001Sentences: Unit = { sentences, cards: [] };
