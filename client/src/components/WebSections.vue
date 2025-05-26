<template>
  <div class="p-6 max-w-6xl mx-auto" id="sections">
    <h2 class="text-3xl font-bold mb-4 text-[#593a28]">Секції</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="section in sections" :key="section.id" class="border p-4 rounded shadow hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-[#0d0000]">{{ section.name }}</h3>
        <p class="text-sm text-gray-600">{{ section.description }}</p>
        <router-link :to="`/section/${section.id}`" class="inline-block mt-2 text-[#593a28] hover:text-[#d9d2b0]">
          Детальніше
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sections = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/sections.json') // заміни порт, якщо інший
    const data = await response.json()
    sections.value = data
  } catch (error) {
    console.error('Помилка завантаження секцій:', error)
  }
})
</script>

