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
            // 日本語フォントでは自動の補正が約 2 倍になり、読み込み中の英字が巨大になるので切る
            optimizedFallbacks: false,
            // すぐ（約 100ms 以内）に届かなければ、そのページでは差し替えない。表示中に「ぴくっ」と変わるのを防ぐ
            display: 'optional',
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
