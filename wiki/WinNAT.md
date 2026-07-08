# WinNAT

**Path:** Windows → Network → WinNAT

Stop or start the Windows NAT (**WinNAT**) service to free TCP ports it has reserved.

## Why

On Windows, Hyper-V / WSL2 / Docker reserve ranges of TCP ports through the **WinNAT** service. A port you want (e.g. `3000`, `5432`) can then fail with "port is already in use" / "access is denied" even though nothing is listening on it. Stopping WinNAT releases those reservations; start it again afterward.

## Usage

```
shibbir → Windows → Network → WinNAT → Stop | Start
```

| Action | Runs | Effect |
| --- | --- | --- |
| Stop | `net stop winnat` | Releases reserved port ranges |
| Start | `net start winnat` | Brings the service back up |

## Requirements

- **Windows only.**
- Run in a terminal opened **as Administrator**. Without elevation the command fails with "Access is denied" — the CLI catches this and prints a hint to run as Administrator.

## Source

- `src/windows/network/winnat/Stop/index.ts`
- `src/windows/network/winnat/Start/index.ts`
