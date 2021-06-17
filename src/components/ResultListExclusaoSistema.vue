<template>
  <div class="lista-itens-cadastrados">
    <div>
      <h6>Sistemas</h6>
    </div>
    <ul class="listLinks">
      <li v-for="(item, index) in this.listaSistemasCadastrados"
          :key="index">
        <a :title="'Acesse: ' + item.nome"
            :href="item.url">
            {{item.nome}}
        </a>
        <a href="/#/minha-area-trabalho/personalizacao"
            @click="removeSistema(item._id)">
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
  props: ['listaSistemasCadastrados'],
  data: () => ({
    show: true
  }),
  methods: {
    removeSistema: async function (id) {
      let vm = this

      // Criando objeto para acessar metodos
      vm.sistema = new ServicoExclusao(this.$resource)

      // Consumindo webService da buscaCamaranetApiServiços
      await vm.sistema.ExcluiSistema(id)
      alert('Sistema excluído!')
      location.reload()
    }
  }
}
</script>
