import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ""),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split heavy animation library into its own chunk
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'motion';
            }
            // Email sending lib — only needed on form submit
            if (id.includes('node_modules/@emailjs')) {
              return 'emailjs';
            }
            // Radix UI components into their own chunk
            if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/@base-ui')) {
              return 'ui';
            }
            // All other node_modules
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Required for SPA path routing (serves index.html for any unmatched route)
      historyApiFallback: true,
    },
  };
});
