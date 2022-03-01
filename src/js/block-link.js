const _ = new WeakMap();

class BlockLinkElement extends HTMLElement {
  constructor() {
    super();

    _.set(this, new Map());
    _.get(this).set('down', null);
  }

  connectedCallback() {
    ['pointerup', 'pointerdown'].forEach((name) => {
      this.addEventListener(name, this);
    });
  }

  disconnectedCallback() {
    ['pointerup', 'pointerdown'].forEach((name) => {
      this.removeEventListener(name, this);
    });
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  onpointerup() {
    const down = _.get(this).get('down');
    const up = +new Date();

    if (this.link && up - down < this.timeout) {
      this.link.click();
    }
  }

  onpointerdown() {
    _.get(this).set('down', +new Date());
  }

  get timeout() {
    return parseFloat(this.getAttribute('timeout')) || 200;
  }

  set timeout(value) {
    if (Number.isNaN(parseFloat(value))) return;
    this.setAttribute(value);
  }

  get link() {
    return this.querySelector('[data-target~="block-link.link"]');
  }
}

customElements.define('block-link', BlockLinkElement);
