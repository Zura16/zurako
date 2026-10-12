import { card, s, w, type Unit } from "../author";

const sentences = [
  s("good-work-past", "수고하셨습니다.", "Thanks for your hard work.", { level: "A2", sp: "FORMAL", ctx: "End of a meeting, project, or workday." }, [
    w("수고하셨습니다", "you worked hard", { base: "수고하다", parts: [["수고하", "take trouble, labor", "stem"], ["셨", "honorific + past", "infix"], ["습니다", "formal", "ending"]], c: ["e.sugo", "g.honorific-si", "g.hapsyo"] }),
  ]),
  s("good-work-go", "수고하세요.", "Keep up the good work. (said when leaving)", { level: "A2", sp: "POLITE", ctx: "Leaving a shop, or a coworker of equal or lower rank." }, [
    w("수고하세요", "keep laboring (honorific)", { base: "수고하다", c: ["e.sugo", "g.command-seyo"] }),
  ]),
  s("leaving-first", "먼저 들어가 보겠습니다.", "I'll head out first.", { level: "B2", sp: "FORMAL", lit: "first, I will go in (and see)", ctx: "Leaving work before your seniors." }, [
    w("먼저", "first, ahead", { c: ["v.먼저"] }),
    w("들어가 보겠습니다", "I'll go in (home)", { base: "들어가다", note: "들어가다 'go in' here means going home. -아 보다 softens it, -겠- adds modesty.", c: ["g.try-aboda", "g.guess-get", "g.hapsyo", "c.work-leaving"] }),
  ]),
  s("meeting-start", "그럼 회의를 시작하겠습니다.", "Well then, let's begin the meeting.", { level: "B1", sp: "FORMAL" }, [
    w("그럼", "well then"),
    w("회의를", "the meeting (object)", { c: ["v.회의", "g.object"] }),
    w("시작하겠습니다", "I will begin", { base: "시작하다", c: ["g.guess-get", "g.hapsyo"] }),
  ]),
  s("work-ends-when", "오늘 일 언제 끝나요?", "When do you finish work today?", { level: "A2", sp: "POLITE" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("일", "work", { c: ["v.일", "g.drop-particle"] }),
    w("언제", "when", { c: ["v.언제"] }),
    w("끝나요", "end", { base: "끝나다", c: ["v.끝나다"] }),
  ]),
  s("overtime", "오늘도 야근해야 돼요.", "I have to work late again today.", { level: "B1", sp: "POLITE" }, [
    w("오늘도", "today too", { c: ["v.오늘", "g.also"] }),
    w("야근해야 돼요", "have to work overtime", { base: "야근하다", note: "-아/어야 되다 means 'have to'. 야근 = night work.", c: ["v.일하다"] }),
  ]),
  s("tgif", "불금이다!", "It's Friday night!", { level: "B1", sp: "CASUAL", nat: "SLANG", lit: "it's fire-Friday" }, [
    w("불금이다", "it's 불금", { parts: [["불금", "불타는 금요일: 'burning Friday'", "word"], ["이다", "it is (plain)", "ending"]], c: ["e.bulgeum", "g.plain-da"] }),
  ]),
  s("team-leader-call", "팀장님, 잠깐 시간 괜찮으세요?", "Team leader, do you have a moment?", { level: "B1", sp: "POLITE" }, [
    w("팀장님", "team leader (honorific)", { note: "Address seniors by title + 님, not by name or 'you'.", c: ["v.팀장님"] }),
    w("잠깐", "a moment"),
    w("시간", "time", { c: ["v.시간"] }),
    w("괜찮으세요", "is it okay for you (honorific)", { base: "괜찮다", c: ["v.괜찮다", "g.honorific-si"] }),
  ]),
  // School
  s("school-yesterday", "어제 학교에 갔어요.", "I went to school yesterday.", { level: "A1", sp: "POLITE" }, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("학교에", "to school", { parts: [["학교", "school", "word"], ["에", "to", "particle"]], c: ["v.학교", "g.place-e"] }),
    w("갔어요", "went", { base: "가다", parts: [["가", "go", "stem"], ["았 → ㅆ", "past (merged)", "infix"], ["어요", "polite", "ending"]], forms: [["Dictionary", "가다"], ["Polite present", "가요"], ["Polite past", "갔어요"]], c: ["v.가다", "g.past"] }),
  ]),
  s("school-yesterday-dropped", "어제 학교 갔어요.", "I went to school yesterday.", { level: "A1", sp: "POLITE" }, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("학교", "school", { c: ["v.학교", "g.drop-particle"] }),
    w("갔어요", "went", { base: "가다", c: ["v.가다", "g.past"] }),
  ]),
  s("skipped-school", "오늘 학교 안 갔어.", "I didn't go to school today.", { level: "A1", sp: "CASUAL" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("학교", "school", { c: ["v.학교"] }),
    w("안", "not", { c: ["g.neg-an"] }),
    w("갔어", "went", { base: "가다", c: ["v.가다", "g.past"] }),
  ]),
  s("saving-for-travel", "일본 여행 가려고 돈 모으고 있어요.", "I'm saving money to travel to Japan.", { level: "A2", sp: "POLITE" }, [
    w("일본", "Japan"),
    w("여행", "trip", { c: ["v.여행"] }),
    w("가려고", "in order to go", { base: "가다", parts: [["가", "go", "stem"], ["려고", "in order to", "ending"]], c: ["v.가다", "g.intent-euryeogo"] }),
    w("돈", "money", { c: ["v.돈"] }),
    w("모으고 있어요", "am collecting", { base: "모으다", c: ["g.progressive"] }),
  ]),
  s("came-to-meet", "친구 만나려고 홍대 왔어요.", "I came to Hongdae to meet a friend.", { level: "A2", sp: "POLITE" }, [
    w("친구", "friend", { c: ["v.친구"] }),
    w("만나려고", "in order to meet", { base: "만나다", c: ["v.만나다", "g.intent-euryeogo"] }),
    w("홍대", "Hongdae", { c: ["g.drop-particle"] }),
    w("왔어요", "came", { base: "오다", c: ["v.오다", "g.past"] }),
  ]),
  s("about-to-leave", "지금 나가려고요.", "I'm just about to head out.", { level: "B1", sp: "POLITE" }, [
    w("지금", "now", { c: ["v.지금"] }),
    w("나가려고요", "(I'm) planning to go out", { base: "나가다", note: "-려고요 at the end of a sentence: 'I'm about to / planning to.'", c: ["g.intent-euryeogo"] }),
  ]),
  s("can-speak-a-little", "한국어 조금 할 수 있어요.", "I can speak a little Korean.", { level: "A2", sp: "POLITE" }, [
    w("한국어", "Korean", { c: ["v.한국어"] }),
    w("조금", "a little"),
    w("할 수 있어요", "can do", { base: "하다", c: ["v.하다", "g.can-eulsu"] }),
  ]),
  s("if-tired-rest", "피곤하면 좀 쉬세요.", "If you're tired, get some rest.", { level: "A2", sp: "POLITE" }, [
    w("피곤하면", "if (you're) tired", { base: "피곤하다", c: ["v.피곤하다", "g.if-eumyeon"] }),
    w("좀", "a bit", { c: ["v.좀"] }),
    w("쉬세요", "please rest", { base: "쉬다", c: ["v.쉬다", "g.command-seyo"] }),
  ]),
];

