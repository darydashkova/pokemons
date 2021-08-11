<template>
<div class="header">
    <div class="header-container">
      <nav>
        <router-link to="/" exact>{{ home }}</router-link>
        <router-link to="/history">{{ history }}</router-link>
        <router-link to="/contacts">{{ contacts }}</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
   data () {
    return {
      home: 'home',
      history: 'history',
      contacts: 'contacts'
    }
  }
}
</script>