<template>
  <div class="faq-wrapper" id="faq">
    <h2>Часті запитання</h2>
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <button @click="toggle(index)" :aria-expanded="openIndex === index">
        <span>{{ faq.question }}</span>
        <svg
          :class="{ open: openIndex === index }"
          class="chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div v-if="openIndex === index" class="answer">
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'Як записатись на секцію?',
    answer: 'Перейдіть до розділу "Секції", оберіть секцію, впишіть свої дані — і наш адміністратор з вами звʼяжеться.',
  },
  {
    question: 'Чи можна записати дитину до кількох секцій одночасно?',
    answer: 'Так, ви можете подати заявку до кількох секцій. Кожну заявку треба оформити окремо.',
  },
  {
    question: 'Яка вартість занять?',
    answer: 'Вартість залежить від секції та обраного тренера. Деталі — у розділі "Секції" після натискання "Детальніше".',
  },
  {
    question: 'Який вік потрібен для запису?',
    answer: 'У кожної секції — свій віковий діапазон. Ця інформація вказана у деталях секції.',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');

.faq-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 100vh;
  margin-top: -300px;
}

h2 {
  color: var(--hover-bg);
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  user-select: none;
  font-family: 'Montserrat Alternates', sans-serif;
}

.faq-item {
  border-bottom: 1px solid rgba(70, 101, 111, 0.2);
  padding: 1rem 0;
}

button {
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--hover-bg); /* Тепер колір як у заголовка */
  cursor: pointer;
  transition: color 0.25s ease;
}

button:hover {
  color: var(--header-bg); /* Трохи світліше при наведенні */
}

.chevron {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.answer {
  margin-top: 0.8rem;
  font-size: 1rem;
  color: #333;
  background: #f4f7fc;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--hover-bg);
  border-radius: 4px;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