const cards = [
  card("CULTURE", {
    id: "culture-sugo", level: "B2", topic: "Work", skills: ["honorifics", "conversation"], teaches: ["e.sugo", "c.work-leaving"], interest: 0.8,
    payload: {
      title: "수고하세요 and the junior problem",
      body: "수고하셨습니다 ('you worked hard') is safe at the end of a meeting. 수고하세요, said while leaving, can sound to some seniors like you're evaluating their effort. Juniors leaving before the boss often say 먼저 들어가 보겠습니다 instead.",
      sentence: "s.leaving-first",
    },
  }),
  card("MULTIPLE_CHOICE", {
    id: "mc-leaving", level: "B2", topic: "Work", skills: ["honorifics"], teaches: ["c.work-leaving"], interest: 0.8,
    payload: {
      prompt: "6 p.m. You're leaving before your manager. What's the safest thing to say?",
      options: [
        { text: "수고하세요!", why: "Common, but some managers find it presumptuous from a junior." },
        { text: "먼저 들어가 보겠습니다.", correct: true, why: "Modest and standard. It acknowledges you're leaving first." },
        { text: "잘 가요!", why: "That's what someone says to a person who is leaving, not when you are the one leaving." },
      ],
    },
  }),
  card("PHRASE", {
    id: "good-work", level: "A2", topic: "Work", skills: ["conversation"], teaches: ["e.sugo"],
    payload: { sentence: "s.good-work-past", tip: "Also said to a delivery driver or after a group project. A warm, all-purpose thanks." },
  }),
  card("PHRASE", {
    id: "meeting-start", level: "B1", topic: "Work", skills: ["honorifics"], teaches: ["g.hapsyo", "v.회의"],
    payload: { sentence: "s.meeting-start", tip: "Presentations and meetings open in 하십시오체. The Q&A afterward often relaxes into 해요체." },
  }),
  card("PHRASE", {
    id: "team-leader-call", level: "B1", topic: "Work", skills: ["honorifics", "conversation"], teaches: ["v.팀장님"],
    payload: { sentence: "s.team-leader-call", tip: "Title + 님 replaces 'you' entirely. Never address a senior by name alone." },
  }),
  card("PHRASE", {
    id: "overtime", level: "B1", topic: "Work", skills: ["conversation", "vocabulary"], interest: 0.6,
    payload: { sentence: "s.overtime", tip: "야근 (overtime at night) is a word every office worker knows too well." },
  }),
  card("EXPRESSION", {
    id: "expr-bulgeum", level: "B1", topic: "Work", skills: ["slang"], teaches: ["e.bulgeum"], interest: 0.8,
    payload: { concept: "e.bulgeum", sentence: "s.tgif", usage: "Short for 불타는 금요일, 'burning Friday.' Said with friends and coworkers you're close to." },
  }),
  card("SPEAKING", {
    id: "speak-school", level: "A1", topic: "School", skills: ["speaking", "grammar"], teaches: ["g.past"],
    payload: {
      prompt: "Say: 'I went to school yesterday.'",
      context: "Polite, to a coworker.",
      accepted: ["s.school-yesterday", "s.school-yesterday-dropped"],
      checks: [{ label: "Past tense", anyOf: ["갔"] }, { label: "School", anyOf: ["학교"] }, { label: "Yesterday", anyOf: ["어제"] }],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-past", level: "A1", topic: "Tense & aspect", skills: ["grammar"], teaches: ["g.past"],
    payload: {
      concept: "g.past",
      hook: "-았/었- puts any verb in the past.",
      formation: [{ base: "가다", result: "갔어요" }, { base: "먹다", result: "먹었어요" }, { base: "하다", result: "했어요" }],
      examples: ["s.school-yesterday", "s.skipped-school"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-euryeogo", level: "A2", topic: "Intentions & wishes", skills: ["grammar"], teaches: ["g.intent-euryeogo"], interest: 0.5,
    payload: {
      concept: "g.intent-euryeogo",
      hook: "-(으)려고 = in order to, or planning to.",
      formation: [{ base: "가다", result: "가려고" }, { base: "만나다", result: "만나려고" }, { base: "먹다", result: "먹으려고" }],
      examples: ["s.saving-for-travel", "s.came-to-meet", "s.about-to-leave"],
    },
  }),
  card("GRAMMAR", {
    id: "grammar-can", level: "A2", topic: "Conditions & ability", skills: ["grammar"], teaches: ["g.can-eulsu"],
    payload: {
      concept: "g.can-eulsu",
      hook: "-(으)ㄹ 수 있다 = can. -(으)ㄹ 수 없다 = can't.",
      formation: [{ base: "하다", result: "할 수 있어요" }, { base: "먹다", result: "먹을 수 있어요" }],
      examples: ["s.can-speak-a-little"],
    },
  }),
  card("FILL_BLANK", {
    id: "fill-euryeogo", level: "A2", topic: "Intentions & wishes", skills: ["grammar"], teaches: ["g.intent-euryeogo"],
    payload: { sentence: "s.came-to-meet", blank: "만나려고", options: ["만나려고", "만나서", "만나면"], hint: "The purpose of coming." },
  }),
  card("LISTENING", {
    id: "listen-school", level: "A1", topic: "School", skills: ["listening"], teaches: ["g.neg-an"],
    payload: { sentence: "s.skipped-school", question: "What did they say?", options: ["They went to school today", "They didn't go to school today", "They're going to school tomorrow"], answer: 1 },
  }),
  card("PHRASE", {
    id: "if-tired-rest", level: "A2", topic: "Daily life", skills: ["conversation"], teaches: ["g.if-eumyeon"],
    payload: { sentence: "s.if-tired-rest", tip: "-(으)세요 here is a kind suggestion, not an order." },
  }),
];

export const work: Unit = { sentences, cards };
