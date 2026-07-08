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
    about: "Prints a greeting.",
    commands: ["echo Hello"],
    requirements: [],
  },
};
```

(Import depth of `shared` depends on how deep the leaf sits.)

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
