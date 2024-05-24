/**
 * Keep output elements in sync with their corresponding inputs. Assumes a 1:1
 * correspondence between inputs and outputs.
 */

class NormcoreOutputElement extends HTMLOutputElement {
  connectedCallback() {
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

    this.value = values.join(" ");
  }

  get inputTargets() {
    return Array.from(this.htmlFor)
      .map((id) => this.form.getElementById(id))
      .filter((el) => el !== null);
  }
}

if (!customElements.getName(NormcoreOutputElement)) {
  customElements.define("normcore-output", NormcoreOutputElement, {
    extends: "output",
  });
}
