import axios from 'axios'
export default class ServicoExlusaoFavorito {
  async ExcluiFavorito (id) {
    let resposta
    return axios.delete(axios.defaults.baseURL.urlMenuSuplementarApi + 'favoritos/' + id, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.status
      })
      .catch(erro => {
        console.log('Erro ao excluir favorito no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao excluir favorito'}
        return resposta
      })
  }

  async ExcluiServico (id) {
    let resposta
    return axios.delete(axios.defaults.baseURL.urlMenuSuplementarApi + 'servicos/' + id, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.status
      })
      .catch(erro => {
        console.log('Erro ao excluir serviço no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao excluir serviço'}
        return resposta
      })
  }

  async ExcluiSistema (id) {
    let resposta
    return axios.delete(axios.defaults.baseURL.urlMenuSuplementarApi + 'sistemas/' + id, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.status
      })
      .catch(erro => {
        console.log('Erro ao excluir sistema no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao excluir sistema'}
        return resposta
      })
  }
}
