# Commands

> Generated from `src/tree/` by `pnpm wiki`. Do not edit by hand.

The CLI is menu-driven. Run `shibbir` and navigate the prompts. Every submenu has a **Back** option; the top menu has **Exit**. Each command has its own page — click through from the table below.

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

## Commands

| Command | Menu path | Summary |
| --- | --- | --- |
| [Bump Version](Bump-Version) | Node → Package Development → Bump Version | Increment the package version (patch, minor, or major) in package.json. |
| [Stop WinNAT](Stop-WinNAT) | Windows → Network → WinNAT → Stop | Stop the Windows NAT service to free TCP ports it has reserved. |
| [Start WinNAT](Start-WinNAT) | Windows → Network → WinNAT → Start | Restart the Windows NAT service after it was stopped. |
