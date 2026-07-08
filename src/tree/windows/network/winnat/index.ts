#!/usr/bin/env node
import { MenuNode } from "../../../shared";
import { stop } from "./stop";
import { start } from "./start";

export const winnat: MenuNode = {
  label: "WinNAT",
  description: "stop/start to free ports blocked by Hyper-V/WSL/Docker",
  children: [stop, start],
};
