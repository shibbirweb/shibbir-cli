#!/usr/bin/env node
import { execSync } from "child_process";

// Re-exported so category files need a single import for the common pieces.
export { MenuNode } from "../types";

/** Common hint for Windows commands that need an elevated terminal. */
export const ADMIN_HINT = "Make sure you run this terminal as Administrator.";

export interface RunShellMessages {
  /** Printed before the command runs. */
  start?: string;
  /** Printed after the command succeeds. */
  success?: string;
  /** Extra hint printed after the error (e.g. "Run as Administrator"). */
  failHint?: string;
}

/**
 * Runs a shell command with inherited stdio, wrapped in the standard
 * start/success/error logging used by every command action.
 */
export function runShell(command: string, messages: RunShellMessages = {}): void {
  if (messages.start) console.log(messages.start);

  try {
    execSync(command, { stdio: "inherit" });
    if (messages.success) console.log(messages.success);
  } catch (error) {
    console.error(`Error running \`${command}\`:`, error);
    if (messages.failHint) console.error(messages.failHint);
  }
}
