import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                configure: (proxy, _options) => {
                    const date = () => new Date().toLocaleTimeString('pt-br');
                    proxy.on('error', (err, _req, _res) => {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (_proxyReq, req, _res) => {   
                        console.log(`${date()} - Sending request to the target: `, req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log(`${date()} - Received response from the target: `, proxyRes.statusCode, req.url);
                    });
                }
            },
        }
    }
});