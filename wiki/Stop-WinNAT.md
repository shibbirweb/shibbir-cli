<!-- generated: command-page. Edit src/tree/, run `pnpm wiki`. -->

# Stop WinNAT

*Windows → Network → WinNAT → Stop*

Stop the Windows NAT service to free TCP ports it has reserved.

## Overview

On Windows, Hyper-V, WSL2, and Docker Desktop reserve ranges of TCP ports through the Windows NAT (WinNAT) service. Those reservations can make a port you want (say 3000 or 5432) fail to bind with errors like "port is already in use" or "An attempt was made to access a socket in a way forbidden by its access permissions" — even when no process is actually listening. Stopping WinNAT releases those reserved ranges so the ports become usable again. Start it again with the Start WinNAT command once you are done.

## Usage

```
shibbir → Windows → Network → WinNAT → Stop
```

## Runs

```bash
net stop winnat
```

## Requirements

- Windows only
- Run the terminal as Administrator

## Notes

- Run again with Start WinNAT to bring Hyper-V/WSL/Docker networking back to normal.
- Without an elevated terminal the command fails with "Access is denied"; the CLI then prints a reminder to run as Administrator.

---

See all commands in **[[Commands]]**.
