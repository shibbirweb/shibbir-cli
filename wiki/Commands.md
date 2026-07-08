# Commands

> This page is generated from `src/tree.ts` by `pnpm wiki`. Do not edit by hand.

The CLI is menu-driven. Run `shibbir` and navigate the prompts. Every submenu has a **Back** option; the top menu has **Exit**.

## Menu tree

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

## Index

| Command | Menu path | Description |
| --- | --- | --- |
| [Bump Version](#node-package-development-bump-version) | Node → Package Development → Bump Version | Bumps the current package's version number and updates package.json (and the lockfile). |
| [Stop](#windows-network-winnat-stop) | Windows → Network → WinNAT → Stop | Stops the Windows NAT (WinNAT) service to release TCP port ranges reserved by Hyper-V/WSL2/Docker, freeing ports that fail with 'port is already in use'. |
| [Start](#windows-network-winnat-start) | Windows → Network → WinNAT → Start | Starts the Windows NAT (WinNAT) service again after it was stopped. |

## Command reference

### Node → Package Development → Bump Version

Bumps the current package's version number and updates package.json (and the lockfile).

**Runs:**

```bash
npm version <patch|minor|major> --no-git-tag-version
```

**Requirements:**

- Run in a directory containing a package.json

### Windows → Network → WinNAT → Stop

Stops the Windows NAT (WinNAT) service to release TCP port ranges reserved by Hyper-V/WSL2/Docker, freeing ports that fail with 'port is already in use'.

**Runs:**

```bash
net stop winnat
```

**Requirements:**

- Windows only
- Run the terminal as Administrator

### Windows → Network → WinNAT → Start

Starts the Windows NAT (WinNAT) service again after it was stopped.

**Runs:**

```bash
net start winnat
```

**Requirements:**

- Windows only
- Run the terminal as Administrator
