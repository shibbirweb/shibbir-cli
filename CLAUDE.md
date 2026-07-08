# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run the CLI in dev via `ts-node src/index.ts` (no build step needed).
- `npm run build` — `tsc`, compiles `src/**/*.ts` to `dist/` (test files excluded).
- `pnpm wiki` — regenerate the wiki from the menu tree (`ts-node scripts/generate-wiki.ts`).
- `npm test` — run Jest (`ts-jest`).
- Single test: `npx jest src/index.test.ts` or `npx jest -t "<test name>"`.
- **`npm run build` must run before `npm test`**: `src/index.test.ts` spawns the compiled `dist/index.js`, not the source.
- This repo uses **pnpm** (`pnpm-lock.yaml`).

## Architecture

The entire CLI is one recursive data structure walked by one generic runner. Four source files:

- `src/types/index.ts` — the `MenuNode` type: `{ label, description?, children?, action?, docs? }`. A node with `children` is a submenu; a node with `action` is a command (branch xor leaf). `docs` is runtime-ignored metadata used only by the wiki generator.
- `src/tree/` — the menu tree, where **the folder layout mirrors the menu hierarchy** (e.g. `windows/network/winnat/stop.ts`). Group nodes are `index.ts` files that import their children and assemble them; leaf files export a `MenuNode` with `action` + `docs`. `src/tree/index.ts` exports `tree = [node, windows]`. **Single source of truth** for both the CLI and the wiki. Each file is kept tiny.
- `src/tree/shared.ts` — shared helpers: `runShell(command, { start, success, failHint })` wraps the common `execSync({ stdio: "inherit" })` + try/catch + logging (used by every shell command, e.g. `stop.ts`'s `runShell("net stop winnat", { ..., failHint: ADMIN_HINT })`); also exports `ADMIN_HINT` and re-exports `MenuNode` so a leaf needs one import.
- `src/menu.ts` — `runMenu(nodes, isRoot)`: renders an `inquirer` list of the nodes, recurses into `children`, calls `action` on leaves. Runs in a `while (true)` loop; submenus offer `"Back"` (returns to the parent loop), the root offers `"Exit"`. Node labels render as `label - description` when a `description` is present.
- `src/index.ts` — entry (`bin` → `dist/index.js`, shebang); just `runMenu(tree, true)`.

### Adding a command

Add a leaf file under `src/tree/` (next to its siblings — the folders mirror the menu) exporting a `MenuNode` with `action` + `docs`, and add it to the parent group's `index.ts` `children`. Use `runShell` for shell commands. A new top-level category is a new folder with an `index.ts` imported into `src/tree/index.ts`. Then run `pnpm wiki`. No router/registry wiring.

### Wiki generation

`scripts/generate-wiki.ts` (run via `pnpm wiki`) imports `tree` and generates docs deterministically (idempotent — rerun yields no diff):
- **Owns** `wiki/Commands.md` (menu tree + breadcrumb index + per-command reference from `docs`).
- **Rewrites** only the block between `<!-- AUTO:START -->` and `<!-- AUTO:END -->` in `wiki/Home.md` (menu tree) and `wiki/_Sidebar.md` (command links).
- **Leaves alone** hand-written pages: `Home.md` prose, `Installation.md`, `Publishing.md`, `Adding-a-Command.md`.

After changing the tree, run `pnpm wiki` and commit the regenerated pages.

## Commits

- Do not commit directly to `master`. Create a branch first, then open a PR.
- Do not add Claude as a co-author. No `Co-Authored-By: Claude` trailer and no "Generated with Claude Code" line in commit messages.

## Publishing

`.github/workflows/npm-publish.yml`: on GitHub **release created** → build → `npm publish` (uses `NPM_TOKEN` secret). Package name is `shibbir`.

## Known issue

`src/index.test.ts` expects output `"Greeting from Shibbir's CLI!"` but `src/index.ts` prints `"Hello from Shibbir's CLI!"` — the test is currently failing.
