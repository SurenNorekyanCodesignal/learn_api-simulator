const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = "currentProjectFiles.txt";

// folders to ignore
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".vite",
  ".idea",
  ".DS_Store",
]);

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.has(file)) {
        walk(fullPath, fileList);
      }
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function dumpFiles() {
  const projectRoot = process.cwd();
  const files = walk(projectRoot);

  const output = files.map((file) => {
    const relativePath = path.relative(projectRoot, file);
    let content;

    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      content = "[Binary file skipped]";
    }

    return `\n\n==============================\nFILE: ${relativePath}\n==============================\n${content}`;
  });

  fs.writeFileSync(OUTPUT_FILE, output.join("\n"));
  console.log(`✅ Project dumped into ${OUTPUT_FILE}`);
}

dumpFiles();
