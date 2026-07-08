<!-- generated: command-page. Edit src/tree/, run `pnpm wiki`. -->

# Start WinNAT

*Windows → Network → WinNAT → Start*

Restart the Windows NAT service after it was stopped.

## Overview

Starts the Windows NAT (WinNAT) service again after it was stopped with the Stop WinNAT command. Run this once you have finished freeing ports so that Hyper-V, WSL2, and Docker Desktop networking (port forwarding, NAT) returns to normal.

## Usage

```
shibbir → Windows → Network → WinNAT → Start
```

## Runs

```bash
net start winnat
```

## Requirements

- Windows only
- Run the terminal as Administrator

## Notes

- Pairs with Stop WinNAT — stop to free ports, start to restore normal networking.

---

See all commands in **[[Commands]]**.
