function updateMintlifyLinks() {
  const isIndex = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
  document.querySelectorAll('a').forEach(a => {
    if (a.textContent.trim() === "Powered by Mintlify") {
      if (!isIndex) {
        a.remove();
      }
    }
  });
}

// Initial run
updateMintlifyLinks();

// Observe DOM changes
const observer = new MutationObserver(() => {
  updateMintlifyLinks();
});
observer.observe(document.body, { childList: true, subtree: true });

// Optional: Listen for history navigation (for SPAs)
window.addEventListener('popstate', updateMintlifyLinks);
window.addEventListener('hashchange', updateMintlifyLinks);