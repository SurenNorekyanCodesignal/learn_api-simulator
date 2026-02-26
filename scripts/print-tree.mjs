#!/usr/bin/env node
/**
 * Generates a directory tree and saves it to project-tree.txt
 *
 * Usage:
 *   node scripts/print-tree.mjs
 *   node scripts/print-tree.mjs --depth 8
 *   node scripts/print-tree.mjs --depth 10 --output my-tree.txt
 */

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

const depthArgIdx = args.indexOf("--depth");
const maxDepth =
  depthArgIdx !== -1 && args[depthArgIdx + 1]
    ? Number.parseInt(args[depthArgIdx + 1], 10)
    : 6;

const outputArgIdx = args.indexOf("--output");
const outputFile =
  outputArgIdx !== -1 && args[outputArgIdx + 1]
    ? args[outputArgIdx + 1]
    : "project-tree.txt";

const ROOT = process.cwd();

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
  ".cache",
  ".vite",
  ".DS_Store",
  "coverage",
  ".api-sim-data",
  ".api-sim",
  ".idea",
  ".vscode",
  "deps",
]);

const IGNORE_FILES = new Set([".DS_Store"]);

let output = "";

function isIgnored(name, fullPath, isDir) {
  if (isDir) return IGNORE_DIRS.has(name);
  return IGNORE_FILES.has(name);
}

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function sortEntries(entries) {
  return entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });
}

function printTree(dir, prefix, depth) {
  if (depth > maxDepth) return;

  const entriesRaw = safeReadDir(dir);
  const entries = sortEntries(
    entriesRaw.filter((e) => {
      const fullPath = path.join(dir, e.name);
      return !isIgnored(e.name, fullPath, e.isDirectory());
    }),
  );

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");
    const fullPath = path.join(dir, entry.name);

    output +=
      prefix + connector + entry.name + (entry.isDirectory() ? "/" : "") + "\n";

    if (entry.isDirectory()) {
      printTree(fullPath, nextPrefix, depth + 1);
    }
  });
}

output += path.basename(ROOT) + "/\n";
printTree(ROOT, "", 1);

fs.writeFileSync(outputFile, output, "utf8");

console.log(`✅ Project tree written to ${outputFile}`);
