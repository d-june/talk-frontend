import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://talk-backend-ajs1.vercel.app",
    },
  },
  plugins: [react()],
});
