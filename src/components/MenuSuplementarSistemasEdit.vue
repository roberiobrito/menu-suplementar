<template>
  <div class="menu-suplementar-edit">
    <div class="row">
      <div class="col-md-12">
        <h2 class="titulo-sessao-edit">Sistemas</h2>
        <b-form>
          <div v-show="this.listaSistemas !== ''">
            <b-form-group label="Sistema">
              <select name="servico" class="form-control" v-model="sistema">
                   <option selected="selected" value="">Escolha</option>
                   <option
                      v-for="(dados, index) in this.listaSistemas"
                      :key="index" :value="dados._source.id + ',' + dados._source.sigla">
                          {{dados._source.nome}}
                    </option>
              </select>
            </b-form-group>
          </div>
          <div class="form-save-buttons">
            <button type="button" class="btn btn-camaranet" @click="incluirSistema(sistema)">
              incluir
            </button>
          </div>
        </b-form>
        <div class="itens-cadastrados">
        <ResultListExclusaoSistemas :listaSistemasCadastrados="listaSistemasCadastrados" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .menu-suplementar-edit{
    padding:20px;
  }
  .menu-suplementar-edit fieldset{
    border:none !important;
  }
  h2.titulo-sessao-edit{
    font-size:2rem;
  }
  .form-save-buttons {
    text-align:center;
  }
  .form-save-buttons button.btn.btn-camaranet {
    background: #7c6c5c none;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.9em;
    font-family: inherit;
    text-shadow: none;
    padding: 0.55em 3em;
  }
  .itens-cadastrados{
    margin-top:20px;
  }
</style>

<script>

import ResultListExclusaoSistemas from './ResultListExclusaoSistema'
import ServicoBuscas from '../servico/Buscas.js'
import ServicoInclusao from '../servico/Inclusao.js'

export default {
  name: 'BuscaSistemas',
  components: { ResultListExclusaoSistemas },
  data: () => ({
    sistema: '',
    listaSistemas: '',
    listaSistemasCadastrados: '',
    show: true
  }),
  methods: {
    search: async function () {
      let vm = this
      let params

      vm.servico = new ServicoBuscas(this.$resource)
      params = vm.servico.organizandoParametrosSistemas()
      const retornoBuscaSistemas = await vm.servico.sistemas(params)
      vm.listaSistemas = retornoBuscaSistemas.hits.hits
    },
    searchSistemasCadastrados: async function () {
      let vm = this

      vm.metodo = new ServicoBuscas(this.$resource)
      this.listaSistemasCadastrados = await vm.metodo.buscarSistemasCadastrados()
    },

    incluirSistema: async function (sistema) {
      let vm = this
      let params
      let idSistema = sistema.split(',')[0]
      let sigla = sistema.split(',')[1]

      vm.sistema = new ServicoInclusao(this.$resource)
      params = vm.sistema.organizandoParametroInclusaoSistema(sigla, idSistema)
      const resposta = await vm.sistema.IncluirSistema(params)

      if (resposta.status === false) {
        alert('Serviço já cadastrado!')
      } else {
        alert('Sistema adicionado!')
        location.reload()
      }
  }
  },
  created () {
    this.search()
    this.searchSistemasCadastrados()
  },
   mounted () {

  }
}
</script>
