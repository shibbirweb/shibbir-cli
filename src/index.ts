#!/usr/bin/env node
import inquirer from "inquirer";
import { nodeMain } from "./node";
import { windowsMain } from "./windows";

console.log("Hello from Shibbir's CLI!");

const TYPE_NODE = "Node";
const TYPE_WINDOWS = "Windows";

async function main() {
  while (true) {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select an option:",
        choices: [TYPE_NODE, TYPE_WINDOWS, "Exit"],
      },
    ]);

    switch (type) {
      case TYPE_NODE:
        await nodeMain();
        break;
      case TYPE_WINDOWS:
        await windowsMain();
        break;
      default:
        console.log("Exiting...");
        return;
    }
  }
}

main();
