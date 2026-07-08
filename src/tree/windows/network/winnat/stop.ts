#!/usr/bin/env node
import { MenuNode, runShell, ADMIN_HINT } from "../../../shared";

export const stop: MenuNode = {
  label: "Stop",
  action: () =>
    runShell("net stop winnat", {
      start: "Stopping WinNAT service...",
      success: "WinNAT stopped. Blocked ports should now be free.",
      failHint: ADMIN_HINT,
    }),
  docs: {
    about:
      "Stops the Windows NAT (WinNAT) service to release TCP port ranges reserved by Hyper-V/WSL2/Docker, freeing ports that fail with 'port is already in use'.",
    commands: ["net stop winnat"],
    requirements: ["Windows only", "Run the terminal as Administrator"],
  },
};
