#!/usr/bin/env node
import { MenuNode } from "../shared";
import { bumpVersion } from "./bump-version";

export const node: MenuNode = {
  label: "Node",
  children: [
    {
      label: "Package Development",
      children: [bumpVersion],
    },
  ],
};
