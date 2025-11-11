<script setup lang="ts">
import { useTemplateRef } from 'vue';
import exportAsImage from '../utils/exportAsImage';
const input = useTemplateRef('exportRef');
const props = defineProps<{
  characters: string[];
  playerNames: string[];
  characterColors: string[];
}>();

function getImagePath(character: string | undefined, color: string | undefined): string {
  return `/src/assets/character-portraits/${character}/${color}.png`;
}

function getDefaultImagePath(e: Event): void {
  const target = e.target as HTMLImageElement | null;
  if (target) {
    target.src = `/src/assets/character-portraits/Random.png`;
  }
}
</script>

<template>
  <div ref="exportRef" class="canvas">
    <div class="character-frame" id="frame1">
      <img
        :src="getImagePath(props.characters[0], props.characterColors[0])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[0] }}</p>
    </div>
    <div class="character-frame" id="frame2">
      <img
        :src="getImagePath(props.characters[1], props.characterColors[1])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[1] }}</p>
    </div>
    <div class="character-frame" id="frame3">
      <img
        :src="getImagePath(props.characters[2], props.characterColors[2])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[2] }}</p>
    </div>
    <div class="character-frame" id="frame4">
      <img
        :src="getImagePath(props.characters[3], props.characterColors[3])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[3] }}</p>
    </div>
    <div class="character-frame" id="frame5">
      <img
        :src="getImagePath(props.characters[4], props.characterColors[4])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[4] }}</p>
    </div>
    <div class="character-frame" id="frame6">
      <img
        :src="getImagePath(props.characters[5], props.characterColors[5])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[5] }}</p>
    </div>
    <div class="character-frame" id="frame7">
      <img
        :src="getImagePath(props.characters[6], props.characterColors[6])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[6] }}</p>
    </div>
    <div class="character-frame" id="frame8">
      <img
        :src="getImagePath(props.characters[7], props.characterColors[7])"
        class="character-image"
        @error="getDefaultImagePath"
      />
      <p class="player-name">{{ props.playerNames[7] }}</p>
    </div>
  </div>
  <button class="btn" @click="exportAsImage(input, 'test-image')">Export as Image</button>
</template>

<style>
@import '../assets/graphicScreen.css';
</style>
