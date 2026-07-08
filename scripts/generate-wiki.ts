#!/usr/bin/env node
/**
 * Generates wiki pages from the menu tree (src/tree/), the single source of
 * truth. Run with `pnpm wiki`. Deterministic: rerunning produces no diff.
 *
 * Owns:
 *   - wiki/Commands.md              hub: menu tree + index linking to command pages
 *   - wiki/<Command Title>.md       one rich page per command (marked, see MARKER)
 * Edits:
 *   - the <!-- AUTO:START -->..<!-- AUTO:END --> block in Home.md and _Sidebar.md
 * Leaves alone: all other (hand-written) wiki pages.
 */
import { writeFileSync, readFileSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import { tree } from "../src/tree";
import { MenuNode } from "../src/types";

const WIKI_DIR = join(__dirname, "..", "wiki");
const AUTO_START = "<!-- AUTO:START -->";
const AUTO_END = "<!-- AUTO:END -->";
const MARKER = "<!-- generated: command-page. Edit src/tree/, run `pnpm wiki`. -->";

interface Leaf {
  node: MenuNode;
  path: string[];
}

/** Every leaf command with its breadcrumb path. */
function leaves(nodes: MenuNode[], path: string[] = []): Leaf[] {
  const out: Leaf[] = [];
  for (const node of nodes) {
    const here = [...path, node.label];
    if (node.children) out.push(...leaves(node.children, here));
    else if (node.action) out.push({ node, path: here });
  }
  return out;
}

/** Wiki page title for a command (docs.title or the leaf label). */
function pageTitle(leaf: Leaf): string {
  return leaf.node.docs?.title ?? leaf.node.label;
}

/** GitHub wiki page/link name: spaces become hyphens. */
function pageName(title: string): string {
  return title.trim().replace(/\s+/g, "-");
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

function treeBlock(): string {
  return ["```", "shibbir", ...renderTree(tree), "```"].join("\n");
}

/** A single rich command page. */
function renderCommandPage(leaf: Leaf): string {
  const d = leaf.node.docs ?? {};
  const title = pageTitle(leaf);
  const breadcrumb = leaf.path.join(" → ");
  const out: string[] = [MARKER, "", `# ${title}`, "", `*${breadcrumb}*`, ""];

  if (d.summary) out.push(d.summary, "");
  if (d.about) out.push("## Overview", "", d.about, "");

  out.push("## Usage", "", "```", `shibbir → ${breadcrumb}`, "```", "");
  if (d.prompt) out.push(`You are prompted: **${d.prompt}**`, "");

  if (d.options?.length) {
    out.push("## Options", "", "| Option | Description | Example |", "| --- | --- | --- |");
    for (const o of d.options) {
      out.push(`| \`${o.name}\` | ${o.description} | ${o.example ? `\`${o.example}\`` : ""} |`);
    }
    out.push("");
  }

  if (d.commands?.length) {
    out.push("## Runs", "", "```bash", ...d.commands, "```", "");
  }

  if (d.requirements?.length) {
    out.push("## Requirements", "", ...d.requirements.map((r) => `- ${r}`), "");
  }

  if (d.notes?.length) {
    out.push("## Notes", "", ...d.notes.map((n) => `- ${n}`), "");
  }

  out.push("---", "", "See all commands in **[[Commands]]**.", "");
  return out.join("\n");
}

/** The Commands hub page: menu tree + index linking to each command page. */
function renderCommandsHub(all: Leaf[]): string {
  const index = [
    "| Command | Menu path | Summary |",
    "| --- | --- | --- |",
    ...all.map((leaf) => {
      const title = pageTitle(leaf);
      const summary = leaf.node.docs?.summary ?? leaf.node.description ?? "";
      return `| [${title}](${pageName(title)}) | ${leaf.path.join(" → ")} | ${summary} |`;
    }),
  ].join("\n");

  return [
    "# Commands",
    "",
    "> Generated from `src/tree/` by `pnpm wiki`. Do not edit by hand.",
    "",
    "The CLI is menu-driven. Run `shibbir` and navigate the prompts. Every submenu has a **Back** option; the top menu has **Exit**. Each command has its own page — click through from the table below.",
    "",
    "## Menu tree",
    "",
    treeBlock(),
    "",
    "## Commands",
    "",
    index,
    "",
  ].join("\n");
}

/** Sidebar command links, one per command page. */
function renderSidebarLinks(all: Leaf[]): string {
  return all
    .map((leaf) => {
      const title = pageTitle(leaf);
      return `- [${title}](${pageName(title)})`;
    })
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

/** Delete previously generated command pages that are no longer produced. */
function cleanStaleCommandPages(keep: Set<string>): void {
  for (const file of readdirSync(WIKI_DIR)) {
    if (!file.endsWith(".md") || keep.has(file)) continue;
    const full = join(WIKI_DIR, file);
    if (readFileSync(full, "utf8").startsWith(MARKER)) unlinkSync(full);
  }
}

function main(): void {
  const all = leaves(tree);

  // One page per command.
  const written = new Set<string>();
  for (const leaf of all) {
    const file = `${pageName(pageTitle(leaf))}.md`;
    writeFileSync(join(WIKI_DIR, file), renderCommandPage(leaf));
    written.add(file);
  }
  cleanStaleCommandPages(written);

  // Hub + injected blocks.
  writeFileSync(join(WIKI_DIR, "Commands.md"), renderCommandsHub(all));
  replaceAutoBlock("Home.md", treeBlock());
  replaceAutoBlock("_Sidebar.md", renderSidebarLinks(all));

  const pages = [...written].sort().join(", ");
  console.log(`Wiki generated: Commands.md, Home.md, _Sidebar.md, and command pages: ${pages}`);
}

main();
