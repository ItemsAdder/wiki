const fs = require("fs");
const path = require("path");

const dir = __dirname;

// Funzione per scegliere l'icona
function pickIcon(content) {
  const lc = content.toLowerCase();
  if (lc.includes("edit")) return "edit";
  if (lc.includes("setup") || lc.includes("install")) return "cog";
  if (lc.includes("faq")) return "question";
  if (lc.includes("troubleshoot") || lc.includes("error")) return "alert";
  return "info";
}

// Funzione ricorsiva per elaborare le cartelle
function processDirectory(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      processDirectory(entryPath);
      return;
    }

    if (path.extname(entry.name) !== ".md") return;
    if (entry.name === "SUMMARY.md") return;

    const content = fs.readFileSync(entryPath, "utf-8").trim();

    if (content.startsWith("---")) {
      console.log(`SKIP: ${entryPath} (already has frontmatter)`);
      return;
    }

    const icon = pickIcon(content);

    const newContent =
`---
icon: ${icon}
---

${content}`;

    fs.writeFileSync(entryPath, newContent, "utf-8");
    console.log(`UPDATED: ${entryPath}`);
  });
}

// Avvia l'elaborazione dalla root
processDirectory(dir);
