#!/usr/bin/env node
import inquirer from "inquirer";
import { nodeMain } from "./node";

console.log("Hello from Shibbir's CLI!");

const TYPE_NODE = "Node";

async function main() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select an option:",
      choices: [TYPE_NODE],
    },
  ]);

  switch (type) {
    case TYPE_NODE:
      await nodeMain();
      break;
  }
}

main();
