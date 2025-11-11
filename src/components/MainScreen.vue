<script setup lang="ts">
import { ref } from 'vue';
import CharacterSelect from './CharacterSelect.vue';
import OutputScreen from './OutputScreen.vue';

const characters = ref<string[]>(Array(8).fill(''));
const playerNames = ref<string[]>(Array(8).fill(''));
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
    <CharacterSelect
      playerNumber="1"
      v-model:selectedCharacter="characters[0]"
      v-model:playerName="playerNames[0]"
    />
    <CharacterSelect
      playerNumber="2"
      v-model:selectedCharacter="characters[1]"
      v-model:playerName="playerNames[1]"
    />
    <CharacterSelect
      playerNumber="3"
      v-model:selectedCharacter="characters[2]"
      v-model:playerName="playerNames[2]"
    />
    <CharacterSelect
      playerNumber="4"
      v-model:selectedCharacter="characters[3]"
      v-model:playerName="playerNames[3]"
    />
    <CharacterSelect
      playerNumber="5"
      v-model:selectedCharacter="characters[4]"
      v-model:playerName="playerNames[4]"
    />
    <CharacterSelect
      playerNumber="6"
      v-model:selectedCharacter="characters[5]"
      v-model:playerName="playerNames[5]"
    />
    <CharacterSelect
      playerNumber="7"
      v-model:selectedCharacter="characters[6]"
      v-model:playerName="playerNames[6]"
    />
    <CharacterSelect
      playerNumber="8"
      v-model:selectedCharacter="characters[7]"
      v-model:playerName="playerNames[7]"
    />
  </div>
  <p>DEBUG: Characters selected: {{ characters }}</p>
  <p>DEBUG: Player names: {{ playerNames }}</p>
  <div>
    <OutputScreen :playerNames="playerNames" :characters="characters" />
  </div>
</template>
