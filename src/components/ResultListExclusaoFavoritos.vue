<template>
  <div class="lista-itens-cadastrados">
      <div>
        <h6>Favoritos</h6>
      </div>
      <ul class="listLinks">
        <li v-for="(favoritosCadastrados, index) in this.listaFavoritos"
            :key="index">
          <a :title="'Acesse: ' + favoritosCadastrados.nome"
              :href="favoritosCadastrados.url">
              {{favoritosCadastrados.nome}}
          </a>
          <a href="/#/meu-espaco/personalizacao"
              @click="removeFavorito(favoritosCadastrados._id)">
              <b-icon icon="trash-fill" style="width:20; height:20;"/>
          </a>
        </li>
      </ul>
  </div>
</template>

<style>
  .lista-itens-cadastrados ul{
    list-style:none;
    padding:0px;
    margin:0;
  }
  .lista-itens-cadastrados ul li{
    padding:10px;
    display:flex;
  }
  .lista-itens-cadastrados ul li:not(:last-child){
    border-bottom: 1px dotted #D1CBC2;
  }
  .lista-itens-cadastrados ul li a{
    text-decoration:none;
    color:#7d6f5b;
  }
  .lista-itens-cadastrados ul li a:first-child{
    flex:1;
  }
</style>

<script>
import ServicoExclusao from '../servico/Exclusao.js'

export default {
  props: ['listaFavoritos'],
  data: () => ({
    show: true
  }),
  methods: {
    removeFavorito: async function (id) {
      let vm = this

      vm.favorito = new ServicoExclusao(this.$resource)
      await vm.favorito.ExcluiFavorito(id)
      alert('Favorito excluído!')
      location.reload()
    }
  }
}
</script>
