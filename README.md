# Two Lines to Your Past Self

[![make.fun](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![Rank](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/Shayidinadapa/past-self-01/rank.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![Reward](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/Shayidinadapa/past-self-01/reward.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)

An entry for the [Two Lines to Your Past Self](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca) bounty on [make.fun](https://make.fun): write exactly two lines — a warning to your past self about one specific moment, and one sentence on why that moment mattered and what changed because of it.

## The entry

> At 3 a.m. on 9 March 2021, do not hit send on that resignation email to your boss.
> You had a better offer the next week, and that one angry night cost you two years of the career you actually wanted.

199 characters, exactly two lines. Line one names one concrete moment — a time, a date, and a single action. Line two traces the cause and effect: a better offer was already a week away, and one angry night cost two years of the career that was actually wanted.

## How it works

`main.ts` writes the entry text to `$MAKEFUN_OUTPUT_DIR`, else `$OUTPUT_DIR`, else `/output/entry.txt`. Before writing it validates the gate: 1–280 characters, exactly two lines, neither line empty, one sentence per line, no control characters. After writing it reads the file back and throws on any mismatch. The text is a fixed constant, so every run produces byte-identical output.

## Run it

```sh
node main.ts
```

Requires Node 22.18 or later (Node runs the TypeScript directly).

## License

MIT — see [LICENSE](LICENSE).
