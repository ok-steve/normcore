/**
 * Keep output elements in sync with their corresponding inputs.
 */

document.querySelectorAll('output[for]').forEach((output) => {
  const inputs = Array.from(
    output
      .getAttribute('for')
      .split(' ')
      .map((id) => document.getElementById(id))
  );

  function sync() {
    // eslint-disable-next-line no-param-reassign
    output.textContent = inputs.map((input) => input.value).join(' ');
  }

  sync();
  inputs.forEach((input) => input.addEventListener('input', sync));
});
