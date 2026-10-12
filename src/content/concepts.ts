import { culture, expression, grammar, vocab } from "./author";
import type { Concept } from "./schema";

/**
 * Canonical concept inventory: what a learner can master. Cards teach and use
 * these; learner state and review scheduling are tracked per concept.
 * Explanations stay short on purpose. Cards teach through examples.
 */

const GRAMMAR: Concept[] = [
  // Particles
  grammar("topic", "은/는", "topic marker: 'as for…', or contrast", "A1", "Particles", {
    pattern: "N + 은 (after consonant) / 는 (after vowel)",
    explanation: "Marks what you're talking about. Often sets up a contrast: 저는 커피 좋아해요 can imply 'I (unlike others) like coffee.'",
    examples: [["저는 학생이에요.", "I'm a student."]],
  }),
  grammar("subject", "이/가", "subject marker: new information, 'who/what did it'", "A1", "Particles", {
    pattern: "N + 이 (after consonant) / 가 (after vowel)",
    explanation: "Points at the subject, especially when it's new or the answer to 'who/what?'.",
    examples: [["누가 왔어요? 민수가 왔어요.", "Who came? Minsu came."]],
  }),
  grammar("object", "을/를", "object marker", "A1", "Particles", {
    pattern: "N + 을 (after consonant) / 를 (after vowel)",
    explanation: "Marks the thing the action is done to. Very often dropped in speech.",
  }),
  grammar("place-e", "에", "to / at / in (destination, location of being, time)", "A1", "Particles", {
    pattern: "Place/Time + 에",
    explanation: "Where you go (학교에 가요), where something is (집에 있어요), or when (세 시에).",
  }),
  grammar("place-eseo", "에서", "at / in (where an action happens); from", "A1", "Particles", {
    pre: ["g.place-e"],
    pattern: "Place + 에서",
    explanation: "Where an action takes place (카페에서 공부해요), or a starting point (서울에서 왔어요).",
  }),
  grammar("with-rang", "(이)랑", "with / and (casual)", "A1", "Particles", {
    pattern: "N + 랑 (after vowel) / 이랑 (after consonant)",
    explanation: "Spoken, friendly 'with/and'. 하고 is neutral, 와/과 is written.",
  }),
  grammar("with-hago", "하고", "with / and (neutral)", "A1", "Particles"),
  grammar("to-person", "한테/에게", "to (a person)", "A2", "Particles", {
    explanation: "한테 is spoken, 에게 is written or careful speech, 께 is honorific.",
  }),
  grammar("also", "도", "also / too / even", "A1", "Particles", {
    explanation: "Replaces 은/는, 이/가, 을/를: 저도요 'me too'.",
  }),
  grammar("means-ro", "(으)로", "by (means), toward, as", "A2", "Particles", {
    explanation: "버스로 (by bus), 오른쪽으로 (to the right), 카드로 (with a card).",
  }),
  grammar("only-man", "만", "only / just", "A2", "Particles"),
  grammar("hon-subject", "께서", "honorific subject marker", "B1", "Particles", {
    pre: ["g.subject", "g.honorific-si"],
    explanation: "Honorific version of 이/가 for elders. Formal; in casual family talk people usually just say 할머니가.",
  }),

  // Speech levels
  grammar("banmal", "반말 (해체)", "casual speech: close friends, younger people, family", "A1", "Speech levels", {
    skill: "honorifics",
    pattern: "Verb stem + 아/어 (해요 without 요)",
    explanation: "Used with people you're close to, and only once both sides are comfortable. Using it uninvited can sound rude.",
  }),
  grammar("haeyo", "해요체", "everyday polite speech", "A1", "Speech levels", {
    skill: "honorifics",
    pattern: "Verb stem + 아요/어요",
    explanation: "The default with strangers, coworkers and anyone you're not close to. Polite without being stiff.",
  }),
  grammar("hapsyo", "하십시오체", "formal polite speech", "A2", "Speech levels", {
    skill: "honorifics",
    pre: ["g.haeyo"],
    pattern: "Verb stem + ㅂ니다/습니다 (statement), ㅂ니까/습니까 (question)",
    explanation: "Announcements, news, presentations, the military, formal business. In casual chat it sounds stiff and distant.",
  }),
  grammar("plain-da", "-다 (plain form)", "plain form for reactions and talking to yourself", "A2", "Speech levels", {
    skill: "honorifics",
    explanation: "Used in writing and as an exclamation: 맛있다! 좋겠다! Even polite speakers use it when reacting.",
  }),

  // Honorifics
  grammar("honorific-si", "-(으)시-", "honors the person doing the action", "A2", "Honorifics", {
    skill: "honorifics",
    pre: ["g.haeyo"],
    pattern: "Verb stem + (으)시 + ending: 가세요, 하셨어요",
    explanation: "Shows respect to the subject, not the listener. You never use it about yourself.",
  }),
  grammar("hon-to", "께", "to (someone you respect)", "B1", "Honorifics", {
    skill: "honorifics",
    pre: ["g.to-person"],
    explanation: "Honorific version of 에게/한테: 할머니께 선물을 드렸어요. Pairs with humble verbs like 드리다 and 여쭙다.",
  }),
  grammar("hon-vocab", "높임말 words", "special honorific verbs and nouns", "B1", "Honorifics", {
    skill: "honorifics",
    pre: ["g.honorific-si"],
    explanation: "Some words change entirely: 먹다 → 드시다, 자다 → 주무시다, 있다 → 계시다, 밥 → 식사/진지, 이름 → 성함.",
  }),
  grammar("humble", "낮춤말 (humble forms)", "lowering yourself to show respect", "B1", "Honorifics", {
    skill: "honorifics",
    pre: ["g.hon-vocab"],
    explanation: "나 → 저, 주다 → 드리다, 묻다 → 여쭤보다. You lower yourself instead of raising the other person.",
  }),

  // Tense and aspect
  grammar("past", "-았/었-", "past tense", "A1", "Tense & aspect", {
    pattern: "Stem + 았 (ㅏ/ㅗ) / 었 (others) / 했 (하다)",
    examples: [["어제 학교에 갔어요.", "I went to school yesterday."]],
  }),
  grammar("future", "-(으)ㄹ 거예요", "will / going to", "A2", "Tense & aspect", {
    pattern: "Stem + ㄹ 거예요 (after vowel) / 을 거예요 (after consonant)",
    explanation: "Plans and predictions. Casual: -ㄹ 거야.",
  }),
  grammar("progressive", "-고 있다", "be doing (right now / these days)", "A2", "Tense & aspect", {
    pattern: "Stem + 고 있다",
    explanation: "An action in progress. Honorific: -고 계시다.",
    examples: [["지금 밥 먹고 있어.", "I'm eating right now."]],
  }),
  grammar("guess-get", "-겠-", "supposition / softening", "B1", "Tense & aspect", {
    explanation: "Guessing (좋겠다 'that must be nice'), or softening in service speech (주문하시겠어요?).",
  }),
  grammar("promise-ge", "-(으)ㄹ게(요)", "I'll… (promise / decision)", "A2", "Tense & aspect", {
    explanation: "Telling the listener what you'll do, often with their interest in mind: 이따 연락할게.",
  }),

  // Negation
  grammar("neg-an", "안", "not (choice)", "A1", "Negation", {
    explanation: "Put before the verb: 안 가요 'I'm not going.' For 하다 verbs: 공부 안 해요.",
  }),
  grammar("neg-mot", "못", "can't (inability)", "A2", "Negation", {
    pre: ["g.neg-an"],
    explanation: "안 is 'won't/don't', 못 is 'can't'. 매운 거 못 먹어요 means you can't eat spicy food, not that you choose not to.",
  }),
  grammar("neg-ji-anta", "-지 않다", "not (longer, more formal negation)", "A2", "Negation", {
    pre: ["g.neg-an"],
  }),
  grammar("dont-jimaseyo", "-지 마세요", "please don't…", "A2", "Negation", {
    explanation: "Casual: -지 마. 걱정하지 마세요 'Don't worry.'",
  }),

  // Connectors
  grammar("and-go", "-고", "and (then)", "A2", "Connectors"),
  grammar("because-aseo", "-아서/어서", "because / so; and then", "A2", "Connectors", {
    explanation: "Gives a reason (피곤해서 잤어요). Never used before commands or suggestions: use -(으)니까 there.",
  }),
  grammar("but-jiman", "-지만", "but", "A2", "Connectors"),
  grammar("background-neunde", "-는데/(으)ㄴ데", "…, and/but (background)", "B1", "Connectors", {
    explanation:
      "Sets up context for what comes next. Ending a sentence with it softens it: 시간이 없는데… 'I don't really have time, so…'",
  }),
  grammar("because-nikka", "-(으)니까", "because (with commands/suggestions)", "B1", "Connectors", {
    pre: ["g.because-aseo"],
  }),

  // Intentions and wishes
  grammar("want-go-sipda", "-고 싶다", "want to", "A1", "Intentions & wishes", {
    explanation: "For yourself or questions to the listener. About a third person, use -고 싶어하다.",
  }),
  grammar("intent-euryeogo", "-(으)려고", "in order to / planning to", "A2", "Intentions & wishes", {
    pattern: "Stem + 려고 (after vowel) / 으려고 (after consonant)",
    explanation: "Purpose or intention. Ending a sentence with it: 지금 나가려고요 'I'm about to head out.'",
  }),
  grammar("will-eullae", "-(으)ㄹ래(요)", "want to? / I'll… (casual intention)", "A2", "Intentions & wishes", {
    explanation: "Asking what someone wants (뭐 먹을래?) or stating your choice (난 커피 마실래).",
  }),

  // Requests and suggestions
  grammar("request-juseyo", "-아/어 주세요", "please (do for me)", "A1", "Requests & suggestions", {
    explanation: "A favor for you. N + 주세요 means 'please give me N'.",
  }),
  grammar("command-seyo", "-(으)세요", "please do (polite command)", "A1", "Requests & suggestions", {
    pre: ["g.haeyo"],
    explanation: "Polite instruction or wish: 안녕히 가세요, 갈아타세요.",
  }),
  grammar("shall-eulkkayo", "-(으)ㄹ까요?", "shall we…? / should I…?", "A2", "Requests & suggestions"),
  grammar("lets-ja", "-자", "let's (casual)", "A2", "Requests & suggestions", {
    pre: ["g.banmal"],
    explanation: "Casual 'let's'. Polite equivalent: -아요/어요 with rising tone, or -(으)ㅂ시다 for groups (can sound bossy).",
  }),
  grammar("try-aboda", "-아/어 보다", "try doing", "A2", "Requests & suggestions", {
    explanation: "먹어 봐! 'Try it!' Also used for experiences: 가 봤어요 'I've been there.'",
  }),

  // Reactions
  grammar("discovery-ne", "-네(요)", "reacting to something you just noticed", "A2", "Reactions", {
    explanation: "Fresh discovery or mild surprise: 한국어 잘하시네요! Can't be used to tell news the listener doesn't know.",
  }),
  grammar("realize-guna", "-구나/군요", "oh, I see (realization)", "B1", "Reactions", {
    explanation: "그렇구나 to friends; 그렇군요 is more reserved. With elders, 아, 네 is often safer.",
  }),
  grammar("agree-jyo", "-지(요)/죠", "…, right? / of course", "B1", "Reactions", {
    explanation: "Seeking agreement or stating something both sides know: 맛있죠?",
  }),

  // Conditions and ability
  grammar("if-eumyeon", "-(으)면", "if / when", "A2", "Conditions & ability"),
  grammar("can-eulsu", "-(으)ㄹ 수 있다", "can / be able to", "A2", "Conditions & ability"),
  grammar("time-mane", "N 만에", "after (a span of time)", "B1", "Conditions & ability", {
    explanation: "10분 만에 'within ten minutes', 3년 만에 'for the first time in three years'.",
  }),

  // Reported speech
  grammar("reported-dago", "-다고 하다", "say that… (reported speech)", "B1", "Reported speech", {
    explanation: "급한 일이 있다고 했어 'I said I had something urgent.' Contracted in speech: -대, -래.",
  }),

  // Natural speech
  grammar("drop-particle", "Particle dropping", "leaving out 은/는, 을/를, 에 when meaning is clear", "A2", "Natural speech", {
    skill: "conversation",
    explanation: "집에 가 → 집 가. Textbooks keep particles; conversation drops them when context makes them obvious.",
  }),
  grammar("drop-subject", "Subject dropping", "leaving out 'I' and 'you'", "A1", "Natural speech", {
    skill: "conversation",
    explanation: "Korean leaves out subjects the listener can guess. 배고파 already means 'I'm hungry.'",
  }),
  grammar("contraction", "Spoken contractions", "뭐, 거, 난, 걔, 얘기 …", "A2", "Natural speech", {
    skill: "conversation",
    explanation: "무엇 → 뭐, 것 → 거, 나는 → 난, 그 아이 → 걔, 이야기 → 얘기.",
  }),
  grammar("noun-iyo", "N + (이)요", "polite tag on a short answer", "A1", "Natural speech", {
    skill: "conversation",
    explanation: "Add 요 to a noun or fragment to keep a short answer polite: 아아 한 잔이요. 저도요.",
  }),
];

