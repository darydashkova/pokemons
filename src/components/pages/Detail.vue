<template>
  <div class="pokeDetail"> 
    <div class="pokeDetail__container"> 
     <img v-if='pokemonData && pokemonData.name' :src="'https://img.pokemondb.net/sprites/bank/normal/'+pokemonData.name.toLowerCase()+'.png'" > 
   
    <div class="pokemonId"> #{{ pokemonData.id }}</div> 
    <div class="pokemonData">{{ pokemonData.name }}</div>
<div>
      <div class="pokemonPower" v-for="pokemon in pokemonData.typeList" :key="pokemon">{{ pokemon }}</div>

</div></div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "pokemonDetail",
  setup() {
    const getPokemons = require("json-pokemon/getPokemon");
    const pokemonData = ref({});
    const route = useRoute();
    const getPockemonData = (id)=>{
pokemonData.value = getPokemons()[id-1]; 

    }
    watch(
      () => route.params.id,
      (newId) => {
      getPockemonData(newId);
      }
    );
    
    onMounted(()=>{
      getPockemonData(route.params.id)
      })

    return {pokemonData};
  },
};
</script>

<style>
</style>