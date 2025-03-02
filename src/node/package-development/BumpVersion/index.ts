import inquirer from "inquirer";
import { execSync } from "child_process";
import { ICommand } from "../../../types";

export default class BumpVersion implements ICommand {
  name: string = "Bump Version";

  async action() {
    const { patchType } = await inquirer.prompt([
      {
        type: "list",
        name: "patchType",
        message: "Select a version bump type:",
        choices: ["patch", "minor", "major"],
      },
    ]);

    console.log(`Bumping version: ${patchType}`);

    try {
      execSync(`npm version ${patchType} --no-git-tag-version`, {
        stdio: "inherit",
      });
      console.log("Version updated successfully!");
    } catch (error) {
      console.error("Error updating version:", error);
    }
  }
}
