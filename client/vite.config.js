import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEV_PORT = 5173;

function readServerPort() {
  const envPath = path.resolve(__dirname, '../server/.env');
  if (!existsSync(envPath)) return 5000;
  const portLine = readFileSync(envPath, 'utf8')
    .split('\n')
    .find((line) => /^PORT=\d+/.test(line.trim()));
  const port = portLine ? parseInt(portLine.split('=')[1].trim(), 10) : NaN;
  return Number.isFinite(port) ? port : 5000;
}

const API_PORT = readServerPort();
const API_TARGET = `http://127.0.0.1:${API_PORT}`;

/** Log the correct URL and verify the API is up before you hit the site. */
function devStartupChecks() {
  return {
    name: 'aangan-dev-startup-checks',
    configureServer(server) {
      server.httpServer?.once('listening', async () => {
        const addr = server.httpServer?.address();
        const port = typeof addr === 'object' && addr ? addr.port : DEV_PORT;
        console.log(`\n  ➜  Aangan: http://localhost:${port}/\n`);

        try {
          const res = await fetch(`${API_TARGET}/api/banners`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          console.log(`  ✓  API proxy → ${API_TARGET}\n`);
        } catch {
          console.error(`\n  ❌  Backend not reachable at ${API_TARGET}`);
          console.error('      Run: cd server && npm run dev');
          console.error('      Or from repo root: npm run dev\n');
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devStartupChecks()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: DEV_PORT,
    strictPort: false,
    open: '/',
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
      '/uploads': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
});
