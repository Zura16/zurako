import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { validateCatalog } from "@/content/catalog";

describe("content catalog", () => {
  it("has no broken references or malformed sentences", () => {
    expect(validateCatalog(catalog)).toEqual([]);
  });
});
