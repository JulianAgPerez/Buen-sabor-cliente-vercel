import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "fix-cjs-imports",
      enforce: "post",
      transform(code, id) {
        if (
          id.includes("ItemSlider") &&
          (id.endsWith(".tsx") ||
            id.endsWith(".ts") ||
            id.endsWith(".js") ||
            id.endsWith(".jsx"))
        ) {
          if (code.includes('import Slider from "react-slick"')) {
            return code.replace(
              'import Slider from "react-slick"',
              'import * as __NS from "react-slick"; const Slider = __NS.default && __NS.default.default ? __NS.default.default : __NS.default',
            );
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@mui/icons-material": "@mui/icons-material/esm",
    },
  },
  optimizeDeps: {
    include: ["react-slick", "slick-carousel", "@mui/icons-material"],
  },
});
