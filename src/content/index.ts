import { buildCatalog } from "./catalog";
import { CONCEPTS } from "./concepts";
import { cultureUnit } from "./units/culture";
import { daily } from "./units/daily";
import { food } from "./units/food";
import { foundations1 } from "./units/foundations-1";
import { foundations2 } from "./units/foundations-2";
import { foundations3 } from "./units/foundations-3";
import { foundations4 } from "./units/foundations-4";
import { natural } from "./units/natural";
import { pronunciation } from "./units/pronunciation";
import { shopping } from "./units/shopping";
import { slang } from "./units/slang";
import { social } from "./units/social";
import { speech } from "./units/speech";
import { stories } from "./units/stories";
import { transport } from "./units/transport";
import { words } from "./units/words";
import { work } from "./units/work";

export const UNITS = [
  foundations1,
  foundations2,
  foundations3,
  foundations4,
  daily,
  speech,
  natural,
  food,
  transport,
  social,
  work,
  slang,
  cultureUnit,
  pronunciation,
  stories,
  shopping,
  words,
];

/** The full curriculum, parsed and cross-linked once per page load. */
export const catalog = buildCatalog(CONCEPTS, UNITS);
