import { defineStore } from "pinia";
import { ref } from "vue";

const pokedex = ref([]);

export const usePokemonStore = defineStore("pokemon", () => {
  const addPokemon = (pokemon) => {
    pokedex.value.push(pokemon);
    console.log(pokedex.value)
  };

  return { addPokemon, pokedex };
});
