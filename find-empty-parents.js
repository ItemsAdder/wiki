// find-readmes-with-content.js
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname); // Cambia se necessario

function isOnlyTitleAndFrontmatter(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "");

  if (lines.length === 0) return true;

  let idx = 0;

  // Frontmatter block
  if (lines[idx] === "---") {
    idx++;
    while (idx < lines.length && lines[idx] !== "---") {
      idx++;
    }
    if (idx >= lines.length) {
      // Malformed frontmatter, treat as content
      return false;
    }
    idx++; // Skip closing ---
  }

  // Next non-empty line should be the title
  if (idx >= lines.length) return true;

  const firstLine = lines[idx];
  if (!firstLine.startsWith("# ")) {
    // No heading? Means content
    return false;
  }
  idx++;

  // Any remaining non-empty lines mean content
  while (idx < lines.length) {
    if (lines[idx] !== "") {
      return false;
    }
    idx++;
  }

  return true;
}

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase() === "readme.md"
    ) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (!isOnlyTitleAndFrontmatter(content)) {
        console.log(`⚠️ Extra content: ${fullPath}`);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(rootDir)) {
    console.error(`Directory not found: ${rootDir}`);
    process.exit(1);
  }
  processDir(rootDir);
  console.log("✅ Scan complete.");
}

main();
