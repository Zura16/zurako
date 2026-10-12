import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import path from "node:path";
import { UNITS, catalog } from "@/content";
import { validateCatalog } from "@/content/catalog";

describe("content catalog", () => {
  it("has no broken references or malformed sentences", () => {
    expect(validateCatalog(catalog)).toEqual([]);
  });

  it("registers every unit file in the catalog", () => {
    const files = readdirSync(path.join(__dirname, "../units")).filter((f) => f.endsWith(".ts"));
    expect(UNITS).toHaveLength(files.length);
  });
});
