import { createRoot, JSX } from 'solid-js';
import { css } from 'solid-styled';
import { tippy } from 'solid-tippy';

export default function App(): JSX.Element {
  // Prevent TS from trimming
  tippy;

  css`
    div {
      border-radius: 1em;
      border-color: black;
      border-width: 4px;
      border-style: solid;
      padding: 0.5em 1em;

      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-weight: bold;
    }
  `;

  return (
    <div
      use:tippy={{
        props: {
          content: () => createRoot(() => {
            css`
              h1 {
                border-radius: 1rem;
                border-color: black;
                border-width: 4px;
                border-style: solid;
                padding: 0.5em 1rem;

                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                font-weight: bold;
                font-size: 1.5rem;
              }
            `;
            return <h1>This is a tooltip!.</h1> as HTMLElement;
          }),
        },
      }}
    >
      Hover me!
    </div>
  );
}
