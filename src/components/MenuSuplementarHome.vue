<template>
  <div class="menu-suplementar">
    <Foto :ponto="usuarioLogado.ponto" :nome="usuarioLogado.nome" />
    <div class="row">
      <div class="col-md-12">
        <ResultListServicos :listaServicos="listaServicos" />
        <ResultListFavoritos :listaFavoritos="listaFavoritos" />
        <ResultListSistemas :listaSistemas="listaSistemas" />
        <ResultListEdoc :listaEdoc="listaEdoc" />
      </div>
    </div>
  </div>
</template>

<style>
  .menu-suplementar {
    background-color:#EAE7E3;
    margin-top:70px;
    padding:5px 0 20px 0;
  }
   .menu-suplementar .grupo-favoritos .titulo-favoritos{
    color:#7d6f5b;
    background-color:#D1CBC2;
    padding:10px;
    display:flex;
  }
  .menu-suplementar .grupo-favoritos .titulo-favoritos span{
    flex:1
  }
  .menu-suplementar .grupo-favoritos h6 a{
    color:#7D6E59;
  }
  .menu-suplementar .grupo-favoritos ul{
    list-style:none;
    padding:0 20px;
    margin:0;
  }
  .menu-suplementar .grupo-favoritos ul li{
    padding:5px;
  }
  .menu-suplementar .grupo-favoritos ul li:not(:last-child){
    border-bottom: 1px dotted #D1CBC2;
  }
  .menu-suplementar .grupo-favoritos ul li a{
    text-decoration:none;
    color:#7d6f5b;
  }
</style>

<script>

import ServicoBuscas from '../servico/Buscas.js'
import ServicoInclusao from '../servico/Inclusao.js'
import Foto from './Foto'
import ResultListServicos from './ResultListServicos'
import ResultListFavoritos from './ResultListFavoritos'
import ResultListSistemas from './ResultListSistemas'
import ResultListEdoc from './ResultListEdoc'

