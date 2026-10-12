import type { LessonInput } from "./schema";

/** Lesson 002-1 · Casual Korean: talking with friends (from "Korean_002_Beginner_Lesson"). */
export const lesson002a: LessonInput = {
  id: "lesson.002-1",
  number: "002-1",
  title: "Casual Korean: Talking with Friends",
  korean: "친구와 편하게 말하기",
  goal: "Learn how to use casual Korean with friends, make simple statements and questions, and talk about what you do.",
  level: "BEGINNER",
  teaches: ["g.banmal", "e.ne-aniyo", "v.너", "v.나", "v.영화"],
  corrections: [
    "The 'Statement' column translated 밥 먹어. as 'Eat a meal.' That's a command. Statements are now translated as statements ('I'm eating'), with the command reading noted, since casual -아/어 can be either.",
  ],
  sections: [
    {
      title: "When do we use casual Korean?",
      emoji: "👋",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "From 먹어요 to 먹어",
          text: "In Lesson 001 you learned polite forms like 먹어요. With close friends, you'll hear the casual form 먹어: the same verb without 요.",
        },
        {
          kind: "pairs",
          rows: [
            { from: "가요", to: "가", en: "go", rom: "ga" },
            { from: "먹어요", to: "먹어", en: "eat", rom: "meogeo" },
            { from: "마셔요", to: "마셔", en: "drink", rom: "masyeo" },
            { from: "공부해요", to: "공부해", en: "study", rom: "gongbuhae" },
            { from: "좋아요", to: "좋아", en: "good, nice", rom: "joa" },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "Who gets casual speech",
          text: "Use casual speech with close friends and people you're comfortable with. Use polite speech with strangers, teachers, and in most service situations.",
        },
      ],
    },
    {
      title: "Useful casual verb forms",
      emoji: "✍️",
      blocks: [
        {
          kind: "callout",
          tone: "pattern",
          title: "Learn these as whole words for now",
          text: "Many casual present-tense verbs end in 아, 어 or 해: the polite form minus 요.",
        },
        {
          kind: "pairs",
          rows: [
            { from: "가요", to: "가", en: "가다: to go", rom: "ga" },
            { from: "와요", to: "와", en: "오다: to come", rom: "wa" },
            { from: "먹어요", to: "먹어", en: "먹다: to eat", rom: "meogeo" },
            { from: "마셔요", to: "마셔", en: "마시다: to drink", rom: "masyeo" },
            { from: "봐요", to: "봐", en: "보다: to see, watch", rom: "bwa" },
            { from: "해요", to: "해", en: "하다: to do", rom: "hae" },
            { from: "공부해요", to: "공부해", en: "공부하다: to study", rom: "gongbuhae" },
            { from: "좋아해요", to: "좋아해", en: "좋아하다: to like", rom: "joahae" },
          ],
        },
      ],
    },
    {
      title: "Statements and questions",
      emoji: "💬",
      blocks: [
        {
          kind: "callout",
          tone: "pattern",
          title: "Same form, different tone",
          text: "A casual statement and a yes/no question use the same verb form. Tone, context and punctuation tell them apart. The same form can also be a friendly command (밥 먹어! 'Eat!').",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "밥 먹어.", rom: "bap meogeo.", en: "I'm eating. (Also: Eat!)", sid: "s.l2-eat" },
            { ko: "밥 먹어?", rom: "bap meogeo?", en: "Are you eating?", sid: "s.l2-eat-q" },
            { ko: "커피 마셔.", rom: "keopi masyeo.", en: "I drink coffee. (Also: Drink coffee!)", sid: "s.l2-coffee" },
            { ko: "커피 마셔?", rom: "keopi masyeo?", en: "Do you drink coffee?", sid: "s.l2-coffee-q" },
            { ko: "영어 공부해.", rom: "yeongeo gongbuhae.", en: "I study English. (Also: Study English!)", sid: "s.l2-english" },
            { ko: "영어 공부해?", rom: "yeongeo gongbuhae?", en: "Do you study English?", sid: "s.l2-english-q" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Try it out",
          text: "Say 밥 먹어. with a falling tone as a statement. Then say 밥 먹어? with a rising tone as a question. Use the slow-motion button to hear the difference.",
        },
      ],
    },
    {
      title: "Useful words for conversations",
      emoji: "🌟",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "너", rom: "neo", en: "you (casual)" },
            { ko: "나", rom: "na", en: "I, me (casual)" },
            { ko: "오늘", rom: "oneul", en: "today" },
            { ko: "지금", rom: "jigeum", en: "now" },
            { ko: "뭐", rom: "mwo", en: "what" },
            { ko: "밥", rom: "bap", en: "rice, a meal" },
            { ko: "커피", rom: "keopi", en: "coffee" },
            { ko: "영화", rom: "yeonghwa", en: "movie" },
            { ko: "친구", rom: "chingu", en: "friend" },
            { ko: "응", rom: "eung", en: "yeah, yes" },
            { ko: "아니", rom: "ani", en: "no" },
          ],
        },
      ],
    },
    {
      title: "Conversation practice",
      emoji: "🎭",
      blocks: [
        {
          kind: "dialogue",
          title: "Making plans",
          lines: [
            { speaker: "A", ko: "오늘 뭐 해?", rom: "oneul mwo hae?", en: "What are you doing today?", sid: "s.dlg-what-today" },
            { speaker: "B", ko: "친구 만나.", rom: "chingu manna.", en: "I'm meeting a friend.", sid: "s.meeting-friend" },
            { speaker: "A", ko: "영화 봐?", rom: "yeonghwa bwa?", en: "Are you watching a movie?", sid: "s.l2-movie-q" },
            { speaker: "B", ko: "응, 영화 봐!", rom: "eung, yeonghwa bwa!", en: "Yeah, I'm watching a movie!", sid: "s.l2-yeah-movie" },
          ],
        },
        {
          kind: "dialogue",
          title: "Food and drinks",
          lines: [
            { speaker: "A", ko: "밥 먹어?", rom: "bap meogeo?", en: "Are you eating?", sid: "s.l2-eat-q" },
            { speaker: "B", ko: "응, 밥 먹어.", rom: "eung, bap meogeo.", en: "Yeah, I'm eating.", sid: "s.l2-yeah-eat" },
            { speaker: "A", ko: "커피도 마셔?", rom: "keopido masyeo?", en: "Do you drink coffee, too?", sid: "s.l2-coffee-too-q" },
            {
              speaker: "B",
              ko: "아니, 커피 안 마셔.",
              rom: "ani, keopi an masyeo.",
              en: "No, I don't drink coffee.",
              sid: "s.l2-no-coffee",
            },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Three little words",
          bullets: ["응 = yeah", "아니 = no", "안 = not, don't"],
        },
      ],
    },
    {
      title: "Speaking game: ask a friend!",
      emoji: "🎲",
      blocks: [
        {
          kind: "speaking",
          prompts: [
            { ko: "오늘 공부해?", rom: "oneul gongbuhae?", en: "Ask: 'Are you studying today?' (응, 공부해. / 아니, 안 해.)" },
            { ko: "커피 마셔?", rom: "keopi masyeo?", en: "Ask: 'Do you drink coffee?' (응, 마셔. / 아니, 안 마셔.)" },
            { ko: "영화 좋아해?", rom: "yeonghwa joahae?", en: "Ask: 'Do you like movies?' (응, 좋아해. / 아니, 별로 안 좋아해.)" },
            {
              ko: "오늘 친구 만나?",
              rom: "oneul chingu manna?",
              en: "Ask: 'Are you meeting a friend today?' (응, 친구 만나. / 아니, 안 만나.)",
            },
          ],
        },
      ],
    },
    {
      title: "Practice",
      emoji: "✏️",
      blocks: [
        {
          kind: "fill",
          items: [
            { before: "가요 → ", after: "", answers: ["가"], en: "Make it casual." },
            { before: "먹어요 → ", after: "", answers: ["먹어"], en: "Make it casual." },
            { before: "공부해요 → ", after: "", answers: ["공부해"], en: "Make it casual." },
            { before: "좋아해요 → ", after: "", answers: ["좋아해"], en: "Make it casual." },
            { before: "커피 ", after: ".", answers: ["마셔"], en: "I drink coffee." },
            { before: "공부", after: "?", answers: ["해"], en: "Are you studying?" },
            { before: "안 ", after: ".", answers: ["먹어"], en: "I don't eat." },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Key points",
          bullets: [
            "Casual Korean is common among close friends, but it isn't right for every situation.",
            "Common pairs: 가요 → 가, 먹어요 → 먹어, 해요 → 해.",
            "A casual yes/no question can look exactly like a statement. Intonation and context help.",
            "안 comes before the verb: 안 가, 안 먹어, 안 마셔.",
          ],
        },
      ],
    },
  ],
};
