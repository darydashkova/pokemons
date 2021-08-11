<template>
    <div class="block-img">
  </div>  <headerNav></headerNav>
  <router-view></router-view>

</template>

<script>

import headerNav from './components/header'
export default {
  name: 'App',
  components: {
headerNav
  }
}
</script>

<style>

</style>
