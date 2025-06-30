// migrate-summary.js
const fs = require("fs");
const path = require("path");

const summaryPath = path.join(__dirname, "SUMMARY.md");
const docsJsonPath = path.join(__dirname, "docs.json");

function parseLine(line) {
  const regex = /^\s*\*\s*\[([^\]]+)\]\(([^)]+)\)/;
  const match = line.match(regex);
  if (match) {
    const url = match[2].trim();
    if (url.startsWith("http")) {
      // IGNORA link esterni
      return null;
    }
    return {
      title: match[1].trim(),
      link: url.replace(/\.md$/, "")
    };
  }
  return null;
}

function buildNavigation(lines) {
  const stack = [];
  const root = [];
  let current = root;
  let prevIndent = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("*")) {
      const indent = line.search(/\S/);
      const item = parseLine(line);
      if (!item) return;

      const node = { title: item.title, link: item.link, children: [] };

      if (indent === prevIndent) {
        current.push(node);
      } else if (indent > prevIndent) {
        stack.push(current);
        current = current[current.length - 1].children;
        current.push(node);
      } else {
        while (stack.length && indent < prevIndent) {
          current = stack.pop();
          prevIndent -= 2;
        }
        current.push(node);
      }
      prevIndent = indent;
    }
  });

  return root;
}

function convertToMintlifyGroup(items) {
  return items.map((item) => {
    if (item.children && item.children.length) {
      return {
        group: item.title,
        pages: convertToMintlifyGroup(item.children)
      };
    } else {
      return item.link;
    }
  });
}

function main() {
  if (!fs.existsSync(summaryPath)) {
    console.error(`File not found: ${summaryPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(docsJsonPath)) {
    console.error(`File not found: ${docsJsonPath}`);
    process.exit(1);
  }

  const lines = fs.readFileSync(summaryPath, "utf-8").split(/\r?\n/);
  const tree = buildNavigation(lines);
  const newGroup = {
    group: "Table of Contents",
    icon: "book",
    pages: convertToMintlifyGroup(tree)
  };

  const docsJson = JSON.parse(fs.readFileSync(docsJsonPath, "utf-8"));

  // Se navigation o groups non esistono, li creiamo
  if (!docsJson.navigation) docsJson.navigation = {};
  if (!docsJson.navigation.groups) docsJson.navigation.groups = [];

  // Sostituisci SOLO il primo groups[0]
  docsJson.navigation.groups[0] = newGroup;

  fs.writeFileSync(docsJsonPath, JSON.stringify(docsJson, null, 2));
  console.log(`✅ Updated ${docsJsonPath} (external links skipped)`);
}

main();
