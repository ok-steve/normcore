/**
 * A PJAX/Turbolinks inspired router.
 */

/**
 * Utilities
 */

const parser = new DOMParser();

async function fetchDocument(url, mimeType = 'text/html') {
  const response = await fetch(url);
  const text = await response.text();
  return parser.parseFromString(text, mimeType);
}

/**
 * Router
 */

// Diffing the elements would be more robust, but this works.
function mergeHead(headElement) {
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name=description]');
  const canonical = document.querySelector('link[rel=canonical]');

  title.textContent = headElement.querySelector('title').textContent;

  description.textContent = headElement.querySelector(
    'meta[name=description]'
  ).textContent;

  canonical.setAttribute(
    'href',
    headElement.querySelector('link[rel=canonical]').getAttribute('href')
  );
}

async function render(pathname) {
  document.body.setAttribute('data-state', 'exiting');

  const response = await fetchDocument(pathname);

  mergeHead(response.head);

  document.body.replaceWith(response.body);
  document.body.removeAttribute('data-state');
}

function shouldRouteChange(target) {
  return [
    // Target is not a hash
    target.hash === '',
    // Target is not marked as ignored
    !target.hasAttribute('data-router-ignore'),
    // Browser supports push state
    window.history.pushState,
    // Different paths
    target.pathname !== window.location.pathname,
    // Same origin
    target.origin === window.location.origin,
    // Not assets
    target.pathname.search(/\.(xml|css|js|png|jpg|svg)/) === -1,
  ].reduce((prev, curr) => prev && curr);
}

/**
 * Events
 */

let previousUrl = window.location.pathname;

document.addEventListener('click', (e) => {
  const target = e.target.closest('a');

  if (target !== null) {
    previousUrl = window.location.pathname;

    if (shouldRouteChange(target)) {
      window.history.pushState(null, null, target.pathname);
      render(target.pathname);
      e.preventDefault();
    }
  }
});

window.addEventListener('popstate', (e) => {
  if (e.target.location.hash || previousUrl === e.target.location.pathname) {
    return;
  }

  render(e.target.location);
  previousUrl = e.target.location.href;
});
