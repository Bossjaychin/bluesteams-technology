import { defineConfig } from 'vite'
import { resolve } from 'path'
import { cp, copyFile } from 'fs/promises'

/**
 * Copies non-bundleable static files into dist after build:
 *  - support.js  (the dc-runtime — loaded as a classic script)
 *  - _ds/        (design system bundle + CSS — referenced by relative path in HTML)
 *  - uploads/    (user-uploaded images referenced in content)
 */
function copyStaticPlugin() {
  return {
    name: 'copy-static',
    apply: 'build',
    async closeBundle() {
      await Promise.all([
        copyFile('support.js', 'dist/support.js'),
        copyFile('no-copy.js', 'dist/no-copy.js'),
        cp('_ds', 'dist/_ds', { recursive: true }),
        cp('uploads', 'dist/uploads', { recursive: true }),
      ])
      console.log('✓ Copied support.js, _ds/, and uploads/ to dist/')
    },
  }
}

export default defineConfig({
  root: '.',
  plugins: [copyStaticPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:      resolve(__dirname, 'index.html'),
        home:       resolve(__dirname, 'Home.dc.html'),
        about:      resolve(__dirname, 'About.dc.html'),
        services:   resolve(__dirname, 'Services.dc.html'),
        industries: resolve(__dirname, 'Industries.dc.html'),
        contact:    resolve(__dirname, 'Contact.dc.html'),
      },
    },
  },
  publicDir: 'assets',
})

