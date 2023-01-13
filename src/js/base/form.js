/**
 * Disable submission when form not configured with a method attribute. Assumes
 * form is being used for in-page data.
 */

document.addEventListener('submit', (e) => {
  if (e.target.matches('form:not([method]):not([action])')) {
    e.preventDefault();
  }
});
