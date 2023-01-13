/**
 * Keep output elements in sync with their corresponding inputs.
 */

function sync(output) {
  if (!output.hasAttribute('for')) {
    return;
  }

  const inputs = output
    .getAttribute('for')
    .split(' ')
    .map((id) => document.getElementById(id));

  // eslint-disable-next-line no-param-reassign
  output.textContent = inputs.map((input) => input.value).join(' ');
}

document.querySelectorAll('output[for]').forEach((output) => {
  sync(output);
});

document.addEventListener('input', (e) => {
  const output = document.querySelector(`output[for~="${e.target.id}"]`);

  if (output) {
    sync(output);
  }
});
