import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allow external connections
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'nextproperty-fullstack.onrender.com',
      'nextproperty-2.onrender.com',
      '.onrender.com' // Allow all Render subdomains
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  define: {
    // Ensure environment variables are available
    'process.env': {},
  },
  base: '/', // Ensure proper base path for deployment
})
