# solid-tippy

> SolidJS bindings for [Tippy.js](https://atomiks.github.io/tippyjs/)

[![NPM](https://img.shields.io/npm/v/solid-tippy.svg)](https://www.npmjs.com/package/solid-tippy) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/solid-tippy/tree/main/examples/solid-tippy-demo)

## Install

```bash
npm i tippy.js solid-tippy
```

```bash
yarn add tippy.js solid-tippy
```

```bash
pnpm add tippy.js solid-tippy
```

## Usage

```jsx
import { tippy, useTippy } from 'solid-tippy';

// As directive
<button
  use:tippy={{
    props: {
      content: 'This is a tooltip.',
    },
  }}
>
  Example
</button>

// as hook
const [anchor, setAnchor] = createSignal();

useTippy(anchor, {
  props: {
    content: 'This is a tooltip.',
  },
});

<button ref={anchor}>
  Example
</button>
```

### Options

- `disabled`: Disables the Tippy instance. Defaults to `false`.
- `hidden`: Hides the Tippy instance. Defaults to `false`.
- `props`: Props to be passed to the Tippy instance when creating or updating it. You can read more about it [here](https://atomiks.github.io/tippyjs/v6/all-props/).

### Headless mode

You may use `tippyHeadless` or `useTippyHeadless` instead of `tippy` and `useTippy` for Headless Tippy instances.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
