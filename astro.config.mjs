// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'IBM Plex Sans JP',
            cssVariable: '--font-heading',
            weights: [500, 700],
            fallbacks: ['sans-serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'IBM Plex Mono',
            cssVariable: '--font-mono',
            weights: [400],
            fallbacks: ['monospace'],
        }
    ],
});
