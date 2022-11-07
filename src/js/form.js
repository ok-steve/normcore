/**
 * Disable submission when form not configured with a method attribute. Assumes
 * form is being used for in-page data.
 */

document.querySelectorAll('form:not([method])').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});
