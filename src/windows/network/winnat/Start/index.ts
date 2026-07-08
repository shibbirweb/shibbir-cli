#!/usr/bin/env node
import { execSync } from "child_process";
import { ICommand } from "../../../../types";

export default class Start implements ICommand {
  name: string = "Start";

  async action() {
    console.log("Starting WinNAT service...");

    try {
      execSync("net start winnat", { stdio: "inherit" });
      console.log("WinNAT started.");
    } catch (error) {
      console.error("Error starting WinNAT:", error);
      console.error("Make sure you run this terminal as Administrator.");
    }
  }
}
