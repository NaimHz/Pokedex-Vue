import { createApp } from "vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import List from "./pages/List.vue";
import Pokedex from "./pages/Pokedex.vue";
import { createPinia } from 'pinia'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/list", component: () => List },
    { path: "/pokedex", component: () => Pokedex },
  ],
});

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount("#app");
