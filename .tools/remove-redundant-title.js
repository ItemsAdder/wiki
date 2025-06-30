const fs = require("fs");
const path = require("path");

const directory = "./"; // Radice, cambiala se serve

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ricorsione
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      processFile(fullPath, entry.name);
    }
  });
}

function processFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  const fileNameBase = path.basename(fileName, ".mdx")
    .toLowerCase()
    .replace(/_/g, "-");

  let firstHeaderIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("# ")) {
      firstHeaderIndex = i;
      const headerText = line.slice(2).trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      if (headerText === fileNameBase) {
        // Rimuovi l'header e l'eventuale riga vuota sopra
        if (i > 0 && lines[i - 1].trim() === "") {
          lines.splice(i - 1, 2);
        } else {
          lines.splice(i, 1);
        }
      }
      break;
    }
  }

  const updatedContent = lines.join("\n");
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(`Processed: ${filePath}`);
}

// Avvia la scansione ricorsiva
processDirectory(directory);
