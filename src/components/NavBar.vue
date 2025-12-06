<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import ThemeChanger from './ThemeChanger.vue';
</script>

<template>
  <div class="navbar sticky top-0">
    <div class="flex-1"></div>
    <div class="flex-none">
      <ThemeChanger />
    </div>
  </div>
</template>
