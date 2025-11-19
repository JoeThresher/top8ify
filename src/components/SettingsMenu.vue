<script setup lang="ts">
import { toast } from 'vue3-toastify';
import isElectron from 'is-electron';

// if (isElectron()) {
//   // Dynamically load electron-store only in Electron environments
//   import('electron-store')
//     .then((mod) => {
//       const Store = (mod && (mod as any).default) ?? mod;
//       const store = new Store();
//       // use `store` here or expose it to other code as needed
//     })
//     .catch((err) => {
//       console.error('Failed to load electron-store:', err);
//     });
// }

// ...

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
  // Placeholder for saving settings logic
  if (!isElectron()) {
    toast.error('Settings can only be saved in the desktop app.');
    return;
  }

  window.electron.store.set('apiToken', apiToken);
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
