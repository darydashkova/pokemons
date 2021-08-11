import Home from "../components/pages/Home"
import Detail from "../components/pages/Detail"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/pokemon/:id', component: Detail },
];

export default createRouter({
    history: createWebHistory(),
    routes
});
