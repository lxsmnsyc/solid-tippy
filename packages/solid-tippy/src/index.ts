import { createEffect, createSignal, untrack } from 'solid-js';
import type { Instance, Props } from 'tippy.js';
import makeTippy from 'tippy.js';
import makeHeadlessTippy from 'tippy.js/headless';

export interface TippyOptions {
  disabled?: boolean;
  hidden?: boolean;
  props?: Partial<Props>;
}

type CreateInstance = (target: Element, props?: Partial<Props>) => Instance;

function bindInstance(
  create: CreateInstance,
  target: () => Element | undefined | null,
  options: () => TippyOptions | undefined,
): () => Instance | undefined {
  const [instance, setInstance] = createSignal<Instance>();

  // The instance lives as long as the target. Changing the target destroys the
  // old instance, and so does disposing the owner.
  createEffect(target, (current) => {
    if (!current) {
      setInstance(undefined);
      return undefined;
    }
    // Props are read untracked here. The effect below applies later changes.
    const created = untrack(() => create(current, { ...options()?.props }));
    setInstance(created);

    return () => {
      created.destroy();
    };
  });

  // Props changes update the live instance instead of recreating it. The spread
  // reads each prop here, so a getter or store field is tracked on its own.
  createEffect(
    () => [instance(), { ...options()?.props }] as const,
    ([current, props]) => {
      if (current) {
        current.setProps(props);
      }
    },
  );

  createEffect(
    () => [instance(), options()?.disabled] as const,
    ([current, isDisabled]) => {
      if (current) {
        if (isDisabled) {
          current.disable();
        } else {
          current.enable();
        }
      }
    },
  );

  // `hidden` only controls the instance once it is set. Left undefined, the
  // instance opens and closes on its own triggers.
  createEffect(
    () => [instance(), options()?.hidden] as const,
    ([current, isHidden]) => {
      if (current && isHidden !== undefined) {
        if (isHidden) {
          current.hide();
        } else {
          current.show();
        }
      }
    },
  );

  return instance;
}

function createRefBinding(
  create: CreateInstance,
  options: () => TippyOptions | undefined,
): (target: Element) => void {
  const [target, setTarget] = createSignal<Element>();

  bindInstance(create, target, options);

  return (element) => {
    setTarget(() => element);
  };
}

/**
 * Returns a `ref` callback that attaches a Tippy instance to the element.
 * Call it in a component body: `<button ref={tippy(() => ({ props }))} />`.
 */
export function tippy(options: () => TippyOptions | undefined): (target: Element) => void {
  return createRefBinding(makeTippy, options);
}

/** Same as `tippy`, with the headless build of Tippy.js. */
export function tippyHeadless(options: () => TippyOptions | undefined): (target: Element) => void {
  return createRefBinding(makeHeadlessTippy, options);
}

/**
 * Attaches a Tippy instance to the element that `target` returns, and returns
 * an accessor for the instance. Pass an object with getters, or a store, to
 * make `options` reactive.
 */
export function useTippy(
  target: () => Element | undefined | null,
  options?: TippyOptions,
): () => Instance | undefined {
  return bindInstance(makeTippy, target, () => options);
}

/** Same as `useTippy`, with the headless build of Tippy.js. */
export function useTippyHeadless(
  target: () => Element | undefined | null,
  options?: TippyOptions,
): () => Instance | undefined {
  return bindInstance(makeHeadlessTippy, target, () => options);
}
