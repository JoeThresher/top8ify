<script setup lang="ts">
import { ref } from 'vue';
import CharacterSelect from './CharacterSelect.vue';
import OutputScreen from './OutputScreen.vue';
import fetchTournamentDetails from '../utils/api';

const characters = ref<string[]>(Array(8).fill(''));
const playerNames = ref<string[]>(Array(8).fill(''));
const characterColors = ref<string[]>(Array(8).fill(''));
const url = ref<string>('');
const token = ref<string>('');
const tournamentTitle = ref<string>('');

async function fetchStartGGData() {
  const tournmanetDetails = await fetchTournamentDetails(url.value, token.value);
  tournamentTitle.value = tournmanetDetails.name;
  for (let i = 0; i < 8; i++) {
    playerNames.value[i] = tournmanetDetails.standings[i] ?? '';
  }
}
</script>

<template>
  <div class="p-4 space-y-4 m-4 grid place-items-center">
    <p>Start GG Import</p>
    <input type="text" placeholder="Enter Start GG URL here" class="input" v-model="url" />
    <input type="text" placeholder="Start GG Token" class="input" v-model="token" />
    <button class="btn" @click="fetchStartGGData()">Fetch StartGG Data</button>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <CharacterSelect
        playerNumber="1"
        v-model:selectedCharacter="characters[0]"
        v-model:playerName="playerNames[0]"
        v-model:characterColor="characterColors[0]"
      />
      <CharacterSelect
        playerNumber="2"
        v-model:selectedCharacter="characters[1]"
        v-model:playerName="playerNames[1]"
        v-model:characterColor="characterColors[1]"
      />
      <CharacterSelect
        playerNumber="3"
        v-model:selectedCharacter="characters[2]"
        v-model:playerName="playerNames[2]"
        v-model:characterColor="characterColors[2]"
      />
      <CharacterSelect
        playerNumber="4"
        v-model:selectedCharacter="characters[3]"
        v-model:playerName="playerNames[3]"
        v-model:characterColor="characterColors[3]"
      />
      <CharacterSelect
        playerNumber="5"
        v-model:selectedCharacter="characters[4]"
        v-model:playerName="playerNames[4]"
        v-model:characterColor="characterColors[4]"
      />
      <CharacterSelect
        playerNumber="6"
        v-model:selectedCharacter="characters[5]"
        v-model:playerName="playerNames[5]"
        v-model:characterColor="characterColors[5]"
      />
      <CharacterSelect
        playerNumber="7"
        v-model:selectedCharacter="characters[6]"
        v-model:playerName="playerNames[6]"
        v-model:characterColor="characterColors[6]"
      />
      <CharacterSelect
        playerNumber="8"
        v-model:selectedCharacter="characters[7]"
        v-model:playerName="playerNames[7]"
        v-model:characterColor="characterColors[7]"
      />
    </div>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-4">
      <legend class="fieldset-legend">Config</legend>

      <label class="label">Tournament Title</label>
      <input type="text" class="input" placeholder="Tournament Title" v-model="tournamentTitle" />

      <label class="label">Information</label>
      <input
        type="text"
        class="input"
        placeholder="16 Entrants - 704 W. High St, Urbana, IL 61801"
      />

      <label class="label">URL</label>
      <input type="text" class="input" placeholder="https://start.gg/prodigy" />
    </fieldset>
  </div>

  <p>DEBUG: Characters selected: {{ characters }}</p>
  <p>DEBUG: Player names: {{ playerNames }}</p>
  <p>DEBUG: Character colors: {{ characterColors }}</p>
  <div class="grid place-items-center">
    <OutputScreen
      :playerNames="playerNames"
      :characters="characters"
      :characterColors="characterColors"
      :tournamentTitle="tournamentTitle"
    />
  </div>
</template>
