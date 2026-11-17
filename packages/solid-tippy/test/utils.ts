import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import { flush } from 'solid-js';
import type { Instance, PopperElement, Props, ReferenceElement } from 'tippy.js';
import { afterEach } from 'vitest';

const disposers: (() => void)[] = [];

afterEach(() => {
  while (disposers.length) {
    disposers.pop()?.();
  }
  document.body.innerHTML = '';
});

/** Renders into a host attached to the document. Disposed after each test. */
export function renderInHost(code: () => JSX.Element): HTMLElement {
  const host = document.createElement('div');
  document.body.append(host);
  disposers.push(render(code, host));
  flush();
  return host;
}

/** Disposes a root created by `renderInHost` before the test ends. */
export function renderWithDispose(code: () => JSX.Element): {
  host: HTMLElement;
  dispose: () => void;
} {
  const host = document.createElement('div');
  document.body.append(host);
  const dispose = render(code, host);
  disposers.push(dispose);
  flush();
  return { host, dispose };
}

/** The instance Tippy.js stores on its reference element. */
export function getInstance(element: ReferenceElement | null): Instance | undefined {
  return element?._tippy;
}

/** A `render` prop for headless instances, with the given popper text. */
export function createRender(text = ''): NonNullable<Props['render']> {
  return () => {
    const popper = document.createElement('div') as PopperElement;
    popper.textContent = text;
    return { popper };
  };
}
