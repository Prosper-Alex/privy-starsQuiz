// =============================
//  CATEGORY FETCH + RENDER
// =============================

// Insert your API key here
const API_KEY = "LaMCPmyqzidHhv6CQOunBMcBMQSqx4SOHE3Ze3jE";
const CATEGORY_URL = `https://quizapi.io/api/v1/categories?apiKey=${API_KEY}`;

// Element references
const desktopContainer = document.getElementById("desktop-categories");
const mobileContainer = document.getElementById("mobile-categories");

// Fetch categories
async function loadCategories() {
  try {
    const res = await fetch(CATEGORY_URL);
    const categories = await res.json();

    renderDesktop(categories);
    renderMobile(categories);
  } catch (err) {
    console.error("Error loading categories:", err);
    desktopContainer.innerHTML = `<p class="text-center text-red-400">Failed to load categories.</p>`;
  }
}

loadCategories();

// =============================
//  RENDER DESKTOP
// =============================
function renderDesktop(categories) {
  desktopContainer.innerHTML = "";

  categories.forEach((name) => {
    const color = pickColor();

    const card = document.createElement("div");
    card.className =
      "ultra-card sweep-hover cursor-pointer flex flex-col items-center justify-center text-center";

    card.innerHTML = `
      <iconify-icon
        icon="mdi:book-education-outline"
        class="${color} text-5xl mb-4"
      ></iconify-icon>

      <h3 class="text-xl font-semibold ${color}">${name}</h3>
      <p class="text-sm text-base-content/70">Start quiz on ${name}</p>
    `;

    card.addEventListener("click", () => selectCategory(name));
    desktopContainer.appendChild(card);
  });
}

// =============================
//  RENDER MOBILE
// =============================
function renderMobile(categories) {
  mobileContainer.innerHTML = "";

  categories.forEach((name) => {
    const color = pickColor();

    const card = document.createElement("article");
    card.className =
      "glass-box article-card sweep-hover text-center p-5 cursor-pointer";

    card.innerHTML = `
      <iconify-icon
        icon="mdi:book-education-outline"
        class="${color} text-4xl mb-3"
      ></iconify-icon>

      <h3 class="text-lg font-semibold ${color}">${name}</h3>
      <p class="text-sm text-base-content/70">Start quiz on ${name}</p>
    `;

    card.onclick = () => selectCategory(name);
    mobileContainer.appendChild(card);
  });
}

// =============================
//  Save Category → Redirect
// =============================
function selectCategory(name) {
  localStorage.setItem("selectedCategory", name);
  window.location.href = "quiz.html";
}

// =============================
//  Color Selector
// =============================
function pickColor() {
  const colors = ["text-primary", "text-accent", "text-info", "text-warning"];
  return colors[Math.floor(Math.random() * colors.length)];
}
