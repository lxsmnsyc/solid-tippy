import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import { css } from 'solid-styled';
import { tippy } from 'solid-tippy';

function TooltipContent(): JSX.Element {
  css`
    h1 {
      border-radius: 1rem;
      border-color: black;
      border-width: 4px;
      border-style: solid;
      padding: 0.5em 1rem;
      font-family:
        ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
      font-size: 1.5rem;
    }
  `;

  return <h1>This is a tooltip!.</h1>;
}

function createTooltip(): HTMLElement {
  const container = document.createElement('div');
  render(() => <TooltipContent />, container);
  return container;
}

export default function App(): JSX.Element {
  css`
    div {
      border-radius: 1em;
      border-color: black;
      border-width: 4px;
      border-style: solid;
      padding: 0.5em 1em;
      font-family:
        ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
  `;

  return <div ref={tippy(() => ({ props: { content: createTooltip } }))}>Hover me!</div>;
}
