import { rspack } from "@rspack/core";
import { resolve as _resolve } from "node:path";

import webflow from "./webflow.json" with { type: "json" };

const __dirname = import.meta.dirname;

export default (_env, argv) => ({
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: _resolve(__dirname, webflow.publicDir),
    cssFilename: "styles.css",
  },
  devtool: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": _resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        type: "css/auto",
      },
    ],
  },
  experiments: {
    css: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      title: webflow.name,
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },
  performance: {
    hints: argv.mode === "production" ? "warning" : false,
    maxEntrypointSize: 512_000,
    maxAssetSize: 512_000,
  },
});
