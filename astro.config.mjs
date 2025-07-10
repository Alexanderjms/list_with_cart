import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        next();
      });
    },
  },
});
