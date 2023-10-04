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

// A naive merge implementation
function mergeHead(toHeadEl) {
  const fromHeadEl = document.head;
  const fromHead = new Set(fromHeadEl.children);
  const toHead = new Set(toHeadEl.children);

  toHead.forEach(toEl => {
    fromHead.forEach(fromEl => {
      if (fromEl.isEqualNode(toEl)) {
        fromHead.delete(fromEl);
        toHead.delete(toEl);
      }
    });
  });

  fromHead.forEach(fromEl => {
    fromHeadEl.removeChild(fromEl);
  })

  toHead.forEach(toEl => {
    fromHeadEl.appendChild(toEl);
  });
}

async function render(pathname) {
  document.body.setAttribute('data-state', 'exiting');

  const response = await fetchDocument(pathname);

  mergeHead(response.head);

  document.body.replaceWith(response.body);
  document.body.removeAttribute('data-state');
  // Dispatch a fake `DOMContentLoaded` event.
  document.body.dispatchEvent(new Event('DOMContentLoaded'));
}

function shouldRouteChange(target) {
  return [
    // A fake `beforeunload` event is cancelled.
    !window.dispatchEvent(new Event('beforeunload', { cancelable: true })),
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
