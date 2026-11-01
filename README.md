# KIRO-BIRTHDAY

A small Node.js birthday-project sample. The repository currently contains a
single executable source file and a minimal package manifest; it does **not**
currently contain the `.kiro/hooks` files described by earlier documentation.

## What is here

`src/index.js` defines and demonstrates four synchronous helpers:

- `greet(name)` — returns a greeting.
- `add(a, b)` — adds two values.
- `formatDate(date)` — formats a date as `YYYY-MM-DD`.
- `multiply(a, b)` — multiplies two values.

The module calls these functions from its top-level entry point and prints the
results to standard output. It does not expose an HTTP API, persist data, or
read environment variables.

## Requirements and usage

- Node.js 14 or newer (declared in `package.json`).

```bash
npm install
npm start
```

`npm start` runs `node src/index.js`. The manifest also provides:

```bash
npm run doc
```

That command currently points to `.kiro/hooks/autodoc.js`, which is not present
in the repository, so it will fail until that hook is added.

## Layout

```text
src/index.js   # sample functions and console entry point
package.json   # npm metadata and scripts
README.md      # project documentation
```

## Status and limitations

This is a minimal sample rather than a production service. There are no tests,
lint configuration, build step, CI workflow, or deployment definition. The
source contains an unreachable stray token after the `formatDate` return; it
does not affect the documented execution path but should be removed before
extending the sample.

## License

`package.json` declares the MIT license.
