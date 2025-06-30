const fs = require("fs");
const path = require("path");

const dir = "./"; // Puoi cambiare la cartella root

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      processFile(fullPath);
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Regex to find <Card ...> tags that do NOT already have horizontal
  const regex = /<Card([^>]*)(?<!horizontal)(?=>)/g;

  content = content.replace(regex, (match, attrs) => {
    // If "horizontal" is already present, do nothing
    if (/horizontal\b/.test(attrs)) return match;
    // Otherwise, add horizontal before >
    return `<Card${attrs} horizontal`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Processed: ${filePath}`);
}

processDirectory(dir);
