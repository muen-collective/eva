/**
 * jsdom has no ResizeObserver, and Radix's size hook (the slider thumb) asks for one. A no-op
 * observer is enough: the tests drive values with the keyboard, not with measured pixels.
 */
if (!("ResizeObserver" in globalThis)) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserver as unknown as typeof globalThis.ResizeObserver
}
