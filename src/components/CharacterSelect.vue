<script setup lang="ts">
import { get } from 'http';
import { ref, watch } from 'vue';

const props = defineProps({ playerNumber: String });

function getPlayerNumber() {
  switch (props.playerNumber) {
    case '1':
      return 'First Player';
    case '2':
      return 'Second Player';
    case '3':
      return 'Third Player';
    case '4':
      return 'Fourth Player';
    case '5':
      return 'Fifth Player';
    case '6':
      return 'Sixth Player';
    case '7':
      return 'Seventh Player';
    case '8':
      return 'Eighth Player';
    default:
      return 'Player';
  }
}

const characters = [
  'Bowser',
  'Captain Falcon',
  'Donkey Kong',
  'Dr. Mario',
  'Fox',
  'Falco',
  'Ganondorf',
  'Ice Climbers',
  'Jigglypuff',
  'Kirby',
  'Link',
  'Luigi',
  'Mario',
  'Marth',
  'Mewtwo',
  'Mr. Game & Watch',
  'Ness',
  'Peach',
  'Pichu',
  'Pikachu',
  'Roy',
  'Samus',
  'Sheik',
  'Yoshi',
  'Young Link',
  'Zelda',
];

const playerLabel = getPlayerNumber();
const playerName = defineModel<string>('playerName');
const selectedCharacter = defineModel<string>('selectedCharacter');
const characterColor = defineModel<string>('characterColor');
const characterColorOptions = ref<string[]>(getCharacterColorOptions(selectedCharacter.value));

watch(characterColor, getCharacterColorOptions);

function getCharacterColorOptions(currentCharacter: string | undefined): string[] {
  switch (currentCharacter) {
    case 'Fox':
    case 'Falco':
    case 'Pikachu':
    case 'Samus':
      return ['Neutral', 'Red', 'Blue', 'Green', 'Yellow'];
    case 'Mario':
    case 'Luigi':
    case 'Peach':
      return ['Neutral', 'Red', 'Blue', 'Green'];
    default:
      return ['No character selected'];
  }
}
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">{{ playerLabel }}</legend>
    <input type="text" placeholder="Player Name" class="input" v-model="playerName" />
    <select class="select" v-model="selectedCharacter">
      <option disabled selected>Main Character</option>
      <option v-for="character in characters" :key="character">{{ character }}</option>
    </select>
    <select class="select" v-model="characterColor">
      <option disabled selected>Main Character Color</option>
      <option v-for="colorOptions in characterColorOptions" :key="colorOptions">
        {{ colorOptions }}
      </option>
    </select>
    <label class="label">
      <input type="checkbox" class="checkbox" />
      Advanced Options
    </label>
  </fieldset>
</template>
