# Bump Version

**Category:** Node → Package Development

Bumps the current package's version number.

## Usage

```
shibbir → Node → Package Development → Bump Version
```

**Prompt:** `Select a version bump type:`

| Choice | Effect (semver `x.y.z`) | Example |
| --- | --- | --- |
| `patch` | Increments `z` | `1.0.0` → `1.0.1` |
| `minor` | Increments `y`, resets `z` | `1.0.1` → `1.1.0` |
| `major` | Increments `x`, resets `y.z` | `1.1.0` → `2.0.0` |

## Behavior

Runs the following in the current directory:

```bash
npm version <type> --no-git-tag-version
```

- Updates the `version` field in `package.json` (and `package-lock.json`).
- Does **not** create a git commit or tag.

## Source

`src/node/package-development/BumpVersion/index.ts`
