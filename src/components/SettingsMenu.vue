<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { onMounted } from 'vue';
import {
  refreshCustomCssStatus,
  onFileSelectedCss,
  removeCustomCss,
  hasCustomCss,
  customCssPath,
  onFileSelectedIcon,
} from '../utils/fileOperations';

const apiToken = defineModel<string>('apiToken');
const numPlayers = defineModel<number>('numPlayers');
const tournamentLogoPath = defineModel<string>('');
const hideTournamentLogo = defineModel<boolean>('hideTournamentLogo');

function saveSettings() {
  window.electron.store.set('apiToken', apiToken.value);
  toast.success('Settings saved successfully!');
}

function openLink(url: string) {
  window.electron?.openExternalLink?.(url);
}

async function handleCustomLogoInput(e: Event) {
  onFileSelectedIcon(e);
  const logoPath = (await window.electron.getCustomLogoPath?.()) || '';
  if (logoPath) {
    console.log('Logo path: ', logoPath);
    tournamentLogoPath.value = logoPath;
    console.log('tournament logo path: ', tournamentLogoPath.value);
  }
}

// refresh status on component mount
onMounted(() => {
  refreshCustomCssStatus();
});
</script>

<template>
  <div class="p-4 space-y-4 m-4 bg-base-200 rounded-lg border border-base-300">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Start GG API Token</legend>
        <input type="password" class="input" placeholder="Type here" v-model="apiToken" />
        <div class="text-xs text-muted">
          <button
            class="btn btn-link"
            @click="openLink('https://developer.start.gg/docs/authentication')"
          >
            How do I find my API token?
          </button>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Number of Players</legend>
        <div class="w-full max-w-xs">
          <input
            type="range"
            min="1"
            max="8"
            value="8"
            class="range"
            step="1"
            v-model="numPlayers"
          />
          <div class="flex justify-between px-2.5 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div class="flex justify-between px-2.5 mt-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Custom CSS (graphic screen)</legend>
        <div class="space-y-2">
          <input type="file" accept=".css" class="file-input" @change="onFileSelectedCss" />
          <div class="text-xs text-muted">
            Upload a custom .css file to overwrite the graphic screen styles.
          </div>
          <div class="flex items-center space-x-2">
            <button v-if="hasCustomCss" class="btn" @click="removeCustomCss">
              Remove Custom CSS
            </button>
            <div v-if="hasCustomCss" class="text-sm">
              Path: <span class="font-mono">{{ customCssPath }}</span>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Custom Tournament Icon</legend>
        <div class="space-y-2">
          <input type="file" accept="image/*" class="file-input" @change="handleCustomLogoInput" />
          <div class="text-xs text-muted">Upload an icon for the graphic screen</div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Hide Tournament Logo</legend>
        <input type="checkbox" class="checkbox" v-model="hideTournamentLogo" />
      </fieldset>
    </div>
    <button class="btn" @click="saveSettings()">Save Settings</button>
  </div>
</template>
