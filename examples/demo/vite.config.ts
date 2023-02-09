import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidStyledPlugin from 'vite-plugin-solid-styled';

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidStyledPlugin(),
  ],
});
