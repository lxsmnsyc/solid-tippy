# solid-tippy

> SolidJS bindings for [Tippy.js](https://atomiks.github.io/tippyjs/)

[![NPM](https://img.shields.io/npm/v/solid-tippy.svg)](https://www.npmjs.com/package/solid-tippy)

## Install

This version supports Solid 2.0. Solid 1 users stay on `solid-tippy@0.2`, which is kept on the [`solid-1` branch](https://github.com/lxsmnsyc/solid-tippy/tree/solid-1).

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

```tsx
import { createSignal } from 'solid-js';
import { tippy, useTippy } from 'solid-tippy';

// As a ref directive
<button
  ref={tippy(() => ({
    props: {
      content: 'This is a tooltip.',
    },
  }))}
>
  Example
</button>;

// As a hook
const [anchor, setAnchor] = createSignal<HTMLElement>();

useTippy(anchor, {
  props: {
    content: 'This is a tooltip.',
  },
});

<button
  ref={(element) => {
    setAnchor(() => element);
  }}
>
  Example
</button>;
```

`tippy` replaces the `use:tippy` directive of Solid 1, because Solid 2 removed `use:` in favor of `ref`. Call it in a component body, not inside an effect.

### Options

- `disabled`: Disables the Tippy instance when `true`.
- `hidden`: Hides the Tippy instance when `true` and shows it when `false`. When it is not set, the instance opens and closes on its own triggers.
- `props`: Props to be passed to the Tippy instance when creating or updating it. You can read more about it [here](https://atomiks.github.io/tippyjs/v6/all-props/).

`tippy` and `tippyHeadless` take the options as a function, so they track the signals it reads. `useTippy` and `useTippyHeadless` take a plain object. To make it reactive, pass an object with getters or a store.

### Headless mode

You may use `tippyHeadless` or `useTippyHeadless` instead of `tippy` and `useTippy` for Headless Tippy instances.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
