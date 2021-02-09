document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = '';
  const form = document.querySelector<HTMLFormElement>('form');
  if (!form) return;
  const termsCheckbox = form.querySelector('[name="terms"]');

  const handleSubmit = (e: Event) => {
    const formData = new FormData(form);
    const body: { [x: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => (body[key] = value));
    if (termsCheckbox) body.terms = body.terms ? 'Aceptado' : 'Rechazado';

    try {
      fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  form.addEventListener('submit', handleSubmit);
});
