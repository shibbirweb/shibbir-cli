#!/usr/bin/env node
import { ICommand } from "../../../types";
import Stop from "./Stop";
import Start from "./Start";

const commandsList: ICommand[] = [
  new Stop(),
  new Start(),
];

const commands: Record<ICommand["name"], ICommand["action"]> = {};

commandsList.forEach((command) => {
  commands[command.name] = command.action;
});

export default commands;
