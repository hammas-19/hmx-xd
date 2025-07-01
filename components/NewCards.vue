<template>
  <section class="py-16 px-8 bg-gray-50 min-h-screen relative">
    <Motion class="text-center mb-16" :initial="{ opacity: 0, y: 50 }" :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }" :viewport="{ once: true }">
      <h2 class="text-4xl font-bold text-gray-900 mb-4 font-outfit">Interactive Features</h2>
      <p class="text-xl text-gray-600 font-inter">Hover and click to see the magic</p>
    </Motion>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Motion v-for="(card, index) in cards" :key="card.id"
        class="bg-white rounded-xl p-8 shadow-lg cursor-pointer relative overflow-hidden group"
        :initial="{ opacity: 0, y: 100, rotate: -5 }" :whileInView="{ opacity: 1, y: 0, rotate: 0 }" :transition="{
          duration: 0.5,
          delay: index * 0.1,
          ease: 'backOut'
        }" :whileHover="{
          y: -10,
          scale: 1.02,
          rotate: 1,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }" :whileTap="{ scale: 0.98 }" :viewport="{ once: true }" @click="handleCardClick(card)">
        <div class="flex justify-center mb-6" :style="{ color: card.color }">
          <Icon :name="card.icon" class="w-12 h-12" />
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-4 text-center font-dm-sans">
          {{ card.title }}
        </h3>

        <p class="text-gray-600 text-center leading-relaxed font-inter">
          {{ card.description }}
        </p>

        <Motion
          class="absolute inset-0 bg-black/80 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100"
          :initial="{ opacity: 0, scale: 0 }" :whileHover="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.2 }">
          <span>Click me!</span>
        </Motion>
      </Motion>
    </div>

    <!-- Floating Action Button -->
    <Motion
      class="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-10"
      :initial="{ scale: 0, rotate: -180 }" :animate="{ scale: 1, rotate: 0 }"
      :transition="{ duration: 0.5, delay: 0.8, ease: 'backOut' }" :whileHover="{ scale: 1.1, rotate: 90 }"
      :whileTap="{ scale: 0.9 }" @click="addNewCard">
      <Icon name="heroicons:plus" class="w-6 h-6" />
    </Motion>

    <!-- Modal -->
    <Motion v-if="selectedCard" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }" @click="closeModal">
      <Motion class="bg-white rounded-xl p-8 max-w-md w-full text-center" :initial="{ scale: 0.8, opacity: 0, y: 50 }"
        :animate="{ scale: 1, opacity: 1, y: 0 }" :exit="{ scale: 0.8, opacity: 0, y: 50 }"
        :transition="{ duration: 0.3, ease: 'backOut' }" @click.stop>
        <div class="flex justify-center mb-4" :style="{ color: selectedCard.color }">
          <Icon :name="selectedCard.icon" class="w-16 h-16" />
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mb-4 font-outfit">
          {{ selectedCard.title }}
        </h3>

        <p class="text-gray-600 mb-6 leading-relaxed font-inter">
          {{ selectedCard.description }}
        </p>

        <Motion :whileHover="{ scale: 1.05 }" :whileTap="{ scale: 0.95 }">
          <button
            class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors font-dm-sans"
            @click="closeModal">
            Close
          </button>
        </Motion>
      </Motion>
    </Motion>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    title: 'Fast Performance',
    description: 'Lightning fast animations that never compromise user experience.',
    icon: 'heroicons:rocket-launch',
    color: '#ef4444'
  },
  {
    id: 2,
    title: 'Easy to Use',
    description: 'Simple API that makes complex animations feel effortless.',
    icon: 'heroicons:heart',
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'Highly Rated',
    description: 'Loved by developers worldwide for its simplicity and power.',
    icon: 'heroicons:star',
    color: '#3b82f6'
  }
])

const selectedCard = ref(null)

const handleCardClick = (card) => {
  selectedCard.value = card
}

const closeModal = () => {
  selectedCard.value = null
}

const addNewCard = () => {
  const colors = ['#ef4444', '#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
  const icons = ['heroicons:rocket-launch', 'heroicons:heart', 'heroicons:star', 'heroicons:lightning-bolt', 'heroicons:fire', 'heroicons:sparkles']

  const newCard = {
    id: cards.value.length + 1,
    title: `Feature ${cards.value.length + 1}`,
    description: 'A new amazing feature that will blow your mind!',
    icon: icons[Math.floor(Math.random() * icons.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  }
  cards.value.push(newCard)
}
</script>