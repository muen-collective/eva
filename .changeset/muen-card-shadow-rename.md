---
"@muen/eva": minor
---

Rename the shared 3D-card shadow token to `--muen-card-shadow`, and drop `--brandos-card-shadow`.

The card material is a Muen-wide style, not a Brand OS property: Brand OS is one consumer. The card ground stays
`--card` (the same value as `--background`), so the 3D effect comes from the shadow stack and the white top lip,
not from a lighter plate. Consumers must switch to the new name; there is no alias.
