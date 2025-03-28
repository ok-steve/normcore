class OutputSyncElement extends HTMLOutputElement {
  connectedCallback() {
    // Set value when component is loaded.
    this.oninput();

    ["input"].forEach((eventType) =>
      this.inputTargets.forEach((target) =>
        target.addEventListener(eventType, this)
      )
    );
  }

  disconnectedCallback() {
    ["input"].forEach((eventType) =>
      this.inputTargets.forEach((target) =>
        target.removeEventListener(eventType, this)
      )
    );
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  oninput() {
    const values = this.inputTargets.map((el) => el.value);

    this.textContent = values.join(" ");
  }

  get inputTargets() {
    return Array.from(this.htmlFor)
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);
  }
}

if (!customElements.getName(OutputSyncElement)) {
  customElements.define("output-sync", OutputSyncElement, {
    extends: "output",
  });
}
