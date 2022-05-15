import json from "rollup-plugin-json";
import path from "path";
import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/bundle.cjs.js",
      format: "cjs",
      global: {
        vue: "Vue",
      },
    },
    {
      file: "./dist/bundle.esm.js",
      format: "esm",
      global: {
        vue: "Vue",
      },
    },
    {
      file: "./dist/bundle.esm.js",
      format: "esm",
      global: {
        vue: "Vue",
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    json(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      exclude: "**/node_modules/**",
    }),
  ],
};
