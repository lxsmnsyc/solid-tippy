import { createSignal, flush } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { tippy, tippyHeadless } from '../src/index';
import { createRender, getInstance, renderInHost, renderWithDispose } from './utils';

// Zero durations make `show` and `hide` finish in the same tick.
const STILL = { duration: 0, delay: 0, animation: false } as const;

describe('tippy', () => {
  it('attaches an instance with the given props', () => {
    const host = renderInHost(() => (
      <button ref={tippy(() => ({ props: { ...STILL, content: 'Hello' } }))}>Anchor</button>
    ));

    const instance = getInstance(host.querySelector('button'));
    expect(instance).toBeDefined();
    expect(instance?.props.content).toBe('Hello');
  });

  it('updates props on the same instance', () => {
    const [content, setContent] = createSignal('First');
    const host = renderInHost(() => (
      <button ref={tippy(() => ({ props: { ...STILL, content: content() } }))}>Anchor</button>
    ));
    const button = host.querySelector('button');
    const before = getInstance(button);

    setContent('Second');
    flush();

    expect(getInstance(button)).toBe(before);
    expect(before?.props.content).toBe('Second');
  });

  it('toggles `disabled`', () => {
    const [disabled, setDisabled] = createSignal(true);
    const host = renderInHost(() => (
      <button ref={tippy(() => ({ disabled: disabled(), props: { ...STILL, content: 'x' } }))}>
        Anchor
      </button>
    ));
    const instance = getInstance(host.querySelector('button'));
    expect(instance?.state.isEnabled).toBe(false);

    setDisabled(false);
    flush();
    expect(instance?.state.isEnabled).toBe(true);
  });

  it('shows and hides through `hidden`', () => {
    const [hidden, setHidden] = createSignal(true);
    const host = renderInHost(() => (
      <button ref={tippy(() => ({ hidden: hidden(), props: { ...STILL, content: 'x' } }))}>
        Anchor
      </button>
    ));
    const instance = getInstance(host.querySelector('button'));
    expect(instance?.state.isVisible).toBe(false);

    setHidden(false);
    flush();
    expect(instance?.state.isVisible).toBe(true);

    setHidden(true);
    flush();
    expect(instance?.state.isVisible).toBe(false);
  });

  it('stays closed on mount when `hidden` is not set', () => {
    const host = renderInHost(() => (
      <button ref={tippy(() => ({ props: { ...STILL, content: 'x' } }))}>Anchor</button>
    ));

    expect(getInstance(host.querySelector('button'))?.state.isVisible).toBe(false);
  });

  it('destroys the instance when the owner is disposed', () => {
    const { host, dispose } = renderWithDispose(() => (
      <button ref={tippy(() => ({ props: { ...STILL, content: 'x' } }))}>Anchor</button>
    ));
    const button = host.querySelector('button');
    const instance = getInstance(button);

    dispose();

    expect(instance?.state.isDestroyed).toBe(true);
    expect(getInstance(button)).toBeUndefined();
  });
});

describe('tippyHeadless', () => {
  it('creates an instance that uses the render prop', () => {
    const render = createRender('Headless');
    const host = renderInHost(() => (
      <button ref={tippyHeadless(() => ({ props: { ...STILL, render } }))}>Anchor</button>
    ));
    const instance = getInstance(host.querySelector('button'));

    expect(instance?.props.render).toBe(render);
    expect(instance?.popper.textContent).toBe('Headless');
  });

  it('shows through `hidden`', () => {
    const [hidden, setHidden] = createSignal(true);
    const host = renderInHost(() => (
      <button
        ref={tippyHeadless(() => ({
          hidden: hidden(),
          props: { ...STILL, render: createRender() },
        }))}
      >
        Anchor
      </button>
    ));
    const instance = getInstance(host.querySelector('button'));
    expect(instance?.state.isVisible).toBe(false);

    setHidden(false);
    flush();
    expect(instance?.state.isVisible).toBe(true);
  });
});
