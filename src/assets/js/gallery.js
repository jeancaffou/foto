(() => {
  const dialog = document.querySelector("[data-lightbox]");
  if (!dialog) return;

  const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  let activeIndex = 0;

  const render = (index) => {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    image.src = item.dataset.full;
    image.alt = item.dataset.alt;
    caption.textContent = item.dataset.caption || "";
    history.replaceState(null, "", `#${item.id}`);
  };

  const open = (index) => {
    render(index);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("lightbox-open");
  };

  const close = () => {
    dialog.close();
    document.body.classList.remove("lightbox-open");
    history.replaceState(null, "", window.location.pathname);
  };

  items.forEach((item, index) => item.addEventListener("click", () => open(index)));
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", close);
  dialog.querySelector("[data-lightbox-previous]").addEventListener("click", () => render(activeIndex - 1));
  dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => render(activeIndex + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("lightbox-open"));
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") render(activeIndex - 1);
    if (event.key === "ArrowRight") render(activeIndex + 1);
  });

  const requestedId = decodeURIComponent(window.location.hash.slice(1));
  const requestedIndex = items.findIndex((item) => item.id === requestedId);
  if (requestedIndex >= 0) open(requestedIndex);
})();
