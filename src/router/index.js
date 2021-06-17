import Vue from 'vue'
import Router from 'vue-router'
import MenuSuplementarHome from '@/components/MenuSuplementarHome'
import MenuSuplementarServicosEdit from '@/components/MenuSuplementarServicosFavoritosEdit'
import MenuSuplementarSistemasEdit from '@/components/MenuSuplementarSistemasEdit'
import MenuSuplementarAdmin from '@/components/MenuSuplementarAdmin'
import PaginaAutenticando from '@/components/PaginaAutenticando'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/menu-suplementar',
      name: 'MenuSuplementarHome',
      component: MenuSuplementarHome
    },
    {
      path: '/meu-espaco/personalizacao',
      name: 'MenuSuplementarServicosFavoritosEdit',
      component: MenuSuplementarServicosEdit
    },
    {
      path: '/minha-area-trabalho/personalizacao',
      name: 'MenuSuplementarSistemasEdit',
      component: MenuSuplementarSistemasEdit
    },
    {
      path: '/menu-suplementar-admin',
      name: 'MenuSuplementarAdmin',
      component: MenuSuplementarAdmin
    },
    {
      path: '/autenticando',
      name: 'PaginaAutenticando',
      component: PaginaAutenticando,
      meta: {
        publica: true
      }
    },
    {
      path: '*',
      component: MenuSuplementarHome
    }
  ]
})
