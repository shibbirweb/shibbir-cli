#!/usr/bin/env node
import inquirer from "inquirer";
import register from "./register";

export default async function () {
  while (true) {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select an option:",
        choices: [...Object.keys(register), "Back"],
      },
    ]);

    if (type === "Back") {
      return;
    }

    const command = register[type];

    if (command) {
      await command();
    } else {
      console.log("Command not found!");
    }
  }
}
