import { LessonSchema, type Lesson } from "./schema";
import { lesson001 } from "./l001-first-lesson";
import { lesson002a } from "./l002-1-casual";
import { lesson002b } from "./l002-2-everyday";
import { lesson003 } from "./l003-tenses";
import { lesson004 } from "./l004-ordering";
import { lesson005 } from "./l005-getting-around";
import { lesson006 } from "./l006-family";
import { lesson007 } from "./l007-honorifics";

/** Learn-tab lessons, in teaching order: honorifics first, then 001–006. */
export const LESSONS: Lesson[] = [lesson007, lesson001, lesson002a, lesson002b, lesson003, lesson004, lesson005, lesson006].map((l) =>
  LessonSchema.parse(l),
);

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id);
