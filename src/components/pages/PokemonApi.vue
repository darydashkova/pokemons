<template>
  <!--<div class="pokemonsnew" v-for="stateItem in state"  :key="stateItem.id">{{stateItem}}</div>-->
  <swiper
    :cssMode="true"
    :navigation="true"
    :pagination="true"
    :class="mySwiper"
    :slides-per-view="10"
    :breakpoints="breakpoints320"
    @slideChange="loadSlides"
  >
    <swiper-slide
      :class="{
        'slider-height': clikedPokemons && clikedPokemons.includes(pokemon.id),
      }"
      v-for="stateItem in state.pokemonsnew"
      :key="stateItem.id"
    >
      <newPokemon
        @pokemonClick="pokemonClickHandler"
        :data="stateItem"
      ></newPokemon>
    </swiper-slide>
  </swiper>
</template>

<script>
import newPokemon from "../pokemons/newPokemon";
import { reactive } from "vue";
import "../../../node_modules/swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import "../../../node_modules/swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
SwiperCore.use([Navigation, Pagination]);

import { ref, onMounted } from "vue";
export default {
  name: "PokemonApi",
  components: {
    Swiper,
    SwiperSlide,
    newPokemon,
  },
  setup() {
    const loadSlides = (swiper) => {
 
      if (swiper.counter) {
        console.log("fdfd");
      }
      let count = swiper.realIndex + (swiper.passedParams.slidesPerView);
      if (count == swiper.slides.length) {
        getPokemonsList();
      }
    };
    const state = reactive({
      pokemonsnew: [],
    });
    const pageSize =11;
    let pageNum =  1;
    const getPokemonsList = () => {
      setTimeout(() => {
        const offset = (pageNum-1)*pageSize;
        fetch(" https://pokeapi.co/api/v2/pokemon?offset="+offset+"&limit="+ pageSize +"")
          .then((res) => res.json())
          .then((data) => {
            for (let i = 0; i < data.results.length; i++) {
              state.pokemonsnew.push({
                id: ((pageNum-1)*pageSize)+ i + 1,
                name: data.results[i].name,
                url: data.results[i].url,
              });
            }
            console.log(state.pokemonsnew);
            pageNum+=1;
          });
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
    const clikedPokemons = ref([]);
    const pokemonClickHandler = (data) => {
      if (!data.show) {
        clikedPokemons.value = clikedPokemons.value.filter(
          (pokemonId) => pokemonId !== data.id
        );
      } else {
        clikedPokemons.value.push(data.id);
      }
    };
    return {
      state,
      pokemonClickHandler,
      breakpoints320,
      loadSlides,
    };
  },
};
</script>

<style>
</style>