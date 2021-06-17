import axios from 'axios'
export default class ServicoBuscas {
  async edoc (ponto, url) {
    let resposta
    return axios.get(url + ponto)
      .then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro menu suplementar web service Edoc: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao carregar tarefa'}
        return resposta
      })
  }

  async buscarFavoritosCadastrados (token) {
    let resposta
    return axios.get(axios.defaults.baseURL.urlMenuSuplementarApi + 'favoritos/', {
      headers: {
        'Content-Type': 'application/json'
    }
    }).then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro ao buscar favorito no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao buscar favorito'}
        return resposta
      })
  }

  async buscarServicosCadastrados (token) {
    let resposta
    return axios.get(axios.defaults.baseURL.urlMenuSuplementarApi + 'servicos/', {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro ao buscar serviço no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao buscar serviço'}
        return resposta
      })
  }

  async buscarSistemasCadastrados (token) {
    let resposta
    return axios.get(axios.defaults.baseURL.urlMenuSuplementarApi + 'sistemas/', {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro ao buscar sistema no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao buscar sistema'}
        return resposta
      })
  }

  async sistemas (parametros) {
    let resposta
    return axios.post(axios.defaults.baseURL.urlBuscaCamaranetApi + 'sistemas/_search/', parametros)
      .then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro menu suplementar sistemas: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao carregar sistema'}
        return resposta
      })
  }

  async servicos (parametros) {
    let resposta
      return axios.post(axios.defaults.baseURL.urlBuscaCamaranetApi + 'servicos/_search/', parametros)
      .then(resultado => {
        return resultado.data
      })
      .catch(erro => {
        console.log('Erro menu suplementar serviços: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao carregar serviço'}
        return resposta
      })
  }

  async pessoas (parametros, token) {
    return axios.request({
      url: axios.defaults.baseURL.urlBuscaCamaranetApi + 'pessoas/_search',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: parametros
    }).then(resultado => {
      return resultado.data
    }).catch(erro => {
      console.log('Erro pessoas ', erro)
      let resposta = {status: false, erro: erro, mensagem: 'Erro ao carregar pessoas'}
      return resposta
    })
  }

  organizandoParametrosSistemas () {
    let params
      params = {
        'q': '*'
    }
    return params
  }

  organizandoParametrosServicos () {
    let q
    let params
    q = '*'
      // q = 'tema.name:' + combo

    if (q) {
      params = {
        'q': q
      }
    }
    return params
  }

  organizandoParametrosPessoas (ponto) {
    let params

      params = {
        'q': ponto
    }
    return params
  }
}
