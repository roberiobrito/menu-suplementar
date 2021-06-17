<template>
  <div class="grupo-favoritos">
      <div>
        <div class="titulo-favoritos"><span>Sistemas</span><a href="/minha-area-trabalho/personalizacao/#/minha-area-trabalho/personalizacao"><b-icon icon="pencil-square"/></a> </div>
      </div>
      <div class="columns-seusFavoritos" id="content-seusFavoritos" role="main">
          <div class="portlet-layout row-fluid">
            <div class="portlet-column portlet-column-only span12" id="column-seusFavoritos-1">
              <div class="customScrollbar medScroll">
                <div class="boxBody">
                  <ul class="listLinks">
                    <li v-for="(sistemasCadastrados, index) in this.listaSistemas"
                        :key="index">
                      <a :title="'Acesse: ' + sistemasCadastrados.sigla"
                         :href="sistemasCadastrados.url">
                         {{sistemasCadastrados.nome}}
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
  props: ['listaSistemas'],
  data: () => ({
    show: true
  }),
  methods: {
  }
}
</script>
