import type { LessonInput } from "./schema";

/** Lesson 007 · Honorific Expressions (from "Korean_007_Honorific_Expressions_Complete_Honorific_Types"). */
export const lesson007: LessonInput = {
  id: "lesson.007",
  number: "007",
  title: "Honorific Expressions",
  korean: "높임말 · 존댓말 · 일상생활에서 예의 있게 말하는 한국어",
  goal: "Use polite Korean with strangers, elders, teachers, coworkers, and service staff. Learn common honorific verbs, respectful titles, and natural conversation patterns.",
  level: "A2",
  teaches: ["g.honorific-si", "g.hon-subject", "g.hon-to", "g.hon-vocab", "g.humble", "g.command-seyo", "v.교수님", "v.사장님"],
  corrections: [
    "Practice answer key realigned: it was shifted by one row from blank 2 onward.",
    "Blank 3 answer changed to 드릴게요 / 드리겠습니다: '질문을 여쭤볼게요' doubles up the meaning of 'ask'.",
    "'아버지는 지금 댁에 계세요' changed to '집에 계세요': 댁 honors someone else's home, not your own family's.",
    "Section 8 and 9 titles now match the dialogues inside them.",
    "Section 7 rows that repeat a dialogue or section 1 line appear once; the 'Teacher, may I ask…' line said 'Professor' in English while the Korean says 선생님.",
  ],
  sections: [
    {
      title: "Essential polite expressions",
      emoji: "🙇",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "안녕하세요.", rom: "annyeonghaseyo", en: "Hello.", sid: "s.f-hello" },
            { ko: "감사합니다.", rom: "gamsahamnida", en: "Thank you.", sid: "s.thanks-formal" },
            { ko: "죄송합니다.", rom: "joesonghamnida", en: "I'm sorry.", sid: "s.f-sorry-formal" },
            { ko: "괜찮으세요?", rom: "gwaenchan-euseyo?", en: "Are you okay?" },
            { ko: "잠시만 기다려 주세요.", rom: "jamsiman gidaryeo juseyo", en: "Please wait a moment." },
            { ko: "이쪽으로 오세요.", rom: "ijjogeuro oseyo", en: "Please come this way.", sid: "s.f-this-way" },
            { ko: "여기 앉으세요.", rom: "yeogi anjeuseyo", en: "Please sit here." },
            { ko: "도와드릴까요?", rom: "dowadeurilkkayo?", en: "May I help you?" },
            { ko: "다시 말씀해 주세요.", rom: "dasi malsseumhae juseyo", en: "Please say that again." },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Verb stem + -(으)세요",
          text: "A polite request, or an honorific statement about someone you respect.",
          examples: [
            { ko: "앉으세요.", en: "Please sit. (앉다)" },
            { ko: "기다리세요.", en: "Please wait. (기다리다)" },
          ],
        },
      ],
    },
    {
      title: "Three types of Korean honorifics",
      emoji: "👑",
      blocks: [
        {
          kind: "types",
          rows: [
            {
              name: "Subject honorification",
              korean: "주체 높임",
              forms: "-(으)시- · 께서",
              use: "Raise the person who does the action. 께서 replaces 이/가 for an honored subject.",
              example: { ko: "선생님께서 오세요.", en: "The teacher is coming.", sid: "s.h-teacher-coming" },
            },
            {
              name: "Object honorification",
              korean: "객체 높임",
              forms: "께 · 드리다 · 여쭙다 · 뵙다",
              use: "Respect the person who receives the action. 께 replaces 에게/한테.",
              example: { ko: "제가 교수님께 질문을 드렸어요.", en: "I asked the professor a question." },
            },
            {
              name: "Addressee honorification",
              korean: "상대 높임",
              forms: "-요 · -(스)ㅂ니다",
              use: "Politeness toward the person you're talking to. Choose the ending by formality.",
              example: { ko: "지금 갑니다.", en: "I'm going now." },
            },
            {
              name: "Honorific verbs",
              korean: "높임 어휘",
              forms: "드시다 · 주무시다 · 계시다",
              use: "A special verb honors the subject.",
              example: { ko: "할머니께서 주무세요.", en: "Grandmother is sleeping.", sid: "s.h-grandma-sleeping" },
            },
            {
              name: "Humble verbs",
              korean: "겸양 어휘",
              forms: "드리다 · 여쭙다 · 뵙다",
              use: "Lower your own action to show respect to someone else.",
              example: { ko: "선생님께 여쭤봤어요.", en: "I asked the teacher.", sid: "s.h-asked-teacher" },
            },
            {
              name: "Titles",
              korean: "높임 호칭",
              forms: "선생님 · 교수님 · 어머님",
              use: "Use a title when addressing or referring to someone respectfully. The right title depends on the relationship.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to choose the right form",
          bullets: [
            "께서 is the subject marker (for 이/가): 할머니께서 오세요.",
            "께 is the 'to someone' marker (for 에게/한테): 할머니께 선물을 드렸어요.",
            "-(으)시- goes on the verb: 선생님이 읽으세요.",
            "Stem ends in a vowel or ㄹ → -시-: 가다 → 가세요, 살다 → 사세요.",
            "Stem ends in another consonant → -으시-: 먹다 → 먹으세요, 읽다 → 읽으세요.",
            "-요 / -(스)ㅂ니다 show politeness to the listener: 가요 / 갑니다.",
            "께서 and 께 do different jobs. They aren't interchangeable.",
          ],
        },
      ],
    },
    {
      title: "Polite endings: -아요/어요 and -(으)세요",
      emoji: "💬",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "주세요", rom: "juseyo", en: "Please give me… / please do…" },
            { ko: "기다려 주세요", rom: "gidaryeo juseyo", en: "Please wait." },
            { ko: "도와주세요", rom: "dowajuseyo", en: "Please help me.", sid: "s.f-help" },
            { ko: "확인해 주세요", rom: "hwaginhae juseyo", en: "Please check." },
            { ko: "말씀해 주세요", rom: "malsseumhae juseyo", en: "Please tell me." },
            { ko: "천천히 말씀해 주세요", rom: "cheoncheonhi malsseumhae juseyo", en: "Please speak slowly." },
            { ko: "다시 설명해 주세요", rom: "dasi seolmyeonghae juseyo", en: "Please explain again." },
            { ko: "문을 닫아 주세요", rom: "muneul dada juseyo", en: "Please close the door." },
            { ko: "잠깐 기다려 주시겠어요?", rom: "jamkkan gidaryeo jusigesseoyo?", en: "Could you wait a moment?" },
            { ko: "이름을 알려 주시겠어요?", rom: "ireumeul allyeo jusigesseoyo?", en: "Could you tell me your name?" },
            { ko: "사진을 찍어 주실 수 있어요?", rom: "sajineul jjigeo jusil su isseoyo?", en: "Could you take a picture?" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Asking politely",
          bullets: [
            "-아/어 주세요: please do something for me.",
            "-아/어 주시겠어요?: could you please…? (softer)",
            "-아/어도 돼요?: may I…?",
            "-아/어도 될까요?: would it be okay if I…? (most considerate)",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Easy way to remember",
          text: "-(으)세요 is polite, but context matters. 앉으세요 is a warm invitation, while 지금 가세요 can mean 'please go now' or 'you're going now'. Use a warm tone.",
        },
      ],
    },
    {
      title: "Honorific verbs you need every day",
      emoji: "🧩",
      blocks: [
        {
          kind: "pairs",
          rows: [
            { from: "먹다", to: "드시다", en: "to eat (honorific)", rom: "deusida" },
            { from: "마시다", to: "드시다", en: "to drink (honorific)", rom: "deusida" },
            { from: "자다", to: "주무시다", en: "to sleep (honorific)", rom: "jumusida" },
            { from: "있다", to: "계시다", en: "to be, to stay (honorific)", rom: "gyesida" },
            { from: "말하다", to: "말씀하시다", en: "to speak (honorific)", rom: "malsseumhasida" },
            { from: "보다 / 만나다", to: "뵙다", en: "to see, to meet (humble)", rom: "boepda" },
            { from: "묻다", to: "여쭙다", en: "to ask (humble)", rom: "yeojjupda" },
            { from: "주다", to: "드리다", en: "to give (humble)", rom: "deurida" },
            { from: "데려가다", to: "모시고 가다", en: "to accompany respectfully", rom: "mosigo gada" },
            { from: "이름", to: "성함", en: "name (honorific)", rom: "seongham" },
            { from: "나이", to: "연세", en: "age (honorific)", rom: "yeonse" },
            { from: "밥", to: "진지", en: "meal (honorific)", rom: "jinji" },
            { from: "집", to: "댁", en: "home (honorific)", rom: "daek" },
            { from: "말", to: "말씀", en: "words, speech (honorific)", rom: "malsseum" },
            { from: "생일", to: "생신", en: "birthday (honorific)", rom: "saengsin" },
          ],
        },
      ],
    },
    {
      title: "The honorific marker -(으)시-",
      emoji: "👑",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "선생님께서 오세요.", rom: "seonsaengnimkkeseo oseyo", en: "The teacher is coming.", sid: "s.h-teacher-coming" },
            { ko: "할머니께서 주무세요.", rom: "halmeonikkeseo jumuseyo", en: "Grandmother is sleeping.", sid: "s.h-grandma-sleeping" },
            {
              ko: "아버지는 지금 집에 계세요.",
              rom: "abeojineun jigeum jibe gyeseyo",
              en: "My father is at home now.",
              sid: "s.h-father-home",
            },
            {
              ko: "할아버지께서 진지를 드세요.",
              rom: "harabeojikkeseo jinjireul deuseyo",
              en: "Grandfather is having his meal.",
              sid: "s.h-grandpa-meal",
            },
            { ko: "사장님께 말씀드렸어요.", rom: "sajangnimkke malsseumdeuryeosseoyo", en: "I told the boss.", sid: "s.h-told-boss" },
            {
              ko: "내일 교수님을 뵐 거예요.",
              rom: "naeil gyosunimeul boel geoyeyo",
              en: "I'll see the professor tomorrow.",
              sid: "s.h-see-professor",
            },
            { ko: "선생님께 여쭤봤어요.", rom: "seonsaengnimkke yeojjwobwasseoyo", en: "I asked the teacher.", sid: "s.h-asked-teacher" },
            { ko: "할머니, 식사하셨어요?", rom: "halmeoni, siksahasyeosseoyo?", en: "Grandma, have you eaten?", sid: "s.h-grandma-eaten" },
            { ko: "부모님은 잘 지내세요?", rom: "bumonimeun jal jinaeseyo?", en: "How are your parents?", sid: "s.h-parents-well" },
            { ko: "성함이 어떻게 되세요?", rom: "seonghami eotteoke doeseyo?", en: "May I ask your name?", sid: "s.name-respectful" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Useful polite expressions",
          examples: [
            { ko: "실례합니다.", rom: "sillyehamnida", en: "Excuse me." },
            { ko: "잠시 괜찮으세요?", rom: "jamsi gwaenchaneuseyo?", en: "Do you have a moment?" },
            { ko: "말씀 감사합니다.", rom: "malsseum gamsahamnida", en: "Thank you for telling me." },
            { ko: "먼저 가 보겠습니다.", rom: "meonjeo ga bogetseumnida", en: "I'll be going now." },
          ],
        },
      ],
    },
    {
      title: "Titles and respectful ways to address people",
      emoji: "🤝",
      blocks: [
        {
          kind: "callout",
          tone: "important",
          title: "Honor others, not yourself",
          text: "Use honorifics for the person you respect, never automatically for yourself. 선생님께서 오셨어요 honors the teacher, but you say 저는 밥을 먹었어요 about yourself. 드리다 and 뵙다 are humble forms for your own actions toward someone you respect.",
        },
        {
          kind: "phrases",
          rows: [
            { ko: "선생님", rom: "seonsaengnim", en: "teacher, instructor" },
            { ko: "교수님", rom: "gyosunim", en: "professor" },
            { ko: "사장님", rom: "sajangnim", en: "boss, business owner" },
            { ko: "고객님", rom: "gogaengnim", en: "customer (in service settings)" },
            { ko: "어르신", rom: "eoreusin", en: "elder, senior person" },
            { ko: "할아버지 / 할머니", rom: "harabeoji / halmeoni", en: "grandfather / grandmother" },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Who gets the honor",
          bullets: [
            "[Respected person] + 께서 + honorific verb: 선생님께서 오세요.",
            "[You] + [person]께 + 말씀드리다 / 여쭙다: 교수님께 여쭤봤어요.",
          ],
        },
      ],
    },
    {
      title: "Speaking politely in everyday situations",
      emoji: "🏡",
      blocks: [
        {
          kind: "phrases",
          rows: [
            {
              ko: "안녕하세요. 무엇을 도와드릴까요?",
              rom: "annyeonghaseyo. mueoseul dowadeurilkkayo?",
              en: "Hello. How may I help you?",
              sid: "s.h-how-help",
            },
            { ko: "드시고 가세요, 아니면 가지고 가세요?", rom: "deusigo gaseyo, animyeon gajigo gaseyo?", en: "For here or to go?" },
            {
              ko: "선생님, 잠시 질문드려도 될까요?",
              rom: "seonsaengnim, jamsi jilmundeuryeodo doelkkayo?",
              en: "Teacher, may I ask you a quick question?",
            },
            {
              ko: "이 부분을 다시 설명해 주시겠어요?",
              rom: "i bubuneul dasi seolmyeonghae jusigesseoyo?",
              en: "Could you explain this part again?",
              sid: "s.h-explain-again",
            },
            {
              ko: "물론이에요. 같이 확인해 봅시다.",
              rom: "mullonieyo. gachi hwaginhae bopsida",
              en: "Of course. Let's check it together.",
            },
            { ko: "네, 천천히 하셔도 돼요.", rom: "ne, cheoncheonhi hasyeodo dwaeyo", en: "Sure, take your time." },
            { ko: "도와주셔서 감사합니다.", rom: "dowajusyeoseo gamsahamnida", en: "Thank you for your help." },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Politeness tip",
          text: "With someone you don't know well, start with -요 or a formal expression. In a café, 주세요 is natural for ordering. With a professor, 질문드려도 될까요? sounds more considerate.",
        },
      ],
    },
    {
      title: "Conversation practice: at a café and with a professor",
      emoji: "🎭",
      blocks: [
        {
          kind: "dialogue",
          title: "At a café",
          lines: [
            { speaker: "Staff", ko: "안녕하세요. 무엇을 도와드릴까요?", en: "Hello. How may I help you?", sid: "s.h-how-help" },
            { speaker: "Customer", ko: "아이스 아메리카노 한 잔 주세요.", en: "An iced americano, please.", sid: "s.order-americano" },
            { speaker: "Staff", ko: "매장에서 드시고 가세요?", en: "Will you have it here?", sid: "s.h-for-here" },
            {
              speaker: "Customer",
              ko: "아니요, 가지고 갈게요. 감사합니다.",
              en: "No, I'll take it to go. Thank you.",
              sid: "s.h-take-out",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "Asking a professor",
          lines: [
            {
              speaker: "Student",
              ko: "교수님, 잠시 질문드려도 될까요?",
              en: "Professor, may I ask you a quick question?",
              sid: "s.h-may-i-ask",
            },
            { speaker: "Professor", ko: "네, 말씀하세요.", en: "Yes, go ahead.", sid: "s.h-go-ahead" },
            {
              speaker: "Student",
              ko: "이 부분을 다시 설명해 주시겠어요?",
              en: "Could you explain this part again?",
              sid: "s.h-explain-again",
            },
            { speaker: "Professor", ko: "물론이에요.", en: "Of course.", sid: "s.h-of-course" },
          ],
        },
      ],
    },
    {
      title: "Conversation practice: visiting and family",
      emoji: "📞",
      blocks: [
        {
          kind: "dialogue",
          title: "At someone's home",
          lines: [
            { speaker: "Host", ko: "어서 오세요. 안으로 들어오세요.", en: "Welcome. Please come in.", sid: "s.h-come-in" },
            { speaker: "Guest", ko: "초대해 주셔서 감사합니다.", en: "Thank you for inviting me.", sid: "s.h-thanks-invite" },
            {
              speaker: "Host",
              ko: "편하게 앉으세요. 차 드릴까요?",
              en: "Make yourself comfortable. Would you like some tea?",
              sid: "s.h-sit-tea",
            },
            { speaker: "Guest", ko: "네, 감사합니다.", en: "Yes, thank you.", sid: "s.h-yes-thanks" },
          ],
        },
        {
          kind: "dialogue",
          title: "Talking about a family member",
          lines: [
            { speaker: "A", ko: "할머니께서는 요즘 어떠세요?", en: "How is your grandmother these days?", sid: "s.h-grandma-how" },
            {
              speaker: "B",
              ko: "잘 지내세요. 오늘은 집에서 쉬세요.",
              en: "She's doing well. She's resting at home today.",
              sid: "s.h-shes-well",
            },
            {
              speaker: "A",
              ko: "다행이네요. 안부 전해 주세요.",
              en: "That's good to hear. Please give her my regards.",
              sid: "s.h-regards",
            },
          ],
        },
        {
          kind: "dialogue",
          title: "Ending a conversation politely",
          lines: [
            { speaker: "A", ko: "오늘 말씀 감사합니다.", en: "Thank you for speaking with me today.", sid: "s.h-thanks-talk" },
            { speaker: "B", ko: "별말씀을요. 조심히 가세요.", en: "Not at all. Take care getting home.", sid: "s.h-dont-mention" },
            { speaker: "A", ko: "네, 다음에 다시 뵙겠습니다.", en: "Yes, I'll see you again next time.", sid: "s.h-see-again" },
          ],
        },
      ],
    },
    {
      title: "Useful polite patterns and expressions",
      emoji: "📝",
      blocks: [
        {
          kind: "phrases",
          rows: [
            { ko: "하시다", rom: "hasida", en: "to do (honorific)" },
            { ko: "오시다", rom: "osida", en: "to come (honorific)" },
            { ko: "가시다", rom: "gasida", en: "to go (honorific)" },
            { ko: "드시다", rom: "deusida", en: "to eat or drink (honorific)" },
            { ko: "주무시다", rom: "jumusida", en: "to sleep (honorific)" },
            { ko: "계시다", rom: "gyesida", en: "to be, to stay (honorific)" },
            { ko: "말씀하시다", rom: "malsseumhasida", en: "to speak (honorific)" },
            { ko: "편찮으시다", rom: "pyeonchaneusida", en: "to be unwell (honorific)" },
            { ko: "도와드리다", rom: "dowadeurida", en: "to help (humble)" },
            { ko: "말씀드리다", rom: "malsseumdeurida", en: "to tell, to say (humble)" },
            { ko: "여쭤보다", rom: "yeojjwoboda", en: "to ask (humble)" },
            { ko: "뵙다", rom: "boepda", en: "to see, to meet (humble)" },
            { ko: "확인해 주시겠어요?", rom: "hwaginhae jusigesseoyo?", en: "Could you check?" },
            { ko: "다음에 다시 뵙겠습니다", rom: "daeume dasi boepgetseumnida", en: "I'll see you again next time." },
          ],
        },
        {
          kind: "callout",
          tone: "pattern",
          title: "Useful sentence pattern",
          text: "[Respected person] + -(으)시- + polite ending: 오다 → 오세요, 하다 → 하세요, 읽다 → 읽으세요. For your own humble actions: 제가 교수님께 여쭤볼게요.",
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
            { ko: "여기 앉으세요.", rom: "yeogi anjeuseyo", en: "Ask someone to sit here." },
            { ko: "지금 뭐 하세요?", rom: "jigeum mwo haseyo?", en: "Ask what someone is doing now." },
            { ko: "이것 좀 도와주시겠어요?", rom: "igeot jom dowajusigesseoyo?", en: "Ask for help politely." },
            { ko: "선생님은 지금 회의 중이세요.", rom: "seonsaengnimeun jigeum hoeui jungiseyo", en: "Say the teacher is in a meeting." },
            { ko: "내일 다시 뵙겠습니다.", rom: "naeil dasi boepgetseumnida", en: "Say you'll see them again tomorrow." },
            { ko: "커피 드릴까요?", rom: "keopi deurilkkayo?", en: "Offer someone coffee." },
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
            { ko: "주무시다", en: "to sleep (honorific)" },
            { ko: "계시다", en: "to be, to stay (honorific)" },
            { ko: "여쭙다", en: "to ask (humble)" },
            { ko: "드리다", en: "to give (humble)" },
            { ko: "뵙다", en: "to see, to meet (humble)" },
          ],
        },
        {
          kind: "fill",
          items: [
            { before: "여기 앉", after: ".", answers: ["으세요"], en: "Please sit here.", hint: "앉 ends in a consonant." },
            { before: "할머니께서 주무", after: ".", answers: ["세요"], en: "Grandmother is sleeping." },
            {
              before: "선생님께 질문을 ",
              after: ".",
              answers: ["드릴게요", "드리겠습니다"],
              en: "I'll ask the teacher a question.",
              hint: "Humble 'give'.",
            },
            { before: "이거 좀 도와", after: "?", answers: ["주시겠어요"], en: "Could you help me with this?" },
            { before: "사장님은 지금 사무실에 ", after: ".", answers: ["계세요", "계십니다"], en: "The boss is in the office now." },
            { before: "내일 다시 ", after: "겠습니다.", answers: ["뵙"], en: "I'll see you again tomorrow." },
          ],
        },
        {
          kind: "callout",
          tone: "remember",
          title: "Remember",
          bullets: [
            "-요 endings are a safe default with strangers, older people, and anyone you don't know well.",
            "-(으)세요 can be a polite request (여기 앉으세요) or an honorific statement (선생님이 오세요). Context tells you which.",
            "Honor a subject with -(으)시-, a special verb (주무시다, 계시다), or both.",
            "께서 replaces 이/가 for an honored subject. 께 replaces 에게/한테 for a respected recipient.",
            "Titles like 선생님, 사장님 and 고객님 are more respectful than a name alone.",
            "When unsure, use 존댓말 first.",
          ],
        },
      ],
    },
  ],
};
