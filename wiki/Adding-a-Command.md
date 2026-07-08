# Adding a Command

The entire CLI is one recursive menu tree under [`src/tree/`](https://github.com/shibbirweb/shibbir-cli/tree/master/src/tree), walked by a single generic runner (`src/menu.ts`). Each top-level category (Node, Windows, …) is its own file exporting a `MenuNode`; `src/tree/index.ts` assembles them into `tree`. Adding a command means adding one node — no menu wiring.

## The node type

`MenuNode` (`src/types/index.ts`):

```ts
export interface MenuNode {
  label: string;              // menu choice text
  description?: string;       // optional hint shown after the label
  children?: MenuNode[];      // branch: a submenu
  action?: () => Promise<void> | void; // leaf: the command
  docs?: {                    // used only by the wiki generator
    about?: string;
    commands?: string[];
    requirements?: string[];
  };
}
```

- A node with `children` is a **submenu** (nest as deep as you like).
- A node with `action` is a **command**.

## Steps

### 1. Write the action

The `src/tree/` folder layout mirrors the menu. Create a small leaf file next to its siblings (e.g. `src/tree/windows/network/winnat/restart.ts`) that exports one `MenuNode`. Use the shared `runShell` helper for shell commands:

```ts
import { MenuNode, runShell } from "../../../shared";

export const greet: MenuNode = {
  label: "Greet",
  action: () => runShell("echo Hello", { start: "Greeting...", success: "Done!" }),
  docs: {
    title: "Greet",
    summary: "Print a friendly greeting.",
    about: "Longer explanation of what this command does and when to use it.",
    prompt: "What is your name?", // if the command asks something
    options: [
      { name: "loud", description: "Shout it.", example: "HELLO" }, // if it offers choices
    ],
    commands: ["echo Hello"],
    requirements: ["Any requirements, e.g. Windows only"],
    notes: ["Any caveats worth calling out."],
  },
};
```

The `docs` block is what fills the command's generated wiki page, so write real content — `title` (unique, becomes the page name), `summary`, and `about` at minimum. Omit fields that don't apply. (Import depth of `shared` depends on how deep the leaf sits.)

### 2. Add it to the parent group

In the parent's `index.ts`, import the leaf and add it to `children`:

```ts
import { greet } from "./greet";
// ...
children: [stop, start, greet],
```

A brand-new top-level category is a new folder with an `index.ts` exporting a `MenuNode`, imported into `src/tree/index.ts`.

### 3. Regenerate the wiki

```bash
pnpm wiki
```

This rewrites **[[Commands]]** and the menu tree / links in **[[Home]]** and the sidebar from the tree. Commit the regenerated files.

## What you never touch

- No menu router or registry — `src/menu.ts` walks the tree generically.
- `Back` / `Exit` navigation is automatic for every menu level.
