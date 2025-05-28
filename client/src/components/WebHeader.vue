<template>
  <header class="header">
    <div class="logo">
      <span class="logo-span">ActiveLife</span>
    </div>

    <nav class="nav-items">
      <ul>
         <li><a href="#home" class="menu-item" @click.prevent="scrollTo('home')">Головна</a></li>
        <li><a href="#sections" class="menu-item" @click.prevent="scrollTo('sections')">Секції</a></li>
        <li><a href="#media" class="menu-item" @click.prevent="scrollTo('media')">Медіа</a></li>
        <li><a href="#contact" class="menu-item" @click.prevent="scrollTo('contact')">Контакти</a></li>
        <li><a href="#faq" class="menu-item" @click.prevent="scrollTo('faq')">FAQ</a></li>
      </ul>
    </nav>

    <button class="admin-button" @click="showLogin = true">Адмін</button>
  </header>

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

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
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
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin')
    }, 1000) 
  } else {
    error.value = 'Неправильний логін або пароль'
    successMessage.value = ''
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Montserrat+Alternates:wght@400;600&display=swap');

:root {
  --main-bg: #D8DFE5;
  --header-bg: #8FABB7;
  --text-light: #FBFBFB;
  --hover-bg: #46656F;
}

body {
  background-color: var(--main-bg);
  color: var(--text-light);
  font-family: 'Montserrat Alternates', sans-serif;
  margin: 0;
}

.header {
  background-color: var(--header-bg);
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
  transition: all 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-span {
  font-family: 'Libre Caslon Display', serif;
  color: var(--text-light);
  font-size: 40px;
  cursor: default;
  transition: transform 0.3s ease;
}

.logo-span:hover {
  transform: scale(1.05);
}

.nav-items {
  display: flex;
  align-items: center;
}

.nav-items ul {
  display: flex;
  gap: 60px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  color: var(--text-light);
  text-decoration: none;
  font-size: 18px;
  position: relative;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.menu-item:hover {
  background-color: var(--hover-bg);
  transform: scale(1.05);
}

.menu-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: var(--text-light);
  transition: width 0.3s ease;
}

.menu-item:hover::after {
  width: 100%;
}

.admin-button {
  margin-left: 20px;
  padding: 6px 12px;
  background-color: var(--hover-bg);
  color: var(--text-light);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-family: 'Montserrat Alternates', sans-serif;
}

.admin-button:hover {
  background-color: var(--text-light);
  color: var(--hover-bg);
  transform: translateY(-1px);
}

.page-content {
  padding-top: 108px;
  background-color: var(--main-bg);
  color: var(--hover-bg);
  transition: padding-top 0.3s ease;
}

/* Модальне вікно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.modal-box {
  background-color: var(--header-bg);
  padding: 2rem;
  border-radius: 16px;
  width: 320px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: var(--text-light);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
}

.modal-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border: 1px solid var(--hover-bg);
  border-radius: 10px;
  background-color: var(--main-bg);
  color: var(--hover-bg);
  font-size: 1rem;
}

.modal-button {
  background-color: var(--hover-bg);
  color: var(--text-light);
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-button:hover {
  background-color: var(--text-light);
  color: var(--hover-bg);
}

.modal-error {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.modal-success {
  color: #122e40;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.modal-cancel {
  margin-top: 1rem;
  background: none;
  border: none;
  color: var(--hover-bg);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-cancel:hover {
  color: var(--text-light);
}

/* Адаптивність */
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
    margin-top: 10px;
  }

  .logo-span {
    font-size: 30px;
  }

  .admin-button {
    margin-top: 15px;
  }

  .page-content {
    padding-top: 140px;
  }
}
</style>




