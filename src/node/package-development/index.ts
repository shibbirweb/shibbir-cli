#!/usr/bin/env node
import inquirer from "inquirer";
import register from "./register";

export default async function () {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select an option:",
      choices: [...Object.keys(register), "Exit"],
    },
  ]);

  if (type === "Exit") {
    console.log("Exiting...");
    return;
  }

  const command = register[type]

  if (command) {
    await command();
  } else {
    console.log("Command not found!");
  }
}
