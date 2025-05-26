<template>
  <div>
    <WebHeader />
    <section id="home"><WebHome /></section>
    <section id="sections"><WebSections /></section>
    <section id="contact"><WebContact /></section>
    <section id="faq"><WebFAQ /></section>
    <section id="media"><WebMedia /></section>
    
  </div>
</template>

<script setup>
import WebHeader from '../components/WebHeader.vue'
import WebHome from '../components/WebHome.vue'
import WebSections from '../components/WebSections.vue'
import WebContact from '../components/WebContact.vue'
import WebFAQ from '../components/WebFAQ.vue'
</script>

