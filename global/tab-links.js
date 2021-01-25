"use strict";
window.Webflow = window.Webflow || [];
Webflow.push(function () {
    var handleHash = function () {
        var hash = window.location.hash;
        var tabQuery = hash.substr(1);
        var tabLink = document.querySelector("[data-w-tab=\"" + tabQuery + "\"]");
        if (tabLink)
            tabLink.click();
    };
    document.addEventListener('hashchange', handleHash);
    handleHash();
});
