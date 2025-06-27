<template>
  <TheNavbar visible />
  <div class="flex justify-center">
    <MainPage />
  </div>
</template>

<script setup lang="ts">
import MainPage from './views/MainPage.vue';
import TheNavbar from './TheNavbar.vue';
</script>
