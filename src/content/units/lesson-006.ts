import { s, w, type Unit } from "../author";

/** Full sentences from Learn lesson 006 (family and romantic relationships). */

const P = { level: "A2" as const, sp: "POLITE" as const };
const F = { level: "A2" as const, sp: "FORMAL" as const };

const sentences = [
  s("l6-family-size", "가족이 몇 명이에요?", "How many people are in your family?", P, [
    w("가족이", "family (subject)", { c: ["v.가족", "g.subject"] }),
    w("몇", "how many", { c: ["v.몇"] }),
    w("명이에요", "people is it", { c: ["v.명", "g.ida"] }),
  ]),
  s("l6-live-with-family", "가족이랑 같이 살아요?", "Do you live with your family?", P, [
    w("가족이랑", "with family", {
      parts: [
        ["가족", "family", "word"],
        ["이랑", "with", "particle"],
      ],
      c: ["v.가족", "g.with-rang"],
    }),
    w("같이", "together", { c: ["v.같이"] }),
    w("살아요", "live", { base: "살다" }),
  ]),
  s("l6-miss-family", "가족이 보고 싶어요.", "I miss my family.", P, [
    w("가족이", "family", { c: ["v.가족", "g.subject"] }),
    w("보고 싶어요", "want to see", { base: "보다", note: "'Want to see' is how Korean says 'miss'.", c: ["v.보다", "g.want-go-sipda"] }),
  ]),
  s("l6-live-alone", "저는 혼자 살아요.", "I live alone.", P, [
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("혼자", "alone"),
    w("살아요", "live", { base: "살다" }),
  ]),
  s("l6-seeing-anyone", "지금 만나는 사람 있어요?", "Are you seeing anyone?", P, [
    w("지금", "now", { c: ["v.지금"] }),
    w("만나는", "that (you) are meeting", { base: "만나다", c: ["v.만나다"] }),
    w("사람", "person", { c: ["v.사람"] }),
    w("있어요", "is there", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("l6-dating", "사귀고 있어요.", "We're dating.", P, [w("사귀고 있어요", "are dating", { base: "사귀다", c: ["g.progressive"] })]),
  s("l6-how-met", "어떻게 만났어요?", "How did you meet?", P, [
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("만났어요", "met", { c: ["v.만나다", "g.past"] }),
  ]),
  s("l6-met-through-friend", "친구 소개로 만났어요.", "We met through a friend.", P, [
    w("친구", "a friend", { c: ["v.친구"] }),
    w("소개로", "by introduction", { c: ["g.means-ro"] }),
    w("만났어요", "met", { c: ["v.만나다", "g.past"] }),
  ]),
  s("l6-first-meeting", "안녕하세요. 처음 뵙겠습니다. 저는 민수라고 합니다.", "Hello. It's a pleasure to meet you. My name is Minsu.", F, [
    w("안녕하세요", "hello", { c: ["e.annyeong"] }),
    w("처음", "for the first time"),
    w("뵙겠습니다", "I will see you (humble)", {
      base: "뵙다",
      note: "처음 뵙겠습니다 is the set phrase for a formal first meeting.",
      c: ["g.humble", "g.hapsyo"],
    }),
    w("저는", "I (topic)", { c: ["v.저", "g.topic"] }),
    w("민수라고", "(as) Minsu", { note: "Name + (이)라고 합니다: 'I'm called…'." }),
    w("합니다", "am called", { c: ["g.hapsyo"] }),
  ]),
  s("l6-welcome-trip", "어서 와요. 오는 길은 괜찮았어요?", "Welcome. Was the trip here okay?", P, [
    w("어서", "please, quickly"),
    w("와요", "come", { c: ["v.오다"] }),
    w("오는", "coming", { c: ["v.오다"] }),
    w("길은", "way (topic)", { c: ["v.길", "g.topic"] }),
    w("괜찮았어요", "was okay", { c: ["v.괜찮다", "g.past"] }),
  ]),
  s("l6-it-was-fine", "네, 괜찮았습니다. 초대해 주셔서 감사합니다.", "Yes, it was fine. Thank you for inviting me.", F, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("괜찮았습니다", "was fine (formal)", { c: ["v.괜찮다", "g.past", "g.hapsyo"] }),
    w("초대해 주셔서", "because you invited me", { c: ["g.request-juseyo", "g.because-aseo"] }),
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
  ]),
  s("l6-food-ok", "음식 입에 맞아요?", "Is the food to your taste?", { ...P, lit: "does the food suit your mouth?" }, [
    w("음식", "food", { c: ["v.음식"] }),
    w("입에", "to (your) mouth", { c: ["g.place-e"] }),
    w("맞아요", "suits", { c: ["v.맞다"] }),
  ]),
  s("l6-delicious-formal", "네, 정말 맛있습니다. 잘 먹겠습니다.", "Yes, it's delicious. Thank you for the meal.", F, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("정말", "really"),
    w("맛있습니다", "is delicious (formal)", { c: ["v.맛있다", "g.hapsyo"] }),
    w("잘", "well", { c: ["v.잘"] }),
    w("먹겠습니다", "I will eat", { c: ["v.먹다", "e.jal-meokgetseumnida"] }),
  ]),
  s("l6-eat-more", "더 먹어요. 많이 준비했어요.", "Have some more. We made plenty.", P, [
    w("더", "more"),
    w("먹어요", "eat", { c: ["v.먹다"] }),
    w("많이", "a lot"),
    w("준비했어요", "prepared", { base: "준비하다", c: ["g.past"] }),
  ]),
  s("l6-thanks-meal", "감사합니다. 정말 잘 먹었습니다.", "Thank you. I really enjoyed the meal.", F, [
    w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
    w("정말", "really"),
    w("잘", "well", { c: ["v.잘"] }),
    w("먹었습니다", "ate", { c: ["v.먹다", "g.past", "g.hapsyo"] }),
  ]),
  s("l6-help-dishes", "제가 설거지 도와드릴까요?", "Can I help with the dishes?", P, [
    w("제가", "I (subject, humble)", { c: ["v.저", "g.subject"] }),
    w("설거지", "dishwashing"),
    w("도와드릴까요", "shall I help (humble)", { base: "도와드리다", c: ["g.humble", "g.shall-eulkkayo"] }),
  ]),
  s("l6-sit-down", "아니에요. 괜찮아요. 앉아 있어요.", "No, it's okay. Stay seated.", P, [
    w("아니에요", "not at all", { c: ["g.anida"] }),
    w("괜찮아요", "it's okay", { c: ["v.괜찮다"] }),
    w("앉아 있어요", "stay sitting", { base: "앉다", note: "-아/어 있다 describes a state that continues: staying seated." }),
  ]),
  s("l6-clear-table", "그럼 식탁이라도 정리하겠습니다.", "Then I'll at least clear the table.", F, [
    w("그럼", "then"),
    w("식탁이라도", "at least the table", {
      parts: [
        ["식탁", "dining table", "word"],
        ["이라도", "at least, even", "particle"],
      ],
    }),
    w("정리하겠습니다", "I will tidy (formal)", { base: "정리하다", c: ["g.guess-get", "g.hapsyo"] }),
  ]),
  s("l6-call-mother-in-law", "장모님, 안녕하세요? 식사는 하셨어요?", "Hello, Mother. Have you eaten?", P, [
    w("장모님", "mother-in-law (wife's mother)"),
    w("안녕하세요", "hello", { c: ["e.annyeong"] }),
    w("식사는", "a meal (topic)", { c: ["v.식사", "g.topic"] }),
    w("하셨어요", "did (you) have (honorific)", { c: ["g.honorific-si", "g.past"] }),
  ]),
  s("l6-mil-reply", "그래, 너는 먹었니?", "Yes. Have you eaten?", { level: "A2", sp: "CASUAL" }, [
    w("그래", "yes, right"),
    w("너는", "you (topic)", {
      note: "Some mothers-in-law talk this casually to a son-in-law; many use 자네 or 김 서방 instead.",
      c: ["v.너", "g.topic"],
    }),
    w("먹었니", "did you eat?", { note: "-니? is a soft casual question, common from older speakers.", c: ["v.먹다", "g.past"] }),
  ]),
  s(
    "l6-visit-weekend",
    "네, 먹었습니다. 주말에 찾아뵈려고 전화드렸어요.",
    "Yes, I have. I called because I'd like to visit this weekend.",
    P,
    [
      w("네", "yes", { c: ["e.ne-aniyo"] }),
      w("먹었습니다", "ate", { c: ["v.먹다", "g.past", "g.hapsyo"] }),
      w("주말에", "on the weekend", { c: ["v.주말", "g.place-e"] }),
      w("찾아뵈려고", "intending to visit (humble)", { base: "찾아뵙다", c: ["g.humble", "g.intent-euryeogo"] }),
      w("전화드렸어요", "called (humble)", { base: "전화드리다", c: ["v.전화", "g.humble", "g.past"] }),
    ],
  ),
  s("l6-health-q", "장인어른, 요즘 건강은 어떠세요?", "Father, how has your health been lately?", P, [
    w("장인어른", "father-in-law (wife's father)"),
    w("요즘", "these days", { c: ["v.요즘"] }),
    w("건강은", "health (topic)", { c: ["g.topic"] }),
    w("어떠세요", "how is it (honorific)", { c: ["v.어떻다", "g.honorific-si"] }),
  ]),
  s("l6-fil-reply", "덕분에 잘 지내네. 회사 일은 어떤가?", "I'm doing well, thanks to you. How's work?", { level: "B1" }, [
    w("덕분에", "thanks to you"),
    w("잘", "well", { c: ["v.잘"] }),
    w("지내네", "am getting along", {
      base: "지내다",
      note: "하게체: an old-fashioned level elders use with adult juniors, like a father-in-law with a son-in-law. Recognize it; don't use it yourself.",
    }),
    w("회사", "company", { c: ["v.회사"] }),
    w("일은", "work (topic)", { c: ["v.일", "g.topic"] }),
    w("어떤가", "how is it (하게체)", { base: "어떻다", c: ["v.어떻다"] }),
  ]),
  s(
    "l6-busy-but-well",
    "바쁘지만 잘 지내고 있습니다. 늘 챙겨 주셔서 감사합니다.",
    "It's busy, but I'm doing well. Thank you for always looking out for me.",
    F,
    [
      w("바쁘지만", "busy, but", { base: "바쁘다", c: ["v.바쁘다", "g.but-jiman"] }),
      w("잘", "well", { c: ["v.잘"] }),
      w("지내고 있습니다", "am getting along (formal)", { c: ["g.progressive", "g.hapsyo"] }),
      w("늘", "always"),
      w("챙겨 주셔서", "because you look after me", { base: "챙기다", c: ["g.request-juseyo", "g.because-aseo"] }),
      w("감사합니다", "thank you", { c: ["g.hapsyo"] }),
    ],
  ),
];

export const lesson006Sentences: Unit = { sentences, cards: [] };
