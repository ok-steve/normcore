class NormcoreFormElement extends HTMLFormElement {
  connectedCallback() {
    // Apply saved form data.
    if (this.name) {
      const data = localStorage.getItem(this.name);

      if (data) {
        this.state = JSON.parse(data);
      }
    }

    ["change", "submit"].forEach((eventType) => {
      this.addEventListener(eventType, this);
    });
  }

  disconnectedCallback() {
    ["change", "submit"].forEach((eventType) => {
      this.removeEventListener(eventType, this);
    });
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  // Persist form data.
  onchange() {
    if (!this.name) return;

    localStorage.setItem(this.name, JSON.stringify(this.state));
  }

  // Disable normal form submission.
  // eslint-disable-next-line class-methods-use-this
  onsubmit(e) {
    e.preventDefault();
  }

  get state() {
    const data = new FormData(this);
    const state = {};

    Array.from(data.entries()).forEach(([key, value]) => {
      state[key] = value;
    });

    return state;
  }

  set state(data = {}) {
    Object.keys(data).forEach((key) => {
      const control = this.elements.namedItem(key);

      if (!control) return;

      control.value = data[key];
    });
  }
}

if (!customElements.getName(NormcoreFormElement)) {
  customElements.define("normcore-form", NormcoreFormElement, {
    extends: "form ",
  });
}
