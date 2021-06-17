<template>
  <div class="grupo-favoritos">
      <div>
        <div class="titulo-favoritos"><span>Favoritos</span><a href="/meu-espaco/personalizacao/#/meu-espaco/personalizacao"><b-icon icon="pencil-square"/></a> </div>
      </div>
      <div class="columns-seusFavoritos" id="content-seusFavoritos" role="main">
          <div class="portlet-layout row-fluid">
            <div class="portlet-column portlet-column-only span12" id="column-seusFavoritos-1">
              <div class="customScrollbar medScroll">
                <div class="boxBody">
                  <ul class="listLinks">
                    <li v-for="(favoritosCadastrados, index) in this.listaFavoritos"
                        :key="index">
                      <a :title="'Acesse: ' + favoritosCadastrados.nome"
                         :href="favoritosCadastrados.url">
                         {{favoritosCadastrados.nome}}
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
  props: ['listaFavoritos'],
  data: () => ({
    show: true
  }),
  methods: {
  }
}
</script>
