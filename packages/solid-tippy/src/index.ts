import {
  createEffect,
  createSignal,
} from 'solid-js';
import type { Instance, Props } from 'tippy.js';
import makeTippy from 'tippy.js';
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
  const [instance, setInstance] = createSignal<Instance<Props>>();

  createEffect(opts, (current) => {
    const instance = makeTippy(target, current?.props);
    setInstance(instance);

    return () => instance.destroy();
  });

  createEffect(() => [instance(), opts()?.props ?? {}] as const, ([current, props]) => {
    if (current) {
      current.setProps(props);
    }
  });

  createEffect(() => [instance(), opts()?.disabled] as const, ([current, isDisabled]) => {
    if (current) {
      if (isDisabled) {
        current.disable()
      } else {
        current.enable();
      }
    }
  });

  createEffect(() => [instance(), opts()?.hidden] as const, ([current, isHidden]) => {
    if (current) {
      if (isHidden) {
        current.hide()
      } else {
        current.show();
      }
    }
  });
}

export function tippyHeadless<T extends Element>(
  target: T,
  opts: () => TippyOptions | undefined,
): void {
  const [instance, setInstance] = createSignal<Instance<Props>>();

  createEffect(opts, (current) => {
    const instance = makeHeadlessTippy(target, current?.props);
    setInstance(instance);

    return () => instance.destroy();
  });

  createEffect(() => [instance(), opts()?.props ?? {}] as const, ([current, props]) => {
    if (current) {
      current.setProps(props);
    }
  });

  createEffect(() => [instance(), opts()?.disabled] as const, ([current, isDisabled]) => {
    if (current) {
      if (isDisabled) {
        current.disable()
      } else {
        current.enable();
      }
    }
  });

  createEffect(() => [instance(), opts()?.hidden] as const, ([current, isHidden]) => {
    if (current) {
      if (isHidden) {
        current.hide()
      } else {
        current.show();
      }
    }
  });
}

export function useTippy<T extends Element>(
  target: () => T | undefined | null,
  options?: TippyOptions,
): () => Instance | undefined {
  const [instance, setInstance] = createSignal<Instance<Props>>();

  createEffect(target, (current) => {
    if (!current) {
      return undefined;
    }
    const instance = makeTippy(current, options?.props);
    setInstance(instance);

    return () => instance.destroy();
  });

  createEffect(() => [instance(), options?.props ?? {}] as const, ([current, props]) => {
    if (current) {
      current.setProps(props);
    }
  });

  createEffect(() => [instance(), options?.disabled] as const, ([current, isDisabled]) => {
    if (current) {
      if (isDisabled) {
        current.disable()
      } else {
        current.enable();
      }
    }
  });

  createEffect(() => [instance(), options?.hidden] as const, ([current, isHidden]) => {
    if (current) {
      if (isHidden) {
        current.hide()
      } else {
        current.show();
      }
    }
  });

  return instance;
}

export function useTippyHeadless<T extends Element>(
  target: () => T | undefined | null,
  options?: TippyOptions,
): () => Instance | undefined {
  const [instance, setInstance] = createSignal<Instance<Props>>();

  createEffect(target, (current) => {
    if (!current) {
      return undefined;
    }
    const instance = makeHeadlessTippy(current, options?.props);
    setInstance(instance);

    return () => instance.destroy();
  });

  createEffect(() => [instance(), options?.props ?? {}] as const, ([current, props]) => {
    if (current) {
      current.setProps(props);
    }
  });

  createEffect(() => [instance(), options?.disabled] as const, ([current, isDisabled]) => {
    if (current) {
      if (isDisabled) {
        current.disable()
      } else {
        current.enable();
      }
    }
  });

  createEffect(() => [instance(), options?.hidden] as const, ([current, isHidden]) => {
    if (current) {
      if (isHidden) {
        current.hide()
      } else {
        current.show();
      }
    }
  });

  return instance;
}
