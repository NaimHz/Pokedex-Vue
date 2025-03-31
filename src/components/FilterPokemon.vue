<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";

const emit = defineEmits(["updateFilters"]);

const searchQuery = ref("");
const selectedType = ref("");

const props = defineProps({
  types: Array,
});

const handleFilterChange = () => {
  emit("updateFilters", {
    searchQuery: searchQuery.value,
    selectedType: selectedType.value,
  });
};
</script>

<template>
  <div
    class="flex justify-between items-center bg-linear-to-r from-yellow-300 via-blue-300 to-red-300 p-4 rounded-lg shadow-md mb-6"
  >
    <!-- Barre de recherche -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher un Pokémon..."
      class="border p-2 rounded-lg w-1/3 bg-white"
      @input="handleFilterChange"
    />
    <select
      v-model="selectedType"
      class="border p-2 rounded-lg w-1/4 bg-white"
      @change="handleFilterChange"
    >
      <option value="">Tous les types</option>
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
</template>
