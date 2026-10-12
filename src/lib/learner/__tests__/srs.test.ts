import { describe, expect, it } from "vitest";
import { blankConcept } from "../model";
import { DAY, conceptStatus, recall, review } from "../srs";

const T0 = Date.UTC(2026, 0, 1);

describe("spaced repetition", () => {
  it("recall is 90% exactly one stability-interval after review", () => {
    const st = { ...blankConcept("g.past", T0), stability: 5, lastSeenAt: T0 };
    expect(recall(st, T0)).toBe(1);
    expect(recall(st, T0 + 5 * DAY)).toBeCloseTo(0.9, 5);
  });

  it("schedules the first successful review one day out", () => {
    const r = review(undefined, "good", T0);
    expect(r.stability).toBe(1);
    expect(r.nextReviewAt).toBe(T0 + DAY);
  });

  it("grows stability more for a review done late than for one crammed early", () => {
    const st = { ...blankConcept("g.past", T0), stability: 4, lastSeenAt: T0 };
    const early = review(st, "good", T0 + 0.5 * DAY).stability;
    const late = review(st, "good", T0 + 8 * DAY).stability;
    expect(early).toBeGreaterThan(4);
    expect(late).toBeGreaterThan(early);
  });

  it("shrinks stability and counts a lapse on a miss", () => {
    const st = { ...blankConcept("g.past", T0), stability: 10, lastSeenAt: T0 };
    const r = review(st, "again", T0 + 10 * DAY);
    expect(r.stability).toBe(3);
    expect(r.lapses).toBe(1);
  });

  it("reports status from the schedule", () => {
    const st = { ...blankConcept("g.past", T0), stability: 2, lastSeenAt: T0, nextReviewAt: T0 + 2 * DAY };
    expect(conceptStatus(undefined, T0)).toBe("new");
    expect(conceptStatus(st, T0 + DAY)).toBe("learning");
    expect(conceptStatus(st, T0 + 3 * DAY)).toBe("due");
    expect(conceptStatus({ ...st, stability: 30, nextReviewAt: T0 + 30 * DAY }, T0 + DAY)).toBe("mastered");
    expect(conceptStatus({ ...st, difficult: true }, T0 + DAY)).toBe("weak");
  });
});
