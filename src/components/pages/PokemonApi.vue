<template>
  <!--<div class="pokemonsnew" v-for="stateItem in state"  :key="stateItem.id">{{stateItem}}</div>-->
  <swiper
    :cssMode="true"
    :navigation="true"
    :class="mySwiper"
    :slides-per-view="10"
    :breakpoints="breakpoints320"
    @slideChange="loadSlides"
  >
    <swiper-slide
      v-for="stateItem in state.pokemonsnew"
      :key="stateItem.id"
    >
      <newPokemon
        :data="stateItem"
      ></newPokemon>
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref, onMounted } from "vue";
import { reactive } from "vue";
import newPokemon from "../pokemons/newPokemon";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "../../../node_modules/swiper/swiper.min.css";
import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import "../../../node_modules/swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);

export default {
  name: "PokemonApi",
  components: {
    Swiper,
    SwiperSlide,
    newPokemon,
  },
  setup() {
    const pageSize =11;
    let pageNum =  1;
    const state = reactive({
      pokemonsnew: [],
    });
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
            pageNum+=1;
          });
      }, 0);
    };
    const loadSlides = (swiper) => {
      let count = swiper.realIndex + (swiper.passedParams.slidesPerView);
      if (count == swiper.slides.length) {
        getPokemonsList();
      }
    };
    const breakpoints320 = ref({});
    breakpoints320.value = {
      320:{
        slidesPerView: 1,
        spaceBetween: 10,
      },
      500:{
        slidesPerView: 3,
        spaceBetween: 10,
      },
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
    onMounted(getPokemonsList);
    return {
      state,
      breakpoints320,
      loadSlides,
    };
  },
};
</script>

<style>
</style>