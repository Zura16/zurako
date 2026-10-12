import { s, w, type Unit } from "../author";

/** Full sentences from Learn lesson 005 (directions, transport, taxis, driving). */

const P = { level: "A1" as const, sp: "POLITE" as const };

const sentences = [
  s("l5-get-off-here", "여기서 내리세요.", "Get off here.", P, [
    w("여기서", "here", { c: ["v.여기", "g.place-eseo"] }),
    w("내리세요", "please get off", { base: "내리다", c: ["v.내리다", "g.command-seyo"] }),
  ]),
  s("l5-cross", "길을 건너세요.", "Cross the street.", P, [
    w("길을", "the street (object)", { c: ["v.길", "g.object"] }),
    w("건너세요", "please cross", { base: "건너다", c: ["g.command-seyo"] }),
  ]),
  s("l5-how-station", "역에 어떻게 가요?", "How do I get to the station?", P, [
    w("역에", "to the station", { c: ["v.역", "g.place-e"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("l5-how-restroom", "화장실에 어떻게 가요?", "How do I get to the restroom?", P, [
    w("화장실에", "to the restroom", { c: ["v.화장실", "g.place-e"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("l5-subway-gangnam", "이 지하철 강남역에 가요?", "Does this subway go to Gangnam Station?", P, [
    w("이", "this"),
    w("지하철", "subway", { c: ["v.지하철"] }),
    w("강남역에", "to Gangnam Station", { c: ["v.역", "g.place-e"] }),
    w("가요", "go?", { c: ["v.가다"] }),
  ]),
  s("l5-where-transfer", "어디에서 갈아타요?", "Where do I transfer?", P, [
    w("어디에서", "where (at)", { c: ["v.어디", "g.place-eseo"] }),
    w("갈아타요", "transfer", { base: "갈아타다", c: ["v.갈아타다"] }),
  ]),
  s("l5-which-line", "몇 호선을 타요?", "Which line should I take?", P, [
    w("몇", "what number", { c: ["v.몇"] }),
    w("호선을", "line (object)", { note: "호선 = subway line number.", c: ["g.object"] }),
    w("타요", "take, ride", { base: "타다", c: ["v.타다"] }),
  ]),
  s("l5-which-exit", "몇 번 출구예요?", "Which exit number is it?", P, [
    w("몇", "what number", { c: ["v.몇"] }),
    w("번", "number"),
    w("출구예요", "exit is it", { c: ["g.ida"] }),
  ]),
  s("l5-buy-card", "교통카드 어디서 사요?", "Where can I buy a transit card?", P, [
    w("교통카드", "transit card"),
    w("어디서", "where", { c: ["v.어디", "g.place-eseo"] }),
    w("사요", "buy", { base: "사다", c: ["v.사다"] }),
  ]),
  s("l5-off-here-q", "여기서 내려요?", "Do I get off here?", P, [
    w("여기서", "here", { c: ["v.여기", "g.place-eseo"] }),
    w("내려요", "get off?", { base: "내리다", c: ["v.내리다"] }),
  ]),
  s("l5-next-station", "다음 역이 어디예요?", "What's the next station?", P, [
    w("다음", "next", { c: ["v.다음"] }),
    w("역이", "station (subject)", { c: ["v.역", "g.subject"] }),
    w("어디예요", "is where", { c: ["v.어디"] }),
  ]),
  s("l5-bus-hongdae", "이 버스 홍대에 가요?", "Does this bus go to Hongdae?", P, [
    w("이", "this"),
    w("버스", "bus", { c: ["v.버스"] }),
    w("홍대에", "to Hongdae", { c: ["g.place-e"] }),
    w("가요", "go?", { c: ["v.가다"] }),
  ]),
  s("l5-where-off", "어디에서 내려요?", "Where should I get off?", P, [
    w("어디에서", "where (at)", { c: ["v.어디", "g.place-eseo"] }),
    w("내려요", "get off", { c: ["v.내리다"] }),
  ]),
  s("l5-this-stop-q", "이번 정류장이에요?", "Is this the stop?", P, [
    w("이번", "this (coming)", { c: ["v.이번"] }),
    w("정류장이에요", "is the stop?", { c: ["v.정류장", "g.ida"] }),
  ]),
  s("l5-next-stop-off", "다음 정류장에서 내려요.", "I'll get off at the next stop.", P, [
    w("다음", "next", { c: ["v.다음"] }),
    w("정류장에서", "at the stop", { c: ["v.정류장", "g.place-eseo"] }),
    w("내려요", "get off", { c: ["v.내리다"] }),
  ]),
  s("l5-tap-card", "교통카드 찍으세요.", "Tap your transit card.", P, [
    w("교통카드", "transit card"),
    w("찍으세요", "please tap", {
      base: "찍다",
      note: "찍다 means 'to stamp, to snap'. Tapping a card reader is 찍다.",
      c: ["g.command-seyo"],
    }),
  ]),
  s("l5-driver-here", "기사님, 여기로 가 주세요.", "Driver, please take me here.", P, [
    w("기사님", "driver (honorific)", { note: "The polite way to address a taxi or bus driver." }),
    w("여기로", "to here", { c: ["v.여기", "g.means-ro"] }),
    w("가 주세요", "please go", { c: ["v.가다", "g.request-juseyo"] }),
  ]),
  s("l5-seoul-station", "서울역으로 가 주세요.", "Please take me to Seoul Station.", P, [
    w("서울역으로", "to Seoul Station", { note: "Pronounced [서울려그로].", c: ["v.역", "g.means-ro"] }),
    w("가 주세요", "please go", { c: ["v.가다", "g.request-juseyo"] }),
  ]),
  s("l5-understood", "네, 알겠습니다.", "Okay, understood.", { level: "A1", sp: "FORMAL" }, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("알겠습니다", "understood (formal)", { c: ["v.알다", "g.hapsyo"] }),
  ]),
  s("l5-excuse-station", "실례합니다. 지하철역에 어떻게 가요?", "Excuse me. How do I get to the subway station?", P, [
    w("실례합니다", "excuse me", { c: ["g.hapsyo"] }),
    w("지하철역에", "to the subway station", { c: ["v.지하철", "v.역", "g.place-e"] }),
    w("어떻게", "how", { c: ["v.어떻게"] }),
    w("가요", "go", { c: ["v.가다"] }),
  ]),
  s("l5-straight-then-right", "쭉 가다가 오른쪽으로 가세요.", "Go straight and then turn right.", P, [
    w("쭉", "straight", { c: ["v.쭉"] }),
    w("가다가", "go, and then", { base: "가다", note: "-다가: do one thing, then switch to another." }),
    w("오른쪽으로", "to the right", { c: ["v.오른쪽", "g.means-ro"] }),
    w("가세요", "please go", { c: ["v.가다", "g.command-seyo"] }),
  ]),
  s(
    "l5-five-min",
    "아니요, 걸어서 5분 정도 걸려요.",
    "No, it's about five minutes on foot.",
    { ...P, spoken: "아니요, 걸어서 오 분 정도 걸려요." },
    [
      w("아니요", "no", { c: ["e.ne-aniyo"] }),
      w("걸어서", "on foot", { base: "걷다" }),
      w("5분", "five minutes", { note: "Read 오 분.", c: ["v.분", "g.sino-numbers"] }),
      w("정도", "about"),
      w("걸려요", "it takes", { c: ["v.걸리다"] }),
    ],
  ),
  s("l5-to-gangnam-line", "강남역에 가려면 몇 호선을 타요?", "Which line do I take to get to Gangnam Station?", P, [
    w("강남역에", "to Gangnam Station", { c: ["v.역", "g.place-e"] }),
    w("가려면", "if I want to go", { base: "가다", note: "-(으)려면 = 'if you intend to'." }),
    w("몇", "what number", { c: ["v.몇"] }),
    w("호선을", "line", { c: ["g.object"] }),
    w("타요", "take", { c: ["v.타다"] }),
  ]),
  s("l5-take-line-2", "2호선을 타세요.", "Take Line 2.", { ...P, spoken: "이 호선을 타세요." }, [
    w("2호선을", "Line 2 (object)", { note: "Read 이 호선: line numbers use Sino-Korean numbers.", c: ["g.sino-numbers", "g.object"] }),
    w("타세요", "please take", { c: ["v.타다", "g.command-seyo"] }),
  ]),
  s("l5-transfer-city-hall", "시청역에서 갈아타세요.", "Transfer at City Hall Station.", P, [
    w("시청역에서", "at City Hall Station", { c: ["v.역", "g.place-eseo"] }),
    w("갈아타세요", "please transfer", { c: ["v.갈아타다", "g.command-seyo"] }),
  ]),
  s("l5-left-at-light", "다음 신호등에서 좌회전하세요.", "Turn left at the next traffic light.", P, [
    w("다음", "next", { c: ["v.다음"] }),
    w("신호등에서", "at the traffic light", { c: ["g.place-eseo"] }),
    w("좌회전하세요", "please turn left", { base: "좌회전하다", c: ["g.command-seyo"] }),
  ]),
  s("l5-right-then-straight", "우회전하세요. 그리고 쭉 직진하세요.", "Turn right, then go straight.", P, [
    w("우회전하세요", "turn right", { base: "우회전하다", c: ["g.command-seyo"] }),
    w("그리고", "and then"),
    w("쭉", "straight", { c: ["v.쭉"] }),
    w("직진하세요", "go straight", { base: "직진하다", c: ["g.command-seyo"] }),
  ]),
  s("l5-parking-q", "근처에 주차장이 있어요?", "Is there a parking lot nearby?", P, [
    w("근처에", "nearby", { c: ["g.place-e"] }),
    w("주차장이", "parking lot (subject)", { c: ["g.subject"] }),
    w("있어요", "is there", { c: ["v.있다", "g.itda-eopda"] }),
  ]),
  s("l5-parking-basement", "네, 저 건물 지하에 있어요.", "Yes, it's under that building.", P, [
    w("네", "yes", { c: ["e.ne-aniyo"] }),
    w("저", "that (over there)", { c: ["g.demonstratives"] }),
    w("건물", "building"),
    w("지하에", "underground, in the basement", { c: ["g.place-e"] }),
    w("있어요", "is", { c: ["v.있다"] }),
  ]),
  s("l5-stop-store", "편의점 앞에 세워 주세요.", "Please stop in front of the convenience store.", P, [
    w("편의점", "convenience store", { c: ["v.편의점"] }),
    w("앞에", "in front of", { c: ["v.앞", "g.place-e"] }),
    w("세워 주세요", "please stop", { base: "세우다", c: ["g.request-juseyo"] }),
  ]),
  s("l5-traffic", "차가 많이 막혀요.", "There's a lot of traffic.", P, [
    w("차가", "cars (subject)", { c: ["v.차", "g.subject"] }),
    w("많이", "a lot"),
    w("막혀요", "are blocked", { base: "막히다" }),
  ]),
];

export const lesson005Sentences: Unit = { sentences, cards: [] };
