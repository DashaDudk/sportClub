<template>
  <header class="header">
    <div class="logo">
      <span class="logo-span">ActiveLife</span>
    </div>

    <nav class="nav-items">
      <ul>
        <li><a href="#home" class="menu-item">Головна</a></li>
        <li><a href="#sections" class="menu-item">Секції</a></li>
        <li><a href="#media" class="menu-item" @click.prevent="scrollToMedia">Медіа</a></li>
        <li><a href="#contact" class="menu-item">Контакти</a></li>
        <li><a href="#faq" class="menu-item">FAQ</a></li>
      </ul>
    </nav>

    <!-- Кнопка для відкриття модального вікна -->
    <button class="admin-button" @click="showLogin = true">Адмін</button>
  </header>

  <!-- 🟦 Модальне вікно -->
  <div v-if="showLogin" class="modal-overlay">
    <div class="modal-box">
      <h2 class="modal-title">Вхід адміністратора</h2>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Логін" class="modal-input" />
        <input v-model="password" type="password" placeholder="Пароль" class="modal-input" />
        <button type="submit" class="modal-button">Увійти</button>
        <p v-if="error" class="modal-error">{{ error }}</p>
        <p v-if="successMessage" class="modal-success">{{ successMessage }}</p>
      </form>
      <button @click="showLogin = false" class="modal-cancel">Скасувати</button>
    </div>
  </div>

  <main class="page-content">
    <section id="home">
      <h1>Ласкаво просимо на ActiveLife</h1>
      <!-- решта контенту -->
    </section>

    <section id="sections">
      <!-- розділ "Секції" -->
    </section>

    <section id="media">
      <!-- розділ "Медіа" -->
    </section>

    <section id="contact">
      <!-- розділ "Контакти" -->
    </section>

    <section id="faq">
      <!-- розділ "FAQ" -->
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showLogin = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')
const successMessage = ref('')

const router = useRouter()

const scrollToMedia = () => {
  setTimeout(() => {
    document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' });
  }, 100)
}

const login = () => {
  if (username.value === 'admin' && password.value === '1234') {
    successMessage.value = 'Успішний вхід!'
    error.value = ''

    setTimeout(() => {
      showLogin.value = false
      successMessage.value = ''
      username.value = ''
      password.value = ''
      // Зберігаємо стан авторизації (наприклад, в localStorage)
      localStorage.setItem('isAdmin', 'true')
      // Перенаправляємо на адмін-панель
      router.push('/admin')
    }, 1000) // Затримка 1 секунда, щоб показати повідомлення
  } else {
    error.value = 'Неправильний логін або пароль'
    successMessage.value = ''
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Montserrat+Alternates:wght@400;600&display=swap');

:root {
  --main-dark: #1F2E29;
  --accent: #98A69A;
  --muted: #697368;
  --deep-dark: #17211B;
  --almost-black: #0D0909;
}

body {
  background-color: var(--main-dark);
  color: var(--accent);
  font-family: 'Montserrat Alternates', sans-serif;
}

.header {
  background-color: var(--deep-dark);
  height: 108px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.admin-button {
  margin-left: 20px;
  padding: 6px 12px;
  background-color: var(--almost-black);
  color: var(--accent);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-button:hover {
  background-color: var(--muted);
  color: var(--deep-dark);
}

.logo {
  display: flex;
  gap: 15px;
  align-items: center;
}

.logo-span {
  font-family: 'Libre Caslon Display', serif;
  color: var(--accent);
  font-size: 40px;
  cursor: default;
}

.nav-items {
  display: flex;
  align-items: center;
}

.nav-items ul {
  display: flex;
  gap: 60px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  font-family: 'Montserrat Alternates', sans-serif;
  color: var(--accent);
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  position: relative;
}

.menu-item:hover {
  color: var(--muted);
  transform: scale(1.05);
}

.menu-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: var(--accent);
  transition: width 0.3s ease;
}

.menu-item:hover::after {
  width: 100%;
}

.page-content {
  padding-top: 108px;
  background-color: var(--main-dark);
  color: var(--accent);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: var(--deep-dark);
  padding: 2rem;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: var(--accent);
}

.modal-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border: 1px solid var(--muted);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--main-dark);
  color: var(--accent);
}

.modal-button {
  background-color: var(--muted);
  color: var(--main-dark);
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
}

.modal-button:hover {
  background-color: var(--accent);
  color: var(--almost-black);
}

.modal-error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.modal-cancel {
  margin-top: 1rem;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 0.9rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }

  .nav-items ul {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .logo-span {
    font-size: 30px;
  }

  .page-content {
    padding-top: 140px;
  }
}
</style>

