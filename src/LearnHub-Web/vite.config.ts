import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
      port: 5173,
      proxy: {
        // Forward all requests starting with /api to ASP.NET Core backend
        '/api': {
          target: 'https://localhost:7051',
          changeOrigin: true,
          secure: false, // False to bypass self-signed SSL certificate checks in development
        },
      },
    },
});
