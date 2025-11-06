<script setup lang="ts">
import { useTemplateRef } from 'vue';
import exportAsImage from '../utils/exportAsImage';
const input = useTemplateRef('exportRef');
</script>

<template>
  <div ref="exportRef" class="canvas">
    <div class="character-frame" id="frame1"></div>
    <div class="character-frame" id="frame2"></div>
    <div class="character-frame" id="frame3"></div>
    <div class="character-frame" id="frame4"></div>
    <div class="character-frame" id="frame5"></div>
    <div class="character-frame" id="frame6"></div>
    <div class="character-frame" id="frame7"></div>
    <div class="character-frame" id="frame8"></div>
  </div>
  <button class="btn" @click="exportAsImage(input, 'test-image')">Export as Image</button>
</template>

<style>
@import '../assets/graphicScreen.css';
</style>
