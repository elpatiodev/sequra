"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const filtersTitle = document.querySelector('#filters-title');
    const filtersAll = document.querySelector('.filter-by-all');
    const filters = document.querySelectorAll('.filter-by-text');
    if (!filtersTitle || !filtersAll || !filters.length)
        return;
    const defaultText = filtersTitle.textContent;
    filtersAll.addEventListener('click', setDefaultText);
    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            var _a;
            const active = (_a = filter.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('fltr-active');
            if (active)
                setDefaultText();
            else
                filtersTitle.textContent = filter.textContent;
        });
    });
    function setDefaultText() {
        if (!defaultText)
            return;
        filtersTitle.textContent = defaultText;
    }
});