const VOCAB: Concept[] = [
  // Time
  vocab("오늘", "today", "BEGINNER", "Time", "noun", { frequency: "core" }),
  vocab("어제", "yesterday", "BEGINNER", "Time", "noun", { frequency: "core" }),
  vocab("내일", "tomorrow", "BEGINNER", "Time", "noun", { frequency: "core" }),
  vocab("지금", "now", "BEGINNER", "Time", "noun", { frequency: "core" }),
  vocab("주말", "weekend", "A1", "Time", "noun", { frequency: "common" }),
  vocab("아침", "morning; breakfast", "A1", "Time", "noun", { frequency: "core" }),
  vocab("점심", "lunch; midday", "A1", "Time", "noun", { frequency: "core" }),
  vocab("저녁", "evening; dinner", "A1", "Time", "noun", { frequency: "core" }),
  vocab("이따", "later (today)", "A2", "Time", "adverb", { frequency: "common" }),
  vocab("시간", "time; hour", "A1", "Time", "noun", { frequency: "core" }),
  vocab("요즘", "these days", "A2", "Time", "noun", { frequency: "core" }),
  vocab("오랜만", "a long time (since)", "A2", "Time", "noun", { frequency: "common" }),

  // Question words
  vocab("뭐", "what (spoken)", "BEGINNER", "Question words", "pronoun", { frequency: "core" }),
  vocab("무엇", "what (written/formal)", "A1", "Question words", "pronoun", { frequency: "core" }),
  vocab("어디", "where", "BEGINNER", "Question words", "pronoun", { frequency: "core" }),
  vocab("언제", "when", "A1", "Question words", "adverb", { frequency: "core" }),
  vocab("누구", "who", "A1", "Question words", "pronoun", { frequency: "core" }),
  vocab("왜", "why", "A1", "Question words", "adverb", { frequency: "core" }),
  vocab("어떻게", "how", "A1", "Question words", "adverb", { frequency: "core" }),
  vocab("무슨", "what kind of; what", "A2", "Question words", "expression", { frequency: "core" }),

  // People
  vocab("친구", "friend", "BEGINNER", "People", "noun", { frequency: "core" }),
  vocab("나", "I, me (casual)", "BEGINNER", "People", "pronoun", { frequency: "core" }),
  vocab("저", "I, me (humble/polite)", "BEGINNER", "People", "pronoun", { frequency: "core" }),
  vocab("너", "you (casual)", "A1", "People", "pronoun", { frequency: "core" }),
  vocab("우리", "we; our (also 'my' for family/home)", "A1", "People", "pronoun", { frequency: "core" }),
  vocab("사람", "person", "A1", "People", "noun", { frequency: "core" }),
  vocab("할머니", "grandmother", "A1", "People", "noun", { frequency: "common" }),
  vocab("엄마", "mom", "BEGINNER", "People", "noun", { frequency: "core" }),
  vocab("언니", "older sister / older female friend (said by women)", "A2", "People", "noun", { frequency: "common" }),
  vocab("오빠", "older brother / older male friend (said by women)", "A2", "People", "noun", { frequency: "common" }),
  vocab("형", "older brother / older male friend (said by men)", "A2", "People", "noun", { frequency: "common" }),
  vocab("누나", "older sister / older female friend (said by men)", "A2", "People", "noun", { frequency: "common" }),
  vocab("선배", "senior (school/work)", "B1", "People", "noun", { frequency: "common" }),
  vocab("팀장님", "team leader (with honorific 님)", "B1", "People", "noun", { frequency: "common" }),
  vocab("교수님", "professor (with honorific 님)", "A2", "People", "noun", { frequency: "common" }),
  vocab("사장님", "boss; business owner (with 님)", "A2", "People", "noun", { frequency: "common" }),
  vocab("학생", "student", "A1", "People", "noun", { frequency: "core" }),

  // Places
  vocab("집", "home; house", "BEGINNER", "Places", "noun", { frequency: "core" }),
  vocab("학교", "school", "BEGINNER", "Places", "noun", { frequency: "core" }),
  vocab("회사", "company; office", "A1", "Places", "noun", { frequency: "core" }),
  vocab("카페", "café", "BEGINNER", "Places", "noun", { frequency: "common" }),
  vocab("역", "station", "A1", "Places", "noun", { frequency: "common" }),
  vocab("화장실", "bathroom", "A1", "Places", "noun", { frequency: "common" }),
  vocab("정류장", "bus stop", "A2", "Places", "noun", { frequency: "less-common" }),
  vocab("편의점", "convenience store", "A2", "Places", "noun", { frequency: "common" }),

  // Food and drink
  vocab("밥", "rice; meal", "BEGINNER", "Food & drink", "noun", { frequency: "core" }),
  vocab("물", "water", "BEGINNER", "Food & drink", "noun", { frequency: "core" }),
  vocab("커피", "coffee", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("잔", "cup, glass (counter)", "A1", "Food & drink", "counter", { frequency: "common" }),
  vocab("식사", "meal (polite word)", "A2", "Food & drink", "noun", { frequency: "common" }),
  vocab("떡볶이", "tteokbokki (spicy rice cakes)", "A1", "Food & drink", "noun", { frequency: "less-common" }),
  vocab("김치", "kimchi", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("치킨", "fried chicken", "A1", "Food & drink", "noun", { frequency: "common" }),
  vocab("맥주", "beer", "A1", "Food & drink", "noun", { frequency: "common" }),

  // Everyday verbs
  vocab("하다", "to do", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("가다", "to go", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("오다", "to come", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("먹다", "to eat", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("마시다", "to drink", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("보다", "to see, watch; (auxiliary) try", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("만나다", "to meet", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("공부하다", "to study", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("자다", "to sleep", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("있다", "to be (somewhere); to have", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("없다", "to not be; to not have", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("알다", "to know", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("모르다", "to not know", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("주다", "to give", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("기다리다", "to wait", "A1", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("타다", "to ride, get on", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("내리다", "to get off; to fall (rain)", "A2", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("갈아타다", "to transfer (trains/buses)", "A2", "Everyday verbs", "verb", { frequency: "less-common" }),
  vocab("연락하다", "to contact, text, call", "A2", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("주문하다", "to order", "A2", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("일어나다", "to get up, wake up", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("말하다", "to speak, say", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("쉬다", "to rest", "A2", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("사다", "to buy", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("일하다", "to work", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("끝나다", "to end, finish", "A2", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("보내다", "to send; to spend (time)", "A2", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("걱정하다", "to worry", "A2", "Everyday verbs", "verb", { frequency: "common" }),

  // Descriptions and feelings
  vocab("좋다", "to be good; to like", "BEGINNER", "Descriptions", "adjective", { frequency: "core" }),
  vocab("괜찮다", "to be okay, fine; no thanks", "A1", "Descriptions", "adjective", { frequency: "core" }),
  vocab("맛있다", "to be delicious", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("배고프다", "to be hungry", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("피곤하다", "to be tired", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("바쁘다", "to be busy", "A1", "Descriptions", "adjective", { frequency: "core" }),
  vocab("춥다", "to be cold (weather)", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("맵다", "to be spicy", "A2", "Descriptions", "adjective", { frequency: "common" }),
  vocab("비싸다", "to be expensive", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("재미있다", "to be fun, interesting", "A1", "Descriptions", "adjective", { frequency: "core" }),
  vocab("어떻다", "to be how (어땠어? 'how was it?')", "A2", "Descriptions", "adjective", { frequency: "core" }),
  vocab("반갑다", "to be glad to see/meet", "A1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("고맙다", "to be thankful", "A1", "Descriptions", "adjective", { frequency: "core" }),
  vocab("서운하다", "to feel hurt or let down (by someone close)", "B1", "Descriptions", "adjective", { frequency: "less-common" }),
  vocab("편하다", "to be comfortable", "A2", "Descriptions", "adjective", { frequency: "common" }),
  vocab("급하다", "to be urgent; to be in a hurry", "B1", "Descriptions", "adjective", { frequency: "common" }),
  vocab("궁금하다", "to be curious, wonder", "A2", "Descriptions", "adjective", { frequency: "common" }),

  // Adverbs
  vocab("진짜", "really; for real", "A1", "Adverbs", "adverb", { frequency: "core" }),
  vocab("너무", "too; so, very", "A1", "Adverbs", "adverb", { frequency: "core" }),
  vocab("좀", "a little; softens requests", "A1", "Adverbs", "adverb", { frequency: "core" }),
  vocab("같이", "together", "A1", "Adverbs", "adverb", { frequency: "core" }),
  vocab("다시", "again", "A1", "Adverbs", "adverb", { frequency: "core" }),
  vocab("그냥", "just; for no reason", "A2", "Adverbs", "adverb", { frequency: "core" }),
  vocab("먼저", "first; ahead", "A2", "Adverbs", "adverb", { frequency: "core" }),
  vocab("천천히", "slowly", "A1", "Adverbs", "adverb", { frequency: "common" }),
  vocab("잘", "well", "BEGINNER", "Adverbs", "adverb", { frequency: "core" }),
  vocab("완전", "totally (colloquial)", "A2", "Adverbs", "adverb", { frequency: "common" }),
  vocab("계속", "continuously; keep (doing)", "A2", "Adverbs", "adverb", { frequency: "core" }),
  vocab("결국", "in the end", "B1", "Adverbs", "adverb", { frequency: "common" }),
  vocab("바로", "right (away); exactly", "A2", "Adverbs", "adverb", { frequency: "core" }),

  // Work, school, transport
  vocab("회의", "meeting", "A2", "Work & school", "noun", { frequency: "common" }),
  vocab("일", "work; a matter, thing", "A1", "Work & school", "noun", { frequency: "core" }),
  vocab("한국어", "Korean (language)", "BEGINNER", "Work & school", "noun", { frequency: "common" }),
  vocab("버스", "bus", "BEGINNER", "Transport", "noun", { frequency: "common" }),
  vocab("지하철", "subway", "A1", "Transport", "noun", { frequency: "common" }),
  vocab("택시", "taxi", "BEGINNER", "Transport", "noun", { frequency: "common" }),
  vocab("다음", "next", "A1", "Transport", "noun", { frequency: "core" }),
  vocab("이번", "this (upcoming) one", "A2", "Transport", "noun", { frequency: "core" }),
  vocab("길", "road; way", "A1", "Transport", "noun", { frequency: "core" }),
  vocab("영화", "movie", "A1", "Hobbies", "noun", { frequency: "common" }),
  vocab("노래방", "karaoke room", "A2", "Hobbies", "noun", { frequency: "less-common" }),
  vocab("여행", "travel, trip", "A1", "Hobbies", "noun", { frequency: "common" }),
  vocab("돈", "money", "A1", "Everyday nouns", "noun", { frequency: "core" }),
  vocab("얼마", "how much", "A1", "Shopping", "noun", { frequency: "core" }),
  vocab("원", "won (currency)", "A1", "Shopping", "counter", { frequency: "core" }),
  vocab("비", "rain", "A1", "Weather", "noun", { frequency: "common" }),
  vocab("우산", "umbrella", "A1", "Weather", "noun", { frequency: "common" }),
  vocab("날씨", "weather", "A1", "Weather", "noun", { frequency: "common" }),
  vocab("나중", "later", "A2", "Time", "noun", { frequency: "core" }),
  vocab("전화", "phone; phone call", "A1", "Everyday nouns", "noun", { frequency: "core" }),
  vocab("이름", "name", "BEGINNER", "Everyday nouns", "noun", { frequency: "core" }),
  vocab("말", "words, speech, language", "A1", "Everyday nouns", "noun", { frequency: "core" }),
];

const EXPRESSIONS: Concept[] = [
  expression("daebak", "대박", "amazing! / no way! (big surprise)", "A2", "Slang", { skill: "slang" }),
  expression("heol", "헐", "what?! / OMG (shock)", "A2", "Slang", { skill: "slang" }),
  expression("jjinja", "진짜?", "really?", "A1", "Reactions"),
  expression("noljam", "노잼 / 꿀잼", "boring / super fun", "B1", "Slang", { skill: "slang" }),
  expression("aa", "아아", "iced americano", "A2", "Slang", { skill: "slang" }),
  expression("ilgssip", "읽씹", "leaving someone on read", "B1", "Slang", { skill: "slang" }),
  expression("honbap", "혼밥", "eating alone", "B1", "Slang", { skill: "slang" }),
  expression("gukrul", "국룰", "the unwritten rule; the classic move", "B2", "Slang", { skill: "slang" }),
  expression("kk", "ㅋㅋ / ㅎㅎ / ㅠㅠ", "texting laughter and crying", "A1", "Slang", { skill: "slang" }),
  expression("jonmat", "JMT / 존맛", "insanely delicious (crude)", "B2", "Slang", { skill: "slang" }),
  expression("gabunssa", "갑분싸", "the mood suddenly went cold", "B2", "Slang", { skill: "slang" }),
  expression("mal-noh", "말 놓다 / 말 편하게 하다", "to switch to casual speech", "A2", "Set phrases", { skill: "honorifics" }),
  expression("sugo", "수고하세요 / 수고하셨습니다", "thanks for your work (parting phrase)", "A2", "Set phrases"),
  expression("jal-meokgetseumnida", "잘 먹겠습니다", "said before eating a meal someone provides", "A1", "Set phrases"),
  expression("yeogiyo", "여기요 / 저기요", "excuse me! (getting attention)", "A1", "Set phrases"),
  expression("aigo", "아이고", "oh my / oof (sigh, sympathy, effort)", "A2", "Reactions"),
  expression("geureoke", "그러게", "I know, right / tell me about it", "B1", "Reactions"),
  expression("mal-do-an-dwae", "말도 안 돼", "no way / that's absurd", "A2", "Reactions"),
  expression("jal-butak", "잘 부탁드려요", "I look forward to working with you", "A2", "Set phrases"),
  expression("joshimhi", "조심히 가요", "get home safe", "A2", "Set phrases"),
  expression("mukbang", "먹방", "eating broadcast", "A2", "Slang", { skill: "slang" }),
  expression("bulgeum", "불금", "TGIF ('fire Friday')", "B1", "Slang", { skill: "slang" }),
];

const CULTURE: Concept[] = [
  culture("bap-greeting", "밥 먹었어?", "asking if someone ate is a greeting", "A1"),
  culture("nunchi", "눈치", "reading the room", "A2"),
  culture("age-titles", "언니/오빠/형/누나", "kinship titles for friends", "A2", { skill: "honorifics" }),
  culture("dangsin", "당신", "why Koreans rarely say 'you'", "A2", { skill: "honorifics" }),
  culture("work-leaving", "먼저 들어가 보겠습니다", "leaving work before your seniors", "B2", { skill: "honorifics" }),
  culture("uri", "우리", "'our' meaning 'my'", "A2"),
  culture("texting", "KakaoTalk texting", "how Koreans text", "A2", { skill: "slang" }),
  culture("drinking", "술자리", "drinking etiquette", "B1", { skill: "honorifics" }),
  culture("haeyo-default", "Default politeness", "when to use 해요체", "A1", { skill: "honorifics" }),
  culture("ppalli", "빨리빨리", "the 'hurry hurry' culture", "A2"),
];

/** Foundations: the very first things a learner meets. */
const FOUNDATIONS: Concept[] = [
  expression("annyeong", "안녕하세요 / 안녕히 가세요 / 안녕히 계세요", "hello and the two goodbyes", "BEGINNER", "Greetings & courtesy"),
  expression("sorry", "죄송합니다 / 미안해요", "I'm sorry", "BEGINNER", "Greetings & courtesy"),
  expression("ne-aniyo", "네 / 아니요", "yes / no", "BEGINNER", "Yes, no & reactions"),
  expression("geulsse", "글쎄요", "well… (hesitating)", "BEGINNER", "Yes, no & reactions"),
  grammar("ida", "N + 이에요/예요", "is, am, are (with a noun)", "BEGINNER", "Is & isn't", {
    pattern: "N + 이에요 (after consonant) / 예요 (after vowel)",
    explanation: "Joins a noun to the subject: 학생이에요 'I'm a student', 커피예요 'it's coffee'.",
    examples: [["저는 학생이에요.", "I'm a student."]],
  }),
  grammar("anida", "N + 이/가 아니에요", "is not (with a noun)", "BEGINNER", "Is & isn't", {
    pre: ["g.ida"],
    pattern: "N + 이/가 아니에요",
    explanation: "The negative of 이에요/예요. Use 아니에요, never 안: 학생이 아니에요.",
  }),
  grammar("itda-eopda", "있어요 / 없어요", "there is, I have / there isn't, I don't have", "BEGINNER", "Have & there is", {
    explanation: "One verb covers 'have' and 'there is': 시간 있어요? 'Do you have time?', 물 있어요? 'Is there water?'",
  }),
  grammar("demonstratives", "이거 / 그거 / 저거", "this / that (near you) / that (over there)", "BEGINNER", "This, that & where", {
    explanation: "이 is near me, 그 is near you (or already mentioned), 저 is away from both of us. Same for 여기/거기/저기.",
  }),
  vocab("여기", "here", "BEGINNER", "Places", "pronoun", { frequency: "core" }),
  vocab("거기", "there (near you)", "BEGINNER", "Places", "pronoun", { frequency: "core" }),
  vocab("저기", "over there", "BEGINNER", "Places", "pronoun", { frequency: "core" }),
  vocab("선생님", "teacher", "BEGINNER", "People", "noun", { frequency: "common" }),
  vocab("회사원", "office worker", "BEGINNER", "People", "noun", { frequency: "common" }),
  vocab("나라", "country", "BEGINNER", "Everyday nouns", "noun", { frequency: "core" }),
  vocab("차", "tea; car", "BEGINNER", "Food & drink", "noun", { frequency: "core" }),
  vocab("빵", "bread", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("떡", "rice cake", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("김밥", "gimbap (seaweed rice roll)", "BEGINNER", "Food & drink", "noun", { frequency: "less-common" }),
  vocab("가방", "bag", "BEGINNER", "Everyday nouns", "noun", { frequency: "common" }),
  vocab("좋아하다", "to like", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("맞다", "to be right, correct", "BEGINNER", "Descriptions", "adjective", { frequency: "core" }),
  vocab("아니면", "or (else)", "BEGINNER", "Adverbs", "adverb", { frequency: "core" }),
  vocab("몇", "how many; what (number)", "BEGINNER", "Question words", "expression", { frequency: "core" }),
  vocab("드라마", "TV drama", "BEGINNER", "Hobbies", "noun", { frequency: "common" }),
  vocab("책", "book", "BEGINNER", "Everyday nouns", "noun", { frequency: "core" }),
  vocab("읽다", "to read", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("배우다", "to learn", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("운동하다", "to exercise", "BEGINNER", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("고기", "meat", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("술", "alcohol, a drink", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("음식", "food", "BEGINNER", "Food & drink", "noun", { frequency: "core" }),
  vocab("싫어하다", "to dislike", "BEGINNER", "Everyday verbs", "verb", { frequency: "common" }),
  vocab("걸리다", "to take (time)", "A1", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("번호", "number (phone, room)", "BEGINNER", "Everyday nouns", "noun", { frequency: "common" }),
  expression("byeollo", "별로(요)", "not really", "BEGINNER", "Yes, no & reactions"),
  grammar("native-numbers", "하나, 둘, 셋…", "native Korean numbers: things, people, age, hours", "BEGINNER", "Numbers", {
    explanation: "하나·둘·셋·넷·스물 shorten before a counter: 한 개, 두 명, 세 시, 네 살, 스무 살.",
    examples: [["두 개 주세요.", "Two, please."]],
  }),
  grammar("sino-numbers", "일, 이, 삼…", "Sino-Korean numbers: money, minutes, dates, phone numbers", "BEGINNER", "Numbers", {
    explanation: "Money (오천 원), minutes (삼십 분), dates (시월 구 일) and phone numbers use these. 0 in phone numbers is 공.",
  }),
  vocab("개", "item (counter)", "BEGINNER", "Numbers", "counter", { frequency: "core" }),
  vocab("명", "person (counter)", "BEGINNER", "Numbers", "counter", { frequency: "core" }),
  vocab("살", "years old (counter)", "BEGINNER", "Numbers", "counter", { frequency: "common" }),
  vocab("시", "o'clock (counter)", "BEGINNER", "Numbers", "counter", { frequency: "core" }),
  vocab("분", "minute (counter)", "BEGINNER", "Numbers", "counter", { frequency: "core" }),
  vocab("요일", "day of the week", "BEGINNER", "Time", "noun", { frequency: "common" }),
  vocab("매일", "every day", "BEGINNER", "Time", "adverb", { frequency: "core" }),
  vocab("가족", "family", "BEGINNER", "People", "noun", { frequency: "core" }),
  vocab("동생", "younger sibling", "BEGINNER", "People", "noun", { frequency: "common" }),
  vocab("아빠", "dad", "BEGINNER", "People", "noun", { frequency: "common" }),
  vocab("부모님", "parents (honorific)", "BEGINNER", "People", "noun", { frequency: "common" }),
  vocab("메뉴", "menu", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("비빔밥", "bibimbap (mixed rice bowl)", "BEGINNER", "Food & drink", "noun", { frequency: "less-common" }),
  vocab("라면", "ramyeon (instant noodles)", "BEGINNER", "Food & drink", "noun", { frequency: "common" }),
  vocab("오른쪽", "the right (side)", "BEGINNER", "Directions", "noun", { frequency: "common" }),
  vocab("왼쪽", "the left (side)", "BEGINNER", "Directions", "noun", { frequency: "common" }),
  vocab("앞", "front", "BEGINNER", "Directions", "noun", { frequency: "core" }),
  vocab("옆", "side, next to", "BEGINNER", "Directions", "noun", { frequency: "core" }),
  vocab("뒤", "back, behind", "BEGINNER", "Directions", "noun", { frequency: "core" }),
  vocab("쭉", "straight (ahead)", "BEGINNER", "Directions", "adverb", { frequency: "common" }),
  vocab("가깝다", "to be close", "BEGINNER", "Directions", "adjective", { frequency: "common" }),
  vocab("멀다", "to be far", "BEGINNER", "Directions", "adjective", { frequency: "common" }),
  vocab("영어", "English (language)", "BEGINNER", "Work & school", "noun", { frequency: "common" }),
  vocab("조금", "a little", "BEGINNER", "Adverbs", "adverb", { frequency: "core" }),
  vocab("쓰다", "to write; to use", "BEGINNER", "Everyday verbs", "verb", { frequency: "core" }),
  vocab("음악", "music", "BEGINNER", "Hobbies", "noun", { frequency: "common" }),
  vocab("식당", "restaurant", "BEGINNER", "Places", "noun", { frequency: "common" }),
  vocab("옷", "clothes", "BEGINNER", "Everyday nouns", "noun", { frequency: "core" }),
  expression("mworago", "네? 뭐라고요?", "sorry, what was that?", "BEGINNER", "Learner survival"),
  grammar("sound-linking", "연음 (linking)", "a final consonant slides onto a following vowel", "BEGINNER", "Sounds", {
    skill: "listening",
  }),
  grammar("sound-nasal", "비음화 (nasalization)", "ㄱ/ㄷ/ㅂ become ㅇ/ㄴ/ㅁ before ㄴ or ㅁ", "BEGINNER", "Sounds", { skill: "listening" }),
  grammar("sound-tense", "경음화 (tensing)", "ㄱ/ㄷ/ㅂ/ㅅ/ㅈ turn tense after another stop", "BEGINNER", "Sounds", { skill: "listening" }),
  grammar("sound-liquid", "유음화 (ㄹ assimilation)", "ㄴ next to ㄹ becomes ㄹ", "BEGINNER", "Sounds", { skill: "listening" }),
  grammar("sound-final", "받침 sounds", "final consonants collapse to 7 sounds", "BEGINNER", "Sounds", { skill: "listening" }),
];

export const CONCEPTS: Concept[] = [...GRAMMAR, ...VOCAB, ...EXPRESSIONS, ...CULTURE, ...FOUNDATIONS];
