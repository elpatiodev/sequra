"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var filtersTitle = document.querySelector('#filters-title');
    var filtersAll = document.querySelector('.filter-by-all');
    var filters = document.querySelectorAll('.filter-by-text');
    if (!filtersTitle || !filtersAll || !filters.length)
        return;
    var defaultText = filtersTitle.textContent;
    filtersAll.addEventListener('click', setDefaultText);
    filters.forEach(function (filter) {
        filter.addEventListener('click', function () {
            var _a;
            var active = (_a = filter.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('fltr-active');
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
