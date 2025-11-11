<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">{{ playerLabel }}</legend>
    <input type="text" placeholder="Player Name" class="input" v-model="playerName" />
    <select class="select" v-model="selectedCharacter">
      <option disabled selected>Main Character</option>
      <option v-for="character in characters" :key="character">{{ character }}</option>
    </select>
    <select class="select">
      <option disabled selected>Main Character Color</option>
      <option>Neutral</option>
      <option>Red</option>
      <option>Blue</option>
    </select>
    <label class="label">
      <input type="checkbox" class="checkbox" />
      Advanced Options
    </label>
  </fieldset>
</template>
