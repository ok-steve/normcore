/**
 * Keep output elements in sync with their corresponding inputs. Assumes a 1:1
 * correspondence between inputs and outputs.
 */

document.addEventListener('input', (e) => {
  const id = e.target.id;

  // Skip inputs without ids
  if (id === '') return;

  const output = document.querySelector(`output[for="${id}"]`);

  // Skip if there is no corresponding output
  if (output === null) return;

  output.textContent = e.target.value;
});
