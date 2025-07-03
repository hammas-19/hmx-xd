<template>
  <div class="min-h-screen bg-gray-900 p-8">
    <!-- Add the pointer follower once -->
    <SimpleCustomPointer />

    <!-- Your content with data attributes -->
    <div class="max-w-4xl mx-auto space-y-12 text-white">

      <h1 class="text-5xl font-bold text-center mb-12">Simple Custom Pointer</h1>

      <!-- Buttons (use data-pointer="button") -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Buttons</h2>
        <div class="flex gap-4">
          <button data-pointer="button"
            class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Primary Button
          </button>

          <button data-pointer="button"
            class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Success Button
          </button>
        </div>
      </section>

      <!-- Links (use data-pointer="link") -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Links</h2>
        <p class="text-gray-300">
          Check out this
          <a href="#" data-pointer="link" class="text-blue-400 hover:underline">
            awesome link
          </a>
          and visit our
          <a href="#" data-pointer="link" class="text-purple-400 hover:underline">
            homepage
          </a>.
        </p>
      </section>

      <!-- Images (use data-pointer="image") -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Images</h2>
        <div class="grid grid-cols-2 gap-4">
          <div data-pointer="image"
            class="bg-gray-800 h-40 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700">
            <span class="text-gray-400">Photo 1</span>
          </div>
          <div data-pointer="image"
            class="bg-gray-800 h-40 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700">
            <span class="text-gray-400">Photo 2</span>
          </div>
        </div>
      </section>

      <!-- Custom text (use data-pointer="text" and data-pointer-text="your message") -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Custom Text</h2>
        <div class="grid grid-cols-2 gap-6">
          <div data-pointer="text" data-pointer-text="Download Now!"
            class="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
            <h3 class="font-bold text-lg mb-2">Download File</h3>
            <p class="text-purple-100 text-sm">Click to download</p>
          </div>

          <div data-pointer="text" data-pointer-text="Contact Us 📧"
            class="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
            <h3 class="font-bold text-lg mb-2">Get in Touch</h3>
            <p class="text-green-100 text-sm">We'd love to hear from you</p>
          </div>
        </div>
      </section>

      <!-- Regular content (no data-pointer = default pointer) -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Regular Content</h2>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <p class="text-gray-300 leading-relaxed">
            This is regular content where the pointer shows its default state.
            Move your cursor around this area to see the normal behavior.
          </p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
// No JavaScript needed! Just add the component and use data attributes
</script>
<style scoped>
.main{
  
}
</style>