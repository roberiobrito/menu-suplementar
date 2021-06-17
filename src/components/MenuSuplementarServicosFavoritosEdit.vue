<template>
  <div class="menu-suplementar-edit">
    <div class="row">
      <div class="col-md-6">
        <h2 class="titulo-sessao-edit">Serviços</h2>
        <b-form>
          <!--<b-form-group
            label="Tema"
          >
            <select name="tema" @change="search($event)" class="form-control">
              <option selected="selected" value="">Selecione um tema</option>
              <option value="Administração da Casa">Administração da Casa</option>
              <option value="Atividade Legislativa">Atividade Legislativa</option>
              <option value="Comunicação e Relacionamento Institucional">Comunicação e Relacionamento Institucional</option>
              <option value="Deputados">Deputados</option>
              <option value="Gestão Estratégica">Gestão Estratégica</option>
              <option value="Gestão de Pessoas">Gestão de Pessoas</option>
              <option value="Mesa e Órgãos Colegiados">Mesa e Órgãos Colegiados</option>
              <option value="Publicações da Casa">Publicações da Casa</option>
              <option value="Saúde e Bem-Estar">Saúde e Bem-Estar</option>
              <option value="Serviços de Informação">Serviços de Informação</option>
            </select>
          </b-form-group>-->
          <div v-show="this.listaServicos !== ''">
            <b-form-group
              label="Serviço"
            >
                <select name="servico" class="form-control" v-model="servico">
                    <option  v-for="(dados, index) in this.listaServicos" :key="index" :value="dados._source.id + ',' + dados._source.nomeExibicao">{{dados._source.nomeExibicao}}</option>
                </select>
            </b-form-group>
            <div class="form-save-buttons">
              <button type="button" class="btn btn-camaranet" @click="incluirServico(servico)">
                incluir
              </button>
            </div>
          </div>
        </b-form>
        <div class="itens-cadastrados">
          <ResultListExclusaoServicos :listaServicosCadastrados="listaServicosCadastrados" />
        </div>
      </div>

      <div class="col-md-6">
        <h2 class="titulo-sessao-edit">Favoritos</h2>
        <b-form>
          <b-form-group
            label="Nome"
          >
            <input type="text" name="nome" maxlength="40" v-model="nome" class="">
          </b-form-group>
          <b-form-group
            label="URL"
          >
            <input type="text" name="url" maxlength="40" v-model="url" class="">
          </b-form-group>
          <div class="form-save-buttons">
            <button type="button" class="btn btn-camaranet" @click="validURL(url), incluirFavorito(nome, url)">
              incluir
            </button>
          </div>
        </b-form>
        <div class="itens-cadastrados">
          <ResultListExclusaoFavoritos :listaFavoritos="listaFavoritos" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .menu-suplementar-edit{
    padding:20px;
  }
  .menu-suplementar-edit input{
    width:100%;
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

import ServicoBuscas from '../servico/Buscas.js'
import ServicoInclusao from '../servico/Inclusao.js'
import ResultListExclusaoFavoritos from './ResultListExclusaoFavoritos'
import ResultListExclusaoServicos from './ResultListExclusaoServico'

export default {
  name: 'BuscaSistemas',
  components: { ResultListExclusaoFavoritos, ResultListExclusaoServicos },
  data: () => ({
    tema: '',
    servico: '',
    listaServicos: '',
    listaFavoritos: '',
    listaServicosCadastrados: '',
    nome: '',
    url: '',
    urlValida: '',
    show: true
  }),
  methods: {
    search: async function (event) {
      // console.log(event.target.value);

      let vm = this
      let params

      vm.servico = new ServicoBuscas(this.$resource)
      params = vm.servico.organizandoParametrosServicos()
      const retornoBuscaServicos = await vm.servico.servicos(params)
      vm.listaServicos = retornoBuscaServicos.hits.hits
    },
    incluirServico: async function (servico) {
      let vm = this
      let params
      let idServico = servico.split(',')[0]
      let nomeServico = servico.split(',')[1]

      vm.servico = new ServicoInclusao(this.$resource)
      params = vm.servico.organizandoParametroInclusaoServico(nomeServico, idServico)
      const resposta = await vm.servico.IncluirServico(params)

      if (resposta.status === false) {
        alert('Serviço já cadastrado!')
      } else {
        alert('Serviço adicionado!')
        location.reload()
      }
  },
    incluirFavorito: async function (nome, url) {
      if (this.urlValida === true) {
      let vm = this
      let params

      // Criando objeto para acessar metodos
      vm.favorito = new ServicoInclusao(this.$resource)

      // Organizando parametros Serviços
       params = vm.favorito.organizandoParametroInclusaoFavorito(nome, url)

      // Consumindo webService da buscaCamaranetApiServiços
       await vm.favorito.IncluirFavorito(params)
       }
  },
    searchFavoritos: async function () {
      let vm = this

      // Criando objeto para acessar metodos
      vm.metodo = new ServicoBuscas(this.$resource)

      // Consumindo webService da buscaCamaranetApiServiços
      this.listaFavoritos = await vm.metodo.buscarFavoritosCadastrados()
    },
    searchServicosCadastrados: async function () {
      let vm = this

      // Criando objeto para acessar metodos
      vm.metodo = new ServicoBuscas(this.$resource)

      // Consumindo webService da buscaCamaranetApiServiços
      this.listaServicosCadastrados = await vm.metodo.buscarServicosCadastrados()
    },

    validURL: function (url) {
      let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        if (regexp.test(url)) {
          this.urlValida = true
          alert('Favorito adicionado!')
          location.reload()
        } else {
          this.urlValida = false
          alert(this.url + ' não é uma URL válida.')
        }
  }
  },
   mounted () {

  },
  created () {
    this.searchServicosCadastrados()
    this.searchFavoritos()
    this.search()
  }
}
</script>
