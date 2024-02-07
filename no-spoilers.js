class NoSpoilers extends HTMLElement {
  static get observedAttributes() {
    return ["button-text"];
  }

  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "no-spoilers", NoSpoilers);
    }
  }

  connectedCallback() {
    if (document.readyState === "loading") {
      return document.addEventListener("readystatechange", this.connectedCallback.bind(this), { once: true })
    }


    if (this.children.length === 1 && this.children[0].tagName === "DETAILS") {
      const details = this.children[0];
      const childElement = details.children[0];
      details.replaceWith(childElement);
    }

    Array.from(this.children).forEach(child => {
      child.style.filter = "blur(8px)";
    })

    const el = document.createElement("button");
    el.textContent = this.getAttribute("button-text") || "Reveal Spoilers";
    el.addEventListener("click", () => {
      Array.from(this.children).forEach(child => {
        child.style.filter = "none";
      })

      el.disabled = true;
    })

    this.buttonEl = el;

    this.appendChild(el);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "button-text" && oldValue !== newValue) {
      this.buttonEl.textContent = newValue;
    }
  }
}

NoSpoilers.register();

