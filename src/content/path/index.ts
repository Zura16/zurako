import { catalog } from "..";
import { LESSONS } from "../lessons";
import { WORDS } from "../wordbank";
import { buildLevels } from "./build";
import { LEVEL_SPECS } from "./levels";
import type { Chapter, Level } from "./types";

export * from "./types";

/** The learning path, built once per page load from the catalog, lessons and word bank. */
export const PATH: Level[] = buildLevels(LEVEL_SPECS, { catalog, lessons: LESSONS, words: WORDS });

const chapters = new Map<string, Chapter>(PATH.flatMap((l) => l.chapters.map((c) => [c.id, c] as const)));

export const chapterById = (id: string) => chapters.get(id);
export const levelByNumber = (n: number) => PATH.find((l) => l.number === n);
