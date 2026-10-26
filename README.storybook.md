# EVA Storybook

Storybook is the visual contract for EVA components.

- Design and review primitives in `src/stories/`.
- Keep semantic tokens in `theme.css` and `src/tokens/`.
- Test the package under React 18 because the DSH host currently provides React 18.
- Do not bundle React, React DOM, Radix, or Lucide into plugin output.
- Add a DSH mount smoke test before consuming a component from a Mitsu plugin.
