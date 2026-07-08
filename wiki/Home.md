# shibbir CLI Wiki

A menu-driven CLI of developer utilities by MD. Shibbir Ahmed, built on [inquirer](https://www.npmjs.com/package/inquirer).

## Quick start

```bash
npm install -g shibbir
shibbir
```

Follow the interactive prompts. See **[[Installation]]** for details.

## Contents

- **[[Installation]]** — install and requirements
- **[[Commands]]** — every command, generated from the menu tree
- **[[Adding a Command]]** — extend the CLI with a new command
- **[[Publishing]]** — how releases reach npm

## Menu tree

<!-- AUTO:START -->
```
shibbir
├── Node
│   └── Package Development
│       └── Bump Version
└── Windows
    └── Network
        └── WinNAT (stop/start to free ports blocked by Hyper-V/WSL/Docker)
            ├── Stop
            └── Start
```
<!-- AUTO:END -->

Every submenu has a **Back** option to return to the previous menu; the top menu has **Exit** to quit.
