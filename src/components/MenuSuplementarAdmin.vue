<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form class="form-busca-camaranet caixa-destaques" @submit="search(ponto)">
          <div class="row">
            <div class="col-md-10">
              <div id="categoria-busca" class="form-text text-muted">Vincular serviços, sistemas e favoritos default pelo ponto, para usuário com nenhum serviço, nenhum sistema ou nenhum favorito.</div>
              <input type="text" class="form-control input-diretorio-pessoas" v-model="ponto" placeholder="Digite aqui o ponto a ser inserido">
            </div>
            <div class="col-md-2">
              <div id="categoria-busca" class="form-text text-muted">&nbsp;</div>
              <button type="button" class="btn btn-camaranet" @click="incluiFavoritos(ponto), incluiSistemas(ponto), incluiServicos(ponto)">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Vincular
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="row">
      <div class="col-md-12">
        <form class="form-busca-camaranet caixa-destaques" @submit="search(ponto)">
          <div class="row">
            <div class="col-md-10">
              <div id="categoria-busca" class="form-text text-muted">Vincular serviços e favoritos default para usuários com nenhum serviço ou nenhum favorito</div>
            </div>
            <div class="col-md-2">
              <div id="categoria-busca" class="form-text text-muted">&nbsp;</div>
              <button type="button" class="btn btn-camaranet" @click="incluiFavoritos(ponto), incluiSistemas(ponto), incluiServicos(ponto)">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Vincular
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import ServicoBuscas from '../servico/Buscas.js'
import ServicoInclusao from '../servico/Inclusao.js'

export default {
  name: 'BuscaSistemas',
  components: { },
  data: () => ({
    listaEdoc: '',
    listaFavoritos: '',
    listaServicos: '',
    listaSistemas: '',
    pessoa: '',
    ponto: '',
    show: true
  }),
  methods: {
    incluiFavoritos: async function () {
      console.log('incluiFavoritos')
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
    },
    incluiServicos: async function (ponto) {
      console.log('incluiServicos', ponto)

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
    },
   incluiSistemas: async function (ponto) {
     console.log('incluiSistemas', ponto)
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
    }
}
  }
}
</script>
