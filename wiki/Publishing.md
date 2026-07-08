# Publishing

Publishing to npm is automated via GitHub Actions.

## Flow

1. Bump the version (use the **[[Bump Version]]** command or `npm version`).
2. Commit and push.
3. Create a **GitHub Release**.

Creating a release triggers `.github/workflows/npm-publish.yml`, which:

- checks out the code,
- installs dependencies,
- runs `npm run build`,
- runs `npm publish`.

## Requirements

- The `NPM_TOKEN` secret must be set in the repository settings (used as `NODE_AUTH_TOKEN`).
- Package name on npm: `shibbir`.
