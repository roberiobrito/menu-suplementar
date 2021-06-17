// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import configurarAutenticacao from './auth'
import ambienteDev from '../config/ambientes/dev.json'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Urls para pegar dados do ambiente
let urlAmbiente = window.location.origin + window.location.pathname + '/ambiente.json'
let urlAmbienteVariavelGlobalPortletLiferay = window['url_ambiente_vue'] // Essa variavel é global. E vem do portlet BUSCA-PESSOAS do liferay

Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

// Verificando se variavel Global gerada pelo portlet do liferay existe.
if (urlAmbienteVariavelGlobalPortletLiferay !== undefined && urlAmbienteVariavelGlobalPortletLiferay !== 'undefined') {
  urlAmbiente = urlAmbienteVariavelGlobalPortletLiferay
}

// Configuração da urlbase do axios
if (process.env.NODE_ENV === 'dev') {
  axios.defaults.baseURL = ambienteDev
  init(ambienteDev)
} else {
  axios.get(urlAmbiente)
    .then(ambiente => {
      axios.defaults.baseURL = ambiente.data
      init(ambiente.data)
    }).catch(error => {
      console.error('Não foi possível localizar o ambiente', error)
    })
}

function init (ambiente) {
  configurarAutenticacao(ambiente, router)

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    data: {ambiente: ambiente},
    template: '<App/>'
  })
}
