#!/usr/bin/env node
import { MenuNode } from "../../shared";
import { winnat } from "./winnat";

export const network: MenuNode = {
  label: "Network",
  children: [winnat],
};
