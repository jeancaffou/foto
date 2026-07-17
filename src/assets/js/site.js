const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const pressSection = document.querySelector("[data-press]");

if (pressSection) {
  const cards = Array.from(pressSection.querySelectorAll("[data-press-card]"));
  const pager = pressSection.querySelector("[data-press-pager]");
  const previousButton = pressSection.querySelector("[data-press-prev]");
  const nextButton = pressSection.querySelector("[data-press-next]");
  const pageLabel = pressSection.querySelector("[data-press-page]");
  const totalLabel = pressSection.querySelector("[data-press-total]");
  const pageSize = Number.parseInt(pressSection.dataset.pageSize, 10) || 4;
  const totalPages = Math.ceil(cards.length / pageSize);
  let currentPage = 0;

  const formatPage = (value) => String(value).padStart(2, "0");

  const renderPressPage = () => {
    const firstIndex = currentPage * pageSize;
    const lastIndex = firstIndex + pageSize;

    cards.forEach((card, index) => {
      card.hidden = index < firstIndex || index >= lastIndex;
    });

    if (pageLabel) pageLabel.textContent = formatPage(currentPage + 1);
    if (totalLabel) totalLabel.textContent = formatPage(totalPages);
    if (previousButton) previousButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage === totalPages - 1;
  };

  if (totalPages > 1 && pager) {
    pager.hidden = false;
    previousButton?.addEventListener("click", () => {
      currentPage = Math.max(0, currentPage - 1);
      renderPressPage();
    });
    nextButton?.addEventListener("click", () => {
      currentPage = Math.min(totalPages - 1, currentPage + 1);
      renderPressPage();
    });
    renderPressPage();
  }
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
