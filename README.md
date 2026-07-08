# shibbir

A CLI tool by Shibbir Ahmed. Interactive, menu-driven developer utilities built on [inquirer](https://www.npmjs.com/package/inquirer).

📖 **Full documentation:** [Wiki](https://github.com/shibbirweb/shibbir-cli/wiki)

## Install

```bash
npm install -g shibbir
```

## Usage

Run the CLI and follow the interactive menus:

```bash
shibbir
```

Navigate the top-level categories: **Node** or **Windows**.

### Available commands

| Category | Command | Description |
| --- | --- | --- |
| Node → Package Development | Bump Version | Bump the current package version (`patch`, `minor`, or `major`) via `npm version --no-git-tag-version`. |
| Windows → Network | WinNAT → Stop | Stop the WinNAT service to free reserved/blocked ports (Hyper-V/WSL/Docker). Run as Administrator. |
| Windows → Network | WinNAT → Start | Start the WinNAT service again. Run as Administrator. |

## Development

Requires Node.js 18+.

```bash
pnpm install       # install dependencies
pnpm start         # run the CLI from source (ts-node)
pnpm run build     # compile TypeScript to dist/
pnpm wiki          # regenerate the wiki from the menu tree
pnpm test          # run tests (build first — tests run against dist/)
```

### Project structure

The whole CLI is one recursive menu tree walked by one generic runner:

```
src/
  index.ts                 # entry (bin) — runMenu(tree, true)
  menu.ts                  # generic recursive menu walker (Back/Exit, loop)
  tree/                    # menu tree — filesystem mirrors the menu hierarchy
    index.ts               # tree = [node, windows] (single source of truth)
    shared.ts              # runShell() helper, ADMIN_HINT, MenuNode re-export
    node/
      index.ts             # Node → Package Development (assembles children)
      bump-version.ts      # leaf: action + docs
    windows/
      index.ts             # Windows → Network
      network/
        index.ts           # Network → WinNAT
        winnat/
          index.ts         # WinNAT → [Stop, Start]
          stop.ts          # leaf: action + docs
          start.ts         # leaf: action + docs
  types/index.ts           # MenuNode type
scripts/
  generate-wiki.ts         # walks the tree → generates wiki/ (pnpm wiki)
```

### Adding a command

1. Add a leaf file under [`src/tree/`](src/tree/) exporting a `MenuNode` (`label`, `action`, `docs`), then add it to the parent group's `children`. The folder layout mirrors the menu, so put it next to its siblings (e.g. a new WinNAT action goes in `src/tree/windows/network/winnat/`). Use `runShell` from `shared.ts` for shell commands. A brand-new top-level category is a new folder with an `index.ts` imported into [`src/tree/index.ts`](src/tree/index.ts).
2. Run `pnpm wiki` to regenerate the docs.

No menu/registry wiring — the runner and the wiki are both driven by the tree.

## Publishing

Publishing is automated: creating a GitHub **release** triggers a build and `npm publish` (see `.github/workflows/npm-publish.yml`).

## License

MIT © MD. Shibbir Ahmed
