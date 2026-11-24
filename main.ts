// past-self-01 — make.fun bounty "Two Lines to Your Past Self"
// Writes exactly two lines (1-280 chars) to /output/entry.txt.
// Line 1 warns the past self about one specific moment; line 2 says
// why that moment mattered and what changed because of it.
// Deterministic: the text is a fixed constant, so every run writes
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text, written fresh for this bounty.
const ENTRY = [
  "At 3 a.m. on 9 March 2021, do not hit send on that resignation email to your boss.",
  "You had a better offer the next week, and that one angry night cost you two years of the career you actually wanted.",
].join("\n");

function resolveOutputDir(): string {
  // make.fun sets MAKEFUN_OUTPUT_DIR; OUTPUT_DIR is the local fallback.
  // Never default to "." — the grader expects /output.
  return process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
}

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`gate: entry must be 1-280 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`gate: entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("gate: neither line may be empty");
    }
    // The bounty asks for one sentence per line: each line must end
    // with a full stop, and no line may hide a second sentence.
    if (!line.endsWith(".")) {
      throw new Error("gate: each line must be a single sentence ending with a full stop");
    }
    if ((line.match(/\.\s+[A-Z]/g) ?? []).length > 0) {
      throw new Error("gate: a line must hold one sentence only");
    }
    // Tabs would be invisible in the judged text; keep the entry clean.
    if (line.includes("\t")) {
      throw new Error("gate: tab characters are not allowed");
    }
  }
  // No control characters other than the single newline between the lines.
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 && ch !== "\n") {
      throw new Error(`gate: control character U+${code.toString(16).padStart(4, "0")} not allowed`);
    }
  }
}

function main(): void {
  validate(ENTRY);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, ENTRY, "utf8");
  // Read it back and confirm what landed on disk matches exactly.
  const back = readFileSync(file, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip mismatch: entry.txt does not match the entry text");
  }
  console.log(`wrote ${file} (${[...ENTRY].length} chars, 2 lines)`);
}

main();
