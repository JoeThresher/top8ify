<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from 'vue';
import exportAsImage from '../utils/exportAsImage';
const input = useTemplateRef('exportRef');
const logoDataUrl = ref<string>('');
const props = defineProps<{
  characters: string[];
  playerNames: string[];
  characterColors: string[];
  secondaryCharacters: string[];
  secondaryCharacterColors: string[];
  tertiaryCharacters: string[];
  tertiaryCharacterColors: string[];
  tournamentTitle: string;
  tournamentInfo: string;
  tournamentURL: string;
  numPlayers: number;
  hideTournamentLogo: boolean;
  tournamentLogoPath: string;
  hideBranding: boolean;
}>();

function getImagePath(character: string | undefined, color: string | undefined): string {
  return `./character-portraits/${character}/${color}.png`;
}

function getStockIconImagePath(character: string | undefined, color: string | undefined): string {
  return `./stock-icons/${character}/${color}.png`;
}

function getDefaultImagePath(e: Event): void {
  const target = e.target as HTMLImageElement | null;
  if (target) {
    target.src = `./character-portraits/Random.png`;
  }
}

function getDefaultStockIconPath(e: Event): void {
  const target = e.target as HTMLImageElement | null;
  if (target) {
    target.src = `./stock-icons/blank.png`;
  }
}

onMounted(async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await window.electron?.loadCustomLogo?.();
    if (res && res.exists && res.content) {
      logoDataUrl.value = res.content;
    }
  } catch (err) {
    console.warn('Failed to load custom logo:', err);
  }
});

// Function to reload the custom logo dynamically
const reloadLogo = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await window.electron?.loadCustomLogo?.();
    if (res && res.exists && res.content) {
      logoDataUrl.value = res.content;
    }
  } catch (err) {
    console.warn('Failed to reload custom logo:', err);
  }
};

// Expose reloadLogo globally so fileOperations can call it
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.reloadLogoOnOutputScreen = reloadLogo;
}
</script>

<template>
  <button class="btn m-4 btn-primary" @click="exportAsImage(input, 'exported-graphic')">
    Export as Image
  </button>
  <div ref="exportRef" class="canvas">
    <img
      class="tournament-logo"
      :src="logoDataUrl || tournamentLogoPath"
      alt=""
      v-if="hideTournamentLogo === false"
    />
    <h1 class="tournament-title">{{ tournamentTitle }}</h1>

    <div class="character-frames-container">
      <div class="character-frame" id="frame-1" v-if="props.numPlayers >= 1">
        <p class="placement-number" id="placement-number-1">1</p>
        <img
          :src="getImagePath(props.characters[0], props.characterColors[0])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[0], props.secondaryCharacterColors[0])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[0], props.tertiaryCharacterColors[0])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-1">
          <p class="player-name" id="player-name-1">{{ props.playerNames[0] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-2" v-if="props.numPlayers >= 2">
        <p class="placement-number" id="placement-number-2">2</p>
        <img
          :src="getImagePath(props.characters[1], props.characterColors[1])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[1], props.secondaryCharacterColors[1])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[1], props.tertiaryCharacterColors[1])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-2">
          <p class="player-name" id="player-name-2">{{ props.playerNames[1] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-3" v-if="props.numPlayers >= 3">
        <p class="placement-number" id="placement-number-3">3</p>
        <img
          :src="getImagePath(props.characters[2], props.characterColors[2])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[2], props.secondaryCharacterColors[2])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[2], props.tertiaryCharacterColors[2])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-3">
          <p class="player-name" id="player-name-3">{{ props.playerNames[2] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-4" v-if="props.numPlayers >= 4">
        <p class="placement-number" id="placement-number-4">4</p>
        <img
          :src="getImagePath(props.characters[3], props.characterColors[3])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[3], props.secondaryCharacterColors[3])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[3], props.tertiaryCharacterColors[3])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-4">
          <p class="player-name" id="player-name-4">{{ props.playerNames[3] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-5" v-if="props.numPlayers >= 5">
        <p class="placement-number" id="placement-number-5">5</p>
        <img
          :src="getImagePath(props.characters[4], props.characterColors[4])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[4], props.secondaryCharacterColors[4])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[4], props.tertiaryCharacterColors[4])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-5">
          <p class="player-name" id="player-name-5">{{ props.playerNames[4] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-6" v-if="props.numPlayers >= 6">
        <p class="placement-number" id="placement-number-6">5</p>
        <img
          :src="getImagePath(props.characters[5], props.characterColors[5])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[5], props.secondaryCharacterColors[5])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[5], props.tertiaryCharacterColors[5])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-6">
          <p class="player-name" id="player-name-6">{{ props.playerNames[5] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-7" v-if="props.numPlayers >= 7">
        <p class="placement-number" id="placement-number-7">7</p>
        <img
          :src="getImagePath(props.characters[6], props.characterColors[6])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[6], props.secondaryCharacterColors[6])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[6], props.tertiaryCharacterColors[6])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-7">
          <p class="player-name" id="player-name-7">{{ props.playerNames[6] }}</p>
        </div>
      </div>

      <div class="character-frame" id="frame-8" v-if="props.numPlayers >= 8">
        <p class="placement-number" id="placement-number-8">7</p>
        <img
          :src="getImagePath(props.characters[7], props.characterColors[7])"
          class="character-image"
          @error="getDefaultImagePath"
        />
        <img
          :src="
            getStockIconImagePath(props.secondaryCharacters[7], props.secondaryCharacterColors[7])
          "
          class="secondary-character-image"
          @error="getDefaultStockIconPath"
        />
        <img
          :src="
            getStockIconImagePath(props.tertiaryCharacters[7], props.tertiaryCharacterColors[7])
          "
          class="tertiary-character-image"
          @error="getDefaultStockIconPath"
        />
        <div class="player-name-frame" id="player-name-frame-8">
          <p class="player-name" id="player-name-8">{{ props.playerNames[7] }}</p>
        </div>
      </div>
    </div>

    <h2 class="tournament-info">{{ tournamentInfo }}</h2>
    <h2 class="tournament-url">{{ tournamentURL }}</h2>
    <h2 class="branding-text" v-if="hideBranding === false">Made with Top8ify</h2>
  </div>
</template>

<style>
@import '../assets/graphicScreen.css';
</style>
