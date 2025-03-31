<script setup>
import { ref } from "vue";
</script>

<template>
  <!-- <h1>Pokedex</h1> -->
  <header class="text-left w-max mb-6">
    <p><strong>Page actuelle:</strong> {{ $route.fullPath }}</p>
    <nav class="flex gap-4">
      <RouterLink to="/list" :addPokemon="addPokemon"
        >List des pokémons</RouterLink
      >
      <RouterLink to="/pokedex">Mon Pokedex</RouterLink>
    </nav>
  </header>
  <img
    class="h-64 mx-auto rounded"
    src="https://actu.m6.fr/wp-content/uploads/2024/05/pokemon-M6.jpg"
    alt=""
  />
  <main>
    <RouterView />
  </main>
</template>
