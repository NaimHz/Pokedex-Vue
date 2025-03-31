import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokedex = ref([]);

  const addPokemon = (pokemon) => {
    const initialLength = pokedex.value.length;
    pokedex.value.push(pokemon);
  };

  return { addPokemon, pokedex };
});
