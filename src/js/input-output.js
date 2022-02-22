class InputOutputElement extends HTMLElement {
  connectedCallback() {
    this.oninput();

    ['input'].forEach((name) => {
      this.addEventListener(name, this);
    });
  }

  disconnectedCallback() {
    ['input'].forEach((name) => {
      this.removeEventListener(name, this);
    });
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  oninput() {
    if (this.input && this.output) {
      this.output.textContent = this.input.value;
    }
  }

  get input() {
    return this.querySelector('[data-target~="input-output.input"]');
  }

  get output() {
    return this.querySelector('[data-target~="input-output.output"]');
  }
}

customElements.define('input-output', InputOutputElement);
