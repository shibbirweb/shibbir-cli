#!/usr/bin/env node
import { execSync } from "child_process";
import { ICommand } from "../../../../types";

export default class Stop implements ICommand {
  name: string = "Stop";

  async action() {
    console.log("Stopping WinNAT service...");

    try {
      execSync("net stop winnat", { stdio: "inherit" });
      console.log("WinNAT stopped. Blocked ports should now be free.");
    } catch (error) {
      console.error("Error stopping WinNAT:", error);
      console.error("Make sure you run this terminal as Administrator.");
    }
  }
}
