<script setup>
import { ref, computed, onMounted } from "vue";
import CardPokemon from "../components/CardPokemon.vue";
import FilterPokemon from "../components/FilterPokemon.vue";
import ModalPokemon from "../components/ModalPokemon.vue";

const pokemons = ref([]);
const filters = ref({ searchQuery: "", selectedType: "" });
const allTypes = ref([]);
const clickable = ref("");
const selectedPokemon = ref(null);
const showModal = ref(false);

async function fetchPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return null;
  }
}

async function fetchData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    const pokemonList = data.results;

    for (const pokemon of pokemonList) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      if (pokemonData) {
        pokemons.value.push(pokemonData);

        pokemonData.types.forEach((t) => {
          if (!allTypes.value.includes(t.type.name)) {
            allTypes.value.push(t.type.name);
          }
        });
        if (pokemonData.abilities.length > 0) {
          clickable.value = "Cliquez sur les pokémons pour voir leur détails et les ajouter au pokedex";
        }
      }
    }
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
}

function updateFilters(newFilters) {
  filters.value = newFilters;
}

const filteredPokemons = computed(() => {
  return pokemons.value.filter((pokemon) => {
    const matchesSearch =
      filters.value.searchQuery === "" ||
      pokemon.name.toLowerCase().includes(filters.value.searchQuery.toLowerCase());

    const matchesType =
      filters.value.selectedType === "" ||
      pokemon.types.some((t) => t.type.name === filters.value.selectedType);

    return matchesSearch && matchesType;
  });
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

const openModal = (pokemon) => {
  selectedPokemon.value = pokemon;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <div class="pokedex">
    <h1 class="font-[500] text-center">Liste des pokemons</h1>
    <div class="text-center mx-auto my-6">
        <div class="flex gap-4 justify-center">
            <button class="load-btn" @click="fetchData">Charger les pokémons</button>
            <RouterLink to="/pokedex"><button class="load-btn text-black">Consulter mon pokedex</button></RouterLink>
        </div>
        <div class="text-center my-6 font-bold text-lg" v-text="clickable"></div>
    </div>

    <FilterPokemon :types="allTypes" @updateFilters="updateFilters" :class="allTypes.length == 0 ? 'hidden' : 'block'" />

    <ModalPokemon
      v-if="showModal && selectedPokemon"
      :pokemon="selectedPokemon"
      :typeColors="typeColors"
      @closemodal="closeModal"
    />

    <TransitionGroup
      name="card-appear"
      tag="div"
      class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-4 cards"
    >
      <CardPokemon
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="openModal(pokemon)"
      />
    </TransitionGroup>
  </div>
</template>

<style>
.load-btn {
    transition: transform 0.3s ease-in-out;
}
.load-btn:hover {
    transform: scale(1.05);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.pokedex {
  margin: 0 auto;
  margin-top: 48px;
  margin-bottom: 48px;
}
.card-appear-enter-active {
  transition: all 0.5s ease;
  animation: card-in 0.5s ease;
}

.card-appear-leave-active {
  transition: all 0.3s ease;
}

.card-appear-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.card-appear-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes card-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
