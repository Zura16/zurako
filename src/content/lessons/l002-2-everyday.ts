import type { LessonInput } from "./schema";

/** Lesson 002-2 · Everyday Korean you can use right away (from "Korean_002_Everyday_Conversation"). */
export const lesson002b: LessonInput = {
  id: "lesson.002-2",
  number: "002-2",
  title: "Everyday Korean You Can Use Right Away",
  korean: "바로 써먹는 한국어 일상 회화",
  goal: "Memorize short, natural expressions Korean speakers use every day. Learn whole phrases first, then change one word to make your own sentences. This lesson is about speaking naturally and quickly, not long grammar explanations.",
  level: "BEGINNER",
  teaches: ["v.요즘", "v.그냥", "v.좀", "e.geulsse", "g.drop-subject"],
  corrections: [],
  sections: [
    {
      title: "Start a conversation",
      emoji: "👋",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "안녕하세요!", rom: "annyeonghaseyo", en: "Hello! (polite, safe almost anywhere)", sid: "s.f-hello" },
            { ko: "안녕!", rom: "annyeong", en: "Hi! / Bye! (close friends)", sid: "s.f-hello-casual" },
            { ko: "잘 지냈어요?", rom: "jal jinaesseoyo", en: "How have you been?" },
            { ko: "요즘 어때요?", rom: "yojeum eottaeyo", en: "How are things these days?", sid: "s.l2-these-days" },
            { ko: "뭐 해요?", rom: "mwo haeyo", en: "What are you doing?", sid: "s.what-do-polite" },
            { ko: "어디 가요?", rom: "eodi gayo", en: "Where are you going?" },
            { ko: "오랜만이에요!", rom: "oraenmanieyo", en: "Long time no see!", sid: "s.long-time-polite" },
          ],
        },
      ],
    },
    {
      title: "Natural short replies",
      emoji: "💬",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "그냥요.", rom: "geunyangyo", en: "Nothing much. / Just because.", sid: "s.f-just-because" },
            { ko: "집에 가요.", rom: "jibe gayo", en: "I'm going home." },
            { ko: "친구 만나러 가요.", rom: "chingu mannareo gayo", en: "I'm going to meet a friend." },
            { ko: "괜찮아요.", rom: "gwaenchanayo", en: "It's okay. / I'm fine.", sid: "s.f-its-okay" },
            { ko: "좋아요!", rom: "joayo", en: "Sounds good! / Great!", sid: "s.good-polite" },
            { ko: "진짜요?", rom: "jinjjayo", en: "Really? (polite)", sid: "s.f-jinjjayo" },
            { ko: "맞아요.", rom: "majayo", en: "That's right.", sid: "s.f-thats-right" },
            { ko: "아, 그래요?", rom: "a, geuraeyo", en: "Oh, really? / Is that so?", sid: "s.f-oh-really" },
            { ko: "저도요.", rom: "jeodoyo", en: "Me too.", sid: "s.f-me-too" },
            { ko: "잘 모르겠어요.", rom: "jal moreugesseoyo", en: "I'm not really sure.", sid: "s.i-dont-know" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A very useful reaction",
          text: "아, 그래요? ('Oh, really?') shows you're listening. Try not to answer every sentence with only 네. Short reactions make a conversation feel natural.",
        },
      ],
    },
    {
      title: "Five everyday conversation patterns",
      emoji: "🗣️",
      blocks: [
        {
          kind: "dialogue",
          title: "A · How are you?",
          lines: [
            { speaker: "A", ko: "요즘 어때요?", rom: "yojeum eottaeyo?", en: "How are things these days?", sid: "s.l2-these-days" },
            {
              speaker: "B",
              ko: "좋아요. 근데 좀 바빠요.",
              rom: "joayo. geunde jom bappayo.",
              en: "Good, but I'm a little busy.",
              sid: "s.l2-good-but-busy",
            },
            { speaker: "A", ko: "아, 그래요?", rom: "a, geuraeyo?", en: "Oh, really?", sid: "s.f-oh-really" },
          ],
        },
        {
          kind: "dialogue",
          title: "B · What are you doing?",
          lines: [
            { speaker: "A", ko: "지금 뭐 해요?", rom: "jigeum mwo haeyo?", en: "What are you doing now?", sid: "s.what-doing-now-polite" },
            { speaker: "B", ko: "그냥 쉬고 있어요.", rom: "geunyang swigo isseoyo.", en: "I'm just relaxing.", sid: "s.l2-just-resting" },
            { speaker: "A", ko: "아, 좋겠다!", rom: "a, joketda!", en: "Ah, lucky you!", sid: "s.l2-lucky-you" },
          ],
        },
        {
          kind: "dialogue",
          title: "C · Have you eaten?",
          lines: [
            { speaker: "A", ko: "밥 먹었어요?", rom: "bap meogeosseoyo?", en: "Have you eaten?", sid: "s.l2-eaten-q" },
            { speaker: "B", ko: "네, 먹었어요.", rom: "ne, meogeosseoyo.", en: "Yes, I have.", sid: "s.l2-yes-eaten" },
            { speaker: "B", ko: "아직 안 먹었어요.", rom: "ajik an meogeosseoyo.", en: "(Or) I haven't eaten yet.", sid: "s.l2-not-yet" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "밥 먹었어요? is often about care",
          text: "Asking whether someone has eaten is a common way to show you care, not only a question about food.",
        },
        {
          kind: "dialogue",
          title: "D · Making plans",
          lines: [
            { speaker: "A", ko: "주말에 뭐 해요?", rom: "jumare mwo haeyo?", en: "What are you doing this weekend?", sid: "s.l2-weekend" },
            {
              speaker: "B",
              ko: "친구 만날 거예요.",
              rom: "chingu mannal geoyeyo.",
              en: "I'm going to meet a friend.",
              sid: "s.l2-will-meet",
            },
            { speaker: "A", ko: "좋네요!", rom: "jonneyo!", en: "Sounds nice!", sid: "s.l2-sounds-nice" },
          ],
        },
        {
          kind: "dialogue",
          title: "E · Agreeing and responding",
          lines: [
            { speaker: "A", ko: "이 카페 좋아요.", rom: "i kape joayo.", en: "This café is nice.", sid: "s.l2-cafe-nice" },
            {
              speaker: "B",
              ko: "맞아요. 커피도 맛있어요.",
              rom: "majayo. keopido masisseoyo.",
              en: "Right. The coffee is good, too.",
              sid: "s.l2-right-coffee",
            },
            { speaker: "A", ko: "다음에 또 와요!", rom: "daeume tto wayo!", en: "Let's come again!", sid: "s.l2-come-again" },
          ],
        },
      ],
    },
    {
      title: "Small words that make you sound natural",
      emoji: "✨",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "좀", rom: "jom", en: "a little; softens a request or statement" },
            { ko: "근데", rom: "geunde", en: "but, by the way (conversational)" },
            { ko: "아", rom: "a", en: "oh…; shows you're reacting" },
            { ko: "진짜?", rom: "jinjja?", en: "Really? (casual; close friends)", sid: "s.really" },
            { ko: "대박!", rom: "daebak", en: "Wow! That's amazing! (very casual)" },
            { ko: "그렇구나.", rom: "geureokuna", en: "Oh, I see. (casual)" },
            { ko: "아직", rom: "ajik", en: "not yet, still" },
            { ko: "또", rom: "tto", en: "again, too" },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "Politeness tip",
          text: "Start with polite forms ending in -요, like 뭐 해요? and 괜찮아요?. Save 진짜?, 대박! and 그렇구나 for close friends or people comfortable speaking casually with you.",
        },
      ],
    },
    {
      title: "Quick word swaps",
      emoji: "🔁",
      blocks: [
        {
          kind: "callout",
          tone: "pattern",
          title: "Keep the pattern, swap one word",
          text: "You'll speak sooner if you don't build every sentence from zero.",
        },
        {
          kind: "pairs",
          rows: [
            { from: "지금 뭐 해요?", to: "지금 뭐 먹어요?", en: "What are you eating now?" },
            { from: "주말에 뭐 해요?", to: "오늘 뭐 해요?", en: "What are you doing today?" },
            { from: "친구 만나요.", to: "가족 만나요.", en: "I'm meeting family." },
            { from: "집에 가요.", to: "학교에 가요.", en: "I'm going to school." },
            { from: "아직 안 먹었어요.", to: "아직 안 갔어요.", en: "I haven't gone yet." },
          ],
        },
      ],
    },
    {
      title: "Speaking challenge",
      emoji: "🎲",
      blocks: [
        {
          kind: "speaking",
          prompts: [
            { ko: "안녕하세요! 잘 지냈어요?", rom: "annyeonghaseyo! jal jinaesseoyo?", en: "You meet someone you know, politely." },
            { ko: "그냥 쉬고 있어요.", rom: "geunyang swigo isseoyo", en: "Someone asks what you're doing. You're just relaxing." },
            { ko: "아직 안 먹었어요.", rom: "ajik an meogeosseoyo", en: "You haven't eaten yet." },
            { ko: "진짜요? 대박!", rom: "jinjjayo? daebak!", en: "A friend tells you good news." },
            { ko: "주말에 뭐 해요?", rom: "jumare mwo haeyo?", en: "Ask about their weekend." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Make it yours",
          text: "Change one word in two of these expressions and say your new sentences aloud.",
        },
      ],
    },
    {
      title: "Practice",
      emoji: "✏️",
      blocks: [
        {
          kind: "match",
          pairs: [
            { ko: "진짜요?", en: "Oh, really?" },
            { ko: "아직 안 먹었어요.", en: "I haven't eaten yet." },
            { ko: "저도요.", en: "Me too." },
            { ko: "주말에 뭐 해요?", en: "What are you doing this weekend?" },
          ],
        },
        {
          kind: "fill",
          items: [
            { before: "요즘 ", after: "?", answers: ["어때요"], en: "How are things these days?" },
            { before: "좋아요. 근데 좀 ", after: ".", answers: ["바빠요"], en: "Good, but I'm a little busy." },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Remember",
          bullets: [
            "Learn expressions as complete chunks, not only as separate words.",
            "Start with polite -요 forms. They work in most everyday situations.",
            "React with short phrases: 아, 그래요?, 맞아요, 저도요.",
            "Repeat each dialogue aloud several times, then swap one word to make it your own.",
            "천천히, 자주 말해 보세요! Speak a little, every day.",
          ],
        },
      ],
    },
  ],
};
