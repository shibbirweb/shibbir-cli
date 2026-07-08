#!/usr/bin/env node
import inquirer from "inquirer";
import { MenuNode } from "./types";

/**
 * Generic recursive menu walker. Renders a list of the given nodes; a branch
 * (has `children`) recurses into a submenu, a leaf (has `action`) runs it.
 * Submenus offer "Back" to return to the parent; the root offers "Exit".
 */
export async function runMenu(nodes: MenuNode[], isRoot = false): Promise<void> {
  const backLabel = isRoot ? "Exit" : "Back";

  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Select an option:",
        choices: [
          ...nodes.map((node) => ({
            name: node.description ? `${node.label} - ${node.description}` : node.label,
            value: node,
          })),
          { name: backLabel, value: backLabel },
        ],
      },
    ]);

    if (choice === backLabel) {
      if (isRoot) console.log("Exiting...");
      return;
    }

    const node = choice as MenuNode;

    if (node.children) {
      await runMenu(node.children);
    } else if (node.action) {
      await node.action();
    }
  }
}
