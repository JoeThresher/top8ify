<script setup lang="ts">
import CharacterSelect from './CharacterSelect.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
    <CharacterSelect playerNumber="1" />
    <CharacterSelect playerNumber="2" />
    <CharacterSelect playerNumber="3" />
    <CharacterSelect playerNumber="4" />
    <CharacterSelect playerNumber="5" />
    <CharacterSelect playerNumber="6" />
    <CharacterSelect playerNumber="7" />
    <CharacterSelect playerNumber="8" />
  </div>
</template>
