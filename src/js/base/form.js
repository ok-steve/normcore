// Assumes forms without methods or actions are being used for in-page data.
const FORM_SELECTOR = 'form:not([method]):not([action])';

// Persist form data
['input', 'change'].forEach((eventName) => {
  document.addEventListener(eventName, (e) => {
    if (e.target.matches(FORM_SELECTOR) && e.target.hasAttribute('name')) {
      const data = new FormData(e.target);
      const state = {};

      for (let [key, value] of data.entries()) {
        state[key] = value;
      }

      localStorage.setItem(form.getAttribute('name'), JSON.stringify(state));
    }
  });
});

// Apply saved form data on page load.
document.addEventListener('DOMContentLoaded', (e) => {
  const forms = document.querySelectorAll(FORM_SELECTOR);

  forms.forEach((form) => {
    if (!form.hasAttribute('name')) return;

    const data = localStorage.getItem(form.getAttribute('name'));

    if (!data) return;

    Object.keys(data).forEach((key) => {
      const control = form.elements.namedItem(key);

      if (!control) return;

      control.value = data[key];
    });
  });
});

// Disable normal form submission
document.addEventListener('submit', (e) => {
  if (e.target.matches(FORM_SELECTOR)) {
    e.preventDefault();
  }
});
