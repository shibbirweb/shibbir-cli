<!-- generated: command-page. Edit src/tree/, run `pnpm wiki`. -->

# Bump Version

*Node → Package Development → Bump Version*

Increment the package version (patch, minor, or major) in package.json.

## Overview

Bumps the current package's [semantic version](https://semver.org) and writes the new value into package.json (and the lockfile). It does not create a git commit or tag, so you stay in control of when to commit and release. Version numbers follow the `MAJOR.MINOR.PATCH` format.

## Usage

```
shibbir → Node → Package Development → Bump Version
```

You are prompted: **Select a version bump type:**

## Options

| Option | Description | Example |
| --- | --- | --- |
| `patch` | Backwards-compatible bug fixes. Increments the last number. | `1.4.2 → 1.4.3` |
| `minor` | Backwards-compatible new features. Increments the middle number and resets patch to 0. | `1.4.2 → 1.5.0` |
| `major` | Breaking changes. Increments the first number and resets minor and patch to 0. | `1.4.2 → 2.0.0` |

## Runs

```bash
npm version <patch|minor|major> --no-git-tag-version
```

## Requirements

- Run in a directory containing a package.json

## Notes

- `--no-git-tag-version` means no git commit or tag is created — do that yourself afterward.
- Publishing to npm requires a version not already published; bump before each release.

---

See all commands in **[[Commands]]**.
