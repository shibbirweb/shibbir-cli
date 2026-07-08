#!/usr/bin/env node
import inquirer from "inquirer";
import { MenuNode, runShell } from "../shared";

async function action() {
  const { patchType } = await inquirer.prompt([
    {
      type: "list",
      name: "patchType",
      message: "Select a version bump type:",
      choices: ["patch", "minor", "major"],
    },
  ]);

  runShell(`npm version ${patchType} --no-git-tag-version`, {
    start: `Bumping version: ${patchType}`,
    success: "Version updated successfully!",
  });
}

export const bumpVersion: MenuNode = {
  label: "Bump Version",
  action,
  docs: {
    about:
      "Bumps the current package's version number and updates package.json (and the lockfile).",
    commands: ["npm version <patch|minor|major> --no-git-tag-version"],
    requirements: ["Run in a directory containing a package.json"],
  },
};
