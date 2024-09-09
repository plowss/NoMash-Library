<script setup>
import BHeader from './components/BHeader.vue';
</script>

<template>
  <header>
    <BHeader />
  </header>
  <main class="container">
    <router-view />
  </main>
</template>

<style>

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

</style>
