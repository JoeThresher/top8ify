<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { ref, onMounted } from 'vue';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => unknown;
        set: (key: string, val: unknown) => void;
      };
      saveCustomCss?: (
        cssContent: string,
      ) => Promise<{ success: boolean; path?: string; location?: string; error?: string }>;
      loadCustomCss?: () => Promise<{
        exists: boolean;
        content?: string;
        path?: string;
        location?: string;
        error?: string;
      }>;
      getCustomCssPath?: () => Promise<string>;
      restoreOriginalCss?: () => Promise<{
        success: boolean;
        path?: string;
        location?: string;
        error?: string;
      }>;
    };
  }
}

const apiToken = defineModel<string>('apiToken');
const numPlayers = defineModel<number>('numPlayers');

const uploading = ref(false);
const hasCustomCss = ref(false);
const customCssPath = ref('');

async function refreshCustomCssStatus() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await window.electron?.loadCustomCss?.();
  if (res && res.exists) {
    hasCustomCss.value = true;
    customCssPath.value = res.path || (await window.electron.getCustomCssPath?.()) || '';
  } else {
    hasCustomCss.value = false;
    customCssPath.value = '';
  }
}

function saveSettings() {
  window.electron.store.set('apiToken', apiToken.value);
  toast.success('Settings saved successfully!');
}

async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input?.files?.[0];
  if (!file) return;
  if (!file.name.endsWith('.css')) {
    toast.error('Please select a .css file');
    return;
  }
  uploading.value = true;
  const reader = new FileReader();
  reader.onload = async () => {
    const content = String(reader.result || '');
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await window.electron.saveCustomCss(content);
      if (res && res.success) {
        toast.success('Custom CSS uploaded and saved.');
        // inject immediately into page
        const old = document.querySelector('style[data-user-custom-css]');
        if (old) old.remove();
        const style = document.createElement('style');
        style.setAttribute('data-user-custom-css', 'true');
        style.textContent = content;
        document.head.appendChild(style);
        await refreshCustomCssStatus();
      } else {
        toast.error('Failed to save custom CSS: ' + (res?.error || 'unknown'));
      }
    } catch (err) {
      toast.error('Failed to save custom CSS');
      console.error(err);
    } finally {
      uploading.value = false;
      // clear the input so user can re-upload same file if needed
      if (input) input.value = '';
    }
  };
  reader.onerror = () => {
    toast.error('Failed to read file');
    uploading.value = false;
  };
  reader.readAsText(file);
}

async function removeCustomCss() {
  // Restore the original file that was present before the first user upload.
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await window.electron.restoreOriginalCss?.();
    if (res && res.success) {
      const old = document.querySelector('style[data-user-custom-css]');
      if (old) old.remove();
      toast.success('Custom CSS restored to original.');
      await refreshCustomCssStatus();
    } else {
      // If restore failed, fall back to removing user CSS from DOM and informing user
      const old = document.querySelector('style[data-user-custom-css]');
      if (old) old.remove();
      toast.error('Failed to restore original CSS: ' + (res?.error || 'unknown'));
      await refreshCustomCssStatus();
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to restore original CSS');
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

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Custom CSS (graphic screen)</legend>
        <div class="space-y-2">
          <input type="file" accept=".css" class="file-input" @change="onFileSelected" />
          <div class="text-xs text-muted">
            Upload a .css file to overwrite <code>src/assets/graphicScreen.css</code> in dev;
            packaged builds fall back to app user data.
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
    </div>
    <button class="btn" @click="saveSettings()">Save Settings</button>
  </div>
</template>
