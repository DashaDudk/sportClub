<template>
  <div id="admin-container">
    <div id="home-button">
      <router-link to="/">← НА ГОЛОВНУ</router-link>
    </div>

    <h1 id="admin-title">Адмін-панель</h1>

    <div id="main-content">
      <section id="sections">
        <h2>Секції</h2>
        <transition-group name="fade" tag="div">
          <div v-for="(section, index) in sections" :key="section.id ?? index" class="card">
            <div class="card-header" @click="section.isExpanded = !section.isExpanded">
              <h3>{{ section.title || 'Нова секція' }}</h3>
              <span :class="{ rotated: section.isExpanded }">▼</span>
            </div>
            <div v-if="section.isExpanded" class="card-body">
              <label>Тренери:</label>
              <select v-model="section.coachIds" multiple>
                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">{{ trainer.name }}</option>
              </select>

              <input v-model="section.title" placeholder="Назва секції" />
              <textarea v-model="section.description" placeholder="Опис секції"></textarea>
              <input v-model="section.hall" placeholder="Зал (назва)" />

              <div class="price-inputs">
                <input v-model="section.prices.group" placeholder="Групові" />
                <input v-model="section.prices.individual" placeholder="Індивідуальні" />
                <input v-model="section.prices.halfYear" placeholder="Півроку" />
              </div>

              <button class="delete-btn" @click="removeSection(index)"> Видалити</button>
            </div>
          </div>
        </transition-group>

        <button class="add-btn" @click="addSection"> Додати секцію</button>
      </section>

      <section id="trainers">
        <h2>Тренери</h2>
        <transition-group name="fade" tag="div">
          <div v-for="(trainer, index) in trainers" :key="trainer.id ?? index" class="card">
            <div class="card-header" @click="trainer.isExpanded = !trainer.isExpanded">
              <h3>👤 {{ trainer.name || 'Новий тренер' }}</h3>
              <span :class="{ rotated: trainer.isExpanded }">▼</span>
            </div>
            <div v-if="trainer.isExpanded" class="card-body">
              <input v-model="trainer.name" placeholder="Ім'я тренера" />
              <input v-model="trainer.experience" placeholder="Досвід (наприклад, 5 років)" />

              <label>Фото тренера:</label>
              <input type="file" @change="onFileChange($event, trainer)" />
              <img v-if="trainer.photo" :src="trainer.photo" alt="Фото" />

              <button class="delete-btn" @click="removeTrainer(index)">✖ Видалити</button>
            </div>
          </div>
        </transition-group>

        <button class="add-btn" @click="addTrainer"> Додати тренера</button>
      </section>
    </div>

    <div id="save-button-container">
      <button id="save-button" @click="saveAll"> Зберегти всі дані</button>
    </div>

    <section id="requests">
      <h2>Заявки від користувачів</h2>
      <div v-if="requests.length === 0" class="no-requests">Немає нових заявок</div>
      <ul>
        <li v-for="req in requests" :key="req.id" class="request-card">
          <p><b>📞 Телефон:</b> {{ req.phone }}</p>
          <p><b>📧 Email:</b> {{ req.email }}</p>
          <p><b>🏋️ Секція:</b> {{ req.section }}</p>
          <p><b>👤 Тренер:</b> {{ req.trainer }}</p>
          <p><b>💬 Коментар:</b> {{ req.comment || 'Немає' }}</p>
          <p><b>📅 Дата:</b> {{ new Date(req.date).toLocaleString() }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sections = ref([])
const trainers = ref([])
const requests = ref([])

// Завантаження секцій і тренерів з db.json (json-server)
onMounted(async () => {
  try {
    const [secRes, trRes] = await Promise.all([
      axios.get('http://localhost:3000/sections'),
      axios.get('http://localhost:3000/trainers')
    ])
    sections.value = secRes.data.map(s => ({
      ...s,
      prices: s.prices ?? { group: '', individual: '', halfYear: '' },
      coachIds: s.coachIds ?? [],
      isExpanded: false
    }))
    trainers.value = trRes.data
  } catch (err) {
    alert('Помилка при завантаженні')
    console.error(err)
  }
})

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/requests')
    requests.value = res.data
  } catch (error) {
    console.error(error)
  }
})

