import {
  createComputed,
  createEffect,
  createSignal,
  onCleanup,
  untrack,
} from 'solid-js';
import makeTippy, { Instance, Props } from 'tippy.js';
import makeHeadlessTippy from 'tippy.js/headless';

export interface TippyOptions {
  disabled?: boolean;
  hidden?: boolean;
  props?: Partial<Props>;
}

export function tippy<T extends Element>(
  target: T,
  opts: () => TippyOptions | undefined,
): void {
  createEffect(() => {
    const options = opts();
    const instance = makeTippy(target, untrack(() => options?.props));

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });
}

export function tippyHeadless<T extends Element>(
  target: T,
  opts: () => TippyOptions | undefined,
): void {
  createEffect(() => {
    const options = opts();
    const instance = makeHeadlessTippy(target, untrack(() => options?.props));

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });
}

export function useTippy<T extends Element>(
  target: () => T,
  options?: TippyOptions,
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  createEffect(() => {
    const instance = makeTippy(target(), untrack(() => options?.props));

    setCurrent(instance);

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });

  return () => current();
}

export function useTippyHeadless<T extends Element>(
  target: () => T,
  options?: TippyOptions,
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  createEffect(() => {
    const instance = makeHeadlessTippy(target(), untrack(() => options?.props));

    setCurrent(instance);

    createComputed(() => {
      if (options?.disabled) {
        instance.disable();
      } else {
        instance.enable();
      }
    });

    createComputed(() => {
      if (options?.hidden) {
        instance.hide();
      } else {
        instance.show();
      }
    });

    createComputed(() => {
      instance.setProps({
        ...(options?.props ?? {}),
      });
    });

    onCleanup(() => {
      instance.destroy();
    });
  });

  return () => current();
}
