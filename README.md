# AutoDoc-Hook

A **Kiro Hook** that automatically keeps your project documentation up to date.
Every time you save a source file (`.js`, `.ts`, `.jsx`, `.tsx`, `.py`), the hook
runs a Node.js script that counts your files and lines of code, then writes the
results directly into this README.

---

## How It Works

```
You save a file
      │
      ▼
Kiro detects fileEdited event
      │
      ▼
.kiro/hooks/autodoc.js runs
      │
      ├─ Walks the project tree
      ├─ Counts source files & lines of code
      ├─ Updates README.md → "Auto Generated Project Status"
      └─ Prints a summary banner to the terminal
```

---

## Project Structure

```
AutoDoc-Hook/
├── .kiro/
│   └── hooks/
│       ├── autodoc-hook.json   ← Kiro Hook configuration
│       └── autodoc.js          ← Hook script (pure Node.js)
├── src/
│   └── index.js                ← Sample source file (edit this to trigger the hook)
├── package.json
└── README.md                   ← This file (auto-updated by the hook)
```

---

## Getting Started

1. Open this folder in Kiro.
2. Edit and save any file matching `*.js`, `*.ts`, `*.jsx`, `*.tsx`, or `*.py`.
3. Watch this README update automatically.

To trigger the hook manually from a terminal:

```bash
node .kiro/hooks/autodoc.js
```

---

## Configuration

The hook is defined in `.kiro/hooks/autodoc-hook.json`.
Edit the `patterns` array to add or remove file extensions you want to watch.

---

## Auto Generated Project Status

| Field               | Value                                        |
|---------------------|----------------------------------------------|
| **Last Updated**    | 2026-07-14 02:46:15 UTC                    |
| **Changed File**    | `<unknown — run manually>`                           |
| **Total Files**     | 3                          |
| **Source Files**    | 1                         |
| **Total Lines**     | 29                          |
| **Status**          | ✅ Documentation generated automatically using Kiro Hook. |

> This section is overwritten automatically each time a source file is saved.
