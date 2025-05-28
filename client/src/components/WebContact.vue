<template>
  <div class="contact-form-container" id="contact">
    <h2 class="section-title">Контакти</h2>
    <form class="contact-form">
      <input type="tel" placeholder="Ваш номер телефону" class="form-input" />
      <input type="email" placeholder="Ваш Email" class="form-input" />

      <select class="form-input">
        <option disabled selected>Оберіть секцію</option>
        <option v-for="section in sections" :key="section.id">
          {{ section.name }}
        </option>
      </select>

      <select class="form-input">
        <option disabled selected>Оберіть тренера</option>
        <option v-for="trainer in trainers" :key="trainer.id">
          {{ trainer.name }}
        </option>
      </select>

      <textarea placeholder="Додатковий коментар" class="form-textarea"></textarea>

      <button type="submit" class="form-button">
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

<style scoped>
:root {
  --hover-bg: #2d9cdb;
  --header-bg: #1c658c;
  --text-light: #ffffff;
}

.contact-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-top: 100px; /* або інше значення */
}

.section-title {
  color: var(--hover-bg);
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--hover-bg);
  border-radius: 8px;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--header-bg);
  background-color: #f3f3f3;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-button {
  display: inline-block;
  background-color: #e6f0f3;
  color: #1e2b33;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Montserrat Alternates';
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.form-button:hover {
  background-color: #2a4d5e;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}


select {
  appearance: none;
  background-color: #d8e6ec; /* ніжно-голубий */
  border: 1px solid var(--header-bg);
  color: #2e3a40;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Montserrat Alternates', sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

select:focus {
  outline: none;
  border-color: var(--hover-bg);
  background-color: #e3edf2;
}

</style>
