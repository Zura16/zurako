import { s, w, type Unit } from "../author";

/**
 * Full sentences from Learn lesson 007 (honorific expressions), broken down
 * so they are tappable inside the lesson. No feed cards: the lesson is the
 * teaching surface for these.
 */

const P = { level: "A2" as const, sp: "POLITE" as const };
const F = { level: "A2" as const, sp: "FORMAL" as const };

const sentences = [
  // Section 5: the honorific marker -(으)시-
  s("h-teacher-coming", "선생님께서 오세요.", "The teacher is coming.", P, [
    w("선생님께서", "the teacher (honored subject)", {
      parts: [
        ["선생님", "teacher", "word"],
        ["께서", "honorific subject marker (for 이/가)", "particle"],
      ],
      c: ["v.선생님", "g.hon-subject"],
    }),
    w("오세요", "is coming (honorific)", {
      base: "오다",
      parts: [
        ["오", "come", "stem"],
        ["세요", "-시- + 어요", "ending"],
      ],
      c: ["v.오다", "g.honorific-si"],
    }),
  ]),
  s("h-grandma-sleeping", "할머니께서 주무세요.", "Grandmother is sleeping.", P, [
    w("할머니께서", "grandmother (honored subject)", { c: ["v.할머니", "g.hon-subject"] }),
    w("주무세요", "is sleeping (honorific)", {
      base: "주무시다",
      note: "주무시다 replaces 자다 for someone you respect.",
      c: ["g.hon-vocab"],
    }),
  ]),
  s("h-father-home", "아버지는 지금 집에 계세요.", "My father is at home now.", P, [
    w("아버지는", "my father (topic)", { c: ["g.topic"] }),
    w("지금", "now", { c: ["v.지금"] }),
    w("집에", "at home", {
      note: "댁 is the honorific word for someone else's home. For your own family's home, 집 is natural.",
      c: ["v.집", "g.place-e"],
    }),
    w("계세요", "is (honorific)", { base: "계시다", c: ["g.hon-vocab"] }),
  ]),
  s("h-grandpa-meal", "할아버지께서 진지를 드세요.", "Grandfather is having his meal.", P, [
    w("할아버지께서", "grandfather (honored subject)", { c: ["g.hon-subject"] }),
    w("진지를", "meal (honorific word)", {
      parts: [
        ["진지", "meal, for elders (밥)", "word"],
        ["를", "object marker", "particle"],
      ],
      c: ["g.hon-vocab", "g.object"],
    }),
    w("드세요", "is eating (honorific)", { base: "드시다", note: "드시다 replaces 먹다 and 마시다.", c: ["g.hon-vocab"] }),
  ]),
  s("h-told-boss", "사장님께 말씀드렸어요.", "I told the boss.", P, [
    w("사장님께", "to the boss", {
      parts: [
        ["사장님", "boss", "word"],
        ["께", "to (someone respected)", "particle"],
      ],
      c: ["v.사장님", "g.hon-to"],
    }),
    w("말씀드렸어요", "I told (humble)", {
      base: "말씀드리다",
      parts: [
        ["말씀", "words (honorific)", "word"],
        ["드렸", "gave, humbly (past)", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["g.humble", "g.past"],
    }),
  ]),
  s("h-see-professor", "내일 교수님을 뵐 거예요.", "I'm going to see the professor tomorrow.", P, [
    w("내일", "tomorrow", { c: ["v.내일"] }),
    w("교수님을", "the professor (object)", { c: ["v.교수님", "g.object"] }),
    w("뵐 거예요", "will see (humble)", {
      base: "뵙다",
      note: "뵙다/뵈다 is the humble form of 보다 and 만나다.",
      c: ["g.humble", "g.future"],
    }),
  ]),
  s("h-asked-teacher", "선생님께 여쭤봤어요.", "I asked the teacher.", P, [
    w("선생님께", "to the teacher", { c: ["v.선생님", "g.hon-to"] }),
    w("여쭤봤어요", "asked (humble)", {
      base: "여쭤보다",
      parts: [
        ["여쭤", "ask humbly (여쭙다)", "stem"],
        ["봤", "tried / did (past)", "infix"],
        ["어요", "polite", "ending"],
      ],
      c: ["g.humble", "g.past"],
    }),
  ]),
  s("h-grandma-eaten", "할머니, 식사하셨어요?", "Grandma, have you eaten?", P, [
    w("할머니", "grandma", { c: ["v.할머니"] }),
    w("식사하셨어요", "had a meal (honorific)", { base: "식사하다", c: ["v.식사", "g.honorific-si", "g.past"] }),
  ]),
  s("h-parents-well", "부모님은 잘 지내세요?", "How are your parents doing?", P, [
    w("부모님은", "parents (topic)", { c: ["v.부모님", "g.topic"] }),
    w("잘", "well", { c: ["v.잘"] }),
    w("지내세요", "are getting along (honorific)", { base: "지내다", c: ["g.honorific-si"] }),
  ]),

  // Dialogue: at a café
  s("h-how-help", "안녕하세요. 무엇을 도와드릴까요?", "Hello. How may I help you?", P, [
    w("안녕하세요", "hello", { c: ["e.annyeong"] }),
    w("무엇을", "what (object)", { c: ["v.무엇", "g.object"] }),
    w("도와드릴까요", "shall I help (humble)", {
      base: "도와드리다",
      note: "드리다 makes the help humble: the staff lowers themselves to honor you.",
      c: ["g.humble", "g.shall-eulkkayo"],
    }),
  ]),
  s("h-for-here", "매장에서 드시고 가세요?", "Will you have it here?", P, [
    w("매장에서", "in the store", {
      parts: [
        ["매장", "store, shop floor", "word"],
        ["에서", "at", "particle"],
      ],
      c: ["g.place-eseo"],
    }),
    w("드시고", "eat and (honorific)", { base: "드시다", c: ["g.hon-vocab", "g.and-go"] }),
    w("가세요", "go (honorific)", { c: ["v.가다", "g.honorific-si"] }),
  ]),
  s("h-take-out", "아니요, 가지고 갈게요. 감사합니다.", "No, I'll take it to go. Thank you.", P, [
    w("아니요", "no", { c: ["e.ne-aniyo"] }),
    w("가지고", "taking (it)", { base: "가지다" }),
    w("갈게요", "I'll go", { c: ["v.가다", "g.promise-ge"] }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),

  // Dialogue: asking a professor
  s("h-may-i-ask", "교수님, 잠시 질문드려도 될까요?", "Professor, may I ask you a quick question?", P, [
    w("교수님", "professor", { c: ["v.교수님"] }),
    w("잠시", "for a moment"),
    w("질문드려도", "even if I ask (humble)", {
      base: "질문드리다",
      parts: [
        ["질문", "question", "word"],
        ["드려", "give humbly", "stem"],
        ["도", "even if", "ending"],
      ],
      c: ["g.humble"],
    }),
    w("될까요", "would it be okay", {
      base: "되다",
      note: "-아/어도 될까요? is a very polite way to ask permission.",
      c: ["g.shall-eulkkayo"],
    }),
  ]),
  s("h-go-ahead", "네, 말씀하세요.", "Yes, go ahead.", P, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("말씀하세요", "please speak", { base: "말씀하시다", c: ["g.hon-vocab", "g.command-seyo"] }),
  ]),
  s("h-explain-again", "이 부분을 다시 설명해 주시겠어요?", "Could you explain this part again?", P, [
    w("이", "this"),
    w("부분을", "part (object)", { c: ["g.object"] }),
    w("다시", "again", { c: ["v.다시"] }),
    w("설명해 주시겠어요", "could you explain (for me)", {
      base: "설명하다",
      note: "-아/어 주시겠어요? is softer than -아/어 주세요.",
      c: ["g.request-juseyo", "g.honorific-si", "g.guess-get"],
    }),
  ]),
  s("h-of-course", "물론이에요.", "Of course.", P, [w("물론이에요", "of course", { c: ["g.ida"] })]),

  // Dialogue: at someone's home
  s("h-come-in", "어서 오세요. 안으로 들어오세요.", "Welcome. Please come in.", P, [
    w("어서", "please, quickly"),
    w("오세요", "come", { c: ["v.오다", "g.command-seyo"] }),
    w("안으로", "inside", { c: ["g.means-ro"] }),
    w("들어오세요", "please come in", { base: "들어오다", c: ["g.command-seyo"] }),
  ]),
  s("h-thanks-invite", "초대해 주셔서 감사합니다.", "Thank you for inviting me.", P, [
    w("초대해 주셔서", "because you invited me", {
      base: "초대하다",
      parts: [
        ["초대해", "invite", "stem"],
        ["주셔서", "do for me (honorific) + because", "ending"],
      ],
      c: ["g.request-juseyo", "g.because-aseo"],
    }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),
  s("h-sit-tea", "편하게 앉으세요. 차 드릴까요?", "Make yourself comfortable. Would you like some tea?", P, [
    w("편하게", "comfortably", { c: ["v.편하다"] }),
    w("앉으세요", "please sit", { base: "앉다", note: "Stem ends in a consonant, so -으세요.", c: ["g.command-seyo"] }),
    w("차", "tea", { c: ["v.차"] }),
    w("드릴까요", "shall I give you (humble)", { base: "드리다", c: ["g.humble", "g.shall-eulkkayo"] }),
  ]),
  s("h-yes-thanks", "네, 감사합니다.", "Yes, thank you.", P, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),

  // Dialogue: speaking about a family member
  s("h-grandma-how", "할머니께서는 요즘 어떠세요?", "How is your grandmother these days?", P, [
    w("할머니께서는", "your grandmother (honored topic)", {
      parts: [
        ["할머니", "grandmother", "word"],
        ["께서", "honorific subject", "particle"],
        ["는", "topic", "particle"],
      ],
      c: ["v.할머니", "g.hon-subject"],
    }),
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("어떠세요", "how is (she), honorific", { base: "어떻다", c: ["v.어떻다", "g.honorific-si"] }),
  ]),
  s("h-shes-well", "잘 지내세요. 오늘은 집에서 쉬세요.", "She's doing well. She's resting at home today.", P, [
    w("잘", "well", { c: ["v.잘"] }),
    w("지내세요", "is getting along (honorific)", { c: ["g.honorific-si"] }),
    w("오늘은", "today", { c: ["v.오늘", "g.topic"] }),
    w("집에서", "at home", { c: ["v.집", "g.place-eseo"] }),
    w("쉬세요", "is resting (honorific)", { base: "쉬다", c: ["v.쉬다", "g.honorific-si"] }),
  ]),
  s("h-regards", "다행이네요. 안부 전해 주세요.", "That's good to hear. Please give her my regards.", P, [
    w("다행이네요", "what a relief", {
      parts: [
        ["다행", "good fortune, relief", "word"],
        ["이네요", "is (I notice)", "ending"],
      ],
      c: ["g.discovery-ne"],
    }),
    w("안부", "regards"),
    w("전해 주세요", "please pass on", { base: "전하다", c: ["g.request-juseyo"] }),
  ]),

  // Dialogue: ending a conversation politely
  s("h-thanks-talk", "오늘 말씀 감사합니다.", "Thank you for speaking with me today.", F, [
    w("오늘", "today", { c: ["v.오늘"] }),
    w("말씀", "words (honorific)", { c: ["g.hon-vocab"] }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),
  s("h-dont-mention", "별말씀을요. 조심히 가세요.", "Not at all. Take care getting home.", P, [
    w("별말씀을요", "don't mention it", { note: "Literally 'such special words!': a modest reply to thanks.", c: ["g.noun-iyo"] }),
    w("조심히", "carefully"),
    w("가세요", "go (honorific)", { c: ["v.가다", "g.honorific-si"] }),
  ]),
  s("h-see-again", "네, 다음에 다시 뵙겠습니다.", "Yes, I'll see you again next time.", F, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("다음에", "next time", { c: ["v.다음"] }),
    w("다시", "again", { c: ["v.다시"] }),
    w("뵙겠습니다", "I will see you (humble, formal)", { base: "뵙다", c: ["g.humble", "g.hapsyo"] }),
  ]),
];

export const lesson007Sentences: Unit = { sentences, cards: [] };
