const fs = require("fs");
const path = require("path");

const dir = "./"; // Cambia se necessario

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

  // Regex che prende i Card con href YouTube
  const regex = /<Card\s+[^>]*href="(https:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)([^"]+))"[^>]*><\/Card>/g;

  content = content.replace(regex, (match, url, videoId) => {
    let finalId = videoId;

    // Se è un link watch?v=, estrai id
    if (url.includes("watch?v=")) {
      const params = new URLSearchParams(url.split("?")[1]);
      finalId = params.get("v");
    }

    const embedUrl = `https://www.youtube.com/embed/${finalId}`;

    return `<Frame>
  <iframe 
    className="w-full aspect-video rounded-xl" 
    src="${embedUrl}" 
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen 
  />
</Frame>`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Processed: ${filePath}`);
}

processDirectory(dir);
