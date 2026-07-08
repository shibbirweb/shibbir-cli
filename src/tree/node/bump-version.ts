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
    title: "Bump Version",
    summary: "Increment the package version (patch, minor, or major) in package.json.",
    about:
      "Bumps the current package's [semantic version](https://semver.org) and writes the new value into package.json (and the lockfile). It does not create a git commit or tag, so you stay in control of when to commit and release. Version numbers follow the `MAJOR.MINOR.PATCH` format.",
    prompt: "Select a version bump type:",
    options: [
      {
        name: "patch",
        description: "Backwards-compatible bug fixes. Increments the last number.",
        example: "1.4.2 → 1.4.3",
      },
      {
        name: "minor",
        description:
          "Backwards-compatible new features. Increments the middle number and resets patch to 0.",
        example: "1.4.2 → 1.5.0",
      },
      {
        name: "major",
        description:
          "Breaking changes. Increments the first number and resets minor and patch to 0.",
        example: "1.4.2 → 2.0.0",
      },
    ],
    commands: ["npm version <patch|minor|major> --no-git-tag-version"],
    requirements: ["Run in a directory containing a package.json"],
    notes: [
      "`--no-git-tag-version` means no git commit or tag is created — do that yourself afterward.",
      "Publishing to npm requires a version not already published; bump before each release.",
    ],
  },
};
