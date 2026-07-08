export interface CommandOption {
  /** Option name, e.g. "patch". */
  name: string;
  /** What the option does. */
  description: string;
  /** Optional concrete example, e.g. "1.0.0 → 1.0.1". */
  example?: string;
}

export interface CommandDocs {
  /** Page title. Defaults to the node's label. Should be unique across commands. */
  title?: string;
  /** One-line summary shown under the title and in the index. */
  summary?: string;
  /** Longer "why / what it does" explanation (may be multiple sentences). */
  about?: string;
  /** The interactive prompt shown to the user, if any (e.g. "Select a version bump type:"). */
  prompt?: string;
  /** Enumerated choices the command offers (e.g. patch/minor/major), rendered as a table. */
  options?: CommandOption[];
  /** Shell commands the action runs, shown in a code block. */
  commands?: string[];
  /** Bullet list of requirements, e.g. "Windows only", "Run as Administrator". */
  requirements?: string[];
  /** Bullet list of extra notes / caveats. */
  notes?: string[];
}

export interface MenuNode {
  /** Menu choice text. */
  label: string;
  /** Optional hint shown after the label, e.g. "WinNAT - stop/start ...". */
  description?: string;
  /** Branch: submenu of child nodes. */
  children?: MenuNode[];
  /** Leaf: the command to run. */
  action?: () => Promise<void> | void;
  /** Documentation metadata. Ignored at runtime; consumed only by the wiki generator. */
  docs?: CommandDocs;
}
