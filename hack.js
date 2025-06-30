document.querySelectorAll('a').forEach(a => {
  if (a.textContent.trim() === "Powered by Mintlify") {
    a.style.fontSize = "0.7em";
  }
});