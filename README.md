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
npm install        # install dependencies
npm start          # run the CLI from source (ts-node)
npm run build      # compile TypeScript to dist/
npm test           # run tests (build first — tests run against dist/)
```

### Project structure

```
src/
  index.ts                          # entry point (bin), top-level menu
  node/
    index.ts                        # Node menu
    package-development/
      index.ts                      # Package Development menu
      register.ts                   # command registry
      BumpVersion/index.ts          # example command
  windows/
    index.ts                        # Windows menu
    network/
      index.ts                      # Network menu (WinNAT group)
      winnat/
        index.ts                    # WinNAT menu
        register.ts                 # command registry
        Stop/index.ts               # net stop winnat
        Start/index.ts              # net start winnat
  types/index.ts                    # ICommand interface
```

### Adding a command

1. Create a class implementing `ICommand` (`{ name, action }`) under `src/node/package-development/<Name>/`.
2. Add `new <Name>()` to `commandsList` in `src/node/package-development/register.ts`.

The menu and dispatch are wired automatically from the registry — no other changes needed.

## Publishing

Publishing is automated: creating a GitHub **release** triggers a build and `npm publish` (see `.github/workflows/npm-publish.yml`).

## License

MIT © MD. Shibbir Ahmed