export default {
  name: 'BuscaSistemas',
  components: { Foto, ResultListFavoritos, ResultListEdoc, ResultListServicos, ResultListSistemas },
  data: () => ({
    usuarioLogado: null,
    listaEdoc: '',
    listaFavoritos: '',
    listaServicos: '',
    listaSistemas: '',
    pessoa: '',
    show: true
  }),
  methods: {
    searchDocumentosEdoc: async function (ponto) {
      let vm = this
      let url = this.$root.ambiente.urlWeServiceEdoc

      vm.metodo = new ServicoBuscas(this.$resource)
      this.listaEdoc = await vm.metodo.edoc(ponto, url)
    },
    searchFavoritos: async function () {
      let vm = this

      vm.metodo = new ServicoBuscas(this.$resource)
      this.listaFavoritos = await vm.metodo.buscarFavoritosCadastrados()

      // Iniciando inclusão para usuários sem nenhum favorito
      let paramsFavoritosPadrao
      let totalFavoritos = 7
      vm.favoritosPadrao = new ServicoInclusao(this.$resource)

      // Incluindo favoritos para usuários sem nenhum favorito
       if (this.listaFavoritos.status === false) {
          for (let index = 0; index < totalFavoritos; index++) {
                paramsFavoritosPadrao = vm.favoritosPadrao.parametrosInclusaoFavoritosPadrao(index)
                await vm.favoritosPadrao.IncluirFavorito(paramsFavoritosPadrao)
            }
         }

         this.listaFavoritos = await vm.metodo.buscarFavoritosCadastrados()
    },
    searchServicos: async function (ponto) {
      let vm = this

      vm.metodo = new ServicoBuscas(this.$resource)
      this.listaServicos = await vm.metodo.buscarServicosCadastrados()

      // Iniciando inclusão para usuários sem nenhum serviço
      let paramsPessoas
      let paramsServicosPadrao
      let totalServicosTerceirizado = 5
      let totalServicosInativo = 4
      let totalServicosDeputado = 6
      let totalServicosCNE = 7
      let totalServicosSecretario = 6
      let totalServicosServidor = 8

      paramsPessoas = vm.metodo.organizandoParametrosPessoas(ponto)
      const retornoBuscaPessoas = await vm.metodo.pessoas(paramsPessoas)
      vm.pessoa = retornoBuscaPessoas.hits.hits[0]._source
      vm.servicosPadrao = new ServicoInclusao(this.$resource)

      // Incluindo serviços para usuários sem nenhum serviço
       if ((vm.pessoa.grupoFuncional === 'Terceirizado' && this.listaServicos.status === false) || (vm.pessoa.grupoFuncional === 'Estagiário' && this.listaServicos.status === false)) {
          for (let index = 0; index < totalServicosTerceirizado; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoTerceirizados(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
       } else if (vm.pessoa.grupoFuncional === 'Servidor Inativo' && this.listaServicos.status === false) {
          for (let index = 0; index < totalServicosInativo; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoInativos(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
       } else if (vm.pessoa.grupoFuncional === 'Deputado' && this.listaServicos.status === false) {
          for (let index = 0; index < totalServicosDeputado; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoDeputados(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
        } else if (vm.pessoa.grupoFuncional === 'CNE' && this.listaServicos.status === false) {
          for (let index = 0; index < totalServicosCNE; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoCNE(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
         } else if (vm.pessoa.grupoFuncional === 'Secretario Parlamentar' && this.listaServicos.status === false) {
          for (let index = 0; index < totalServicosSecretario; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoSecretario(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
         } else if (vm.pessoa.grupoFuncional === 'Servidor Efetivo' && this.listaServicos.status === false) {
          for (let index = 0; index < totalServicosServidor; index++) {
                paramsServicosPadrao = vm.servicosPadrao.parametrosInclusaoServicosPadraoServidor(index)
                await vm.servicosPadrao.IncluirServico(paramsServicosPadrao)
            }
         }

         this.listaServicos = await vm.metodo.buscarServicosCadastrados()
    },
    searchSistemas: async function (ponto) {
      let vm = this
      vm.metodo = new ServicoBuscas(this.$resource)
      this.listaSistemas = await vm.metodo.buscarSistemasCadastrados()

      // Iniciando inclusão para usuários sem nenhum sistemas
      let paramsPessoas
      let paramsSistemasPadrao
      let totalSistemasPadrao = 2

      paramsPessoas = vm.metodo.organizandoParametrosPessoas(ponto)
      const retornoBuscaPessoas = await vm.metodo.pessoas(paramsPessoas)
      vm.pessoa = retornoBuscaPessoas.hits.hits[0]._source
      vm.sistemasPadrao = new ServicoInclusao(this.$resource)

      // Incluindo sistemas para usuários sem nenhum sistemas
      if (this.listaSistemas.status === false) {
       if (vm.pessoa.grupoFuncional !== 'Deputado' || vm.pessoa.grupoFuncional !== 'Secretario Parlamentar') {
          for (let index = 0; index < totalSistemasPadrao; index++) {
              paramsSistemasPadrao = vm.sistemasPadrao.parametrosInclusaoSistemasPadrao(index)
              await vm.sistemasPadrao.IncluirSistema(paramsSistemasPadrao)
            }
       } else {
          for (let index = 0; index < totalSistemasPadrao; index++) {
              paramsSistemasPadrao = vm.sistemasPadrao.parametrosInclusaoSistemasPadraoDepSec(index)
              await vm.sistemasPadrao.IncluirSistema(paramsSistemasPadrao)
            }
       }
        this.listaSistemas = await vm.metodo.buscarSistemasCadastrados()
    }
}
  },
   created () {
    this.usuarioLogado = this.$autenticacao.getUsuarioLogado()
    this.searchDocumentosEdoc(this.usuarioLogado.ponto)
    this.searchFavoritos()
    this.searchServicos(this.usuarioLogado.ponto)
    this.searchSistemas(this.usuarioLogado.ponto)
  }
}
</script>
