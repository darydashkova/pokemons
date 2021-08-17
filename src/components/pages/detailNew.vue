<template>
   <div class="pokeDetail pokeDetail_new"> 
        <div class="pokeDetail__container">   
            <img v-if='pokemonData && pokemonData.name' :src="'https://img.pokemondb.net/sprites/bank/normal/'+pokemonData.name.toLowerCase()+'.png'" > 
            <div class="pokeDetail_new-top">
                <div class="pokemonId"> #{{ pokemonData.id }}</div> 
                <div class="pokemonData">{{ pokemonData.name }}</div>
                <div v-if="pokemonData && pokemonData.abilities && pokemonData.abilities.length>0" class="pokeDetail_new-mobile-width">
                    <div class="pokeDetail_new-abilities">Способности: </div>
                    <ul class="pokemonAbilit">
                        <li v-for="abil in pokemonData.abilities" :key="abil.ability.name">{{abil.ability.name}}</li>
                    </ul>
                </div>
                <div>
                    <div class="pokeDetail_new-abilities"> Рост </div>
                    <div> {{pokemonData.height}} </div>
                </div>
                <div>
                    <div class="pokeDetail_new-abilities">   Вес </div>
                    <div> {{pokemonData.weight}} </div>
                </div>
                <div>
                    <div class="pokemonPower" v-for="pokemon in pokemonData.typeList" :key="pokemon">{{ pokemon }}</div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "pokemonDetail",
  setup() {
    const pokemonData = ref({});
    const getPockemonData = (id)=>{
              fetch("https://pokeapi.co/api/v2/pokemon/"+id+"/")
      .then((res) => res.json())
      .then((data) => {pokemonData.value = data;
      console.log(pokemonData.value);
      });
    }  
    const route = useRoute();
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