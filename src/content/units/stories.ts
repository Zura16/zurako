import { card, s, w, type Unit } from "../author";

/**
 * Multi-part stories. Each part is its own card; the feed engine boosts the
 * next part once the previous one is finished, so a story unfolds across a
 * session without blocking other content.
 */

const sentences = [
  // ---- 소개팅 (blind date): KakaoTalk chat between friends
  s("bd-1", "어제 소개팅했어.", "I went on a blind date yesterday.", { level: "A2", sp: "CASUAL" }, [
    w("어제", "yesterday", { c: ["v.어제"] }),
    w("소개팅했어", "had a blind date", {
      parts: [
        ["소개팅", "소개 (introduction) + meeting", "word"],
        ["했어", "did", "ending"],
      ],
      note: "Friends set each other up. Very common in Korea.",
      c: ["g.past"],
    }),
  ]),
  s("bd-2", "진짜? 어땠어?", "Really? How was it?", { level: "A2", sp: "CASUAL" }, [
    w("진짜", "really?", { c: ["v.진짜"] }),
    w("어땠어", "how was it", { base: "어떻다", c: ["v.어떻다", "g.past"] }),
  ]),
  s("bd-3", "10분 만에 집에 가고 싶었어.", "Ten minutes in, I wanted to go home.", { level: "B1", sp: "CASUAL" }, [
    w("10분", "ten minutes", { note: "Read 십 분: minutes use Sino-Korean numbers." }),
    w("만에", "after (only)", { c: ["g.time-mane"] }),
    w("집에", "home", { c: ["v.집", "g.place-e"] }),
    w("가고 싶었어", "wanted to go", { base: "가다", c: ["v.가다", "g.want-go-sipda", "g.past"] }),
  ]),
  s("bd-4", "왜? 무슨 일 있었어?", "Why? What happened?", { level: "A2", sp: "CASUAL" }, [
    w("왜", "why", { c: ["v.왜"] }),
    w("무슨", "what", { c: ["v.무슨"] }),
    w("일", "thing, matter", { c: ["v.일"] }),
    w("있었어", "was there", { base: "있다", c: ["v.있다", "g.past"] }),
  ]),
  s("bd-5", "그 사람이 계속 자기 얘기만 했어.", "They kept talking only about themselves.", { level: "B1", sp: "CASUAL" }, [
    w("그", "that"),
    w("사람이", "person (subject)", { c: ["v.사람", "g.subject"] }),
    w("계속", "continuously", { c: ["v.계속"] }),
    w("자기", "their own"),
    w("얘기만", "only stories", {
      parts: [
        ["얘기", "talk, story (이야기)", "contraction"],
        ["만", "only", "particle"],
      ],
      c: ["g.only-man", "g.contraction"],
    }),
    w("했어", "did", { base: "하다", c: ["v.하다", "g.past"] }),
  ]),
  s("bd-6", "그리고 커피값도 내가 냈어.", "And I paid for the coffee too.", { level: "B1", sp: "CASUAL" }, [
    w("그리고", "and"),
    w("커피값도", "the coffee bill too", {
      parts: [
        ["커피", "coffee", "word"],
        ["값", "price", "word"],
        ["도", "too", "particle"],
      ],
      c: ["v.커피", "g.also"],
    }),
    w("내가", "I (subject)", { note: "나 + 가 → 내가.", c: ["v.나", "g.subject"] }),
    w("냈어", "paid", { base: "내다", c: ["g.past"] }),
  ]),
  s("bd-7", "헐, 대박. 그래서 어떻게 했어?", "Whoa, seriously. So what did you do?", { level: "B1", sp: "CASUAL" }, [
    w("헐", "whoa", { c: ["e.heol"] }),
    w("대박", "no way", { c: ["e.daebak"] }),
    w("그래서", "so"),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("했어", "did (you)", { c: ["v.하다", "g.past"] }),
  ]),
  s("bd-8", "급한 일 있다고 하고 나왔어.", "I said something urgent came up and left.", { level: "B1", sp: "CASUAL" }, [
    w("급한", "urgent", { base: "급하다", c: ["v.급하다"] }),
    w("일", "matter", { c: ["v.일"] }),
    w("있다고", "that (I) had", { base: "있다", c: ["v.있다", "g.reported-dago"] }),
    w("하고", "said, and", { c: ["g.and-go"] }),
    w("나왔어", "came out (left)", { base: "나오다", c: ["g.past"] }),
  ]),

  // ---- Wrong bus: polite narration
  s("bus-1", "오늘 아침에 늦게 일어났어요.", "I woke up late this morning.", { level: "A2", sp: "POLITE" }, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("아침에", "in the morning", { c: ["v.아침", "g.place-e"] }),
    w("늦게", "late", { base: "늦다" }),
    w("일어났어요", "got up", { base: "일어나다", c: ["v.일어나다", "g.past"] }),
  ]),
  s("bus-2", "그래서 급하게 버스를 탔어요.", "So I rushed onto a bus.", { level: "A2", sp: "POLITE" }, [
    w("그래서", "so"),
    w("급하게", "hurriedly", { base: "급하다", c: ["v.급하다"] }),
    w("버스를", "bus (object)", { c: ["v.버스", "g.object"] }),
    w("탔어요", "rode", { base: "타다", c: ["v.타다", "g.past"] }),
  ]),
  s("bus-3", "그런데 버스가 반대 방향으로 가고 있었어요.", "But the bus was going the opposite way.", { level: "B1", sp: "POLITE" }, [
    w("그런데", "but"),
    w("버스가", "the bus (subject)", { c: ["v.버스", "g.subject"] }),
    w("반대", "opposite"),
    w("방향으로", "in the direction", { c: ["g.means-ro"] }),
    w("가고 있었어요", "was going", { base: "가다", c: ["v.가다", "g.progressive", "g.past"] }),
  ]),
  s("bus-4", "다음 정류장에서 바로 내렸어요.", "I got off right at the next stop.", { level: "A2", sp: "POLITE" }, [
    w("다음", "next", { c: ["v.다음"] }),
    w("정류장에서", "at the bus stop", { c: ["v.정류장", "g.place-eseo"] }),
    w("바로", "right away", { c: ["v.바로"] }),
    w("내렸어요", "got off", { base: "내리다", c: ["v.내리다", "g.past"] }),
  ]),
  s(
    "bus-5",
    "결국 택시를 탔는데 길이 너무 막혔어요.",
    "In the end I took a taxi, but the traffic was terrible.",
    { level: "B1", sp: "POLITE" },
    [
      w("결국", "in the end", { c: ["v.결국"] }),
      w("택시를", "taxi (object)", { c: ["v.택시", "g.object"] }),
      w("탔는데", "took, but…", { base: "타다", c: ["v.타다", "g.background-neunde"] }),
      w("길이", "the road", { c: ["v.길", "g.subject"] }),
      w("너무", "too", { c: ["v.너무"] }),
      w("막혔어요", "was jammed", { base: "막히다", c: ["g.past"] }),
    ],
  ),
  s("bus-6", "회의에 30분 늦었어요.", "I was 30 minutes late to the meeting.", { level: "A2", sp: "POLITE" }, [
    w("회의에", "to the meeting", { c: ["v.회의", "g.place-e"] }),
    w("30분", "30 minutes", { note: "Read 삼십 분." }),
    w("늦었어요", "was late", { base: "늦다", c: ["g.past"] }),
  ]),

  // ---- Grandma's kimchi: honorifics inside family 반말
  s(
    "gm-1",
    "할머니가 김치 보내셨어.",
    "Grandma sent kimchi.",
    { level: "B1", sp: "CASUAL", ctx: "Mom to her child: 반말, but honorific about grandma." },
    [
      w("할머니가", "grandma (subject)", { c: ["v.할머니", "g.subject"] }),
      w("김치", "kimchi", { c: ["v.김치", "g.drop-particle"] }),
      w("보내셨어", "sent (honorific)", {
        base: "보내다",
        parts: [
          ["보내", "send", "stem"],
          ["셨", "honorific + past", "infix"],
          ["어", "casual", "ending"],
        ],
        c: ["v.보내다", "g.honorific-si", "g.past"],
      }),
    ],
  ),
  s("gm-2", "진짜? 할머니 김치 최고지.", "Really? Grandma's kimchi is the best.", { level: "B1", sp: "CASUAL" }, [
    w("진짜", "really?", { c: ["v.진짜"] }),
    w("할머니", "grandma('s)", { c: ["v.할머니"] }),
    w("김치", "kimchi", { c: ["v.김치"] }),
    w("최고지", "is the best, of course", { c: ["g.agree-jyo"] }),
  ]),
  s(
    "gm-3",
    "근데 너 할머니한테 전화 좀 드려. 서운해하셔.",
    "But give grandma a call. She feels a bit hurt.",
    { level: "B1", sp: "CASUAL" },
    [
      w("근데", "but", { note: "Spoken 그런데.", c: ["g.contraction"] }),
      w("너", "you", { c: ["v.너"] }),
      w("할머니한테", "to grandma", { c: ["v.할머니", "g.to-person"] }),
      w("전화", "a call", { c: ["v.전화"] }),
      w("좀", "please", { c: ["v.좀"] }),
      w("드려", "give (humble)", { base: "드리다", note: "전화하다 to an elder becomes 전화 드리다.", c: ["g.humble"] }),
      w("서운해하셔", "she feels hurt (honorific)", {
        base: "서운해하다",
        note: "-아/어하다 describes someone else's feelings; -시- honors grandma.",
        c: ["v.서운하다", "g.honorific-si"],
      }),
    ],
  ),
  s("gm-4", "할머니, 저예요! 김치 잘 먹을게요.", "Grandma, it's me! I'll enjoy the kimchi.", { level: "B1", sp: "POLITE" }, [
    w("할머니", "grandma", { c: ["v.할머니"] }),
    w("저예요", "it's me", { c: ["v.저"] }),
    w("김치", "kimchi", { c: ["v.김치"] }),
    w("잘", "well", { c: ["v.잘"] }),
    w("먹을게요", "I'll eat", { base: "먹다", c: ["v.먹다", "g.promise-ge"] }),
  ]),
  s("gm-5", "아이고, 우리 강아지! 밥은 잘 먹고 다니니?", "Aigoo, my puppy! Are you eating well?", { level: "B1", sp: "CASUAL" }, [
    w("아이고", "oh my", { c: ["e.aigo"] }),
    w("우리", "my (our)", { c: ["v.우리", "c.uri"] }),
    w("강아지", "puppy", { note: "A grandparent's pet name for a grandchild." }),
    w("밥은", "meals (at least)", { c: ["v.밥", "g.topic"] }),
    w("잘", "well", { c: ["v.잘"] }),
    w("먹고", "eating and", { c: ["v.먹다", "g.and-go"] }),
    w("다니니", "going about?", { base: "다니다", note: "-니? is a gentle casual question, typical of older speakers." }),
  ]),
  s("gm-6", "네, 잘 먹고 있어요. 걱정하지 마세요.", "Yes, I'm eating well. Don't worry.", { level: "A2", sp: "POLITE" }, [
    w("네", "yes"),
    w("잘", "well", { c: ["v.잘"] }),
    w("먹고 있어요", "am eating", { c: ["v.먹다", "g.progressive"] }),
    w("걱정하지 마세요", "please don't worry", { base: "걱정하다", c: ["v.걱정하다", "g.dont-jimaseyo"] }),
  ]),

  // ---- 2 a.m. convenience store
  s(
    "cs-1",
    "새벽 2시에 너무 배고팠어요.",
    "At 2 a.m. I was starving.",
    { level: "A2", sp: "POLITE", spoken: "새벽 두 시에 너무 배고팠어요." },
    [
      w("새벽", "early morning (small hours)"),
      w("2시에", "at 2 o'clock", { note: "Read 두 시.", c: ["g.place-e"] }),
      w("너무", "so", { c: ["v.너무"] }),
      w("배고팠어요", "was hungry", { base: "배고프다", c: ["v.배고프다", "g.past"] }),
    ],
  ),
  s("cs-2", "그래서 편의점에 갔어요.", "So I went to the convenience store.", { level: "A1", sp: "POLITE" }, [
    w("그래서", "so"),
    w("편의점에", "to the convenience store", { c: ["v.편의점", "g.place-e"] }),
    w("갔어요", "went", { c: ["v.가다", "g.past"] }),
  ]),
  s(
    "cs-3",
    "라면을 사려고 했는데 지갑이 없었어요.",
    "I was about to buy ramyeon, but I didn't have my wallet.",
    { level: "B1", sp: "POLITE" },
    [
      w("라면을", "ramyeon (object)", { c: ["g.object"] }),
      w("사려고", "intending to buy", { base: "사다", c: ["v.사다", "g.intent-euryeogo"] }),
      w("했는데", "I was, but…", { c: ["g.background-neunde"] }),
      w("지갑이", "wallet (subject)", { c: ["g.subject"] }),
      w("없었어요", "didn't exist", { base: "없다", c: ["v.없다", "g.past"] }),
    ],
  ),
  s(
    "cs-4",
    "그때 옆에 있던 할머니가 웃으면서 말씀하셨어요.",
    "Then an elderly woman next to me said, smiling,",
    { level: "B1", sp: "POLITE" },
    [
      w("그때", "then"),
      w("옆에", "beside"),
      w("있던", "who was", { base: "있다", c: ["v.있다"] }),
      w("할머니가", "an elderly woman", { note: "할머니 is also how you refer to any elderly woman.", c: ["v.할머니", "g.subject"] }),
      w("웃으면서", "while smiling", { base: "웃다" }),
      w("말씀하셨어요", "said (honorific)", { base: "말씀하다", note: "말씀 is the honorific word for 말.", c: ["g.hon-vocab", "g.past"] }),
    ],
  ),
  s(
    "cs-5",
    "학생, 이거 내가 사 줄게.",
    "Student, let me buy this for you.",
    { level: "A2", sp: "CASUAL", ctx: "An elder may speak 반말 to a young stranger." },
    [
      w("학생", "student", { note: "Elders call any young person 학생.", c: ["v.학생"] }),
      w("이거", "this", { c: ["g.contraction"] }),
      w("내가", "I", { c: ["v.나", "g.subject"] }),
      w("사 줄게", "will buy for you", { base: "사다", c: ["v.사다", "g.promise-ge", "v.주다"] }),
    ],
  ),
  s(
    "cs-6",
    "그날 라면이 제일 맛있었어요.",
    "That was the best ramyeon I've ever had.",
    { level: "A2", sp: "POLITE", lit: "that day's ramyeon was the most delicious" },
    [
      w("그날", "that day"),
      w("라면이", "ramyeon (subject)", { c: ["g.subject"] }),
      w("제일", "the most"),
      w("맛있었어요", "was delicious", { base: "맛있다", c: ["v.맛있다", "g.past"] }),
    ],
  ),
  // ---- Umbrella: a small coincidence
  s("um-1", "갑자기 비가 왔어요.", "Suddenly it started raining.", { level: "A2", sp: "POLITE" }, [
    w("갑자기", "suddenly"),
    w("비가", "rain", { c: ["v.비", "g.subject"] }),
    w("왔어요", "came", { base: "오다", c: ["v.오다", "g.past"] }),
  ]),
  s(
    "um-2",
    "우산이 없어서 편의점 앞에서 기다렸어요.",
    "I didn't have an umbrella, so I waited outside a convenience store.",
    { level: "A2", sp: "POLITE" },
    [
      w("우산이", "umbrella (subject)", { c: ["v.우산", "g.subject"] }),
      w("없어서", "since there wasn't", { base: "없다", c: ["v.없다", "g.because-aseo"] }),
      w("편의점", "convenience store", { c: ["v.편의점"] }),
      w("앞에서", "in front of", { c: ["g.place-eseo"] }),
      w("기다렸어요", "waited", { base: "기다리다", c: ["v.기다리다", "g.past"] }),
    ],
  ),
  s("um-3", "저기요, 우산 같이 쓰실래요?", "Excuse me, want to share my umbrella?", { level: "B1", sp: "POLITE" }, [
    w("저기요", "excuse me", { c: ["e.yeogiyo"] }),
    w("우산", "umbrella", { c: ["v.우산"] }),
    w("같이", "together", { c: ["v.같이"] }),
    w("쓰실래요", "would you like to use (honorific)", {
      base: "쓰다",
      note: "You 'use' (쓰다) an umbrella in Korean.",
      c: ["g.honorific-si", "g.will-eullae"],
    }),
  ]),
  s("um-4", "아, 정말요? 감사합니다!", "Oh, really? Thank you!", { level: "A1", sp: "POLITE" }, [
    w("아", "oh"),
    w("정말요", "really?", { c: ["g.noun-iyo"] }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),
  s("um-5", "알고 보니 같은 회사 신입 사원이었어요.", "It turned out they were a new hire at my company.", { level: "B1", sp: "POLITE" }, [
    w("알고", "knowing, and", { base: "알다", c: ["v.알다", "g.and-go"] }),
    w("보니", "looking", { base: "보다", note: "알고 보니 is a set phrase: 'as it turned out'." }),
    w("같은", "the same", { base: "같다" }),
    w("회사", "company", { c: ["v.회사"] }),
    w("신입", "new (recruit)"),
    w("사원이었어요", "was an employee", { c: ["g.past"] }),
  ]),
  s(
    "um-6",
    "다음 날 회사에서 우리는 웃으면서 인사했어요.",
    "The next day at work, we greeted each other with a smile.",
    { level: "B1", sp: "POLITE" },
    [
      w("다음", "next", { c: ["v.다음"] }),
      w("날", "day"),
      w("회사에서", "at the office", { c: ["v.회사", "g.place-eseo"] }),
      w("우리는", "we (topic)", { c: ["v.우리", "g.topic"] }),
      w("웃으면서", "while smiling", { base: "웃다" }),
      w("인사했어요", "greeted", { base: "인사하다", c: ["g.past"] }),
    ],
  ),
];

const STORY_BD = "blind-date";
const STORY_BUS = "wrong-bus";
const STORY_GM = "grandma-kimchi";
const STORY_CS = "store-2am";
const STORY_UM = "umbrella";

const cards = [
  card("STORY", {
    id: "story-bd-1",
    level: "A2",
    topic: "Dating",
    skills: ["reading", "conversation"],
    interest: 1,
    story: { id: STORY_BD, part: 1 },
    teaches: ["g.time-mane"],
    payload: {
      title: "The blind date",
      lines: [
        { speaker: "지수", sentence: "s.bd-1" },
        { speaker: "민호", sentence: "s.bd-2" },
        { speaker: "지수", sentence: "s.bd-3" },
      ],
      cliffhanger: "What happened in those ten minutes?",
    },
  }),
  card("STORY", {
    id: "story-bd-2",
    level: "B1",
    topic: "Dating",
    skills: ["reading", "conversation"],
    interest: 1,
    story: { id: STORY_BD, part: 2 },
    teaches: ["g.only-man"],
    payload: {
      title: "The blind date",
      lines: [
        { speaker: "민호", sentence: "s.bd-4" },
        { speaker: "지수", sentence: "s.bd-5" },
        { speaker: "지수", sentence: "s.bd-6" },
      ],
      cliffhanger: "So how did 지수 escape?",
      check: {
        prompt: "What annoyed 지수?",
        options: [
          { text: "Their date only talked about themselves, and 지수 paid", correct: true },
          { text: "Their date was 10 minutes late" },
          { text: "The coffee was bad" },
        ],
      },
    },
  }),
  card("STORY", {
    id: "story-bd-3",
    level: "B1",
    topic: "Dating",
    skills: ["reading", "slang"],
    interest: 1,
    story: { id: STORY_BD, part: 3 },
    teaches: ["g.reported-dago", "e.gukrul"],
    payload: {
      title: "The blind date",
      lines: [
        { speaker: "민호", sentence: "s.bd-7" },
        { speaker: "지수", sentence: "s.bd-8" },
        { speaker: "민호", sentence: "s.gukrul" },
      ],
      check: {
        prompt: "What excuse did 지수 use?",
        options: [
          { text: "Said something urgent had come up", correct: true },
          { text: "Said they felt sick" },
          { text: "Just left without a word" },
        ],
      },
    },
  }),
  card("STORY", {
    id: "story-bus-1",
    level: "A2",
    topic: "Transport",
    skills: ["reading"],
    interest: 0.8,
    story: { id: STORY_BUS, part: 1 },
    teaches: ["v.일어나다"],
    payload: {
      title: "The wrong bus",
      lines: [{ sentence: "s.bus-1" }, { sentence: "s.bus-2" }, { sentence: "s.bus-3" }],
      cliffhanger: "Uh-oh.",
    },
  }),
  card("STORY", {
    id: "story-bus-2",
    level: "B1",
    topic: "Transport",
    skills: ["reading"],
    interest: 0.8,
    story: { id: STORY_BUS, part: 2 },
    teaches: ["v.결국"],
    payload: {
      title: "The wrong bus",
      lines: [{ sentence: "s.bus-4" }, { sentence: "s.bus-5" }, { sentence: "s.bus-6" }],
      check: {
        prompt: "How late were they to the meeting?",
        options: [{ text: "30 minutes", correct: true }, { text: "10 minutes" }, { text: "They made it on time" }],
      },
    },
  }),
  card("STORY", {
    id: "story-gm-1",
    level: "B1",
    topic: "Family",
    skills: ["reading", "honorifics"],
    interest: 0.9,
    story: { id: STORY_GM, part: 1 },
    teaches: ["v.서운하다"],
    payload: {
      title: "Grandma's kimchi",
      lines: [
        { speaker: "엄마", sentence: "s.gm-1" },
        { speaker: "나", sentence: "s.gm-2" },
        { speaker: "엄마", sentence: "s.gm-3" },
      ],
      cliffhanger: "Notice: mom speaks 반말 to you but honorifics about grandma. Time to call.",
    },
  }),
  card("STORY", {
    id: "story-gm-2",
    level: "B1",
    topic: "Family",
    skills: ["reading", "honorifics"],
    interest: 0.9,
    story: { id: STORY_GM, part: 2 },
    teaches: ["g.dont-jimaseyo"],
    payload: {
      title: "Grandma's kimchi",
      lines: [
        { speaker: "나", sentence: "s.gm-4" },
        { speaker: "할머니", sentence: "s.gm-5" },
        { speaker: "나", sentence: "s.gm-6" },
      ],
      check: {
        prompt: "What does 우리 강아지 mean here?",
        options: [{ text: "A pet name for a grandchild", correct: true }, { text: "The family dog" }, { text: "A kind of kimchi" }],
      },
    },
  }),
  card("STORY", {
    id: "story-cs-1",
    level: "A2",
    topic: "Daily life",
    skills: ["reading"],
    interest: 0.9,
    story: { id: STORY_CS, part: 1 },
    teaches: ["v.편의점"],
    payload: {
      title: "2 a.m. ramyeon",
      lines: [{ sentence: "s.cs-1" }, { sentence: "s.cs-2" }, { sentence: "s.cs-3" }],
      cliffhanger: "No wallet. 2 a.m. Now what?",
    },
  }),
  card("STORY", {
    id: "story-cs-2",
    level: "B1",
    topic: "Daily life",
    skills: ["reading"],
    interest: 0.9,
    story: { id: STORY_CS, part: 2 },
    teaches: ["g.hon-vocab"],
    payload: {
      title: "2 a.m. ramyeon",
      lines: [{ sentence: "s.cs-4" }, { speaker: "할머니", sentence: "s.cs-5" }, { sentence: "s.cs-6" }],
      check: {
        prompt: "Who paid for the ramyeon?",
        options: [
          { text: "An elderly woman in the store", correct: true },
          { text: "The store clerk" },
          { text: "They went home to get their wallet" },
        ],
      },
    },
  }),
  card("STORY", {
    id: "story-um-1",
    level: "A2",
    topic: "Daily life",
    skills: ["reading"],
    interest: 0.9,
    story: { id: STORY_UM, part: 1 },
    teaches: ["v.우산"],
    payload: {
      title: "The umbrella",
      lines: [{ sentence: "s.um-1" }, { sentence: "s.um-2" }, { speaker: "낯선 사람", sentence: "s.um-3" }],
      cliffhanger: "Who is this stranger?",
    },
  }),
  card("STORY", {
    id: "story-um-2",
    level: "B1",
    topic: "Daily life",
    skills: ["reading"],
    interest: 0.9,
    story: { id: STORY_UM, part: 2 },
    teaches: ["v.회사"],
    payload: {
      title: "The umbrella",
      lines: [{ speaker: "나", sentence: "s.um-4" }, { sentence: "s.um-5" }, { sentence: "s.um-6" }],
      check: {
        prompt: "Who was the stranger?",
        options: [
          { text: "A new hire at the narrator's company", correct: true },
          { text: "The convenience store clerk" },
          { text: "An old school friend" },
        ],
      },
    },
  }),
];

export const stories: Unit = { sentences, cards };
