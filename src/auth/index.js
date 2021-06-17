import Vue from 'vue'
import autenticacaoCD from 'vue-autenticacao-oauth2'
import axios from 'axios'

// esta função deve ser chamada antes de instanciar o componente Vue raiz
export default function configurarAutenticacao (ambiente, router) {
  // Iniciando configurações de autenticaçãoCD
  Vue.use(autenticacaoCD.KeycloakPlugin, {
    clientId: ambiente.clientId,
    baseUrlKeycloak: ambiente.baseUrlKeycloak,
    logarAutomaticamente: true,
    realm: 'camara',
    router: router,
    axios: axios
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.hasOwnProperty('publica') && to.meta.publica) {
      next()
      return
    }
    const authCD = Vue.prototype.$autenticacao
    if (authCD.getUsuarioLogado()) {
      // caso haja diferentes níveis de acesso, validar aqui
      next()
      return
    }

    // armazena rota para onde voltar depois do login
    localStorage.setItem('rota', to.fullPath)

    const onUsuarioAlterado = function (usuario) {
      autenticacaoCD.eventos.$off('usuario-alterado', onUsuarioAlterado)
      if (usuario) {
        const rotaArmazenada = localStorage.getItem('rota')
        if (rotaArmazenada) {
          localStorage.removeItem('rota')
          next(rotaArmazenada)
        } else {
          // rota default
          next({name: 'MenuSuplementarHome'})
        }
      } else {
        console.log('Sessão expirada.')
        authCD.autenticar()
      }
    }
    autenticacaoCD.eventos.$on('usuario-alterado', onUsuarioAlterado)

    next({name: 'PaginaAutenticando'})
  })
}

function criarMixinAtualizacaoToken () {
  return {
    created () {
      // força autenticação caso o token tenha expirado
      autenticacaoCD.eventos.$on('token-expirado', () => {
        console.log('Sessão expirada, autenticando novamente')
        this.$autenticacao.autenticar()
      })

      autenticacaoCD.eventos.$on('erro-autenticacao', (msg) => {
        console.error(`Erro durante autenticação: ${msg}`)
      })

      // atualiza token de tempos em tempos
      this.intervalRefreshToken = setInterval(() => {
        // atualiza o token caso ele vá expirar em menos de 120 segundos
        this.$autenticacao.atualizarToken(120)
          .then(novoTokenGerado => {
            if (novoTokenGerado) {
              console.log('Token atualizado')
            }
          })
          .catch(erro => console.error(`Erro ao atualizar token: ${erro}`))
      }, 60 * 1000) // executará de minuto em minuto a verificação
    },
    beforeDestroy () {
      // remove agendamento do setInterval para evitar memory-leaks
      clearInterval(this.intervalRefreshToken)
    }
  }
}

export {
  configurarAutenticacao,
  criarMixinAtualizacaoToken
}
