<template>
  <div class="pokemonsnew" v-for="stateItem in state"  :key="stateItem.id">{{stateItem}}</div>
  <swiper
    :cssMode="true"
    :navigation="true"
    :pagination="true"
    :class="mySwiper"
    :slides-per-view="10"
    :breakpoints="breakpoints320"
  >
    <swiper-slide
      :class="{
        'slider-height': clikedPokemons && clikedPokemons.includes(pokemon.id),
      }"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
    >
      <pokemonItem
        @pokemonClick="pokemonClickHandler"
        :data="pokemon"
      ></pokemonItem>
    </swiper-slide>
  </swiper>
  <div></div>
</template>

<script>
import "../../../node_modules/swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import pokemonItem from "./item";
// Import Swiper styles
import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import "../../../node_modules/swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { reactive } from "vue";
SwiperCore.use([Navigation, Pagination]);

import { ref, onMounted } from "vue";
export default {
  name: "PokemonsList",

  components: {
    Swiper,
    SwiperSlide,
    pokemonItem,
  },
  setup() {
    const state = reactive({
      pokemonsnew: [],
      UrlIdLookUp: {},
    });
    const clikedPokemons = ref([]);
    const pokemonClickHandler = (data) => {
      if (!data.show) {
        clikedPokemons.value = clikedPokemons.value.filter(
          (pokemonId) => pokemonId !== data.id
        );
      } else {
        clikedPokemons.value.push(data.id);
      }

      console.log(clikedPokemons.value);
    };

    let pokemons = ref([]);
    const getPokemons = require("json-pokemon/getPokemon");
    const getPokemonsList = () => {
      setTimeout(() => {
        pokemons.value = getPokemons().slice(0, 30);
      }, 0);
    };
    onMounted(getPokemonsList);
    const breakpoints320 = ref({});

    breakpoints320.value = {
      800: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1300: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
      1600: {
        slidesPerView: 10,
        spaceBetween: 10,
      },
    };

    return {
      state,
      pokemons,
      pokemonClickHandler,
      breakpoints320,
      clikedPokemons,
      
    };
  },
};
</script>

<style>
</style>