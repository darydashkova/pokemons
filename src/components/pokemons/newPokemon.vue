<template>
  <div class="slide-item">
    <router-link :to="'/pokemonDetail/' + data.id">
      <img
        :src="
          'https://img.pokemondb.net/sprites/bank/normal/' +
          data.name.toLowerCase() +
          '.png'
        "
    /></router-link>
    <div class="pokemon__title">{{ data.name }}</div>
  </div>
</template>

<script>

export default {
  name: "newPokemon",
  props: {
    data: {},
  },
    setup() {
 
    return {

    };
  },
};
</script>

<style>
</style>