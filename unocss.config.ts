import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        logos: () =>
          import('@iconify-json/logos/icons.json').then(i => i.default as any),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-0.125em',
      },
    }),
  ],
})
