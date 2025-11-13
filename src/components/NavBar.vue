<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Top8ify</a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost w-8 mr-4">
          <div class="w-10 rounded-full">
            <Menu />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a>Settings</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
