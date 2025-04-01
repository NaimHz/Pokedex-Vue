<script setup>
import { defineProps, defineEmits, onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { usePokemonStore } from "../stores/pokemonStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const emit = defineEmits(["closemodal"]);

const props = defineProps({
  modal: Boolean,
  pokemon: Object,
  typeColors: Object,
});

const pokemonStore = usePokemonStore();

const addToPokedex = () => {
  pokemonStore.addPokemon(props.pokemon);
  toast.add({
    severity: "success",
    summary: "Succès",
    detail: `${props.pokemon.name} ajouté au Pokédex !`,
    life: 3000,
  });
};

const modalRef = ref(false);

const getPokemonGif = (pokemonName) => {
  return `https://play.pokemonshowdown.com/sprites/ani/${pokemonName.toLowerCase()}.gif`;
};

onMounted(() => {
  gsap.fromTo(
    modalRef.value,
    { opacity: 0, scale: 0.8, y: -50 },
    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
  );
});

const closeModal = () => {
  gsap.to(modalRef.value, {
    opacity: 0,
    scale: 0.8,
    y: -50,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => emit("closemodal"),
  });
};
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50"
      @click.self="closeModal"
    >
      <div
        ref="modalRef"
        class="bg-white text-black p-6 rounded-lg shadow-lg w-3/6 flex flex-row items-stretch gap-4 relative"
      >
        <div class="flex flex-col w-1/3 border-r-gray-200 pr-4">
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">ID : </span>
            {{ pokemon.id }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Nom : </span>
            {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Point de vie : </span
            >{{ pokemon.stats[0].base_stat }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Attaque : </span
            >{{ pokemon.stats[1].base_stat }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Défense : </span
            >{{ pokemon.stats[2].base_stat }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Rapidité : </span
            >{{ pokemon.stats[5].base_stat }}
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Poids : </span>{{ pokemon.weight }} kg
          </p>
          <p
            class="text-lg font-bold mb-4"
            :style="{ color: typeColors[pokemon.types[0].type.name] }"
          >
            <span class="text-black">Taille : </span>{{ pokemon.height }} cm
          </p>
          <div class="text-lg font-bold mb-4 flex gap-2 flex-row flex-wrap">
            <span class="text-black">Types : </span>
            <span
              v-for="type in pokemon.types"
              :key="type.type.name"
              :style="{ color: typeColors[type.type.name] }"
            >
              {{
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
              }}
            </span>
          </div>
        </div>
        <div class="flex flex-col items-center flex-1">
          <div class="my-auto relative">
            <img
              class="w-72 h-full object-contain"
              :src="getPokemonGif(pokemon.name)"
              :alt="pokemon.name"
            />
          </div>
          <div class="mt-auto">
            <button class="mt-auto" @click="addToPokedex(pokemon, toast)">
              Ajouter au pokedex
            </button>
          </div>
        </div>
        <button
          class="!bg-white text-black absolute top-2 right-2 !border-0 border-white"
          @click.self="closeModal"
        >
          X
        </button>
      </div>
    </div>
  </Teleport>
</template>
