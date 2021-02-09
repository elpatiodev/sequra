interface Window {
  Webflow: any;
}

window.Webflow = window.Webflow || [];
Webflow.push(function () {
  const handleHash = () => {
    const { hash } = window.location;
    const [cleanHash] = hash.split('?');
    const tabQuery = cleanHash.substr(1);
    const tabLink = document.querySelector<HTMLAnchorElement>(`[data-w-tab="${tabQuery}"]`);
    if (tabLink) tabLink.click();
  };
  document.addEventListener('hashchange', handleHash);
  handleHash();
});
