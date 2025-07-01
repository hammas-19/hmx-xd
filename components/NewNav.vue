<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-black/10 transition-all duration-300"
    :class="isScrolled ? 'bg-white/98 shadow-lg' : 'bg-white/95'">
    <div class="max-w-6xl mx-auto px-4 sm:px-8">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <Motion class="cursor-pointer" :initial="{ opacity: 0, x: -50 }" :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.5 }" :whileHover="{ scale: 1.05 }">
          <span
            class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-outfit">
            Motion
          </span>
        </Motion>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <Motion v-for="(link, index) in navLinks" :key="link.name" class="relative" :initial="{ opacity: 0, y: -20 }"
            :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.3, delay: index * 0.1 + 0.2 }"
            :whileHover="{ y: -2 }">
            <a :href="link.href"
              class="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 py-2 font-dm-sans"
              @click.prevent="setActiveLink(link.name)">
              {{ link.name }}
            </a>

            <Motion class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 origin-left" :initial="{ scaleX: 0 }"
              :animate="{ scaleX: activeLink === link.name ? 1 : 0 }" :whileHover="{ scaleX: 1 }"
              :transition="{ duration: 0.3 }" />
          </Motion>
        </div>

        <!-- CTA Button -->
        <Motion class="hidden md:block" :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, delay: 0.6, ease: 'backOut' }"
          :whileHover="{ scale: 1.05, boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)' }" :whileTap="{ scale: 0.95 }">
          <button
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow font-dm-sans">
            Get Started
          </button>
        </Motion>

        <!-- Mobile Menu Toggle -->
        <Motion class="md:hidden p-2" :initial="{ opacity: 0, rotate: -90 }" :animate="{ opacity: 1, rotate: 0 }"
          :transition="{ duration: 0.4, delay: 0.3 }" :whileHover="{ scale: 1.1 }" :whileTap="{ scale: 0.9 }"
          @click="toggleMobileMenu">
          <div class="w-6 h-6 relative flex flex-col justify-around cursor-pointer">
            <Motion class="w-full h-0.5 bg-gray-700 origin-center" :animate="{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 6 : 0
            }" :transition="{ duration: 0.3 }" />
            <Motion class="w-full h-0.5 bg-gray-700" :animate="{ opacity: mobileMenuOpen ? 0 : 1 }"
              :transition="{ duration: 0.3 }" />
            <Motion class="w-full h-0.5 bg-gray-700 origin-center" :animate="{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -6 : 0
            }" :transition="{ duration: 0.3 }" />
          </div>
        </Motion>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Motion v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      :initial="{ opacity: 0, height: 0 }" :animate="{ opacity: 1, height: 'auto' }" :exit="{ opacity: 0, height: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }">
      <div class="px-4 py-6 space-y-4">
        <Motion v-for="(link, index) in navLinks" :key="link.name" :initial="{ opacity: 0, x: -30 }"
          :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: -30 }"
          :transition="{ duration: 0.3, delay: index * 0.1 }" :whileHover="{ x: 10 }">
          <a :href="link.href"
            class="block text-gray-700 hover:text-indigo-600 font-medium py-3 border-b border-gray-100 transition-colors font-dm-sans"
            @click="handleMobileLinkClick(link.name)">
            {{ link.name }}
          </a>
        </Motion>

        <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, delay: navLinks.length * 0.1 }" :whileHover="{ scale: 1.02 }"
          :whileTap="{ scale: 0.98 }">
          <button
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold mt-4 font-dm-sans">
            Get Started
          </button>
        </Motion>
      </div>
    </Motion>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
]

const activeLink = ref('Home')
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const setActiveLink = (linkName) => {
  activeLink.value = linkName
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleMobileLinkClick = (linkName) => {
  setActiveLink(linkName)
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>