#!/usr/bin/env node
import inquirer from "inquirer";
import winnat from "./winnat";

const TYPE_WINNAT = "WinNAT";

export default async function () {
  while (true) {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select an option:",
        choices: [
          {
            name: `${TYPE_WINNAT} - stop/start to free ports blocked by Hyper-V/WSL/Docker`,
            value: TYPE_WINNAT,
          },
          "Back",
        ],
      },
    ]);

    switch (type) {
      case TYPE_WINNAT:
        await winnat();
        break;
      default:
        return;
    }
  }
}
