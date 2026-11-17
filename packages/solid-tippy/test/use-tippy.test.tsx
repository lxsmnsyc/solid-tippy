import { createRoot, createSignal, flush } from 'solid-js';
import { describe, expect, it } from 'vitest';
import { useTippy, useTippyHeadless } from '../src/index';
import { createRender, getInstance, renderInHost } from './utils';

const STILL = { duration: 0, delay: 0, animation: false } as const;

function createButton(): HTMLButtonElement {
  const button = document.createElement('button');
  document.body.append(button);
  return button;
}

describe('useTippy', () => {
  it('returns the instance once the target is set', () => {
    const button = createButton();
    const [target, setTarget] = createSignal<HTMLElement>();
    const instance = createRoot(() => useTippy(target, { props: { ...STILL, content: 'Hi' } }));
    flush();
    expect(instance()).toBeUndefined();

    setTarget(button);
    flush();

    expect(instance()).toBeDefined();
    expect(instance()).toBe(getInstance(button));
    expect(instance()?.props.content).toBe('Hi');
  });

  it('works with a signal setter as `ref`', () => {
    const [target, setTarget] = createSignal<HTMLElement>();
    let instance: ReturnType<typeof useTippy> | undefined;
    const host = renderInHost(() => {
      instance = useTippy(target, { props: { ...STILL, content: 'Hi' } });
      return (
        <button
          ref={(element) => {
            setTarget(() => element);
          }}
        >
          Anchor
        </button>
      );
    });
    flush();

    expect(instance?.()).toBe(getInstance(host.querySelector('button')));
  });

  it('moves the instance when the target changes', () => {
    const first = createButton();
    const second = createButton();
    const [target, setTarget] = createSignal<HTMLElement>(first);
    const instance = createRoot(() => useTippy(target, { props: { ...STILL, content: 'Hi' } }));
    flush();
    const firstInstance = instance();

    setTarget(second);
    flush();

    expect(firstInstance?.state.isDestroyed).toBe(true);
    expect(getInstance(first)).toBeUndefined();
    expect(instance()).toBe(getInstance(second));
  });

  it('drops the instance when the target is cleared', () => {
    const button = createButton();
    const [target, setTarget] = createSignal<HTMLElement | null>(button);
    const instance = createRoot(() => useTippy(target, { props: { ...STILL, content: 'Hi' } }));
    flush();
    const before = instance();
    expect(before).toBeDefined();

    setTarget(null);
    flush();

    expect(before?.state.isDestroyed).toBe(true);
    expect(instance()).toBeUndefined();
  });

  it('follows reactive options', () => {
    const button = createButton();
    const [content, setContent] = createSignal('First');
    const [disabled, setDisabled] = createSignal(false);
    const instance = createRoot(() =>
      useTippy(() => button, {
        get disabled() {
          return disabled();
        },
        props: {
          ...STILL,
          get content() {
            return content();
          },
        },
      }),
    );
    flush();
    expect(instance()?.props.content).toBe('First');
    expect(instance()?.state.isEnabled).toBe(true);

    setContent('Second');
    setDisabled(true);
    flush();

    expect(instance()?.props.content).toBe('Second');
    expect(instance()?.state.isEnabled).toBe(false);
  });

  it('destroys the instance when the owner is disposed', () => {
    const button = createButton();
    let dispose = (): void => undefined;
    const instance = createRoot((disposeRoot) => {
      dispose = disposeRoot;
      return useTippy(() => button, { props: { ...STILL, content: 'Hi' } });
    });
    flush();
    const created = instance();

    dispose();

    expect(created?.state.isDestroyed).toBe(true);
  });
});

describe('useTippyHeadless', () => {
  it('creates a headless instance', () => {
    const button = createButton();
    const render = createRender();
    const instance = createRoot(() =>
      useTippyHeadless(() => button, { props: { ...STILL, render } }),
    );
    flush();

    expect(instance()).toBe(getInstance(button));
    expect(instance()?.props.render).toBe(render);
  });
});
