const WIKI_INDEX = [
  {
    title: "Home - Powers of The Void",
    url: "index.html",
    keywords: "wiki introduction origins progression mechanics advancements leveling ascension"
  },
  {
    title: "Origins",
    url: "origins.html",
    keywords: "origins lore abilities resources passives custom entries"
  },
  {
    title: "Ascensions",
    url: "ascensions.html",
    keywords: "ascension system tiers progression leveling"
  },
  {
    title: "Key Terms",
    url: "key-terms.html",
    keywords: "key terms definitions glossary mechanics"
  },
  {
    title: "Resources",
    url: "resources.html",
    keywords: "resources items crafting materials"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wiki-search-form");
  const input = document.getElementById("wiki-search-input");
  const resultsBox = document.getElementById("wiki-search-results");

  if (!form || !input || !resultsBox) return;

  function getMatches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return WIKI_INDEX.filter(
      (page) =>
        page.title.toLowerCase().includes(q) ||
        page.keywords.toLowerCase().includes(q)
    );
  }

  function renderDropdown(query) {
    const q = query.trim();
    if (!q) {
      resultsBox.hidden = true;
      return;
    }

    const matches = getMatches(q);
    resultsBox.hidden = false;

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div class="search-empty">No pages matching "<strong>${q}</strong>"</div>`;
      return;
    }

    resultsBox.innerHTML = matches
      .map(
        (page) => `
        <a href="${page.url}?q=${encodeURIComponent(q)}" class="search-result-item">
          <div class="search-result-title">${page.title}</div>
          <div class="search-result-snippet">Matching topics: ${page.keywords}</div>
        </a>
      `
      )
      .join("");
  }

  input.addEventListener("input", () => renderDropdown(input.value));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    const matches = getMatches(q);
    if (matches.length > 0) {
      window.location.href = `${matches[0].url}?q=${encodeURIComponent(q)}`;
    } else {
      renderDropdown(q);
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
      resultsBox.hidden = true;
    }
  });

  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("q");
  if (searchTerm) {
    input.value = searchTerm;
    window.find(searchTerm);
  }
});
