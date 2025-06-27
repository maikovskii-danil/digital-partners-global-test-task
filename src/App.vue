<template>
  <TheNavbar :visible="userStore.isLoggedIn" />
  <div class="flex justify-center">
    <router-view #="{ Component: Page }">
      <Transition
        appear
        name="opacity"
        mode="out-in"
      >
        <Component :is="Page" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './TheNavbar.vue';
import useUserStore from './stores/user';

const userStore = useUserStore();
</script>
