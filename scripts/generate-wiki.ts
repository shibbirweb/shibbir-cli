#!/usr/bin/env node
/**
 * Generates wiki pages from the menu tree (src/tree.ts), the single source of
 * truth. Run with `pnpm wiki`. Deterministic: rerunning produces no diff.
 *
 * Owns:  wiki/Commands.md (fully generated)
 * Edits: the <!-- AUTO:START -->..<!-- AUTO:END --> block in Home.md and _Sidebar.md
 * Leaves alone: all other (hand-written) wiki pages.
 */
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { tree } from "../src/tree";
import { MenuNode } from "../src/types";

const WIKI_DIR = join(__dirname, "..", "wiki");
const AUTO_START = "<!-- AUTO:START -->";
const AUTO_END = "<!-- AUTO:END -->";

/** Slug used for in-page anchors (GitHub lowercases and dashifies headings). */
function anchor(path: string[]): string {
  return path.join(" ").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** ASCII tree diagram of labels (with descriptions), from a list of nodes. */
function renderTree(nodes: MenuNode[], prefix = ""): string[] {
  const lines: string[] = [];
  nodes.forEach((node, i) => {
    const last = i === nodes.length - 1;
    const branch = last ? "└── " : "├── ";
    const label = node.description ? `${node.label} (${node.description})` : node.label;
    lines.push(`${prefix}${branch}${label}`);
    if (node.children) {
      lines.push(...renderTree(node.children, prefix + (last ? "    " : "│   ")));
    }
  });
  return lines;
}

/** Every leaf command with its breadcrumb path. */
function leaves(nodes: MenuNode[], path: string[] = []): { node: MenuNode; path: string[] }[] {
  const out: { node: MenuNode; path: string[] }[] = [];
  for (const node of nodes) {
    const here = [...path, node.label];
    if (node.children) out.push(...leaves(node.children, here));
    else if (node.action) out.push({ node, path: here });
  }
  return out;
}

function renderCommandsPage(): string {
  const treeBlock = ["```", "shibbir", ...renderTree(tree), "```"].join("\n");
  const all = leaves(tree);

  const index = [
    "| Command | Menu path | Description |",
    "| --- | --- | --- |",
    ...all.map(({ node, path }) => {
      const desc = node.docs?.about ?? node.description ?? "";
      return `| [${node.label}](#${anchor(path)}) | ${path.join(" → ")} | ${desc} |`;
    }),
  ].join("\n");

  const details = all
    .map(({ node, path }) => {
      const parts: string[] = [`### ${path.join(" → ")}`, ""];
      if (node.docs?.about) parts.push(node.docs.about, "");
      if (node.docs?.commands?.length) {
        parts.push("**Runs:**", "", "```bash", ...node.docs.commands, "```", "");
      }
      if (node.docs?.requirements?.length) {
        parts.push("**Requirements:**", "", ...node.docs.requirements.map((r) => `- ${r}`), "");
      }
      return parts.join("\n").trimEnd();
    })
    .join("\n\n");

  return [
    "# Commands",
    "",
    "> This page is generated from `src/tree.ts` by `pnpm wiki`. Do not edit by hand.",
    "",
    "The CLI is menu-driven. Run `shibbir` and navigate the prompts. Every submenu has a **Back** option; the top menu has **Exit**.",
    "",
    "## Menu tree",
    "",
    treeBlock,
    "",
    "## Index",
    "",
    index,
    "",
    "## Command reference",
    "",
    details,
    "",
  ].join("\n");
}

/** Sidebar command links, one bullet per leaf, indented by depth. */
function renderSidebarLinks(): string {
  return leaves(tree)
    .map(({ path }) => `- [${path.join(" → ")}](Commands#${anchor(path)})`)
    .join("\n");
}

/** Replace the content between AUTO markers in an existing file. */
function replaceAutoBlock(file: string, inner: string): void {
  const path = join(WIKI_DIR, file);
  const src = readFileSync(path, "utf8");
  if (!src.includes(AUTO_START) || !src.includes(AUTO_END)) {
    throw new Error(`${file} is missing ${AUTO_START} / ${AUTO_END} markers`);
  }
  const before = src.slice(0, src.indexOf(AUTO_START) + AUTO_START.length);
  const after = src.slice(src.indexOf(AUTO_END));
  writeFileSync(path, `${before}\n${inner}\n${after}`);
}

function main(): void {
  writeFileSync(join(WIKI_DIR, "Commands.md"), renderCommandsPage());

  const treeBlock = ["```", "shibbir", ...renderTree(tree), "```"].join("\n");
  replaceAutoBlock("Home.md", treeBlock);
  replaceAutoBlock("_Sidebar.md", renderSidebarLinks());

  console.log("Wiki generated: Commands.md, Home.md, _Sidebar.md");
}

main();
