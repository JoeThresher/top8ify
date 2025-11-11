<script setup lang="ts">
import { useTemplateRef } from 'vue';
import exportAsImage from '../utils/exportAsImage';
const input = useTemplateRef('exportRef');
const props = defineProps<{ characters: string[]; playerNames: string[] }>();

function getImagePath(character: string | undefined): string {
  return `/src/assets/character-portraits/${character}/Default.png`;
}
</script>

<template>
  <div ref="exportRef" class="canvas">
    <div class="character-frame" id="frame1">
      <img :src="getImagePath(props.characters[0])" class="character-image" />
    </div>
    <div class="character-frame" id="frame2">
      <img :src="getImagePath(props.characters[1])" class="character-image" />
    </div>
    <div class="character-frame" id="frame3">
      <img :src="getImagePath(props.characters[2])" class="character-image" />
    </div>
    <div class="character-frame" id="frame4">
      <img :src="getImagePath(props.characters[3])" class="character-image" />
    </div>
    <div class="character-frame" id="frame5">
      <img :src="getImagePath(props.characters[4])" class="character-image" />
    </div>
    <div class="character-frame" id="frame6">
      <img :src="getImagePath(props.characters[5])" class="character-image" />
    </div>
    <div class="character-frame" id="frame7">
      <img :src="getImagePath(props.characters[6])" class="character-image" />
    </div>
    <div class="character-frame" id="frame8">
      <img :src="getImagePath(props.characters[7])" class="character-image" />
    </div>
  </div>
  <button class="btn" @click="exportAsImage(input, 'test-image')">Export as Image</button>
</template>

<style>
@import '../assets/graphicScreen.css';
</style>
