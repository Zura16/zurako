import type { LessonInput } from "./schema";

/** Lesson 001 · My First Korean Lesson (from "Korean_001_Beginner_Lesson"). */
export const lesson001: LessonInput = {
  id: "lesson.001",
  number: "001",
  title: "My First Korean Lesson",
  korean: "먹어요! · 안 먹어요! · 먹어요?",
  goal: "Learn everyday verbs, make simple Korean sentences, and ask your friends questions. By the end you can choose 을 or 를, use 아요 / 어요 / 해요, make negatives with 안, and ask and answer yes/no questions.",
  level: "BEGINNER",
  teaches: ["g.object", "g.haeyo", "g.neg-an", "e.ne-aniyo", "v.먹다", "v.마시다", "v.읽다", "v.공부하다"],
  corrections: [],
  sections: [
    {
      title: "Daily actions vocabulary",
      emoji: "🏃",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "Dictionary forms end in 다",
          text: "Every verb below is in its dictionary form. To use one in a sentence, you'll change the ending in section 3.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "먹다", rom: "meokda", en: "to eat" },
            { ko: "마시다", rom: "masida", en: "to drink" },
            { ko: "자다", rom: "jada", en: "to sleep" },
            { ko: "일어나다", rom: "ireonada", en: "to wake up, get up" },
            { ko: "공부하다", rom: "gongbuhada", en: "to study" },
            { ko: "일하다", rom: "ilhada", en: "to work" },
            { ko: "가다", rom: "gada", en: "to go" },
            { ko: "오다", rom: "oda", en: "to come" },
            { ko: "보다", rom: "boda", en: "to watch, see" },
            { ko: "읽다", rom: "ikda", en: "to read" },
            { ko: "쓰다", rom: "sseuda", en: "to write" },
            { ko: "듣다", rom: "deutda", en: "to listen" },
            { ko: "놀다", rom: "nolda", en: "to play, hang out" },
            { ko: "하다", rom: "hada", en: "to do" },
            { ko: "사다", rom: "sada", en: "to buy" },
            { ko: "노래하다", rom: "noraehada", en: "to sing" },
            { ko: "수영하다", rom: "suyeonghada", en: "to swim" },
            { ko: "달리다", rom: "dallida", en: "to run" },
            { ko: "걷다", rom: "geotda", en: "to walk" },
            { ko: "전화하다", rom: "jeonhwahada", en: "to call" },
            { ko: "운동하다", rom: "undonghada", en: "to exercise" },
            { ko: "배우다", rom: "baeuda", en: "to learn" },
          ],
        },
      ],
    },
    {
      title: "Sentence patterns",
      emoji: "💬",
      blocks: [
        {
          kind: "callout",
          tone: "pattern",
          title: "Affirmative: [topic] + [object + 을/를] + [verb in polite present]",
          text: "아요 / 어요 / 해요 are polite verb endings for everyday conversation. They describe habits, general facts, or what's happening now.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "저는 빵을 먹어요.", rom: "jeoneun ppang-eul meogeoyo", en: "I eat bread.", sid: "s.l1-eat-bread" },
            { ko: "저는 커피를 마셔요.", rom: "jeoneun keopi-reul masyeoyo", en: "I drink coffee.", sid: "s.l1-drink-coffee" },
            { ko: "저는 한국어를 공부해요.", rom: "jeoneun hangugeo-reul gongbuhaeyo", en: "I study Korean.", sid: "s.l1-study-korean" },
            { ko: "지금 책을 읽어요.", rom: "jigeum chaeg-eul ilgeoyo", en: "I'm reading a book now.", sid: "s.l1-reading-now" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "저는 is optional",
          text: "저는 means 'I' as the topic. Leave it out when the subject is already clear.",
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Negative: [object + 을/를] + 안 + [verb]",
          text: "Put 안 directly before most verbs.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "저는 빵을 안 먹어요.", rom: "jeoneun ppang-eul an meogeoyo", en: "I don't eat bread.", sid: "s.l1-no-bread" },
            { ko: "저는 커피를 안 마셔요.", rom: "jeoneun keopi-reul an masyeoyo", en: "I don't drink coffee.", sid: "s.l1-no-coffee" },
            { ko: "저는 책을 안 읽어요.", rom: "jeoneun chaeg-eul an ilgeoyo", en: "I don't read books.", sid: "s.l1-no-books" },
            {
              ko: "저는 한국어를 공부 안 해요.",
              rom: "jeoneun hangugeo-reul gongbu an haeyo",
              en: "I don't study Korean.",
              sid: "s.l1-no-study-korean",
            },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "하다 verbs split around 안",
          text: "With many 하다 verbs, 안 comes right before 해요: 공부 안 해요, 운동 안 해요, 전화 안 해요. You may also hear 공부하지 않아요, but focus on 안 + verb for now.",
        },
      ],
    },
    {
      title: "Grammar guide",
      emoji: "🧠",
      blocks: [
        {
          kind: "types",
          rows: [
            {
              name: "을",
              korean: "object particle",
              forms: "밥을 · 책을 · 물을",
              use: "After a noun ending in a consonant (받침).",
              example: { ko: "밥을 먹어요.", rom: "bap-eul meogeoyo", en: "I eat rice.", sid: "s.l1-eat-rice" },
            },
            {
              name: "를",
              korean: "object particle",
              forms: "커피를 · 사과를 · 우유를",
              use: "After a noun ending in a vowel.",
              example: { ko: "커피를 마셔요.", rom: "keopi-reul masyeoyo", en: "I drink coffee.", sid: "s.l1-drink-coffee-short" },
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Look at the Korean, not the English",
          text: "Choose by the final sound of the Korean noun, not the last letter of its English translation.",
        },
        {
          kind: "types",
          rows: [
            {
              name: "아요",
              korean: "ㅏ or ㅗ stems",
              forms: "가다 → 가요 · 앉다 → 앉아요 · 보다 → 봐요",
              use: "Usually when the stem's last vowel is ㅏ or ㅗ.",
            },
            {
              name: "어요",
              korean: "other stems",
              forms: "먹다 → 먹어요 · 읽다 → 읽어요 · 마시다 → 마셔요 · 배우다 → 배워요",
              use: "Usually with every other vowel. Some vowels merge: 시 + 어요 → 셔요.",
            },
            {
              name: "해요",
              korean: "하다 verbs",
              forms: "공부하다 → 공부해요 · 운동하다 → 운동해요 · 전화하다 → 전화해요",
              use: "Every 하다 verb ends in 해요.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Statement or question? Same form",
          text: "A yes/no question uses the same verb form as the statement. Write a question mark, and raise your voice at the end when you speak. The word order doesn't change.",
          examples: [
            { ko: "커피를 마셔요.", rom: "keopi-reul masyeoyo", en: "I drink coffee.", sid: "s.l1-drink-coffee-short" },
            { ko: "커피를 마셔요?", rom: "keopi-reul masyeoyo?", en: "Do you drink coffee?", sid: "s.l1-drink-coffee-q" },
          ],
        },
      ],
    },
    {
      title: "Conversation practice",
      emoji: "🗨️",
      blocks: [
        {
          kind: "dialogue",
          title: "Do you eat bread?",
          lines: [
            { speaker: "A", ko: "빵을 먹어요?", rom: "ppang-eul meogeoyo?", en: "Do you eat bread?", sid: "s.l1-eat-bread-q" },
            { speaker: "B", ko: "네, 먹어요.", rom: "ne, meogeoyo", en: "Yes, I do.", sid: "s.l1-yes-eat" },
            { speaker: "B", ko: "아니요, 안 먹어요.", rom: "aniyo, an meogeoyo", en: "(Or) No, I don't.", sid: "s.l1-no-eat" },
          ],
        },
        {
          kind: "phrases",
          rows: [
            { ko: "네, 마셔요.", rom: "ne, masyeoyo", en: "Yes, I do. (drink)" },
            { ko: "아니요, 안 마셔요.", rom: "aniyo, an masyeoyo", en: "No, I don't. (drink)" },
            { ko: "네, 공부해요.", rom: "ne, gongbuhaeyo", en: "Yes, I do. (study)" },
            { ko: "아니요, 공부 안 해요.", rom: "aniyo, gongbu an haeyo", en: "No, I don't. (study)" },
          ],
        },
      ],
    },
    {
      title: "Speaking game: yes or no!",
      emoji: "🎲",
      blocks: [
        {
          kind: "callout",
          tone: "tip",
          title: "Answer honestly, in a full sentence",
          text: "Ask each question out loud, then answer with 네, … or 아니요, 안 … . Tap 'Show answer' to hear a model.",
        },
        {
          kind: "speaking",
          prompts: [
            {
              ko: "커피를 마셔요?",
              rom: "keopi-reul masyeoyo?",
              en: "Ask: 'Do you drink coffee?' (Answers: 네, 마셔요. / 아니요, 안 마셔요.)",
            },
            {
              ko: "한국어를 공부해요?",
              rom: "hangugeo-reul gongbuhaeyo?",
              en: "Ask: 'Do you study Korean?' (네, 공부해요. / 아니요, 공부 안 해요.)",
            },
            { ko: "책을 읽어요?", rom: "chaeg-eul ilgeoyo?", en: "Ask: 'Do you read books?' (네, 읽어요. / 아니요, 안 읽어요.)" },
            { ko: "운동해요?", rom: "undonghaeyo?", en: "Ask: 'Do you exercise?' (네, 운동해요. / 아니요, 운동 안 해요.)" },
            {
              ko: "아침에 일어나요?",
              rom: "achime ireonayo?",
              en: "Ask: 'Do you get up in the morning?' (네, 일어나요. / 아니요, 안 일어나요.)",
            },
          ],
        },
      ],
    },
    {
      title: "Practice",
      emoji: "✍️",
      blocks: [
        {
          kind: "fill",
          items: [
            { before: "저는 물", after: " 마셔요.", answers: ["을"], en: "I drink water.", hint: "물 ends in a consonant." },
            { before: "저는 책", after: " 읽어요.", answers: ["을"], en: "I read books." },
            { before: "저는 커피", after: " 안 마셔요.", answers: ["를"], en: "I don't drink coffee.", hint: "커피 ends in a vowel." },
            { before: "먹다 → ", after: "", answers: ["먹어요"], en: "eat, polite present" },
            { before: "공부하다 → ", after: "", answers: ["공부해요"], en: "study, polite present" },
            {
              before: "물을 마셔요. → ",
              after: "",
              answers: ["물을 마셔요?"],
              en: "Make it a question.",
              hint: "Same words, different punctuation.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Make your own sentences",
          bullets: [
            "Something you do every day (affirmative).",
            "Something you don't do (안 + verb).",
            "A yes/no question to ask a friend.",
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Today's key points",
          bullets: [
            "을 after a consonant (책을 읽어요), 를 after a vowel (커피를 마셔요).",
            "아요 after ㅏ or ㅗ (가요, 앉아요), 어요 for other vowels (먹어요, 읽어요), 해요 for 하다 verbs (공부해요).",
            "안 + verb makes a negative: 안 먹어요.",
            "Same form for statements and yes/no questions: 물을 마셔요. / 물을 마셔요?",
            "Answer with 네, 마셔요. or 아니요, 안 마셔요.",
            "Korean verbs come at the end of the sentence.",
          ],
        },
      ],
    },
  ],
};
