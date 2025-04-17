<script setup>
import { ref } from "vue";

defineProps({
  pokemon: Object,
});

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
</script>

<template>
  <div
    class="pokecard rounded-2xl p-6 shadow-md transition duration-300 ease-in-out hover:scale-105 flex flex-col items-center cursor-pointer"
  >
    <div
      class="w-32 h-32 bg-white bg-opacity-60 rounded-full overflow-hidden flex justify-center items-center mb-4"
    >
      <img
        class="w-full h-full object-contain"
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
      />
    </div>
    <h2 class="card-title text-base font-bold capitalize mb-2">
      {{ pokemon.name }}
    </h2>
    <div class="flex gap-2 justify-center">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        :class="'px-2 py-1 rounded-full text-xs text-white capitalize font-medium'"
        :style="{ backgroundColor: typeColors[type.type.name] }"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-family: "Press Start 2P", system-ui;
}
.pokecard {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px #bababa solid;
}
</style>
