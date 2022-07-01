import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

import nodePolyfills from "rollup-plugin-polyfill-node";



// https://vitejs.dev/config/
export default defineConfig({
  base: "/NEAR-Calculator/",
  // Node.js global to browser globalThis,
  define: {
    global: "globalThis",
    'process.env': {}
},
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});