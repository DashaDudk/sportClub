<template>
  <div class="p-6 max-w-3xl mx-auto" id="contact">
    <h2 class="text-3xl font-bold mb-4 text-[#593a28]">Контакти</h2>
    <form class="space-y-4">
      <input type="tel" placeholder="Ваш номер телефону" class="w-full border p-2 rounded" />
      <input type="email" placeholder="Ваш Email" class="w-full border p-2 rounded" />

      <select class="w-full border p-2 rounded">
        <option disabled selected>Оберіть секцію</option>
        <option v-for="section in sections" :key="section.id">
          {{ section.name }}
        </option>
      </select>

      <select class="w-full border p-2 rounded">
        <option disabled selected>Оберіть тренера</option>
        <option v-for="trainer in trainers" :key="trainer.id">
          {{ trainer.name }}
        </option>
      </select>

      <textarea placeholder="Додатковий коментар" class="w-full border p-2 rounded h-24"></textarea>

      <button
        type="submit"
        class="bg-[#593a28] text-white px-4 py-2 rounded hover:bg-[#d9d2b0] hover:text-black transition"
      >
        Надіслати
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sections = ref([])
const trainers = ref([])

onMounted(async () => {
  try {
    const sectionsRes = await axios.get('http://localhost:3000/sections.json')
    sections.value = sectionsRes.data

    const trainersRes = await axios.get('http://localhost:3000/trainers.json')
    trainers.value = trainersRes.data
  } catch (error) {
    console.error('Помилка при завантаженні даних:', error)
  }
})
</script>
