export interface MenuNode {
  /** Menu choice text. */
  label: string;
  /** Optional hint shown after the label, e.g. "WinNAT - stop/start ...". */
  description?: string;
  /** Branch: submenu of child nodes. */
  children?: MenuNode[];
  /** Leaf: the command to run. */
  action?: () => Promise<void> | void;
  /** Optional documentation metadata. Ignored at runtime; consumed only by the wiki generator. */
  docs?: {
    /** Longer "why / what it does" paragraph. */
    about?: string;
    /** Shell commands the action runs, shown in a code block. */
    commands?: string[];
    /** Bullet list of requirements, e.g. "Windows only", "Run as Administrator". */
    requirements?: string[];
  };
}
