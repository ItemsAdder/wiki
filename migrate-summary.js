// migrate-summary.js
const fs = require("fs");
const path = require("path");

const summaryPath = path.join(__dirname, "SUMMARY.md.old");
const docsJsonPath = path.join(__dirname, "docs.json");

// Parsing riga tipo "* [Titolo](link)"
function parseLinkLine(line) {
  const regex = /^\s*\*\s*\[([^\]]+)\]\(([^)]+)\)/;
  const match = line.match(regex);
  if (match) {
    return {
      title: match[1].trim(),
      link: match[2].trim()
    };
  }
  return null;
}

// Costruisce la struttura
function buildNavigation(lines) {
  const allGroups = [];
  let currentSuperGroup = "";
  let currentNodes = [];
  let stack = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Intestazione #, ##, ###
    const headerMatch = line.match(/^\s*#+\s+(.*)/);
    if (headerMatch) {
      // Se stavamo accumulando nodi nel vecchio super gruppo, salviamo
      if (currentNodes.length) {
        allGroups.push({
          group: currentSuperGroup,
          nodes: [...currentNodes]
        });
      }
      currentSuperGroup = headerMatch[1].trim();
      currentNodes = [];
      stack = [];
      return;
    }

    const indent = line.search(/\S/);
    const parsed = parseLinkLine(line);
    if (!parsed) return;

    // Remove .md extension
    let cleanLink = parsed.link;
    if (cleanLink.endsWith(".md")) {
      cleanLink = cleanLink.slice(0, -3);
    }

    const node = {
      title: parsed.title,
      link: cleanLink,
      children: []
    };

    if (indent === 0) {
      currentNodes.push(node);
      stack = [{ indent, node }];
    } else {
      while (stack.length && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1];
      if (!parent) {
        console.warn(`⚠️  Skipping orphan node "${node.title}" (no parent found)`);
        return;
      }
      parent.node.children.push(node);
      stack.push({ indent, node });
    }
  });

  // Aggiungi l'ultimo gruppo se non vuoto
  if (currentNodes.length) {
    allGroups.push({
      group: currentSuperGroup,
      nodes: currentNodes
    });
  }

  return allGroups;
}

// Conversione gruppi in navigation.groups
function convertToNavigationGroups(allGroups) {
  return allGroups.map((grp) => {
    return {
      group: grp.group,
      pages: convertNodes(grp.nodes)
    };
  });
}

// Conversione ricorsiva nodi
function convertNodes(children) {
    return children
        .filter((c) => !c.link.startsWith("http") && c.link.toLowerCase() !== "readme")
        .map((c) => {
            if (c.children.length) {
                return {
                    group: c.title,
                    pages: convertNodes(c.children)
                };
            } else {
                return c.link;
            }
        });
}

// Main
function main() {
  const lines = fs.readFileSync(summaryPath, "utf-8").split(/\r?\n/);
  const allGroups = buildNavigation(lines);
  const navGroups = convertToNavigationGroups(allGroups);

  const docsJson = JSON.parse(fs.readFileSync(docsJsonPath, "utf-8"));
  if (!docsJson.navigation) docsJson.navigation = {};
  docsJson.navigation.groups = navGroups;

  fs.writeFileSync(
    docsJsonPath,
    JSON.stringify(docsJson, null, 2),
    "utf-8"
  );

  console.log("✅ docs.json aggiornato con i nuovi gruppi (README.md e link esterni ignorati)");
}

main();
