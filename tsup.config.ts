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
  /*
   * The kit is a React component library: every primitive uses hooks, context and refs, so the bundle is
   * a *client* module. Without this banner a consumer that imports a component from a server component
   * gets `createContext is not a function` at render — which is exactly how the DatePicker failed in
   * nerv-app on 2026-10-31. A thin client wrapper in every app is not the fix; the directive is.
   */
  banner: { js: '"use client"' },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "radix-ui",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "react-day-picker",
    "date-fns",
  ],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" }
  },
})
