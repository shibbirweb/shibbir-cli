#!/usr/bin/env node
import { MenuNode } from "../types";
import { node } from "./node";
import { windows } from "./windows";

/**
 * The whole menu tree — single source of truth for the CLI (src/menu.ts) and
 * the wiki (scripts/generate-wiki.ts). Each top-level category lives in its own
 * file under src/tree/ and is assembled here. Add a new category by creating a
 * file that exports a MenuNode and importing it into this array.
 */
export const tree: MenuNode[] = [node, windows];
