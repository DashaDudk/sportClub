<template>
  <div class="section-container" v-if="section">
    <h1 class="section-title">{{ section.name }}</h1>

    <img
      v-if="section.hallImage"
      :src="section.hallImage"
      alt="Зал"
      class="hall-image"
    />

    <div class="section-block">
      <h2 class="block-title">Зал</h2>
      <p class="block-text">{{ section.hall }}</p>
    </div>

    <div class="section-block">
      <h2 class="block-title">Ціни</h2>
      <table class="price-table">
        <thead>
          <tr>
            <th>Тип</th>
            <th>Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Групові</td>
            <td>{{ section.prices.group }}</td>
          </tr>
          <tr>
            <td>Індивідуальні</td>
            <td>{{ section.prices.individual }}</td>
          </tr>
          <tr>
            <td>Піврічні</td>
            <td>{{ section.prices.halfYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <h2 class="block-title">Тренери</h2>
      <div class="trainers-grid">
        <div
          v-for="trainer in filteredTrainers"
          :key="trainer.id"
          class="trainer-card"
        >
          <img :src="trainer.photo" class="trainer-photo" />
          <h3 class="trainer-name">{{ trainer.name }}</h3>
          <p class="trainer-experience">Досвід: {{ trainer.experience }}</p>
          <p class="trainer-advantages">{{ trainer.advantages }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">Секція не знайдена.</div>
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

<style scoped>
.section-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(to bottom right, #FBFBFB, #D8DFE5);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(70, 101, 111, 0.2);
  animation: fadeIn 0.8s ease;
}

.section-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #46656F;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: slideDown 0.6s ease;
}

.hall-image {
  width: 100%;
  max-width: 600px;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(70, 101, 111, 0.15);
  margin: 1.5rem auto;
  display: block;
  animation: fadeIn 1s ease;
}

.section-block {
  margin-top: 2rem;
  animation: fadeUp 0.6s ease;
}

.block-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #46656F;
  margin-bottom: 0.8rem;
}

.block-text {
  color: #8FABB7;
  font-size: 1rem;
  line-height: 1.6;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #FBFBFB;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(70, 101, 111, 0.1);
}

.price-table th,
.price-table td {
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid #D8DFE5;
  color: #46656F;
}

.price-table th {
  background-color: #8FABB7;
  color: #FBFBFB;
  font-weight: 600;
}

.trainers-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .trainers-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.trainer-card {
  background-color: #FBFBFB;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(70, 101, 111, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeUp 0.5s ease;
  color: #46656F;
}

.trainer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(70, 101, 111, 0.25);
}

.trainer-photo {
  height: 160px;
  width: 100%;
  max-width: 280px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.trainer-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #46656F;
  text-align: center;
}

.trainer-experience {
  font-size: 0.9rem;
  color: #8FABB7;
  margin-top: 0.2rem;
  text-align: center;
}

.trainer-advantages {
  font-size: 0.95rem;
  margin-top: 0.5rem;
  color: #46656F;
  text-align: center;
}

.not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.3rem;
  color: #8FABB7;
  animation: fadeIn 0.8s ease;
}

/* Анімації */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
