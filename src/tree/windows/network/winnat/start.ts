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
    about: "Starts the Windows NAT (WinNAT) service again after it was stopped.",
    commands: ["net start winnat"],
    requirements: ["Windows only", "Run the terminal as Administrator"],
  },
};
