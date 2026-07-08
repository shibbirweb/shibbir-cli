#!/usr/bin/env node
import { MenuNode, runShell, ADMIN_HINT } from "../../../shared";

export const start: MenuNode = {
  label: "Start",
  action: () =>
    runShell("net start winnat", {
      start: "Starting WinNAT service...",
      success: "WinNAT started.",
      failHint: ADMIN_HINT,
    }),
  docs: {
    title: "Start WinNAT",
    summary: "Restart the Windows NAT service after it was stopped.",
    about:
      "Starts the Windows NAT (WinNAT) service again after it was stopped with the Stop WinNAT command. Run this once you have finished freeing ports so that Hyper-V, WSL2, and Docker Desktop networking (port forwarding, NAT) returns to normal.",
    commands: ["net start winnat"],
    requirements: ["Windows only", "Run the terminal as Administrator"],
    notes: [
      "Pairs with Stop WinNAT — stop to free ports, start to restore normal networking.",
    ],
  },
};
