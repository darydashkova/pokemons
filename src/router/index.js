import Home from "../components/pages/Home"
import Detail from "../components/pages/Detail"
import detailNew from "../components/pages/detailNew"
import PokemonApi from "../components/pages/PokemonApi"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/pokemon/:id', component: Detail },
    { path: '/pokemonDetail/:id', component: detailNew },
    { path: '/PokemonApi', component: PokemonApi },
];

export default createRouter({
    history: createWebHistory(),
    routes
});
