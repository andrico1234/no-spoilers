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
    this.buttonText = this.getAttribute("button-text") || "Reveal Spoilers";

    if (this.children.length === 1 && this.children[0].tagName === "DETAILS") {
      const details = this.children[0];
      const childElement = details.children[0];
      details.replaceWith(childElement);
    }

    Array.from(this.children).forEach(child => {
      child.style.filter = "blur(8px)";
    })

    const el = document.createElement("button");
    el.textContent = this.buttonText;
    el.addEventListener("click", () => {
      Array.from(this.children).forEach(child => {
        child.style.filter = "none";
      })

      el.disabled = true;
    })

    this.appendChild(el);
  }
}

NoSpoilers.register();

