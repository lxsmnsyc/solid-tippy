import { render } from 'solid-js/web';
import { css } from 'solid-styled';
import App from './App';

function Root() {
  css`
    :global(body) {
      margin: 0;
      padding: 0;
    }

    .outer {
      width: 100vw;
      height: 100vh;
      display: flex;
      overflow: hidden;
    }
    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  `;

  return (
    <div class="outer">
      <div class="inner">
        <App />
      </div>
    </div>
  );
}

const app = document.getElementById('app');

if (app) {
  render(() => <Root />, app);
}
