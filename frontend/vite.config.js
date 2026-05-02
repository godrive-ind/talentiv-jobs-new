import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy hanya aktif saat dev lokal
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: "http://localhost:8001",
              changeOrigin: true,
            },
          }
        : undefined,
  },
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
    },
  },
}));
