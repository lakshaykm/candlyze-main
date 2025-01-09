import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Handle SPA routing during development
    historyApiFallback: true,
  },
  preview: {
    // Handle SPA routing during preview
    historyApiFallback: true,
  },
});
