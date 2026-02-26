#!/usr/bin/env node
/**
 * Dump only the "needed" files into dump-needed/ and also create dump-needed.txt.
 *
 * Usage:
 *   node scripts/dump-needed.mjs
 *   node scripts/dump-needed.mjs --out dump-needed
 */

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const outArgIdx = args.indexOf("--out");
const OUT_DIR =
  outArgIdx !== -1 && args[outArgIdx + 1] ? args[outArgIdx + 1] : "dump-needed";

const ROOT = process.cwd();
const outDirAbs = path.join(ROOT, OUT_DIR);
const outTxtAbs = path.join(ROOT, `${OUT_DIR}.txt`);

const INCLUDE_PATHS = [
  // App source
  "client/src",
  "client/index.html",
  "client/api-sim.css",
  "client/app.js",
  "client/help-content.html",
  "client/public/config/config.json",
  "client/tsconfig.json",

  // Build/server config
  "server.js",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js",
  "package.json",
  "tsconfig.json",

  // Docs (small)
  "AGENTS.md",
  "BESPOKE-TEMPLATE.md",

  // Optional: just the DS agent guidelines (NOT the whole DS)
  "client/design-system/agents.md",
];

const EXCLUDE_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  ".vite",
  ".cache",
  "coverage",
  "deps",
  ".api-sim-data",
  ".api-sim",
]);

const EXCLUDE_EXTS = new Set([
  ".woff",
  ".woff2",
  ".ttf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".mp4",
  ".mov",
]);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function isExcludedPath(relPath) {
  const parts = relPath.split(path.sep);
  if (parts.some((p) => EXCLUDE_DIRS.has(p))) return true;
  const ext = path.extname(relPath).toLowerCase();
  if (EXCLUDE_EXTS.has(ext)) return true;
  return false;
}

function listFilesRecursively(absPath, relBase) {
  const stat = fs.statSync(absPath);
  if (stat.isFile()) return [{ abs: absPath, rel: relBase }];

  if (!stat.isDirectory()) return [];

  const entries = fs.readdirSync(absPath, { withFileTypes: true });
  const files = [];

  for (const e of entries) {
    const childAbs = path.join(absPath, e.name);
    const childRel = path.join(relBase, e.name);
    if (isExcludedPath(childRel)) continue;

    if (e.isDirectory()) {
      files.push(...listFilesRecursively(childAbs, childRel));
    } else if (e.isFile()) {
      files.push({ abs: childAbs, rel: childRel });
    }
  }

  return files;
}

function copyFileToOut(file) {
  const destAbs = path.join(outDirAbs, file.rel);
  ensureDir(path.dirname(destAbs));
  fs.copyFileSync(file.abs, destAbs);
}

function safeReadText(absPath) {
  // Only treat common text/code as text
  const ext = path.extname(absPath).toLowerCase();
  const textExts = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".mjs",
    ".cjs",
    ".json",
    ".css",
    ".html",
    ".md",
    ".yml",
    ".yaml",
    ".txt",
  ]);
  if (!textExts.has(ext)) return null;

  try {
    return fs.readFileSync(absPath, "utf8");
  } catch {
    return null;
  }
}

function main() {
  // clean output dir
  if (fs.existsSync(outDirAbs))
    fs.rmSync(outDirAbs, { recursive: true, force: true });
  ensureDir(outDirAbs);

  const allFiles = [];

  for (const rel of INCLUDE_PATHS) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;

    if (isExcludedPath(rel)) continue;

    const stat = fs.statSync(abs);
    if (stat.isFile()) {
      allFiles.push({ abs, rel });
    } else if (stat.isDirectory()) {
      allFiles.push(...listFilesRecursively(abs, rel));
    }
  }

  // Copy files
  for (const f of allFiles) copyFileToOut(f);

  // Build a single text dump for chat pasting
  let out = "";
  for (const f of allFiles) {
    const text = safeReadText(f.abs);
    if (text == null) continue;

    out += `\n\n===== FILE: ${f.rel} =====\n`;
    out += text;
    if (!text.endsWith("\n")) out += "\n";
  }

  fs.writeFileSync(outTxtAbs, out, "utf8");

  console.log(`✅ Copied ${allFiles.length} files into: ${OUT_DIR}/`);
  console.log(`✅ Wrote combined text dump: ${path.basename(outTxtAbs)}`);
}

main();
