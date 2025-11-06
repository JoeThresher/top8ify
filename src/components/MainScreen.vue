<script setup lang="ts">
import { ref } from 'vue';
import CharacterSelect from './CharacterSelect.vue';
import OutputScreen from './OutputScreen.vue';

const characters = defineModel<string[]>('characters', {
  default: () => Array(8).fill(''),
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
    <CharacterSelect playerNumber="1" v-model:selectedCharacter="characters[0]" />
    <CharacterSelect playerNumber="2" v-model:selectedCharacter="characters[1]" />
    <CharacterSelect playerNumber="3" v-model:selectedCharacter="characters[2]" />
    <CharacterSelect playerNumber="4" v-model:selectedCharacter="characters[3]" />
    <CharacterSelect playerNumber="5" v-model:selectedCharacter="characters[4]" />
    <CharacterSelect playerNumber="6" v-model:selectedCharacter="characters[5]" />
    <CharacterSelect playerNumber="7" v-model:selectedCharacter="characters[6]" />
    <CharacterSelect playerNumber="8" v-model:selectedCharacter="characters[7]" />
  </div>
  <div>
    <OutputScreen />
  </div>
</template>
