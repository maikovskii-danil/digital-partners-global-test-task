<template>
  <Transition
    appear
    name="opacity"
    mode="out-in"
  >
    <header
      v-if="visible"
      :class="[
        'flex items-center justify-between',
        'h-28 px-8 mb-20',
        'shadow-xl/20',
        'bg-gray-700',
      ]"
    >
      <h1 class="cursor-default text-3xl font-bold text-blue-100">
        <button>Vue.js App</button>
      </h1>
    </header>
    <div
      v-else
      class="h-28 mb-20"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>();
</script>