const addSection = () => {
  sections.value.push({
    title: '',
    description: '',
    hall: '',
    prices: { group: '', individual: '', halfYear: '' },
    coachIds: [],
     isExpanded: true
  })
}

const removeSection = async (index) => {
  const section = sections.value[index]
  if (section.id) {
    try {
      await axios.delete(`http://localhost:3000/sections/${section.id}`)
      sections.value.splice(index, 1)
    } catch (error) {
      alert('Помилка видалення секції: ' + error.message)
    }
  } else {
    // Якщо секція ще не має id, просто видаляємо локально
    sections.value.splice(index, 1)
  }
}

const addTrainer = () => {
  trainers.value.push({
    name: '',
    experience: '',
    photo: '',
    isExpanded: true
  })
}

const removeTrainer = async (index) => {
  const trainer = trainers.value[index]
  if (trainer.id) {
    try {
      await axios.delete(`http://localhost:3000/trainers/${trainer.id}`)
      trainers.value.splice(index, 1)
    } catch (error) {
      alert('Помилка видалення тренера: ' + error.message)
    }
  } else {
    trainers.value.splice(index, 1)
  }
}

// Map для збереження файлів, які завантажує користувач
const trainerFiles = new Map()

function onFileChange(event, trainer) {
  const file = event.target.files[0]
  if (file) {
    trainerFiles.set(trainer, file)

    // Прев’ю фото локально
    const reader = new FileReader()
    reader.onload = e => {
      trainer.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveAll = async () => {
  try {
    // Завантажуємо фото тренерів (якщо є)
    for (const trainer of trainers.value) {
      if (trainerFiles.has(trainer)) {
        const file = trainerFiles.get(trainer)
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post('http://localhost:3000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        trainer.photo = res.data.url
      }
    }

    // Зберігаємо секції (PUT для існуючих, POST для нових)
    for (const section of sections.value) {
      if (section.id) {
        await axios.put(`http://localhost:3000/sections/${section.id}`, section)
      } else {
        const res = await axios.post('http://localhost:3000/sections', section)
        section.id = res.data.id
      }
    }

    // Зберігаємо тренерів (PUT для існуючих, POST для нових)
    for (const trainer of trainers.value) {
      if (trainer.id) {
        await axios.put(`http://localhost:3000/trainers/${trainer.id}`, trainer)
      } else {
        const res = await axios.post('http://localhost:3000/trainers', trainer)
        trainer.id = res.data.id
      }
    }

    alert(' Дані збережено успішно')
  } catch (error) {
    console.error('Помилка збереження:', error)
    alert(' Помилка при збереженні: ' + error.message)
  }
}
</script>

<style scoped>
/* Загальні стилі */
#admin-container {
  width: 100vw;
  height: 100vh;
  padding: 1.5rem 1rem; 
  box-sizing: border-box;
  color: #46656F;
  display: flex;
  flex-direction: column;
  gap: 2rem; 
  overflow-y: auto;
  align-items: center;
  background-color: #FBFBFB;
  font-family: 'Montserrat Alternates', sans-serif;
}

/* Кнопка на головну - без змін */
#home-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
}
#home-button a {
  background-color: #46656F;
  color: #FBFBFB;
  padding: 0.6rem 1.3rem; 
  font-weight: 700;
  font-size: 1.1rem; 
  border-radius: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
#home-button a:hover {
  background-color: #8FABB7;
}

/* Заголовок */
#admin-title {
  font-size: 2.0rem;
  font-weight: 900;
  text-align: center;
  color: #46656F;
  text-shadow: 0 2px 4px rgba(141, 155, 165, 0.2); 
}

