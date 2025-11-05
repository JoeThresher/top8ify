<script setup lang="ts">
const props = defineProps({ playerNumber: String })

function getPlayerNumber() {
  switch (props.playerNumber) {
    case '1':
      return 'First Player'
    case '2':
      return 'Second Player'
    case '3':
      return 'Third Player'
    case '4':
      return 'Fourth Player'
    case '5':
      return 'Fifth Player'
    case '6':
      return 'Sixth Player'
    case '7':
      return 'Seventh Player'
    case '8':
      return 'Eighth Player'
    default:
      return 'Player'
  }
}

const playerLabel = getPlayerNumber()
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">{{ playerLabel }}</legend>
    <input type="text" placeholder="Player Name" class="input" />
    <select class="select">
      <option disabled selected>Main Character</option>
      <option>Fox</option>
      <option>Falco</option>
      <option>Marth</option>
    </select>
    <select class="select">
      <option disabled selected>Main Character Color</option>
      <option>Neutral</option>
      <option>Red</option>
      <option>Blue</option>
    </select>
    <label class="label">
      <input type="checkbox" class="checkbox" />
      Advanced Options
    </label>
  </fieldset>
</template>
