/**
 * Defensive polyfill to avoid runtime errors when event targets
 * (e.g., Document) do not implement .closest().
 */
export default defineNuxtPlugin(() => {
  if (typeof Document !== 'undefined' && !(Document.prototype as any).closest) {
    ;(Document.prototype as any).closest = () => null
  }

  if (typeof Window !== 'undefined' && !(Window.prototype as any).closest) {
    ;(Window.prototype as any).closest = () => null
  }
})