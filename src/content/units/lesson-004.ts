import { s, w, type Unit } from "../author";

/** Full sentences from Learn lesson 004 (ordering food and drinks). */

const P = { level: "A1" as const, sp: "POLITE" as const };
const F = { level: "A1" as const, sp: "FORMAL" as const };

const sentences = [
  s("l4-americano", "아메리카노 한 잔 주세요.", "One americano, please.", P, [
    w("아메리카노", "americano"),
    w("한", "one", { c: ["g.native-numbers"] }),
    w("잔", "cup (counter)", { c: ["v.잔"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-gimbap-two", "김밥 두 줄 주세요.", "Two rolls of gimbap, please.", P, [
    w("김밥", "gimbap", { c: ["v.김밥"] }),
    w("두", "two", { c: ["g.native-numbers"] }),
    w("줄", "roll (counter)", { note: "줄 counts long things: lines, rolls of gimbap." }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-water-bottle", "물 한 병 주세요.", "One bottle of water, please.", P, [
    w("물", "water", { c: ["v.물"] }),
    w("한", "one", { c: ["g.native-numbers"] }),
    w("병", "bottle (counter)"),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-what-can-i-get", "어서 오세요. 뭐 드릴까요?", "Welcome. What can I get you?", P, [
    w("어서", "please, quickly"),
    w("오세요", "come", { c: ["v.오다", "g.command-seyo"] }),
    w("뭐", "what", { c: ["v.뭐"] }),
    w("드릴까요", "shall I give you (humble)", { base: "드리다", c: ["g.humble", "g.shall-eulkkayo"] }),
  ]),
  s("l4-size-q", "사이즈는 어떻게 하시겠어요?", "What size would you like?", P, [
    w("사이즈는", "the size (topic)", { c: ["g.topic"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("하시겠어요", "would you like to do (honorific)", { base: "하다", c: ["v.하다", "g.honorific-si", "g.guess-get"] }),
  ]),
  s("l4-large", "큰 사이즈로 주세요.", "The large size, please.", P, [
    w("큰", "big", { base: "크다" }),
    w("사이즈로", "with the size", { c: ["g.means-ro"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-price", "4,500원입니다.", "That's 4,500 won.", { ...F, spoken: "사천오백 원입니다." }, [
    w("4,500원입니다", "is 4,500 won", {
      note: "Read 사천오백 원: prices use Sino-Korean numbers.",
      c: ["v.원", "g.sino-numbers", "g.hapsyo"],
    }),
  ]),
  s("l4-no-syrup", "시럽 빼 주세요.", "No syrup, please.", P, [
    w("시럽", "syrup"),
    w("빼 주세요", "please leave out", { base: "빼다", c: ["g.request-juseyo"] }),
  ]),
  s("l4-less-spicy", "덜 맵게 해 주세요.", "Please make it less spicy.", P, [
    w("덜", "less"),
    w("맵게", "spicy (-ly)", { base: "맵다", c: ["v.맵다"] }),
    w("해 주세요", "please make it", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-to-go", "포장해 주세요.", "To go, please.", P, [
    w("포장해 주세요", "please wrap it up", { base: "포장하다", c: ["g.request-juseyo"] }),
  ]),
  s("l4-eat-here", "여기서 먹고 갈게요.", "I'll eat here.", P, [
    w("여기서", "here", { c: ["v.여기", "g.place-eseo"] }),
    w("먹고", "eat and", { c: ["v.먹다", "g.and-go"] }),
    w("갈게요", "I'll go", { c: ["v.가다", "g.promise-ge"] }),
  ]),
  s("l4-two-people", "두 명이에요.", "There are two of us.", P, [
    w("두", "two", { c: ["g.native-numbers"] }),
    w("명이에요", "people", { c: ["v.명", "g.ida"] }),
  ]),
  s("l4-bibimbap-stew", "비빔밥 한 그릇이랑 김치찌개 한 그릇 주세요.", "One bibimbap and one kimchi stew, please.", P, [
    w("비빔밥", "bibimbap", { c: ["v.비빔밥"] }),
    w("한", "one", { c: ["g.native-numbers"] }),
    w("그릇이랑", "bowl, and", {
      parts: [
        ["그릇", "bowl (counter)", "word"],
        ["이랑", "and", "particle"],
      ],
      c: ["g.with-rang"],
    }),
    w("김치찌개", "kimchi stew", { c: ["v.김치"] }),
    w("한", "one", { c: ["g.native-numbers"] }),
    w("그릇", "bowl"),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-water-two", "물도 두 잔 주세요.", "Two glasses of water too, please.", P, [
    w("물도", "water too", { c: ["v.물", "g.also"] }),
    w("두", "two", { c: ["g.native-numbers"] }),
    w("잔", "glasses", { c: ["v.잔"] }),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
  s("l4-meat-q", "고기 들어가요?", "Does it have meat in it?", P, [
    w("고기", "meat", { c: ["v.고기"] }),
    w("들어가요", "go in", { base: "들어가다" }),
  ]),
  s("l4-recommend", "추천해 주세요.", "Please recommend something.", P, [
    w("추천해 주세요", "please recommend", { base: "추천하다", c: ["g.request-juseyo"] }),
  ]),
  s("l4-receipt", "영수증 주세요.", "A receipt, please.", P, [
    w("영수증", "receipt"),
    w("주세요", "please give", { c: ["g.request-juseyo"] }),
  ]),
];

export const lesson004Sentences: Unit = { sentences, cards: [] };
