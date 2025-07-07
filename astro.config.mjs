import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        next();
      });
    },
  },
});
