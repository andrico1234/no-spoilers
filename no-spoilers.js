
const blurValue = "blur(8px)"
class NoSpoilers extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "no-spoilers", NoSpoilers);
    }
  }

  static get observedAttributes() {
    return ["button-text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "button-text" && oldValue !== newValue) {
      if (this.buttonEl) {
        this.buttonEl.textContent = newValue;
      }
    }
  }

  connectedCallback() {
    if (document.readyState === "loading") {
      return document.addEventListener("readystatechange", this.connectedCallback.bind(this), { once: true })
    }

    if (this.children.length === 1 && this.children[0].tagName === "DETAILS") {
      const details = this.children[0];
      const children = Array.from(details.childNodes);

      const content = children.find((child) => {
        if (child.textContent.trim() === "") {
          return false;
        }

        if (child.tagName === "SUMMARY") {
          return false;
        }

        return true;
      })

      if (!content) {
        console.warn("Ensure that you pass through a single <details> element as a child of <no-spoilers>. This ensures that behvaviour works even JavaScript fails to load.");
      }

      details.replaceWith(content);

      content.inert = true;
    } else {
      console.warn("Ensure that you pass through a single <details> element as a child of <no-spoilers>. This ensures that behvaviour works even JavaScript fails to load.");
    }

    Array.from(this.children).forEach(child => {
      child.style.filter = blurValue;
    })

    this.setAttribute('role', 'group');

    const buttonEl = document.createElement("button");

    this.buttonEl = buttonEl;

    buttonEl.setAttribute('aria-expanded', 'false');
    buttonEl.setAttribute('data-spoiler-trigger', '');
    buttonEl.textContent = this.getAttribute("button-text") || "Reveal Spoilers";
    buttonEl.addEventListener("click", this.#handleClick);

    this.appendChild(buttonEl);
  }

  #handleClick = () => {
    const buttonEl = this.buttonEl;
    const isExpanded = buttonEl.getAttribute("aria-expanded") === "true";

    if (!isExpanded) {
      buttonEl.setAttribute("aria-expanded", "true");
      Array.from(this.children).forEach(child => {
        if (child.hasAttribute("data-spoiler-trigger")) return;

        child.style.filter = "none";
        child.inert = false;
      })
    } else {
      buttonEl.setAttribute("aria-expanded", "false");
      Array.from(this.children).forEach(child => {
        if (child.hasAttribute("data-spoiler-trigger")) return;

        child.style.filter = blurValue;
        child.inert = true;
      })
    }
  }


}

NoSpoilers.register();

