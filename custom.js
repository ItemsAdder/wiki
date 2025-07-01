function updateMintlifyLinks() {
  const isIndex = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
  document.querySelectorAll('a').forEach(a => {
    if (a.textContent.trim() === "Powered by Mintlify") {
      if (!isIndex) {
        a.style.fontSize = "0.7em";
        a.style.fontWeight = "normal";
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

// Inject Google AdSense script asynchronously
const adsenseScript = document.createElement('script');
adsenseScript.async = true;
adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1599021797146517';
adsenseScript.crossOrigin = 'anonymous';
document.head.appendChild(adsenseScript);