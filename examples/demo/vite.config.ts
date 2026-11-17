import solid from '@solidjs/vite-plugin';
import solidStyled from 'unplugin-solid-styled';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    solid(),
    solidStyled.vite({
      filter: {
        include: 'src/**/*.tsx',
        exclude: 'node_modules/**/*.{ts,js}',
      },
    }),
  ],
});
