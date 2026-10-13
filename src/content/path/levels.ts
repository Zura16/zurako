import type { ChapterSpec, LevelSpec, Source } from "./types";

/**
 * The five levels and their chapters, in study order. Each level matches a
 * feed stage (Level 1 is stage 0, Foundations), so the feed opens new cards
 * only as levels open.
 */

const mod = (module: number): Source => ({ kind: "cards", module });
const topics = (stage: number, ...names: string[]): Source => ({ kind: "cards", stage, topics: names });
const lesson = (id: string, ...sections: number[]): Source => ({ kind: "lesson", lesson: id, sections });
const words = (category: string, from?: number, to?: number): Source => ({ kind: "words", category, from, to });

const ch = (slug: string, title: string, category: ChapterSpec["category"], summary: string, sources: Source[], korean?: string) => ({
  slug,
  title,
  korean,
  category,
  summary,
  sources,
});

export const LEVEL_SPECS: LevelSpec[] = [
  {
    number: 1,
    title: "Foundations",
    korean: "기초",
    stage: 0,
    maxLevel: 0,
    blurb: "Greetings, speech levels, 이다, particles, numbers, and the words you need first.",
    chapters: [
      ch(
        "greetings",
        "Greetings and courtesy",
        "conversation",
        "Hello, goodbye, sorry and thank you, at the right politeness.",
        [mod(1)],
        "인사",
      ),
      ch(
        "speech-levels",
        "Speech levels and honorifics",
        "culture",
        "Why Korean has casual, polite and formal endings, and the three kinds of honorifics.",
        [mod(20), topics(0, "Speech levels"), lesson("lesson.007", 0, 1)],
        "높임말",
      ),
      ch("introductions", "Introducing yourself", "conversation", "Your name, where you're from, and what you do.", [mod(2)], "자기소개"),
      ch("people", "People words", "vocabulary", "Family, friends and the people around you.", [words("People & relationships")]),
      ch("yes-no", "Yes, no and reactions", "conversation", "Answering, agreeing and reacting like a Korean speaker.", [mod(3)]),
      ch("ida", "이다 and 아니다", "grammar", "Saying what something is, and what it isn't.", [mod(4)]),
      ch("itda", "있어요 and 없어요", "grammar", "Saying what you have and what there is.", [mod(5)]),
      ch("this-that", "This, that and where", "grammar", "이, 그, 저 and asking where things are.", [mod(6)]),
      ch("particles", "Your first particles", "grammar", "The small endings that mark topic, subject and object.", [mod(7)]),
      ch("questions", "Question words", "grammar", "Who, what, where, when, why and how.", [mod(8)]),
      ch("haeyo", "Everyday verbs in 해요", "grammar", "Turning dictionary verbs into polite present tense.", [mod(9)]),
      ch("verbs-1", "Everyday verbs 1", "vocabulary", "The verbs you'll use every day, part 1.", [words("Everyday verbs", 0, 27)]),
      ch("likes", "Likes and dislikes", "conversation", "좋아해요, 싫어해요 and talking about what you enjoy.", [mod(10)]),
      ch("negation", "Negation with 안", "grammar", "The quickest way to say you don't do something.", [mod(11)]),
      ch("native-numbers", "Native Korean numbers", "grammar", "하나, 둘, 셋 for counting things, people and hours.", [mod(12)]),
      ch("sino-numbers", "Sino-Korean numbers", "grammar", "일, 이, 삼 for prices, dates and minutes.", [mod(13)]),
      ch("days-time", "Days and time", "vocabulary", "Days of the week, today, tomorrow, and telling the time.", [mod(14)]),
      ch("time-words", "Time and frequency words", "vocabulary", "Always, sometimes, often, and other time words.", [
        words("Time & frequency"),
      ]),
      ch("family", "Family", "vocabulary", "Talking about your family members.", [mod(15)], "가족"),
      ch("ordering", "Food and ordering", "conversation", "Ordering food and drinks politely.", [mod(16)]),
      ch("food-words", "Food and drink words", "vocabulary", "What to eat and drink, by name.", [words("Food & drinks")]),
      ch("places", "Places and directions", "conversation", "Finding your way around a city.", [mod(17)]),
      ch("survival", "Classroom and survival", "conversation", "Asking someone to repeat, slow down, or explain.", [mod(18)]),
      ch("verbs-2", "Everyday verbs 2", "vocabulary", "The verbs you'll use every day, part 2.", [words("Everyday verbs", 27, 54)]),
      ch("sounds", "Your first sound rules", "hangul", "Why Korean is often pronounced differently from how it's written.", [
        mod(19),
        topics(0, "Pronunciation"),
      ]),
      ch("verbs-3", "Everyday verbs 3", "vocabulary", "The verbs you'll use every day, part 3.", [words("Everyday verbs", 54)]),
    ],
  },
  {
    number: 2,
    title: "Everyday basics",
    korean: "일상",
    stage: 1,
    maxLevel: 1,
    blurb: "Daily routines, casual Korean with friends, ordering food, and getting around.",
    chapters: [
      ch("daily-actions", "Daily actions", "vocabulary", "Words for what you do every day.", [lesson("lesson.001", 0)]),
      ch("first-patterns", "Your first sentence patterns", "grammar", "Building yes and no questions about daily life.", [
        lesson("lesson.001", 1, 2),
      ]),
      ch("first-talk", "Your first conversation", "conversation", "Putting the patterns into a real exchange.", [
        lesson("lesson.001", 3, 4, 5),
      ]),
      ch("daily-life", "Daily life in Korean", "conversation", "Short everyday lines about your day and the weather.", [
        topics(1, "Daily life", "Weather"),
      ]),
      ch("reactions", "Reactions and school", "conversation", "Reacting, getting by as a learner, and school.", [
        topics(1, "Reactions", "Learner survival", "School"),
      ]),
      ch(
        "casual-when",
        "When to use casual Korean",
        "culture",
        "Who you can speak 반말 with, and how the endings change.",
        [lesson("lesson.002-1", 0, 1)],
        "반말",
      ),
      ch("casual-sentences", "Casual statements and questions", "grammar", "Asking and answering in 반말.", [lesson("lesson.002-1", 2, 3)]),
      ch("casual-friends", "Talking with friends", "conversation", "Casual conversations, then your turn to speak.", [
        lesson("lesson.002-1", 4, 5, 6),
      ]),
      ch("talk-words-1", "Conversation words 1", "vocabulary", "Small words that keep a conversation going, part 1.", [
        words("Useful conversational words", 0, 19),
      ]),
      ch("start-talking", "Starting a conversation", "conversation", "Openers and short natural replies.", [lesson("lesson.002-2", 0, 1)]),
      ch("five-patterns", "Five everyday patterns", "conversation", "Five short exchanges you'll have all the time.", [
        lesson("lesson.002-2", 2),
      ]),
      ch("sound-natural", "Sounding natural", "conversation", "Fillers, quick swaps, and a speaking challenge.", [
        lesson("lesson.002-2", 3, 4, 5, 6),
      ]),
      ch("talk-words-2", "Conversation words 2", "vocabulary", "Small words that keep a conversation going, part 2.", [
        words("Useful conversational words", 19),
      ]),
      ch("grammar-in-use", "Grammar in use", "grammar", "Particles, tenses and wishes, as they appear in real sentences.", [
        topics(1, "Particles", "Tense & aspect", "Intentions & wishes", "Requests & suggestions"),
      ]),
      ch("natural-friends", "Natural speech with friends", "conversation", "How speech levels and natural phrasing sound among friends.", [
        topics(1, "Natural speech", "Speech levels", "Friends", "Social"),
      ]),
      ch("order-formula", "The ordering formula", "conversation", "One pattern that orders almost anything.", [lesson("lesson.004", 0)]),
      ch("two-numbers", "Two number systems", "grammar", "When to use 하나, 둘 and when to use 일, 이.", [lesson("lesson.004", 1, 2)]),
      ch("counters", "Counters for food and drinks", "grammar", "개, 잔, 병 and friends.", [lesson("lesson.004", 3)]),
      ch("describe-food", "Describing food", "vocabulary", "Tastes, textures and menu words.", [lesson("lesson.004", 4, 5)]),
      ch("real-order", "Ordering for real", "conversation", "A full order, step by step, and what to say if you need help.", [
        lesson("lesson.004", 6, 7, 8, 9),
      ]),
      ch("shopping-words", "Shopping and money words", "vocabulary", "Prices, paying, and how far or how long.", [
        words("Shopping & money"),
        words("Price, time & distance"),
      ]),
      ch("cafes", "Cafés, food and shopping", "conversation", "Real lines from cafés, restaurants, shops and trips.", [
        topics(1, "Café", "Food", "Restaurant", "Shopping", "Transport", "Travel"),
      ]),
      ch("directions", "Directions", "conversation", "Asking the way and understanding the answer.", [lesson("lesson.005", 0, 1, 2)]),
      ch("subway-bus", "Subway and bus", "conversation", "Lines, transfers, stops and transit cards.", [lesson("lesson.005", 3, 4)]),
      ch("taxi", "Taxis and getting around", "conversation", "Taking a taxi, and putting it all together.", [
        lesson("lesson.005", 5, 6, 7, 8, 9, 10),
      ]),
      ch("driving", "Driving", "vocabulary", "Driving words and phrases you'll hear in a car.", [lesson("lesson.005", 11, 12)]),
      ch("place-words", "Places and buildings", "vocabulary", "Where things are in a Korean city.", [words("Places & buildings")]),
      ch("transport-words", "Transport words", "vocabulary", "Getting around by subway, bus, taxi and car.", [
        words("Transportation & driving"),
      ]),
      ch("sounds-culture", "Sounds and culture", "culture", "More sound rules, and how things are done in Korea.", [
        topics(1, "Pronunciation", "Culture"),
      ]),
    ],
  },
  {
    number: 3,
    title: "Building up",
    korean: "발전",
    stage: 2,
    maxLevel: 2,
    blurb: "Past and future tense, family and relationships, and honorifics in full.",
    chapters: [
      ch("present", "Time words and present tense", "grammar", "Today, yesterday, tomorrow, and -아요/어요.", [lesson("lesson.003", 0, 1)]),
      ch("past", "Past tense", "grammar", "-았어요 or -었어요?", [lesson("lesson.003", 2)]),
      ch("future", "Future plans", "grammar", "Talking about plans with -(으)ㄹ 거예요.", [lesson("lesson.003", 3)]),
      ch("three-tenses", "Three tenses in conversation", "conversation", "One activity in past, present and future.", [
        lesson("lesson.003", 4, 5, 6),
      ]),
      ch("feelings", "Feelings and condition", "vocabulary", "How you feel, and how you're doing.", [words("Feelings & condition")]),
      ch("no-want", "Saying no and wanting", "grammar", "Negation and intentions in real sentences.", [
        topics(2, "Negation", "Intentions & wishes", "Particles"),
      ]),
      ch("can-if", "Ability, conditions and connectors", "grammar", "Can, can't, if, and linking two ideas.", [
        topics(2, "Conditions & ability", "Connectors", "Requests & suggestions", "Tense & aspect"),
      ]),
      ch("family-members", "Family members", "vocabulary", "Your family, and theirs.", [lesson("lesson.006", 0, 1)], "가족"),
      ch("dating", "Dating and partners", "conversation", "Relationship words, and talking about your partner.", [
        lesson("lesson.006", 2, 3),
      ]),
      ch("in-laws", "Meeting the parents", "culture", "What to call your partner's parents, and how to visit.", [
        lesson("lesson.006", 4, 5, 6, 7),
      ]),
      ch("family-verbs", "Family verbs and practice", "vocabulary", "Useful verbs and adjectives, then your turn to speak.", [
        lesson("lesson.006", 8, 9, 10),
      ]),
      ch("body", "Body and health", "vocabulary", "Body parts, and telling someone you're not well.", [words("Body & health")]),
      ch("polite-endings", "Polite endings", "grammar", "-아요/어요 and -(으)세요, and asking politely.", [lesson("lesson.007", 2)]),
      ch("honorific-verbs", "Honorific verbs and -(으)시-", "grammar", "드시다, 주무시다, 계시다, and the honorific marker.", [
        lesson("lesson.007", 3, 4),
      ]),
      ch("titles", "Titles and everyday politeness", "culture", "님, 선생님, and who gets the honor.", [lesson("lesson.007", 5, 6)]),
      ch("honorific-talk", "Honorific conversations", "conversation", "At a café, with a professor, and visiting someone's home.", [
        lesson("lesson.007", 7, 8),
      ]),
      ch("polite-patterns", "Polite patterns", "conversation", "Ready-made polite phrases, and a speaking challenge.", [
        lesson("lesson.007", 9, 10, 11),
      ]),
      ch("speech-wild", "Speech levels in real life", "grammar", "Casual, polite and formal Korean as people actually use them.", [
        topics(2, "Speech levels", "Honorifics"),
      ]),
      ch("weather", "Weather words", "vocabulary", "Hot, cold, rain and snow.", [words("Weather & temperature")]),
      ch("texting", "Texting", "conversation", "How Koreans text: short forms, emoticons and timing.", [topics(2, "Texting")]),
      ch("slang-reactions", "Slang and reactions", "conversation", "How Koreans react and joke.", [
        topics(2, "Slang", "Korean media", "Reactions"),
      ]),
      ch("transport-2", "Getting around town", "conversation", "Buses, subways and taxis beyond the basics.", [topics(2, "Transport")]),
      ch("eat-shop", "Eating and shopping", "conversation", "Restaurants, cafés and shops beyond the basics.", [
        topics(2, "Shopping", "Restaurant", "Café", "Food"),
      ]),
      ch("appearance", "Appearance and personality", "vocabulary", "Describing how people look and what they're like.", [
        words("Appearance & personality"),
      ]),
      ch("taste", "Food and taste", "vocabulary", "Sweet, spicy, salty, and more.", [words("Food & taste")]),
      ch("culture-2", "Culture and social life", "culture", "How social life works in Korea.", [
        topics(2, "Culture", "Social", "Pronunciation"),
      ]),
      ch(
        "friends-work",
        "Friends, work and sounding natural",
        "conversation",
        "Talking with friends and coworkers, and what to say when you're stuck.",
        [topics(2, "Friends", "Work", "Natural speech", "Learner survival")],
      ),
      ch("daily-stories", "Daily life stories", "conversation", "Everyday lines and short stories about daily life.", [
        topics(2, "Daily life"),
      ]),
      ch("blind-date", "A blind date", "conversation", "A three-part story about a first date.", [topics(2, "Dating")]),
    ],
  },
  {
    number: 4,
    title: "Real conversations",
    korean: "대화",
    stage: 3,
    maxLevel: 3,
    blurb: "Natural connectors, slang, workplace Korean, and short stories.",
    chapters: [
      ch("connecting", "Connecting ideas", "grammar", "Linking sentences the way native speakers do.", [
        topics(3, "Connectors", "Natural speech", "Speech levels", "Honorifics", "Pronunciation"),
      ]),
      ch("quality", "Quality and value words", "vocabulary", "Easy, hard, good, bad, cheap and worth it.", [
        words("Difficulty, quality & value"),
      ]),
      ch("slang", "Slang and texting", "conversation", "The casual Korean you'll see in messages and hear on TV.", [
        topics(3, "Slang", "Texting", "Reactions"),
      ]),
      ch("tech", "Technology and communication", "vocabulary", "Phones, messages and the internet.", [words("Technology & communication")]),
      ch("work", "Korean at work", "culture", "Talking with coworkers and managers.", [topics(3, "Work")], "회사"),
      ch("study-work", "Study and work words", "vocabulary", "School, jobs and the office.", [words("Study & work")]),
      ch("stories", "Short stories", "conversation", "Everyday stories told in natural Korean.", [
        topics(3, "Daily life", "Dating", "Family"),
      ]),
      ch("size", "Size, shape and amount", "vocabulary", "Big, small, many, few, and everything between.", [words("Size, shape & amount")]),
      ch("shop-move", "Shopping and transport", "conversation", "Beyond the basics in shops and on the move.", [
        topics(3, "Shopping", "Transport"),
      ]),
      ch("social-3", "Social life and culture", "culture", "Unwritten rules of Korean social life.", [topics(3, "Social", "Culture")]),
    ],
  },
  {
    number: 5,
    title: "Beyond",
    korean: "심화",
    stage: 4,
    maxLevel: 6,
    blurb: "Nuance for work and slang. More chapters are on the way.",
    chapters: [
      ch("nuance", "Work and slang nuance", "culture", "Fine shades of meaning at the office and among friends.", [
        topics(4, "Slang", "Work"),
      ]),
      ch("frames", "Useful sentence frames", "vocabulary", "Ready-made frames for longer sentences.", [words("Useful sentence frames")]),
    ],
  },
];

/** The level (as a feed stage index) a card belongs to, from its content level value. */
export const stageOfLevelValue = (levelValue: number): number => LEVEL_SPECS.findIndex((l) => levelValue <= l.maxLevel);
