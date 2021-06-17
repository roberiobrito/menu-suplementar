<template>
  <div class="perfil-usuario">
    <div class="foto-perfil">
      <img
        :src="foto"
        img-alt="Image"
        width="90px"
      />
    </div>
    <div class="saudacoes">
      <strong>Olá, {{primeiroNome}}</strong>
    </div>
    <div class="lista-favoritos">
      <ul class="actions">
        <li>
          <a href="/meu-espaco/#/meu-espaco">
            <b-icon icon="person-fill" style="width:20; height:20;"/>
          </a>
        </li>
        <li>
          <a href="http://ce.camara.gov.br/" target="_blank">
            <b-icon icon="envelope-fill" style="width:20; height:20;"/>
          </a>
        </li>
        <li>
          <a href="https://edoc.camara.gov.br/" target="_blank">
            <b-icon icon="inbox-fill" style="width:20; height:20;"/>
          </a>
        </li>
        <li>
          <a href="https://eponto.camara.gov.br/eponto/Autenticacao/encaminharLogon.do" target="_blank">
            <b-icon icon="clock-fill" style="width:18; height:18;"/>
          </a>
        </li>
        <li>
          <a href="https://camaranet.camara.leg.br/documents/991320/0/Guia.pdf/41bb1710-a8d1-445b-82ba-b3e57b3a2261" target="_blank" >
            <b-icon icon="telephone-fill" style="width:20; height:20;"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .perfil-usuario .foto-perfil {
      margin-top:-60px;
      text-align:center;
  }
  .perfil-usuario .foto-perfil img{
      border-radius:6px;
      border:1px solid #d3d3d1;
  }

  .perfil-usuario .saudacoes{
      text-align:center;
  }

  .perfil-usuario .lista-favoritos ul{
      text-align:center;
      margin-top:5px;
      padding:0;
  }

  .perfil-usuario .lista-favoritos li{
      list-style:none;
      display:inline;
      padding:3px;
  }
  .perfil-usuario .lista-favoritos li a{
      color:#7D6E59;
  }
</style>

<script>

import axios from 'axios'

export default {
  name: 'Foto',
  props: {
    ponto: String,
    nome: String
  },
  data: () => ({
    urlDadosPessoais: [],
    foto: '',
    primeiroNome: ''
  }),
  methods: {
    buscarFoto: function (ponto) {
      if (ponto !== undefined) {
        const token = localStorage.getItem('tokenJwt')
        return axios.request({
          url: this.$root.ambiente.urlDadosPessoais + ponto + '/foto',
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(resultado => {
          this.foto = resultado.data
          return resultado
        }).catch(erro => {
          console.log('Erro pessoas ', erro)
          let resposta = {status: false, erro: erro, mensagem: 'Erro ao carregar pessoas'}
          return resposta
        })
      }
    }
  },
  watch: {
    ponto: function () {
      try {
        this.buscarFoto(this.ponto)
      } catch (error) {
        console.error('não foi possível assistir o ponto do usuário: ', error)
      }
    }
  },
  created () {
    try {
      this.urlDadosPessoais = this.$root.ambiente.urlDadosPessoais
      this.buscarFoto(this.ponto)
      this.primeiroNome = this.nome.split(' ')[0]
    } catch (error) {
      console.error('não foi possível criar o ponto do usuário: ', error)
    }
  }
}
</script>
