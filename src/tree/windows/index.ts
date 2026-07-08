#!/usr/bin/env node
import { MenuNode } from "../shared";
import { network } from "./network";

export const windows: MenuNode = {
  label: "Windows",
  children: [network],
};
