<template>
  <div class="p-6 max-w-4xl mx-auto" v-if="section">
    <h1 class="text-3xl font-bold text-[#593a28] mb-6">{{ section.name }}</h1>

    <!-- Фото залу -->
    <img v-if="section.hallImage" :src="section.hallImage" alt="Зал" class="mt-4 w-full max-h-80 object-cover rounded shadow" />

    <!-- Інформація про зал -->
    <div class="mt-6">
      <h2 class="text-2xl font-semibold text-[#0d0000] mb-2">Зал</h2>
      <p class="text-gray-700">{{ section.hall }}</p>
    </div>

    <!-- Таблиця цін -->
    <div class="mt-6">
      <h2 class="text-2xl font-semibold text-[#0d0000] mb-2">Ціни</h2>
      <table class="table-auto mt-2 w-full border text-left">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 border">Тип</th>
            <th class="px-4 py-2 border">Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border">Групові</td>
            <td class="px-4 py-2 border">{{ section.prices.group }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">Індивідуальні</td>
            <td class="px-4 py-2 border">{{ section.prices.individual }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">Піврічні</td>
            <td class="px-4 py-2 border">{{ section.prices.halfYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Тренери -->
    <div class="mt-6">
      <h2 class="text-2xl font-semibold text-[#0d0000] mb-4">Тренери</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="trainer in filteredTrainers"
          :key="trainer.id"
          class="border rounded p-4 shadow"
        >
          <img :src="trainer.photo" class="h-40 w-full object-cover rounded mb-2" />
          <h3 class="font-bold text-lg">{{ trainer.name }}</h3>
          <p class="text-sm text-gray-600">Досвід: {{ trainer.experience }}</p>
          <p class="text-sm mt-2">{{ trainer.advantages }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center p-6">Секція не знайдена.</div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const section = ref(null)
const allTrainers = ref([])

const filteredTrainers = computed(() => {
  if (!section.value || !section.value.coachIds) return []
  return allTrainers.value.filter(t => section.value.coachIds.includes(t.id))
})

onMounted(async () => {
  try {
    const [sectionsRes, trainersRes] = await Promise.all([
      fetch('http://localhost:3000/sections'),
      fetch('http://localhost:3000/trainers')
    ])

    const sectionsData = await sectionsRes.json()
    allTrainers.value = await trainersRes.json()

    const sectionId = parseInt(route.params.id)
    const foundSection = sectionsData.find(s => s.id === sectionId)

    if (foundSection) {
      section.value = foundSection
    }
  } catch (error) {
    console.error('Помилка завантаження секції:', error)
  }
})
</script>
