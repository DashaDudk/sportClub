<template>
  <div>
    <WebHeader />
    <main class="home-section">
      <section id="home"><WebHome /></section>
      <section id="sections"><WebSections /></section>
      <section id="contact"><WebContact /></section>
      <section id="faq"><WebFAQ /></section>
      <section id="media"><WebMedia /></section>
    </main>
  </div>
</template>


<script setup>
import WebHeader from '../components/WebHeader.vue'
import WebHome from '../components/WebHome.vue'
import WebMedia from '../components/WebMedia.vue'
import WebSections from '../components/WebSections.vue'
import WebContact from '../components/WebContact.vue'
import WebFAQ from '../components/WebFAQ.vue'
</script>

<style scoped>
.home-section {
  display: flex;
  flex-direction: column;
  align-items: center;    
  justify-content: center; 
  max-width: 1200px;       
  margin: 0 auto;          
  padding: 2rem 1rem;      
  gap: 4rem;              
}
</style>
