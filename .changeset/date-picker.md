---
"@muen/eva": minor
---

Add `DatePicker` and its two primitives: `Popover` (Radix) and `Calendar` (react-day-picker v9).

`DatePicker` is the shadcn composition — Popover + Calendar + Button — translated to this kit's
idioms: Radix `asChild` instead of Base UI's `render`, ISO `yyyy-mm-dd` strings instead of `Date`
(every date in a Brand OS is a Postgres `date`), a hidden input when `name` is given so a server action
form posts it with no client state, and `disabled` days for lead-time constraints.

**Token change in the Muen theme (same release):** the theme had `--accent`, `--ring` and `--info` set
to the purple `#765898`. The founder's correction: Muen has no brand accent hue — *"there is no purple
color, the primary color is ink."* So `--ring` and `--info` are now ink (`#0a0a0a`), and `--accent`
returns to its meaning in the primitives — a subtle **selection surface** (`#f4f4f5`), because
dropdown-menu and select paint `focus:bg-accent`. Emphasis is `--primary` / `--foreground`, both ink.

Consumers using `text-accent` or `border-accent` as a brand colour must move to
`text-foreground` / `border-foreground`.
