# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run the CLI in dev via `ts-node src/index.ts` (no build step needed).
- `npm run build` — `tsc`, compiles `src/**/*.ts` to `dist/` (test files excluded).
- `npm test` — run Jest (`ts-jest`).
- Single test: `npx jest src/index.test.ts` or `npx jest -t "<test name>"`.
- **`npm run build` must run before `npm test`**: `src/index.test.ts` spawns the compiled `dist/index.js`, not the source.

## Architecture

CLI is a tree of `inquirer` list-prompt menus. Each layer shows a list and routes the selection to the next layer:

`src/index.ts` (entry, `bin` → `dist/index.js`, shebang) → `nodeMain()` in `src/node/index.ts` → `packageDevelopment()` in `src/node/package-development/index.ts`.

### Command registry (the extensibility pattern to reuse)

Commands implement the `ICommand` interface (`src/types/index.ts` — `{ name: string; action: () => Promise<void> }`).

`src/node/package-development/register.ts` holds `commandsList: ICommand[]`. It builds a `Record<name, action>` dispatch map from that array. The menu in `index.ts` derives its choices from `Object.keys(register)`, so registering a command auto-wires both the menu entry and dispatch.

**To add a command:** create a class implementing `ICommand` under `src/node/package-development/<Name>/`, then add `new <Name>()` to `commandsList` in `register.ts`. No other wiring.

Example: `src/node/package-development/BumpVersion/index.ts` — wraps `npm version <patch|minor|major> --no-git-tag-version` via `execSync`.

## Commits

- Do not commit directly to `master`. Create a branch first, then open a PR.
- Do not add Claude as a co-author. No `Co-Authored-By: Claude` trailer and no "Generated with Claude Code" line in commit messages.

## Publishing

`.github/workflows/npm-publish.yml`: on GitHub **release created** → build → `npm publish` (uses `NPM_TOKEN` secret). Package name is `shibbir`.

## Known issue

`src/index.test.ts` expects output `"Greeting from Shibbir's CLI!"` but `src/index.ts` prints `"Hello from Shibbir's CLI!"` — the test is currently failing.
