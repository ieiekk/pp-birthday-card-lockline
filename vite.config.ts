import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": JSON.stringify(env),
    },
    resolve: {
      alias: [
        {
          find: "@utils",
          replacement: fileURLToPath(
            new URL("./src/utils.ts", import.meta.url),
          ),
        },
      ],
    },
    plugins: [
      react(),
      viteCompression({
        threshold: 1024000, // 1mb
      }),
    ],
  };
});
