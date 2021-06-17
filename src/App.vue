<template>
  <div>
    <div class="menu-suplementar-proj">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
@import 'https://camaranet.camara.leg.br/api/camara-temas/static/temas/camaranet.css';
</style>

<style lang="scss" scoped>
.diretorio-buscas{
  @import 'bootstrap/scss/bootstrap.scss';
}
</style>
