#!/usr/bin/env node
import inquirer from "inquirer";
import network from "./network";

const TYPE_NETWORK = "Network";

export async function windowsMain() {
  while (true) {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select an option:",
        choices: [TYPE_NETWORK, "Back"],
      },
    ]);

    switch (type) {
      case TYPE_NETWORK:
        await network();
        break;
      default:
        return;
    }
  }
}
