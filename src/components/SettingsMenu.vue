<script setup lang="ts">
import { toast } from 'vue3-toastify';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

const apiToken = defineModel<string>('apiToken');
const numPlayers = defineModel<number>('numPlayers');

function saveSettings() {
  window.electron.store.set('apiToken', apiToken.value);
  toast.success('Settings saved successfully!');
}
</script>

<template>
  <div class="p-4 space-y-4 m-4 bg-base-200 rounded-lg border border-base-300">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Start GG API Token</legend>
        <input type="text" class="input" placeholder="Type here" v-model="apiToken" />
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
    </div>
    <button class="btn" @click="saveSettings()">Save Settings</button>
  </div>
</template>
