# no-spoilers

A progressively-enhanced spoiler tag that works in any frontend. Built using web components.

![Example of no-spoilers](./static/demo.gif)

> `no-spoilers` was built for my web component course, Component Odyssey. If you'd like to build your first web component library, then you can [register your interest](https://component-odyssey.com/subscribe).

## Installation

```bash
npm i no-spoilers
```

## Usage

```html
<script type="module">
  import "no-spoilers/no-spoilers.js";
</script>

<no-spoilers>
  <details>
    <p>This is a spoiler</p>
  </details>
</no-spoilers>
```

Note: `no-spoilers` will not render if the child content is not a single `details` element. This is to ensure that if JavaScript doesn't load, the behaviour fallasback to a standard `details` element.


### Attributes

- `button-text` - Displays the text on the button that reveals the spoiler. Default: "Reveal Spoiler"

### Notes

I'd like to shoutout this [article](https://www.scottohara.me/blog/2024/08/22/spoiler.html) by Scott O'Hara about building an accessible spoiler element. It was a great resource for improving this component.
