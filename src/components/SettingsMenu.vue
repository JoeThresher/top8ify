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

function saveSettings() {
  window.electron.store.set('apiToken', apiToken.value);
  toast.success('Settings saved successfully!');
}
</script>

<template>
  <div class="p-4 space-y-4 m-4 grid place-items-start">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Start GG API Token</legend>
      <input type="text" class="input" placeholder="Type here" v-model="apiToken" />
    </fieldset>
    <button class="btn" @click="saveSettings()">Save Settings</button>
  </div>
</template>
