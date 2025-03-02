import { ICommand } from "../../types";
import BumpVersion from "./BumpVersion";

const commandsList: ICommand[] = [
  new BumpVersion(),
  // add new command here
];

const commands: Record<ICommand["name"], ICommand["action"]> = {};

commandsList.forEach((command) => {
  commands[command.name] = command.action;
});

export default commands;
