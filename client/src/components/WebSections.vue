<template>
  <div class="sections-container">
    <h2 class="sections-title">Секції</h2>
    <div class="carousel-wrapper">
      <button @click="scrollLeft" class="arrow left">&lt;</button>

      <div ref="carousel" class="sections-carousel">
        <div
          v-for="section in sections"
          :key="section.id"
          class="section-card"
        >
          <h3 class="section-name">{{ section.name }}</h3>
          <p class="section-description">{{ section.description }}</p>
          <router-link
            :to="`/section/${section.id}`"
            class="section-link"
          >
            Детальніше
          </router-link>
        </div>
      </div>

      <button @click="scrollRight" class="arrow right">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sections = ref([])
const carousel = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/sections')
    sections.value = await response.json()
  } catch (error) {
    console.error('Помилка завантаження секцій:', error)
  }
})

const scrollLeft = () => {
  carousel.value.scrollBy({ left: -300, behavior: 'smooth' })
}

const scrollRight = () => {
  carousel.value.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>

<style scoped>
.sections-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-top: -288px;
  overflow: hidden;
}

.sections-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--hover-bg);
  margin-bottom: 2rem;
  text-align: center;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 1350px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.sections-carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 1rem;
  flex-grow: 1;
}

.section-card {
  min-width: 280px;
  max-width: 280px;
  padding: 2rem;
  border-radius: 1rem;
  border: 1.5px solid var(--hover-bg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex-shrink: 0;
  background: linear-gradient(270deg, #86a3ac, #bbe4ff, #b6d5da, #b2cbeb);
  background-size: 800% 800%;
  animation: gradientFlow 8s ease infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  border-color: var(--header-bg);
}

.section-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--header-bg);
  margin-bottom: 0.75rem;
}

.section-description {
  font-size: 1.8rem;
  color: #2f5262; 
  line-height: 1.6;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.section-link {
  display: inline-block;
  margin-top: 1rem;
  color: #0a1b23;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px; 
  transition: all 0.3s ease;
}

.section-link:hover {
  color: #ffffff;
  background-color: #46656F; 
}

.arrow {
  background-color: #46656F;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 1;
}

.arrow:hover {
  background-color: #2f5262;
}

.arrow.left {
  margin-right: 1rem;
}

.arrow.right {
  margin-left: 1rem;
}
</style>
