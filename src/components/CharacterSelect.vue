<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({ playerNumber: String });
const advancedOptions = ref<boolean>(false);

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
const selectedCharacterSecondary = defineModel<string>('selectedCharacterSecondary');
const characterColorSecondary = defineModel<string>('characterColorSecondary');
const selectedCharacterTertiary = defineModel<string>('selectedCharacterTertiary');
const characterColorTertiary = defineModel<string>('characterColorTertiary');
const characterColorOptions = ref<string[]>([]);
const characterColorOptionsSecondary = ref<string[]>([]);
const characterColorOptionsTertiary = ref<string[]>([]);

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

watch(selectedCharacterSecondary, async (newCharacter) => {
  characterColorSecondary.value = 'Default';
  switch (newCharacter) {
    case 'Bowser':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Black'];
      break;
    case 'Captain Falcon':
      characterColorOptionsSecondary.value = ['Default', 'Black', 'Red', 'White', 'Green', 'Blue'];
      break;
    case 'Donkey Kong':
    case 'Dr. Mario':
      characterColorOptionsSecondary.value = ['Default', 'Black', 'Red', 'Blue', 'Green'];
      break;
    case 'Fox':
    case 'Falco':
    case 'Mewtwo':
    case 'Mr. Game & Watch':
    case 'Pichu':
    case 'Pikachu':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Green'];
      break;
    case 'Ganondorf':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Green', 'Purple'];
      break;
    case 'Ice Climbers':
      characterColorOptionsSecondary.value = ['Default', 'Green', 'Orange', 'Red'];
      break;
    case 'Jigglypuff':
    case 'Roy':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow'];
      break;
    case 'Kirby':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow', 'White'];
      break;
    case 'Link':
    case 'Young Link':
      characterColorOptionsSecondary.value = ['Default', 'Blue', 'Red', 'Black', 'White'];
      break;
    case 'Luigi':
      characterColorOptionsSecondary.value = ['Default', 'Blue', 'Red', 'White'];
      break;
    case 'Mario':
      characterColorOptionsSecondary.value = ['Default', 'Blue', 'Green', 'Black', 'Yellow'];
      break;
    case 'Marth':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Green', 'Black', 'White'];
      break;
    case 'Ness':
      characterColorOptionsSecondary.value = ['Default', 'Yellow', 'Blue', 'Green'];
      break;
    case 'Peach':
      characterColorOptionsSecondary.value = ['Default', 'Yellow', 'White', 'Blue', 'Green'];
      break;
    case 'Samus':
      characterColorOptionsSecondary.value = ['Default', 'Pink', 'Black', 'Green', 'Purple'];
      break;
    case 'Yoshi':
      characterColorOptionsSecondary.value = ['Default', 'Red', 'Blue', 'Pink', 'Yellow', 'Cyan'];
      break;
    case 'Sheik':
    case 'Zelda':
      characterColorOptionsSecondary.value = ['Default', 'Blue', 'Red', 'Green', 'White'];
      break;
    default:
      characterColorOptionsSecondary.value = ['No character selected'];
  }
});

watch(selectedCharacterTertiary, async (newCharacter) => {
  characterColorTertiary.value = 'Default';
  switch (newCharacter) {
    case 'Bowser':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Black'];
      break;
    case 'Captain Falcon':
      characterColorOptionsTertiary.value = ['Default', 'Black', 'Red', 'White', 'Green', 'Blue'];
      break;
    case 'Donkey Kong':
    case 'Dr. Mario':
      characterColorOptionsTertiary.value = ['Default', 'Black', 'Red', 'Blue', 'Green'];
      break;
    case 'Fox':
    case 'Falco':
    case 'Mewtwo':
    case 'Mr. Game & Watch':
    case 'Pichu':
    case 'Pikachu':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Green'];
      break;
    case 'Ganondorf':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Green', 'Purple'];
      break;
    case 'Ice Climbers':
      characterColorOptionsTertiary.value = ['Default', 'Green', 'Orange', 'Red'];
      break;
    case 'Jigglypuff':
    case 'Roy':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow'];
      break;
    case 'Kirby':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Green', 'Yellow', 'White'];
      break;
    case 'Link':
    case 'Young Link':
      characterColorOptionsTertiary.value = ['Default', 'Blue', 'Red', 'Black', 'White'];
      break;
    case 'Luigi':
      characterColorOptionsTertiary.value = ['Default', 'Blue', 'Red', 'White'];
      break;
    case 'Mario':
      characterColorOptionsTertiary.value = ['Default', 'Blue', 'Green', 'Black', 'Yellow'];
      break;
    case 'Marth':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Green', 'Black', 'White'];
      break;
    case 'Ness':
      characterColorOptionsTertiary.value = ['Default', 'Yellow', 'Blue', 'Green'];
      break;
    case 'Peach':
      characterColorOptionsTertiary.value = ['Default', 'Yellow', 'White', 'Blue', 'Green'];
      break;
    case 'Samus':
      characterColorOptionsTertiary.value = ['Default', 'Pink', 'Black', 'Green', 'Purple'];
      break;
    case 'Yoshi':
      characterColorOptionsTertiary.value = ['Default', 'Red', 'Blue', 'Pink', 'Yellow', 'Cyan'];
      break;
    case 'Sheik':
    case 'Zelda':
      characterColorOptionsTertiary.value = ['Default', 'Blue', 'Red', 'Green', 'White'];
      break;
    default:
      characterColorOptionsTertiary.value = ['No character selected'];
  }
});
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">{{ playerLabel }}</legend>
    <input type="text" placeholder="Player Name" class="input" v-model="playerName" />
    <label class="label">Character</label>
    <select class="select" v-model="selectedCharacter">
      <option disabled selected>Main Character</option>
      <option v-for="character in characters" :key="character">{{ character }}</option>
    </select>
    <label class="label">Character color</label>
    <select class="select" v-model="characterColor">
      <option disabled selected>Main Character Color</option>
      <option v-for="colorOptions in characterColorOptions" :key="colorOptions">
        {{ colorOptions }}
      </option>
    </select>
    <div v-if="advancedOptions">
      <label class="label">Secondary character</label>
      <select class="select" v-model="selectedCharacterSecondary">
        <option disabled selected>Main Character</option>
        <option v-for="character in characters" :key="character">{{ character }}</option>
      </select>
      <label class="label">Secondary character color</label>
      <select class="select" v-model="characterColorSecondary">
        <option disabled selected>Main Character Color</option>
        <option v-for="colorOptions in characterColorOptionsSecondary" :key="colorOptions">
          {{ colorOptions }}
        </option>
      </select>
      <label class="label">Tertiary character</label>
      <select class="select" v-model="selectedCharacterTertiary">
        <option disabled selected>Main Character</option>
        <option v-for="character in characters" :key="character">{{ character }}</option>
      </select>
      <label class="label">Tertiary character color</label>
      <select class="select" v-model="characterColorTertiary">
        <option disabled selected>Main Character Color</option>
        <option v-for="colorOptions in characterColorOptionsTertiary" :key="colorOptions">
          {{ colorOptions }}
        </option>
      </select>
    </div>

    <label class="label">
      <input type="checkbox" class="checkbox" @click="advancedOptions = !advancedOptions" />
      Advanced Options
    </label>
  </fieldset>
</template>
