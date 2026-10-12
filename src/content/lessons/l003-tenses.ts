import type { LessonInput } from "./schema";

/** Lesson 003 · Everyday tenses and easy grammar (from "Korean_003_Everyday_Tenses_Grammar"). */
export const lesson003: LessonInput = {
  id: "lesson.003",
  number: "003",
  title: "Everyday Tenses and Easy Grammar",
  korean: "어제 · 오늘 · 내일 — 시제와 문법 쉽게 배우기",
  goal: "Talk about yesterday, today, and tomorrow, and understand why Korean verbs change. Each grammar point comes with common examples and a chance to speak.",
  level: "A1",
  teaches: ["g.past", "g.future", "g.haeyo", "v.어제", "v.내일", "v.매일"],
  corrections: [],
  sections: [
    {
      title: "Time words first",
      emoji: "⏰",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "어제", rom: "eoje", en: "yesterday" },
            { ko: "오늘", rom: "oneul", en: "today" },
            { ko: "내일", rom: "naeil", en: "tomorrow" },
            { ko: "지금", rom: "jigeum", en: "now" },
            { ko: "매일", rom: "maeil", en: "every day" },
            { ko: "보통", rom: "botong", en: "usually" },
            { ko: "아까", rom: "akka", en: "a little while ago" },
            { ko: "나중에", rom: "najunge", en: "later" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Key idea",
          text: "Time words tell you when something happens. The verb ending changes too, to show past, present, or future.",
        },
      ],
    },
    {
      title: "Present tense: -아요 / -어요 / -해요",
      emoji: "☀️",
      blocks: [
        {
          kind: "types",
          rows: [
            { name: "ㅏ or ㅗ stems", korean: "아요", forms: "가다 → 가요 · 보다 → 봐요", use: "Add 아요." },
            { name: "Other vowels", korean: "어요", forms: "먹다 → 먹어요 · 마시다 → 마셔요", use: "Add 어요." },
            { name: "하다 verbs", korean: "해요", forms: "공부하다 → 공부해요 · 일하다 → 일해요", use: "하다 becomes 해요." },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "How to find the stem",
          text: "Remove 다 from the dictionary form: 먹다 → 먹-, 가다 → 가-, 공부하다 → 공부하-. Then add the ending. Some verbs combine or shorten, so learn common ones together.",
        },
        {
          kind: "pairs",
          rows: [
            { from: "가다", to: "가요", en: "go (stem 가-)" },
            { from: "먹다", to: "먹어요", en: "eat (stem 먹-)" },
            { from: "마시다", to: "마셔요", en: "drink (stem 마시-)" },
            { from: "보다", to: "봐요", en: "watch, see (stem 보-)" },
            { from: "하다", to: "해요", en: "do (stem 하-)" },
            { from: "공부하다", to: "공부해요", en: "study (stem 공부하-)" },
          ],
        },
      ],
    },
    {
      title: "Past tense: -았어요 or -었어요?",
      emoji: "⏪",
      blocks: [
        {
          kind: "types",
          rows: [
            { name: "Final vowel ㅏ or ㅗ", korean: "-았어요", forms: "가 + 았어요 → 갔어요", use: "went" },
            { name: "Other vowels", korean: "-었어요", forms: "먹 + 었어요 → 먹었어요", use: "ate" },
            { name: "하다 verbs", korean: "-했어요", forms: "공부하다 → 공부했어요", use: "studied" },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "The form often shortens",
          text: "가 + 았어요 becomes 갔어요, and 보 + 았어요 becomes 봤어요. You write and say the combined form, not the separate pieces.",
        },
        {
          kind: "pairs",
          rows: [
            { from: "가다", to: "갔어요", en: "went", rom: "gasseoyo" },
            { from: "오다", to: "왔어요", en: "came", rom: "wasseoyo" },
            { from: "먹다", to: "먹었어요", en: "ate", rom: "meogeosseoyo" },
            { from: "마시다", to: "마셨어요", en: "drank", rom: "masyeosseoyo" },
            { from: "보다", to: "봤어요", en: "saw, watched", rom: "bwasseoyo" },
            { from: "하다", to: "했어요", en: "did", rom: "haesseoyo" },
            { from: "공부하다", to: "공부했어요", en: "studied", rom: "gongbuhaesseoyo" },
            { from: "만나다", to: "만났어요", en: "met", rom: "mannasseoyo" },
            { from: "쉬다", to: "쉬었어요", en: "rested", rom: "swieosseoyo" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Say it in real life",
          examples: [
            { ko: "어제 뭐 했어요?", rom: "eoje mwo haesseoyo?", en: "What did you do yesterday?", sid: "s.l3-did-yesterday" },
            { ko: "친구 만났어요.", rom: "chingu mannasseoyo.", en: "I met a friend.", sid: "s.l3-met-friend" },
            { ko: "집에서 쉬었어요.", rom: "jibeseo swieosseoyo.", en: "I rested at home.", sid: "s.l3-rested-home" },
          ],
        },
      ],
    },
    {
      title: "Future plans: -(으)ㄹ 거예요",
      emoji: "➡️",
      blocks: [
        {
          kind: "types",
          rows: [
            { name: "Stem ends in a vowel", korean: "-ㄹ 거예요", forms: "가다 → 갈 거예요", use: "will go" },
            { name: "Stem ends in a consonant", korean: "-을 거예요", forms: "먹다 → 먹을 거예요", use: "will eat" },
            { name: "하다 verbs", korean: "-할 거예요", forms: "공부하다 → 공부할 거예요", use: "will study" },
          ],
        },
        {
          kind: "pairs",
          rows: [
            { from: "가다", to: "갈 거예요", en: "will go, going to go", rom: "gal geoyeyo" },
            { from: "먹다", to: "먹을 거예요", en: "will eat", rom: "meogeul geoyeyo" },
            { from: "마시다", to: "마실 거예요", en: "will drink", rom: "masil geoyeyo" },
            { from: "보다", to: "볼 거예요", en: "will watch, see", rom: "bol geoyeyo" },
            { from: "하다", to: "할 거예요", en: "will do", rom: "hal geoyeyo" },
            { from: "공부하다", to: "공부할 거예요", en: "will study", rom: "gongbuhal geoyeyo" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Say it in real life",
          examples: [
            { ko: "내일 뭐 할 거예요?", rom: "naeil mwo hal geoyeyo?", en: "What will you do tomorrow?", sid: "s.l3-tomorrow-plan" },
            { ko: "집에서 쉴 거예요.", rom: "jibeseo swil geoyeyo.", en: "I'm going to rest at home.", sid: "s.l3-will-rest" },
          ],
        },
      ],
    },
    {
      title: "One activity, three tenses",
      emoji: "🔁",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "어제 친구 만났어요.", en: "Past: I met a friend yesterday.", sid: "s.l3-met-yesterday" },
            { ko: "오늘 친구 만나요.", en: "Present: I'm meeting a friend today.", sid: "s.l3-meet-today" },
            { ko: "내일 친구 만날 거예요.", en: "Future: I'm going to meet a friend tomorrow.", sid: "s.l3-meet-tomorrow" },
            { ko: "어제 커피 마셨어요.", en: "Past: I drank coffee yesterday.", sid: "s.l3-coffee-yesterday" },
            { ko: "오늘 커피 마셔요.", en: "Present: I'm drinking coffee today.", sid: "s.l3-coffee-today" },
            { ko: "내일 커피 마실 거예요.", en: "Future: I'll drink coffee tomorrow.", sid: "s.l3-coffee-tomorrow" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Speaking trick",
          text: "Repeat this frame with your own activities: 어제 ___았어요/었어요 → 오늘 ___아요/어요 → 내일 ___ㄹ/을 거예요. For example: 어제 공부했어요. 오늘 공부해요. 내일 공부할 거예요.",
        },
      ],
    },
    {
      title: "Everyday conversation practice",
      emoji: "🎭",
      blocks: [
        {
          kind: "dialogue",
          title: "Yesterday",
          lines: [
            { speaker: "A", ko: "어제 뭐 했어요?", en: "What did you do yesterday?", sid: "s.l3-did-yesterday" },
            { speaker: "B", ko: "친구 만났어요.", en: "I met a friend.", sid: "s.l3-met-friend" },
            { speaker: "A", ko: "뭐 먹었어요?", en: "What did you eat?", sid: "s.l3-what-ate" },
            { speaker: "B", ko: "파스타 먹었어요.", en: "I ate pasta.", sid: "s.l3-ate-pasta" },
          ],
        },
        {
          kind: "dialogue",
          title: "Tomorrow",
          lines: [
            { speaker: "A", ko: "내일 뭐 할 거예요?", en: "What will you do tomorrow?", sid: "s.l3-tomorrow-plan" },
            { speaker: "B", ko: "공부할 거예요.", en: "I'm going to study.", sid: "s.l3-will-study" },
            { speaker: "A", ko: "어디에서 공부할 거예요?", en: "Where will you study?", sid: "s.l3-where-study" },
            { speaker: "B", ko: "집에서 할 거예요.", en: "I'll do it at home.", sid: "s.l3-at-home-will" },
          ],
        },
        {
          kind: "dialogue",
          title: "Today and usually",
          lines: [
            { speaker: "A", ko: "보통 몇 시에 일어나요?", en: "What time do you usually get up?", sid: "s.l3-usually-up" },
            { speaker: "B", ko: "7시에 일어나요.", en: "I get up at 7.", sid: "s.l3-up-at-7" },
            { speaker: "A", ko: "오늘도 7시에 일어났어요?", en: "Did you get up at 7 today, too?", sid: "s.l3-up-at-7-today" },
            { speaker: "B", ko: "아니요, 8시에 일어났어요.", en: "No, I got up at 8.", sid: "s.l3-up-at-8" },
          ],
        },
      ],
    },
    {
      title: "Quick practice",
      emoji: "✏️",
      blocks: [
        {
          kind: "choose",
          items: [
            { en: "I ate yesterday.", options: ["어제 먹어요", "어제 먹었어요"], answer: 1 },
            { en: "I'll go tomorrow.", options: ["내일 가요", "내일 갈 거예요"], answer: 1 },
            { en: "I'm studying now.", options: ["지금 공부해요", "지금 공부했어요"], answer: 0 },
          ],
        },
        {
          kind: "fill",
          items: [
            { before: "어제 친구를 ", after: ".", answers: ["만났어요"], en: "I met a friend yesterday." },
            { before: "내일 커피를 ", after: ".", answers: ["마실 거예요"], en: "I'll drink coffee tomorrow." },
            { before: "지금 한국어를 ", after: ".", answers: ["공부해요", "공부하고 있어요"], en: "I'm studying Korean now." },
            { before: "가다 → ", after: "", answers: ["갔어요"], en: "past tense" },
            { before: "먹다 → ", after: "", answers: ["먹었어요"], en: "past tense" },
            { before: "공부하다 → ", after: "", answers: ["공부했어요"], en: "past tense" },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Remember",
          bullets: [
            "Present: ㅏ or ㅗ stems take -아요, other vowels -어요, and 하다 becomes 해요.",
            "Past: ㅏ or ㅗ stems take -았어요, other vowels -었어요, and 하다 becomes 했어요.",
            "Future plans: stem + -(으)ㄹ 거예요 (갈 거예요, 먹을 거예요, 할 거예요).",
            "These are beginner rules for common verbs. Some verbs change shape, so memorize frequent forms and say them aloud.",
          ],
        },
      ],
    },
  ],
};
