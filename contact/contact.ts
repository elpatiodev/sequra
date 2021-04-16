window.addEventListener('submit', (e: Event) => {
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;
  const endpoint = form.dataset.endpoint;
  if (!endpoint) return;
  const body: { [x: string]: string | undefined } = {};
  const elements = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-name]');

  for (const element of elements) {
    const datasetName = element.dataset.name;
    if (!datasetName) continue;
    let value: string | undefined;

    switch (element.type) {
      case 'checkbox':
        if (!(element instanceof HTMLInputElement)) break;
        value = element.checked ? element.dataset.checkedValue : element.dataset.uncheckedValue;
        break;

      case 'radio':
        const checkedOption = form.querySelector(`input[name="${element.name}"]:checked`);
        if (checkedOption instanceof HTMLInputElement) value = checkedOption.value;
        break;

      default:
        value = element.value;
        break;
    }

    body[datasetName] = value;
  }

  try {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
});
