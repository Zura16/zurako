import type { LessonInput } from "./schema";

/** Lesson 006 · Family and romantic relationships (from "Korean_006_Family_Relationships"). */
export const lesson006: LessonInput = {
  id: "lesson.006",
  number: "006",
  title: "Family and Romantic Relationships",
  korean: "가족 · 연애 · 애인 부모님과 대화할 때 쓰는 한국어",
  goal: "Talk about your family and your relationship, introduce your partner, and speak politely when meeting or talking with your partner's parents.",
  level: "A2",
  teaches: ["v.가족", "v.부모님", "v.동생", "g.with-rang", "g.humble", "g.hon-vocab", "g.hapsyo"],
  corrections: [
    "'따님과 교제하고 있습니다' was romanized 'gyohago'; it's 'gyojehago'.",
    "도와드리다 was labelled 'to help (honorific)'. It's a humble form, as lesson 007 says.",
    "Added notes: the father-in-law's lines are 하게체 (an old-fashioned level elders use with adult juniors), and many mothers-in-law use 자네 or 김 서방 rather than 너 with a son-in-law.",
  ],
  sections: [
    {
      title: "Essential family phrases",
      emoji: "👨‍👩‍👧‍👦",
      blocks: [
        {
          kind: "phrases",
          rows: [
            {
              ko: "가족이 몇 명이에요?",
              rom: "gajogi myeot myeong-ieyo",
              en: "How many people are in your family?",
              sid: "s.l6-family-size",
            },
            {
              ko: "가족이랑 같이 살아요?",
              rom: "gajogirang gachi sarayo",
              en: "Do you live with your family?",
              sid: "s.l6-live-with-family",
            },
            { ko: "형제자매가 있어요?", rom: "hyeongje-jamaega isseoyo", en: "Do you have any siblings?" },
            { ko: "가족이 보고 싶어요.", rom: "gajogi bogo sipeoyo", en: "I miss my family.", sid: "s.l6-miss-family" },
            { ko: "부모님은 잘 지내세요?", rom: "bumonimeun jal jinaeseyo", en: "How are your parents?", sid: "s.h-parents-well" },
            { ko: "가족이랑 자주 만나요?", rom: "gajogirang jaju mannayo", en: "Do you see your family often?" },
            { ko: "저는 혼자 살아요.", rom: "jeoneun honja sarayo", en: "I live alone.", sid: "s.l6-live-alone" },
            { ko: "주말에 가족을 만나러 가요.", rom: "jumare gajogeul mannareo gayo", en: "I'm going to see my family this weekend." },
            { ko: "가족이 정말 화목해요.", rom: "gajogi jeongmal hwamokhaeyo", en: "My family gets along really well." },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "[Person] + 랑/하고 같이 살아요",
          text: "I live with [person].",
          examples: [
            { ko: "가족이랑 같이 살아요.", rom: "gajogirang gachi sarayo", en: "I live with my family." },
            { ko: "친구하고 같이 살아요.", rom: "chinguhago gachi sarayo", en: "I live with a friend." },
          ],
        },
      ],
    },
    {
      title: "Family members",
      emoji: "👪",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "가족", rom: "gajok", en: "family" },
            { ko: "부모님", rom: "bumonim", en: "parents (respectful)" },
            { ko: "엄마 / 아빠", rom: "eomma / appa", en: "mom / dad" },
            { ko: "어머니 / 아버지", rom: "eomeoni / abeoji", en: "mother / father (respectful)" },
            { ko: "언니", rom: "eonni", en: "older sister (said by a woman)" },
            { ko: "누나", rom: "nuna", en: "older sister (said by a man)" },
            { ko: "오빠", rom: "oppa", en: "older brother (said by a woman)" },
            { ko: "형", rom: "hyeong", en: "older brother (said by a man)" },
            { ko: "동생", rom: "dongsaeng", en: "younger sibling" },
            { ko: "여동생 / 남동생", rom: "yeodongsaeng / namdongsaeng", en: "younger sister / younger brother" },
            { ko: "할머니 / 할아버지", rom: "halmeoni / harabeoji", en: "grandmother / grandfather" },
            { ko: "이모 / 고모", rom: "imo / gomo", en: "mother's sister / father's sister" },
            { ko: "삼촌 / 사촌", rom: "samchon / sachon", en: "uncle / cousin" },
            { ko: "남편 / 아내", rom: "nampyeon / anae", en: "husband / wife" },
            { ko: "아들 / 딸", rom: "adeul / ttal", en: "son / daughter" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Easy way to remember",
          text: "A woman says 오빠 for an older brother and 언니 for an older sister. A man says 형 for an older brother and 누나 for an older sister. These words are also used with close friends.",
        },
      ],
    },
    {
      title: "Dating and relationship words",
      emoji: "💕",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "남자친구", rom: "namjachingu", en: "boyfriend" },
            { ko: "여자친구", rom: "yeojachingu", en: "girlfriend" },
            { ko: "애인", rom: "aein", en: "romantic partner" },
            { ko: "연인 / 커플", rom: "yeonin / keopeul", en: "a couple" },
            { ko: "썸", rom: "sseom", en: "the stage before officially dating; 'talking'" },
            { ko: "소개팅", rom: "sogaeting", en: "a blind date set up by someone" },
            { ko: "데이트", rom: "deiteu", en: "date, dating outing" },
            { ko: "고백", rom: "gobaek", en: "confessing your feelings" },
            { ko: "사귀다", rom: "sagwida", en: "to date, be in a relationship" },
            { ko: "헤어지다", rom: "heeojida", en: "to break up" },
            { ko: "결혼하다", rom: "gyeolhonhada", en: "to get married" },
            { ko: "결혼식", rom: "gyeolhonsik", en: "wedding ceremony" },
            { ko: "기념일", rom: "ginyeomil", en: "anniversary, special day" },
            { ko: "장거리 연애", rom: "janggeori yeonae", en: "long-distance relationship" },
            { ko: "전 남자친구 / 전 여자친구", rom: "jeon namjachingu / jeon yeojachingu", en: "ex-boyfriend / ex-girlfriend" },
          ],
        },
      ],
    },
    {
      title: "Talking about your partner",
      emoji: "💬",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "남자친구 있어요?", rom: "namjachingu isseoyo", en: "Do you have a boyfriend?" },
            { ko: "여자친구 있어요?", rom: "yeojachingu isseoyo", en: "Do you have a girlfriend?" },
            {
              ko: "지금 만나는 사람 있어요?",
              rom: "jigeum mannaneun saram isseoyo",
              en: "Are you seeing anyone?",
              sid: "s.l6-seeing-anyone",
            },
            { ko: "사귀고 있어요.", rom: "sagwigo isseoyo", en: "We're dating.", sid: "s.l6-dating" },
            { ko: "어떻게 만났어요?", rom: "eotteoke mannasseoyo", en: "How did you meet?", sid: "s.l6-how-met" },
            {
              ko: "친구 소개로 만났어요.",
              rom: "chingu sogaero mannasseoyo",
              en: "We met through a friend.",
              sid: "s.l6-met-through-friend",
            },
            { ko: "얼마나 오래 사귀었어요?", rom: "eolmana orae sagwieosseoyo", en: "How long have you been dating?" },
            { ko: "이번 주말에 데이트할 거예요.", rom: "ibeon jumare deiteuhal geoyeyo", en: "I'm going on a date this weekend." },
            { ko: "우리 잘 맞는 것 같아요.", rom: "uri jal manneun geot gatayo", en: "I think we're a good match." },
            { ko: "가족에게 소개하고 싶어요.", rom: "gajogege sogaehago sipeoyo", en: "I want to introduce my partner to my family." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Useful relationship expressions",
          examples: [
            { ko: "보고 싶어요.", en: "I miss you. / I want to see you." },
            { ko: "설레요.", en: "I have butterflies. / I'm excited." },
            { ko: "서운해요.", en: "I feel hurt or let down." },
            { ko: "잘 맞아요.", en: "We get along well. / We're compatible." },
          ],
        },
      ],
    },
    {
      title: "What to call your partner's parents",
      emoji: "🤝",
      blocks: [
        {
          kind: "callout",
          tone: "important",
          title: "Before and after marriage",
          text: "Before marriage, 아버님 and 어머님 can be respectful ways to address your partner's parents, depending on the family. 장인어른 and 장모님 traditionally mean a wife's father and mother, used by her husband after marriage.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "아버님", rom: "abeonim", en: "Respectful way to address your partner's father" },
            { ko: "어머님", rom: "eomeonim", en: "Respectful way to address your partner's mother" },
            { ko: "장인어른", rom: "jangineoreun", en: "Wife's father; used by her husband after marriage" },
            { ko: "장모님", rom: "jangmonim", en: "Wife's mother; used by her husband after marriage" },
            { ko: "시아버지", rom: "siabeoji", en: "Husband's father (from the wife's side)" },
            { ko: "시어머니", rom: "sieomeoni", en: "Husband's mother (from the wife's side)" },
            { ko: "사위 / 며느리", rom: "sawi / myeoneuri", en: "son-in-law / daughter-in-law" },
            { ko: "따님 / 아드님", rom: "ttanim / adeunim", en: "your daughter / your son (honorific)" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Telling parents you're dating their child",
          examples: [
            { ko: "따님과 교제하고 있습니다.", rom: "ttanimgwa gyojehago itseumnida", en: "I'm dating your daughter." },
            { ko: "아드님과 만나고 있습니다.", rom: "adeunimgwa mannago itseumnida", en: "I'm dating your son." },
          ],
        },
      ],
    },
    {
      title: "Meeting your partner's parents",
      emoji: "🏡",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "처음 뵙겠습니다.", rom: "cheoeum boepgetseumnida", en: "It's a pleasure to meet you. (formal)" },
            {
              ko: "저는 민수라고 합니다.",
              rom: "jeoneun minsu-rago hamnida",
              en: "My name is Minsu. (Use your own name + (이)라고 합니다.)",
            },
            {
              ko: "따님과 만나고 있는 사람입니다.",
              rom: "ttanimgwa mannago inneun saramimnida",
              en: "I'm the person who's dating your daughter.",
            },
            {
              ko: "초대해 주셔서 감사합니다.",
              rom: "chodaehae jusyeoseo gamsahamnida",
              en: "Thank you for inviting me.",
              sid: "s.h-thanks-invite",
            },
            { ko: "오는 길은 괜찮았어요?", rom: "oneun gireun gwaenchanasseoyo", en: "Was the trip here okay?" },
            { ko: "음식이 정말 맛있습니다.", rom: "eumsigi jeongmal masitseumnida", en: "The food is really delicious." },
            { ko: "제가 도와드릴까요?", rom: "jega dowadeurilkkayo", en: "May I help?" },
            { ko: "잘 먹었습니다.", rom: "jal meogeotseumnida", en: "Thank you for the meal.", sid: "s.after-meal" },
            {
              ko: "오늘 초대해 주셔서 정말 감사합니다.",
              rom: "oneul chodaehae jusyeoseo jeongmal gamsahamnida",
              en: "Thank you so much for having me today.",
            },
            { ko: "앞으로 잘 부탁드립니다.", rom: "apeuro jal butakdeurimnida", en: "I hope we'll get along well from now on." },
            { ko: "다음에 또 찾아뵙겠습니다.", rom: "daeume tto chajaboepgetseumnida", en: "I'll come and visit again." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Politeness tip",
          text: "For a first meeting, use polite endings like -습니다/-ㅂ니다 or -세요. Start with these three: 처음 뵙겠습니다, 초대해 주셔서 감사합니다, 잘 먹었습니다.",
        },
      ],
    },
    {
      title: "Conversation practice: at her parents' home",
      emoji: "🎭",
      blocks: [
        {
          kind: "dialogue",
          title: "First meeting",
          lines: [
            {
              speaker: "Boyfriend",
              ko: "안녕하세요. 처음 뵙겠습니다. 저는 민수라고 합니다.",
              en: "Hello. It's a pleasure to meet you. My name is Minsu.",
              sid: "s.l6-first-meeting",
            },
            { speaker: "Mother", ko: "어서 와요. 오는 길은 괜찮았어요?", en: "Welcome. Was the trip here okay?", sid: "s.l6-welcome-trip" },
            {
              speaker: "Boyfriend",
              ko: "네, 괜찮았습니다. 초대해 주셔서 감사합니다.",
              en: "Yes, it was fine. Thank you for inviting me.",
              sid: "s.l6-it-was-fine",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "At the dinner table",
          lines: [
            { speaker: "Mother", ko: "음식 입에 맞아요?", en: "Is the food to your taste?", sid: "s.l6-food-ok" },
            {
              speaker: "Boyfriend",
              ko: "네, 정말 맛있습니다. 잘 먹겠습니다.",
              en: "Yes, it's delicious. Thank you for the meal.",
              sid: "s.l6-delicious-formal",
            },
            { speaker: "Father", ko: "더 먹어요. 많이 준비했어요.", en: "Have some more. We made plenty.", sid: "s.l6-eat-more" },
            {
              speaker: "Boyfriend",
              ko: "감사합니다. 정말 잘 먹었습니다.",
              en: "Thank you. I really enjoyed the meal.",
              sid: "s.l6-thanks-meal",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "Offering to help",
          lines: [
            { speaker: "Boyfriend", ko: "제가 설거지 도와드릴까요?", en: "Can I help with the dishes?", sid: "s.l6-help-dishes" },
            { speaker: "Mother", ko: "아니에요. 괜찮아요. 앉아 있어요.", en: "No, it's okay. Stay seated.", sid: "s.l6-sit-down" },
            {
              speaker: "Boyfriend",
              ko: "그럼 식탁이라도 정리하겠습니다.",
              en: "Then I'll at least clear the table.",
              sid: "s.l6-clear-table",
            },
          ],
        },
      ],
    },
    {
      title: "Conversation practice: calling your in-laws",
      emoji: "📞",
      blocks: [
        {
          kind: "dialogue",
          title: "Calling your mother-in-law (장모님)",
          lines: [
            {
              speaker: "Husband",
              ko: "장모님, 안녕하세요? 식사는 하셨어요?",
              en: "Hello, Mother. Have you eaten?",
              sid: "s.l6-call-mother-in-law",
            },
            { speaker: "Mother-in-law", ko: "그래, 너는 먹었니?", en: "Yes. Have you eaten?", sid: "s.l6-mil-reply" },
            {
              speaker: "Husband",
              ko: "네, 먹었습니다. 주말에 찾아뵈려고 전화드렸어요.",
              en: "Yes, I have. I called because I'd like to visit this weekend.",
              sid: "s.l6-visit-weekend",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "Talking with your father-in-law (장인어른)",
          lines: [
            {
              speaker: "Husband",
              ko: "장인어른, 요즘 건강은 어떠세요?",
              en: "Father, how has your health been lately?",
              sid: "s.l6-health-q",
            },
            {
              speaker: "Father-in-law",
              ko: "덕분에 잘 지내네. 회사 일은 어떤가?",
              en: "I'm doing well, thanks to you. How's work?",
              sid: "s.l6-fil-reply",
            },
            {
              speaker: "Husband",
              ko: "바쁘지만 잘 지내고 있습니다. 늘 챙겨 주셔서 감사합니다.",
              en: "It's busy, but I'm doing well. Thank you for always looking out for me.",
              sid: "s.l6-busy-but-well",
            },
          ],
        },
        {
          kind: "callout",
          tone: "important",
          title: "Elders speak down; you speak up",
          text: "Notice the in-laws speak casually (너는 먹었니?) or in 하게체 (잘 지내네, 어떤가?), an old-fashioned level elders use with adult juniors. Many mothers-in-law use 자네 or 김 서방 instead of 너. Understand these forms, but always answer in -요 or -습니다.",
        },
      ],
    },
    {
      title: "Useful verbs and adjectives",
      emoji: "🧩",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "만나다", rom: "mannada", en: "to meet" },
            { ko: "사귀다", rom: "sagwida", en: "to date" },
            { ko: "소개하다", rom: "sogaehada", en: "to introduce" },
            { ko: "초대하다", rom: "chodaehada", en: "to invite" },
            { ko: "방문하다", rom: "bangmunhada", en: "to visit" },
            { ko: "도와드리다", rom: "dowadeurida", en: "to help (humble)" },
            { ko: "말씀하시다", rom: "malsseumhasida", en: "to speak (honorific)" },
            { ko: "드시다", rom: "deusida", en: "to eat or drink (honorific)" },
            { ko: "찾아뵙다", rom: "chajaboepda", en: "to visit (humble)" },
            { ko: "좋아해요", rom: "joahaeyo", en: "I like (someone or something)" },
            { ko: "사랑해요", rom: "saranghaeyo", en: "I love you" },
            { ko: "보고 싶어요", rom: "bogo sipeoyo", en: "I miss you, I want to see you" },
            { ko: "설레요", rom: "seolleyo", en: "excited, butterflies" },
            { ko: "행복해요", rom: "haengbokhaeyo", en: "happy" },
            { ko: "서운해요", rom: "seounhaeyo", en: "hurt, let down" },
            { ko: "다정해요", rom: "dajeonghaeyo", en: "affectionate, thoughtful" },
            { ko: "잘 맞아요", rom: "jal majayo", en: "get along well, compatible" },
            { ko: "어색해요", rom: "eosaekhaeyo", en: "awkward" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "[Person] + 랑/하고 + activity",
          text: "Do something with [person].",
          examples: [
            { ko: "여자친구랑 영화 봐요.", rom: "yeojachingurang yeonghwa bwayo", en: "I watch a movie with my girlfriend." },
            { ko: "부모님하고 식사해요.", rom: "bumonimhago siksahaeyo", en: "I have a meal with my parents." },
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
            { ko: "가족이 네 명이에요. 부모님이랑 동생이 있어요.", en: "Introduce your family." },
            { ko: "여자친구랑 사귀고 있어요. 친구 소개로 만났어요.", en: "Talk about your relationship." },
            { ko: "처음 뵙겠습니다. 초대해 주셔서 감사합니다.", en: "Meet her parents." },
            { ko: "제가 도와드릴까요?", en: "Offer to help politely." },
            { ko: "장모님, 식사는 하셨어요?", en: "Call your mother-in-law." },
            { ko: "장인어른, 요즘 건강은 어떠세요?", en: "Ask your father-in-law about his health." },
          ],
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
            { ko: "처음 뵙겠습니다.", en: "It's a pleasure to meet you." },
            { ko: "가족이 보고 싶어요.", en: "I miss my family." },
            { ko: "제가 도와드릴까요?", en: "May I help?" },
            { ko: "가족이 몇 명이에요?", en: "How many people are in your family?" },
            { ko: "장모님, 식사는 하셨어요?", en: "Mother-in-law, have you eaten?" },
          ],
        },
        {
          kind: "fill",
          items: [
            { before: "가족이 몇 ", after: "이에요?", answers: ["명"], en: "How many people are in your family?" },
            { before: "여자친구랑 사귀고 ", after: ".", answers: ["있어요"], en: "I'm dating my girlfriend." },
            { before: "초대해 주셔서 ", after: ".", answers: ["감사합니다"], en: "Thank you for inviting me." },
            { before: "제가 도와", after: "?", answers: ["드릴까요"], en: "May I help?" },
            { before: "장모님, 식사는 ", after: "?", answers: ["하셨어요"], en: "Mother-in-law, have you eaten?" },
            { before: "장인어른, 요즘 건강은 ", after: "?", answers: ["어떠세요"], en: "Father-in-law, how has your health been?" },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Remember",
          bullets: [
            "Before marriage, 아버님 / 어머님 are respectful ways to address your partner's parents, depending on the family.",
            "장인어른 is a wife's father and 장모님 a wife's mother, traditionally used by the husband after marriage.",
            "Polite expressions to know: 처음 뵙겠습니다, 초대해 주셔서 감사합니다, 제가 도와드릴까요?",
            "가족이 몇 명이에요? is the natural way to ask about family size.",
            "사귀고 있어요 means 'We're dating.'",
            "Learn whole phrases and say them aloud. Politeness and context matter as much as vocabulary.",
          ],
        },
      ],
    },
  ],
};
