<script setup>
import { usePokemonStore } from "../stores/pokemonStore";
import CardPokemon from "../components/CardPokemon.vue";
const pokemonStore = usePokemonStore();
</script>

<template>
    <div>
        <div class="pokedex">
            <h1 class="font-[500] text-center">
              Pokedex
            </h1>
            <div class="flex justify-center mt-8">
                <RouterLink to="/"><button class="load-btn text-black">Repartir à la chasse!</button></RouterLink>
            </div>
            <div v-if="pokemonStore.pokedex.length > 0" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-4  cards my-8">
              <CardPokemon
                v-for="pokemon in pokemonStore.pokedex"
                :key="pokemon.id"
                :pokemon="pokemon"
                :addPokemon="addPokemon"
              />
            </div>
            <div v-else>
              <h2 class="font-bold text-xl text-center mx-auto py-12">
                Pas de pokémons trouvé dans le pokedex, retournez dans listes pour en ajouter! 😜
              </h2>
            </div>
        </div>
    </div>
  </template>

<style scoped>
    .pokedex {
        width: 1000px;
        margin: 0 auto;
        margin-top: 48px;
        margin-bottom: 48px;
    }
</style>
