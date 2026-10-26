import { defineConfig } from "tsup"

// Library build: ESM + CJS + type declarations.
// React, Radix, lucide, and the tiny class utils stay external so consumers
// share a single copy; tsup marks peerDependencies external by default and
// these are listed explicitly for the runtime deps (cva/clsx/tailwind-merge).
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "radix-ui",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" }
  },
})
