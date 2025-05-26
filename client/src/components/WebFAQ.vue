<template>
  <div class="p-6 max-w-4xl mx-auto" id="faq">
    <h2 class="text-3xl font-bold mb-4 text-[#593a28]">Часті запитання</h2>
    <div v-for="(faq, index) in faqs" :key="index" class="mb-2 border-b pb-2">
      <button @click="toggle(index)" class="w-full text-left font-semibold text-lg text-[#593a28]">
        {{ faq.question }}
      </button>
      <div v-if="openIndex === index" class="mt-2 text-[#0d0000]">
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
button:hover {
  color: #d9d2b0;
}
</style>
