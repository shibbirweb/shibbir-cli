#!/usr/bin/env node
import inquirer from "inquirer";
import packageDevelopment from "./package-development";

const TYPE_PACKAGE_DEVELOPMENT = "Package Development";

export async function nodeMain() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select an option:",
      choices: [TYPE_PACKAGE_DEVELOPMENT],
    },
  ]);

  switch (type) {
    case TYPE_PACKAGE_DEVELOPMENT:
      await packageDevelopment();
      break;
    default:
      console.log("Exiting...");
      break;
  }
}
