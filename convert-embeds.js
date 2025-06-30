// convert-embeds.js
const fs = require("fs");
const path = require("path");

const docsDir = path.join(__dirname); // Cambia se la cartella è diversa

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Embed YouTube o generico (cattura eventuali attributi extra)
  content = content.replace(
    /\{\%\s*embed\s+url="([^"]+)"[^\}]*\%\}/g,
    (match, url) => `\n<Video url="${url}" />\n`
  );

  // Headings with <a>
  content = content.replace(
    /(#+\s.*?)(\s*<a\s+href="[^"]+"\s+id="[^"]+"\s*><\/a>)/g,
    (match, heading) => `${heading}`
  );

  // Hint blocks
  content = content.replace(
    /\{\%\s*hint\s+style="(info|success|warning|danger)"\s*\%\}([\s\S]*?)\{\%\s*endhint\s*\%\}/g,
    (match, style, inner) => {
      let component = "Note";
      if (style === "warning" || style === "danger") component = "Warning";
      const cleanInner = inner.trim();
      return `\n<${component}>\n${cleanInner}\n</${component}>\n`;
    }
  );

  // Code blocks with title and language
  content = content.replace(
    /\{\%\s*code\s+title="([^"]+)"\s*\%\}\s*```(\w+)\s*([\s\S]*?)```[\s]*\{\%\s*endcode\s*\%\}/g,
    (match, title, lang, code) => {
      const cleanCode = code.trim();
      return `\n\`\`\`${lang} ${title} lines icon="${lang}"\n${cleanCode}\n\`\`\`\n`;
    }
  );

  // Code blocks with title but NO language
  content = content.replace(
    /\{\%\s*code\s+title="([^"]+)"\s*\%\}\s*```([\s\S]*?)```[\s]*\{\%\s*endcode\s*\%\}/g,
    (match, title, code) => {
      const cleanCode = code.trim();
      return `\n\`\`\`text ${title} lines icon="text"\n${cleanCode}\n\`\`\`\n`;
    }
  );

  // Page-ref
  content = content.replace(
    /\{\%\s*page-ref\s+page="([^"]+)"\s*\%\}/g,
    (match, page) => {
      return `\n[See page](${page})\n`;
    }
  );

  // GitHub code block - remove
  content = content.replace(
    /\{\%\s*@github-files\/github-code-block\s*\%\}/g,
    ""
  );

  // File download without text
  content = content.replace(
    /\{\%\s*file\s+src="([^"]+)"\s*\%\}/g,
    (match, src) => {
      return `\n[Download file](${src})\n`;
    }
  );

  // File download with text
  content = content.replace(
    /\{\%\s*file\s+src="([^"]+)"\s*\%\}([\s\S]*?)\{\%\s*endfile\s*\%\}/g,
    (match, src, inner) => {
      return `\n[Download file](${src})\n\n${inner.trim()}\n`;
    }
  );

  // Content-ref blocks
  content = content.replace(
    /\{\%\s*content-ref\s+url="([^"]+)"\s*\%\}\s*\[([^\]]+)\]\([^)]+\)\s*\{\%\s*endcontent-ref\s*\%\}/g,
    (match, url, label) => {
      const href = url.endsWith("/") ? url : `${url}/`;
      const title = label.trim();
      return `\n<Card title="${title}" icon="text" href="/${href}">\n${title}\n</Card>\n`;
    }
  );

  // Tabs blocks
  content = content.replace(
    /\{\%\s*tabs\s*\%\}([\s\S]*?)\{\%\s*endtabs\s*\%\}/g,
    (match, tabsContent) => {
      const tabRegex = /\{\%\s*tab\s+title="([^"]+)"\s*\%\}([\s\S]*?)\{\%\s*endtab\s*\%\}/g;
      let tabs = [];
      let tabMatch;
      while ((tabMatch = tabRegex.exec(tabsContent)) !== null) {
        const title = tabMatch[1].trim();
        const body = tabMatch[2].trim();
        tabs.push({ title, body });
      }
      if (tabs.length === 0) return "";
      let mdx = `<Tabs>\n`;
      tabs.forEach((tab) => {
        mdx += `  <Tab title="${tab.title}">\n\n${tab.body}\n\n  </Tab>\n`;
      });
      mdx += `</Tabs>\n`;
      return mdx;
    }
  );

  // Fix <br> tags
  content = content.replace(/<br>/g, `<br />`);

  // Fix <figure><img><figcaption></figure> -> <img ... />
  content = content.replace(
    /<figure>\s*<img\s*([^>]+)>\s*<figcaption>.*?<\/figcaption>\s*<\/figure>/g,
    (match, imgAttrs) => `<img ${imgAttrs.trim()} />`
  );

  // Fix <img> tags without /
  content = content.replace(
    /<img\s*([^>]+)(?<!\/)>/g,
    (match, imgAttrs) => `<img ${imgAttrs.trim()} />`
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Processed: ${filePath}`);
}

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      processFile(fullPath);
    }
  }
}

function main() {
  if (!fs.existsSync(docsDir)) {
    console.error(`Directory not found: ${docsDir}`);
    process.exit(1);
  }
  processDir(docsDir);
  console.log("✅ Conversion complete.");
}

main();
