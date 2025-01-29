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
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL || 'https://candlyze-main-1.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    // Handle SPA routing during preview
    historyApiFallback: true,
  },
});
