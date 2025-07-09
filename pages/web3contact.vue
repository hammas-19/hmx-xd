<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

    <form @submit.prevent="sendMessage" class="space-y-4">
      <div>
        <input v-model="form.name" type="text" placeholder="Your Name" required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <input v-model="form.email" type="email" placeholder="Your Email" required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <input v-model="form.contact" type="tel" placeholder="Contact Number" required
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <textarea v-model="form.message" placeholder="Your Message" required rows="4"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
      </div>

      <button type="submit" :disabled="sending" class="w-full py-3 px-6 rounded-md font-medium transition duration-200"
        :class="sending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'">
        {{ sending ? 'Sending...' : 'Send Message' }}
      </button>
    </form>

    <!-- Success/Error Messages -->
    <div v-if="showSuccess" class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
      ✅ Message sent successfully! We'll get back to you soon.
    </div>

    <div v-if="showError" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
      ❌ Failed to send message. Please try again.
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  contact: '',
  message: ''
})

const sending = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const sendMessage = async () => {
  sending.value = true
  showSuccess.value = false
  showError.value = false

  const formData = new FormData()
  formData.append('access_key', '146db049-78fd-4039-a1e8-bc2a859b3274') // Get from web3forms.com
  formData.append('name', form.value.name)
  formData.append('email', form.value.email)
  formData.append('phone', form.value.contact)
  formData.append('message', form.value.message)
  formData.append('subject', `New Contact from ${form.value.name}`)

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      showSuccess.value = true
      // Reset form
      form.value = {
        name: '',
        email: '',
        contact: '',
        message: ''
      }
    } else {
      throw new Error(data.message || 'Failed to send')
    }

  } catch (error) {
    console.error('Error:', error)
    showError.value = true
  } finally {
    sending.value = false
  }
}
</script>