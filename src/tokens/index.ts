/** Stable token entry point. Keep component code dependent on semantic tokens. */
export const evaTokenFamilies = [
  "surface",
  "content",
  "brand",
  "feedback",
  "chart",
  "focus",
] as const

export type EvaTokenFamily = (typeof evaTokenFamilies)[number]
