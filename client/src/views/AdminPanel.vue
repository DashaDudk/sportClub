<template>
  <div class="p-6 max-w-6xl mx-auto bg-[#D9D6C7] min-h-screen text-[#403332] font-sans transition-all duration-300">
    <router-link
      to="/"
      class="inline-block mb-6 px-4 py-2 bg-[#A67B56] hover:bg-[#8c6344] text-white font-semibold rounded shadow transition"
    >
      ← На головну
    </router-link>

    <h1 class="text-4xl font-bold mb-8 text-center drop-shadow-lg tracking-wide" style="font-family: 'Georgia', serif;">
      Адмін-панель
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Секції -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Секції</h2>
        <transition-group name="fade" tag="div">
          <div
            v-for="(section, index) in sections"
            :key="section.id"
            class="p-4 mb-4 rounded shadow bg-[#f4f1e6] transition-all duration-300"
          >
            <label class="block mb-1 font-semibold">Тренери:</label>
            <select v-model="section.coachIds" multiple class="input h-28">
              <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
                {{ trainer.name }}
              </option>
            </select>

            <input v-model="section.title" class="input" placeholder="Назва секції" />
            <textarea v-model="section.description" class="input" placeholder="Опис секції"></textarea>
            <input v-model="section.hall" class="input" placeholder="Зал (назва)" />
            <input v-model="section.hallImage" class="input" placeholder="Зображення залу (URL)" />

            <div class="grid grid-cols-3 gap-2 my-2">
              <input v-model="section.prices.group" class="input" placeholder="Групові" />
              <input v-model="section.prices.individual" class="input" placeholder="Індивідуальні" />
              <input v-model="section.prices.halfYear" class="input" placeholder="Півроку" />
            </div>

            <button @click="removeSection(index)" class="btn bg-red-500 hover:bg-red-600 text-white">
              🗑 Видалити секцію
            </button>
          </div>
        </transition-group>

        <button @click="addSection" class="btn bg-green-600 hover:bg-green-700 text-white mt-2">
           Додати секцію
        </button>
      </div>
    </div>
      <!-- Тренери -->
    <div>
  <h2 class="text-2xl font-semibold mb-4">Тренери</h2>
  <transition-group name="fade" tag="div">
    <div
      v-for="(trainer, index) in trainers"
      :key="trainer.id"
      class="p-4 mb-4 rounded shadow bg-[#f4f1e6] transition-all duration-300"
    >
      <input v-model="trainer.name" class="input" placeholder="Ім'я тренера" />
      <input v-model="trainer.experience" class="input" placeholder="Досвід (наприклад, 5 років)" />

      <label class="block mb-1 font-semibold">Фото тренера:</label>
      <input type="file" @change="handleImageUpload($event, trainer)" class="mb-2" />
      <img v-if="trainer.photo" :src="trainer.photo" alt="Фото" class="w-24 h-24 object-cover rounded mb-2 border" />

      <button @click="removeTrainer(index)" class="btn bg-red-500 hover:bg-red-600 text-white mt-2">
        ✖ Видалити тренера
      </button>
    </div>
  </transition-group>
  <button @click="addTrainer" class="btn bg-green-600 hover:bg-green-700 text-white mt-2">
    Додати тренера
  </button>
</div>

    <!-- Зберегти -->
    <div class="text-center mt-10">
      <button
        @click="saveAll"
        class="btn bg-[#403332] hover:bg-[#2d2423] text-white px-8 py-3 rounded shadow-lg text-lg transition"
      >
         Зберегти всі дані
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sections = ref([])
const trainers = ref([])

onMounted(async () => {
  try {
    const [secRes, trRes] = await Promise.all([
      axios.get('http://localhost:3000/sections.json'),
      axios.get('http://localhost:3000/trainers.json')
    ])
    // Страхуємо від помилок структури
    sections.value = secRes.data.map((s) => ({
      ...s,
      prices: s.prices ?? { group: '', individual: '', halfYear: '' },
      coachIds: s.coachIds ?? []
    }))
    trainers.value = trRes.data
  } catch (err) {
    alert('Помилка при завантаженні')
    console.error(err)
  }
})

const addSection = () => {
  sections.value.push({
    id: Date.now(),
    title: '',
    description: '',
    hall: '',
    hallImage: '',
    prices: { group: '', individual: '', halfYear: '' },
    coachIds: []
  })
}

const removeSection = (index) => {
  sections.value.splice(index, 1)
}

const addTrainer = () => {
  trainers.value.push({ id: Date.now(), name: '', experience: '', photo: '' })
}

const removeTrainer = (index) => {
  trainers.value.splice(index, 1)
}

const saveAll = async () => {
  try {
    for (const section of sections.value) {
      if (typeof section.id === 'number') {
        // Існуючий елемент — оновлення
        await axios.put(`http://localhost:3000/sections/${section.id}`, section)
      } else {
        // Новий елемент — створення
        const res = await axios.post(`http://localhost:3000/sections`, section)
        // оновити id в локальному масиві
        section.id = res.data.id
      }
    }

    for (const trainer of trainers.value) {
      if (typeof trainer.id === 'number') {
        await axios.put(`http://localhost:3000/trainers/${trainer.id}`, trainer)
      } else {
        const res = await axios.post(`http://localhost:3000/trainers`, trainer)
        trainer.id = res.data.id
      }
    }

    alert('✅ Дані збережено успішно')
  } catch (error) {
    console.error('Помилка збереження:', error)
    alert('❌ Помилка при збереженні: ' + error.message)
  }
}

const handleImageUpload = (event, trainer) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    trainer.photo = reader.result // base64 string
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid #A67B56;
  border-radius: 6px;
  background-color: #fff;
  font-size: 1rem;
  transition: border 0.2s ease;
}
.input:focus {
  border-color: #403332;
  outline: none;
  box-shadow: 0 0 0 2px #d9c49c66;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>