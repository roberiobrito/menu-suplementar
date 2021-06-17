<template>
      <div class="services" id="documentoEdoc" v-if="listaEdoc.dados == true">
      <div>
        <h6>Documentos eDoc</h6>
      </div>
      <div class="columns-seusFavoritos" id="content-seusFavoritos" role="main">
          <div class="portlet-layout row-fluid">
            <div class="portlet-column portlet-column-only span12" id="column-seusFavoritos-1">
              <div class="customScrollbar medScroll">
                <div class="boxBody">
                  <ul class="listLinks">
                    <li v-if="listaEdoc.tarefas != 0">
                      <a :title="'Acesse: Tarefas (' + listaEdoc.tarefas + ')'"
                         :href="listaEdoc.urlTarefas">
                        Tarefas ({{listaEdoc.tarefas}})
                      </a>
                    </li>
                    <li v-if="listaEdoc.compartilhados != 0">
                      <a :title="'Acesse: Compartilhados (' + listaEdoc.compartilhados + ')'"
                         :href="listaEdoc.urlCompartilhados">
                        Compartilhados ({{listaEdoc.compartilhados}})
                      </a>
                    </li>
                    <li v-if="listaEdoc.quatidadeReceber != 0">
                      A Receber ({{listaEdoc.quatidadeReceber}})
                    </li>
                    <li style="margin-left: 10px;" v-for="(receber, index) in this.listaEdoc.receber" :key="index">
                      <a :title="'Acesse: ' + receber.descricao + '(' + receber.total +')'" :href="receber.url">{{receber.descricao}} ({{receber.total}})</a>
                    </li>
                    <li v-if="listaEdoc.tarefas != 0">
                      <a :title="'Acesse: Tarefas (' + listaEdoc.tarefas + ')'"
                         :href="listaEdoc.urlTarefas">
                        Tarefas ({{listaEdoc.tarefas}})
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
  props: ['listaEdoc'],
  data: () => ({
    show: true
  }),
  methods: {

  }
}
</script>