/* Основний контент */
#main-content {
  display: flex;
  flex-wrap: nowrap; 
  gap: 15rem; 
  justify-content: center;
  width: 100%;
  max-width: 1100px; 
  padding: 0 2rem;
}

/* Секції і тренери */
#sections, #trainers {
  background: #D8DFE5;
  border: 2px solid #8FABB7;
  border-radius: 0.7rem;
  padding: 1.5rem; 
  box-shadow: 3px 3px 10px rgba(70, 101, 111, 0.15); 
  width: 420px; 
  display: flex;
  flex-direction: column;
  gap: 1rem; 
  color: #46656F;
}

/* Заголовки секцій */
#sections h2, #trainers h2 {
  font-size: 1.4rem;
  font-weight: 800;
  font-style: normal;
  border-bottom: 2px solid #46656F; 
  padding-bottom: 0.4rem;
  margin-bottom: 1rem;
  color: #46656F;
}

/* Карточка секції/тренера */
.card {
  border: 1px solid #8FABB7; 
  border-radius: 1rem;
  padding: 1rem;
  background-color: #FBFBFB;
  box-shadow: 1.5px 1.5px 7px rgba(143, 171, 183, 0.2); 
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  font-weight: 500;
  font-style: normal;
  color: #46656F;
}
.card:hover {
  box-shadow: 3px 3px 12px rgba(70, 101, 111, 0.3);
}

/* Хедер карточки */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-style: italic;
  font-size: 0.8rem; 
  user-select: none;
  color: #46656F;
}
.card-header span {
  display: inline-block;
  transition: transform 0.3s ease;
  font-weight: 900;
  color: #8FABB7;
}
.card-header span.rotated {
  transform: rotate(180deg);
}

/* Тіло карточки */
.card-body {
  margin-top: 0.8rem; 
  display: flex;
  flex-direction: column;
  gap: 0.8rem; 
}

input, select, textarea {
  width: 100%;
  padding: 0.5rem 0.75rem; 
  border: 1px solid #8FABB7; 
  border-radius: 1rem;
  font-size: 0.9rem; 
  font-family: 'Montserrat Alternates', sans-serif;
  color: #46656F;
  background-color: #FBFBFB;
  transition: border-color 0.3s ease;
}
input:focus, select:focus, textarea:focus {
  border-color: #46656F;
  outline: none;
  font-weight: 700;
}

/* Кнопки */
.delete-btn {
  background-color: #D8DFE5;
  color: #46656F;
  border: 2px solid #8FABB7;
  padding: 0.4rem 0.8rem; 
  font-weight: 700;
  border-radius: 1rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}
.delete-btn:hover {
  background-color: #8FABB7;
  color: #FBFBFB;
}

.add-btn {
  background-color: #46656F;
  color: #FBFBFB;
  border: none;
  padding: 0.6rem 1.2rem; 
  font-weight: 800;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  font-size: 0.9rem;
}
.add-btn:hover {
  background-color: #8FABB7;
}

/* Кнопка збереження */
#save-button-container {
  margin-top: 1rem;
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
}
#save-button {
  background-color: #46656F;
  color: #FBFBFB;
  border: none;
  padding: 0.8rem 2.5rem; 
  font-weight: 900;
  border-radius: 2rem;
  font-size: 1.3rem; 
  cursor: pointer;
  transition: background-color 0.3s ease;
}
#save-button:hover {
  background-color: #8FABB7;
}

/* Заявки */
#requests {
  width: 100%;
  max-width: 1100px;
  color: #46656F;
  margin-top: 2rem;
}
#requests h2 {
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid #46656F;
  padding-bottom: 0.3rem;
}
.no-requests {
  font-style: italic;
  color: #8FABB7;
  text-align: center;
  margin-bottom: 1.5rem;
}
.request-card {
  background-color: #D8DFE5;
  border-radius: 1rem;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 1.5px 1.5px 7px rgba(143, 171, 183, 0.2);
  font-weight: 600;
}
</style>