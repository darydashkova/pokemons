<template>
  <div class="slide-item">
    <router-link :to="'/pokemon/' + data.id">
      <img
        :src="
          'https://img.pokemondb.net/sprites/bank/normal/' +
          data.name.toLowerCase() +
          '.png'
        "
    /></router-link>
    <div class="pokemon__title" @click="clickHandler(data.id)">	&#9660;&nbsp;{{ data.name }}</div>
    <transition name="bounce">
      <ul v-if="show">
        <li v-for="type in data.typeList" :key="type">{{ type }}</li>
      </ul></transition
    >
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "pokemonItem",
  emits: ['pokemonClick'],
  props: {
    data: {},
  },
    setup(props, {emit}) {
     const clickHandler = (id) => {
         show.value = !show.value;
         emit('pokemonClick', {id: id, show: show.value} );
     }
    const show = ref(false);
    
    return {
      show,
      clickHandler
    };
  },
};
</script>

<style>
</style>