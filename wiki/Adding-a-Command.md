# Adding a Command

Commands are pluggable. The menu and dispatch are generated from a registry, so adding a command is two code steps (plus docs).

## 1. Create the command class

Create `src/node/package-development/<Name>/index.ts` implementing the `ICommand` interface (`src/types/index.ts`):

```ts
import { ICommand } from "../../../types";

export default class MyCommand implements ICommand {
  name: string = "My Command"; // shown in the menu

  async action() {
    // command logic here
  }
}
```

`ICommand` is:

```ts
export interface ICommand {
  name: string;
  action: () => Promise<void>;
}
```

## 2. Register it

Add an instance to `commandsList` in `src/node/package-development/register.ts`:

```ts
import MyCommand from "./MyCommand";

const commandsList: ICommand[] = [
  new BumpVersion(),
  new MyCommand(), // <- add here
];
```

The menu choices come from `Object.keys(register)` and dispatch is built from the same list — no other wiring needed.

## 3. Document it

- Add a page in the wiki for the command (copy **[[Bump Version]]** as a template).
- Add a row to the **[[Commands]]** index and a link in the sidebar (`_Sidebar.md`).

## Where menus live

| Layer | File |
| --- | --- |
| Entry / top menu | `src/index.ts` |
| Node menu | `src/node/index.ts` |
| Package Development menu | `src/node/package-development/index.ts` |
| Command registry | `src/node/package-development/register.ts` |
| `ICommand` interface | `src/types/index.ts` |
