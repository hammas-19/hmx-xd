<template>
  <div class="min-h-screen">
    <!-- Skip link for accessibility -->
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white p-2 rounded z-50">
      Skip to main content
    </a>

    <!-- Custom cursor/pointer follower -->
    <MotionPointerFollower :offset-x="40" :offset-y="10" :size="30" color="#5757573b" :damping="11" :stiffness="100"
      shape="circle" />

    <!-- Main content wrapper -->
    <div id="main-content" tabindex="-1">
      <NuxtPage />
    </div>

    <!-- Loading indicator for better UX -->
    <LazyNuxtLoadingIndicator />
  </div>
</template>

<script setup>
// Global SEO defaults
useHead({
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// Preconnect to external domains for performance
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
  ]
})
</script>

<style>

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>