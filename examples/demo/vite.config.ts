import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import solidStyled from 'vite-plugin-solid-styled';

export default defineConfig({
  plugins: [solid(), solidStyled({})],
});
