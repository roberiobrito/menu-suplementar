<template>
  <div class="grupo-favoritos">
      <div>
        <div class="titulo-favoritos"><span>Servicos</span><a href="/meu-espaco/personalizacao/#/meu-espaco/personalizacao"><b-icon icon="pencil-square"/></a> </div>
      </div>
      <div class="columns-seusFavoritos" id="content-seusFavoritos" role="main">
          <div class="portlet-layout row-fluid">
            <div class="portlet-column portlet-column-only span12" id="column-seusFavoritos-1">
              <div class="customScrollbar medScroll">
                <div class="boxBody">
                  <ul class="listLinks">
                    <li v-for="(ServicosCadastrados, index) in this.listaServicos"
                        :key="index">
                      <a :title="'Acesse: ' + ServicosCadastrados.nome"
                         :href="ServicosCadastrados.url">
                         {{ServicosCadastrados.nome}}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['listaServicos'],
  data: () => ({
    show: true
  }),
  methods: {
  }
}
</script>
