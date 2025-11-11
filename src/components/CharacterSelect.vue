<script setup lang="ts">
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
const characterColorOptions = ref<string[]>([]);

watch(selectedCharacter, async (newCharacter) => {
  characterColor.value = 'Default';
  switch (newCharacter) {
    case 'Bowser':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Black'];
      break;
    case 'Captain Falcon':
      characterColorOptions.value = ['Default', 'Black', 'Red', 'White', 'Green', 'Blue'];
      break;
    case 'Donkey Kong':
    case 'Dr. Mario':
      characterColorOptions.value = ['Default', 'Black', 'Red', 'Blue', 'Green'];
      break;
    case 'Fox':
    case 'Falco':
    case 'Mewtwo':
    case 'Mr. Game & Watch':
    case 'Pichu':
    case 'Pikachu':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Green'];
      break;
    case 'Ganondorf':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Green', 'Purple'];
      break;
    case 'Ice Climbers':
      characterColorOptions.value = ['Default', 'Green', 'Orange', 'Red'];
      break;
    case 'Jigglypuff':
    case 'Roy':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow'];
      break;
    case 'Kirby':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow', 'White'];
      break;
    case 'Link':
    case 'Young Link':
      characterColorOptions.value = ['Default', 'Blue', 'Red', 'Black', 'White'];
      break;
    case 'Luigi':
      characterColorOptions.value = ['Default', 'Blue', 'Red', 'White'];
      break;
    case 'Mario':
      characterColorOptions.value = ['Default', 'Blue', 'Green', 'Black', 'Yellow'];
      break;
    case 'Marth':
      characterColorOptions.value = ['Default', 'Red', 'Green', 'Black', 'White'];
      break;
    case 'Ness':
      characterColorOptions.value = ['Default', 'Yellow', 'Blue', 'Green'];
      break;
    case 'Peach':
      characterColorOptions.value = ['Default', 'Yellow', 'White', 'Blue', 'Green'];
      break;
    case 'Samus':
      characterColorOptions.value = ['Default', 'Pink', 'Black', 'Green', 'Purple'];
      break;
    case 'Yoshi':
      characterColorOptions.value = ['Default', 'Red', 'Blue', 'Pink', 'Yellow', 'Cyan'];
      break;
    case 'Sheik':
    case 'Zelda':
      characterColorOptions.value = ['Default', 'Blue', 'Red', 'Green', 'White'];
      break;
    default:
      characterColorOptions.value = ['No character selected'];
  }
});
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
