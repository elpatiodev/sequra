'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var ENDPOINT = '';
  var form = document.querySelector('form');
  if (!form) return;
  var termsCheckbox = form.querySelector('[name="terms"]');
  var handleSubmit = function (e) {
    var formData = new FormData(form);
    var body = {};
    formData.forEach(function (value, key) {
      return (body[key] = value);
    });
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
