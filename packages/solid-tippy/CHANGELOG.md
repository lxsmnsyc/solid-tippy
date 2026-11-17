# solid-tippy

## 1.0.0

### Major Changes

- 31b5917: - Supports Solid 2.0. The peer dependency is now `solid-js@^2.0.0`.
  - Requires Node.js 22 or later.
  - `tippy` and `tippyHeadless` now take only the options function and return a `ref` callback, because Solid 2 removed `use:` directives. Replace `use:tippy={options}` with `ref={tippy(() => options)}`.
  - The `hidden` option no longer shows the instance on mount when it is not set.
  - The generic type parameters of `tippy`, `tippyHeadless`, `useTippy` and `useTippyHeadless` are removed.
  - The package is ESM only. The CommonJS build and the `development` export condition are removed.
