---
"@muen/eva": minor
---

Add `Breadcrumb` (shadcn's composition, on EVA tokens).

The separator is a `children` slot, so a surface can use the house schema — a slash, not the default
chevron: `Home / Ralph Lauren / Moodboards / Quiet Utility`. The last crumb is `BreadcrumbPage`, which is
`aria-current="page"` and unlinked, so assistive tech announces the location instead of offering to
navigate to it again.
