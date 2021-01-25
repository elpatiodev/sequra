document.addEventListener('DOMContentLoaded', () => {
  const filtersTitle = document.querySelector<HTMLElement>('#filters-title');
  const filtersAll = document.querySelector<HTMLElement>('.filter-by-all');
  const filters = document.querySelectorAll<HTMLElement>('.filter-by-text');
  if (!filtersTitle || !filtersAll || !filters.length) return;

  // Store default text
  const defaultText = filtersTitle.textContent;

  // Listen events
  filtersAll.addEventListener('click', setDefaultText);

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const active = filter.parentElement?.classList.contains('fltr-active');
      if (active) setDefaultText();
      else filtersTitle.textContent = filter.textContent;
    });
  });

  // Functions
  function setDefaultText() {
    if (!defaultText) return;
    filtersTitle!.textContent = defaultText;
  }
});
