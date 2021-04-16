"use strict";
window.Webflow = window.Webflow || [];
Webflow.push(function () {
    const handleHash = () => {
        const { hash } = window.location;
        const [cleanHash] = hash.split('?');
        const tabQuery = cleanHash.substr(1);
        const tabLink = document.querySelector(`[data-w-tab="${tabQuery}"]`);
        if (tabLink)
            tabLink.click();
    };
    document.addEventListener('hashchange', handleHash);
    handleHash();
});
