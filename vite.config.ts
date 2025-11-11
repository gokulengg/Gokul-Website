import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Backend dev server port
const API_PORT = 3001;

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    // Proxy API calls during development to Express server
    proxy: {
      "/api": {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
        // disable websocket proxying if not needed
        ws: false,
      },
    },
    allowedHosts: [
      "bidder-attend-celtic-news.trycloudflare.com",
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
