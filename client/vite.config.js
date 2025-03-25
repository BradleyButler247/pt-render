import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const parentDir = path.resolve(__dirname, '../');
  dotenv.config({ path: path.join(parentDir, '.env') });
  const clientAddress = process.env.VITE_PORT
  const serverAddress = 'https://pt-render-server.onrender.com/'
  // const serverAddress = process.env.VITE_SERVER_ADDRESS

  return ({
    define: {
      'process.env': env,
    },
    plugins: [react()],
    server: {
      port: clientAddress,
      proxy: {
        '/api': {
          target: serverAddress,
          changeOrigin: true,
          secure: false,      
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    }
  })
});