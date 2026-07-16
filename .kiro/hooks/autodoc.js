/**
 * .kiro/hooks/autodoc.js
 * ----------------------
 * AutoDoc Hook Script
 *
 * This script is executed by Kiro whenever a supported source file is saved
 * (*.js, *.ts, *.jsx, *.tsx, *.py).
 *
 * What it does:
 *   1. Reads the KIRO_CHANGED_FILE environment variable to identify which file changed.
 *   2. Walks the project directory to count total files, source files, and lines of code.
 *   3. Updates (or creates) README.md with an "Auto Generated Project Status" section.
 *   4. Prints a formatted banner to stdout.
 *
 * Uses ONLY Node.js built-in modules — no external dependencies required.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Extensions treated as "source files" for counting purposes. */
const SOURCE_EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.py']);

/** Directories to skip while walking the file tree. */
const IGNORE_DIRS = new Set(['node_modules', '.git', '.kiro', 'dist', 'build', 'coverage', '__pycache__']);

/** The README file to update (relative to project root). */
const README_FILENAME = 'README.md';

/** The heading that marks the auto-generated block inside README.md. */
const SECTION_HEADING = '## Auto Generated Project Status';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively walk a directory and return an array of absolute file paths.
 * Skips entries listed in IGNORE_DIRS.
 *
 * @param {string} dir  - Absolute path to the directory to walk.
 * @returns {string[]}  - List of absolute file paths found.
 */
function walkDir(dir) {
  let results = [];

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (_) {
    // If we can't read a directory, skip it silently.
    return results;
  }

  for (const entry of entries) {
    // Skip ignored directories
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        results = results.concat(walkDir(path.join(dir, entry.name)));
      }
      continue;
    }

    if (entry.isFile()) {
      results.push(path.join(dir, entry.name));
    }
  }

  return results;
}

/**
 * Count the number of non-empty lines in a file.
 * Returns 0 if the file cannot be read.
 *
 * @param {string} filePath - Absolute path to the file.
 * @returns {number}
 */
function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Count lines that contain at least one non-whitespace character
    return content.split('\n').filter(line => line.trim().length > 0).length;
  } catch (_) {
    return 0;
  }
}

/**
 * Gather project statistics by walking the project root.
 *
 * @param {string} projectRoot - Absolute path to the project root.
 * @returns {{ totalFiles: number, sourceFiles: number, totalLines: number }}
 */
function gatherStats(projectRoot) {
  const allFiles = walkDir(projectRoot);

  let sourceFiles = 0;
  let totalLines  = 0;

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (SOURCE_EXTENSIONS.has(ext)) {
      sourceFiles++;
      totalLines += countLines(file);
    }
  }

  return {
    totalFiles:  allFiles.length,
    sourceFiles,
    totalLines,
  };
}

/**
 * Build the content string for the auto-generated section.
 *
 * @param {string} changedFile - Path of the file that triggered the hook.
 * @param {object} stats       - Stats object from gatherStats().
 * @returns {string}
 */
function buildSection(changedFile, stats) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  return [
    SECTION_HEADING,
    '',
    `| Field               | Value                                        |`,
    `|---------------------|----------------------------------------------|`,
    `| **Last Updated**    | ${now}                    |`,
    `| **Changed File**    | \`${changedFile}\`                           |`,
    `| **Total Files**     | ${stats.totalFiles}                          |`,
    `| **Source Files**    | ${stats.sourceFiles}                         |`,
    `| **Total Lines**     | ${stats.totalLines}                          |`,
    `| **Status**          | ✅ Documentation generated automatically using Kiro Hook. |`,
    '',
    '> This section is overwritten automatically each time a source file is saved.',
    '',
  ].join('\n');
}

/**
 * Update (or create) README.md.
 *
 * - If README.md already contains the section heading, the existing section
 *   (from the heading to the next top-level heading or end of file) is replaced.
 * - If README.md does not contain the section, the new section is appended.
 * - If README.md does not exist at all, it is created from scratch.
 *
 * @param {string} readmePath  - Absolute path to README.md.
 * @param {string} newSection  - The new auto-generated section text.
 */
function updateReadme(readmePath, newSection) {
  // ---- Create README if missing ----
  if (!fs.existsSync(readmePath)) {
    const initial = [
      '# AutoDoc-Hook',
      '',
      'This project uses a Kiro Hook to keep documentation up to date automatically.',
      '',
      newSection,
    ].join('\n');

    fs.writeFileSync(readmePath, initial, 'utf8');
    return;
  }

  // ---- README exists — replace or append the section ----
  let existing = fs.readFileSync(readmePath, 'utf8');

  const sectionStart = existing.indexOf(SECTION_HEADING);

  if (sectionStart === -1) {
    // Section not found — append it
    const separator = existing.endsWith('\n') ? '' : '\n';
    existing = existing + separator + '\n' + newSection;
  } else {
    // Section found — find where it ends (next ## heading or EOF)
    const afterHeading = existing.indexOf('\n## ', sectionStart + SECTION_HEADING.length);
    const sectionEnd   = afterHeading === -1 ? existing.length : afterHeading;

    existing =
      existing.slice(0, sectionStart) +
      newSection +
      existing.slice(sectionEnd);
  }

  fs.writeFileSync(readmePath, existing, 'utf8');
}

/**
 * Print the hook banner to stdout.
 *
 * @param {string} changedFile
 */
function printBanner(changedFile) {
  const line = '='.repeat(48);
  console.log(line);
  console.log('        Kiro Hook Triggered');
  console.log(line);
  console.log(`Changed File : ${changedFile}`);
  console.log('README       : Updated Successfully ✅');
  console.log(line);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(function main() {
  // Kiro sets KIRO_CHANGED_FILE to the workspace-relative path of the saved file.
  // Fall back to a placeholder when the script is run manually.
  const changedFile = process.env.KIRO_CHANGED_FILE || '<unknown — run manually>';

  // Resolve the project root as the directory containing package.json.
  // __dirname here is  <project>/.kiro/hooks/, so we go up two levels.
  const projectRoot = path.resolve(__dirname, '..', '..');
  const readmePath  = path.join(projectRoot, README_FILENAME);

  // Gather stats
  const stats = gatherStats(projectRoot);

  // Build the new documentation section
  const section = buildSection(changedFile, stats);

  // Write README
  updateReadme(readmePath, section);

  // Print banner
  printBanner(changedFile);
})();
