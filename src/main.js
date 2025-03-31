import { createApp } from "vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import List from "./pages/List.vue";
import Pokedex from "./pages/Pokedex.vue";
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/list" },
    { path: "/list", component: () => List },
    { path: "/pokedex", component: () => Pokedex },
  ],
});

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(ToastService).use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
    }
 }).mount("#app");
