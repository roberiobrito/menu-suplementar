import axios from 'axios'
export default class ServicoInclusao {
  async IncluirServico (parametros) {
    let resposta
    return axios.post(axios.defaults.baseURL.urlMenuSuplementarApi + 'servicos/', parametros, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado
      })
      .catch(erro => {
        console.log('Erro ao inserir serviço no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao inserir serviço'}
        return resposta
      })
  }

  async IncluirFavorito (parametros) {
    let resposta
    return axios.post(axios.defaults.baseURL.urlMenuSuplementarApi + 'favoritos/', parametros, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado.status
      })
      .catch(erro => {
        console.log('Erro ao inserir favorito no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao inserir favorito'}
        return resposta
      })
  }

  async IncluirSistema (parametros) {
    let resposta
    return axios.post(axios.defaults.baseURL.urlMenuSuplementarApi + 'sistemas/', parametros, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
      .then(resultado => {
        return resultado
      })
      .catch(erro => {
        console.log('Erro ao inserir sistema no menu suplementar: ', erro)
        resposta = {status: false, erro: erro, mensagem: 'Erro ao inserir sistema'}
        return resposta
      })
  }

  organizandoParametroInclusaoServico (nomeServico, IdServico) {
    let params

    params = {
      'ordem': 1,
      'nome': nomeServico,
      'idServico': IdServico
    }

    return params
  }

  organizandoParametroInclusaoFavorito (nome, url) {
    let params

    params = {
      'ordem': 1,
      'nome': nome,
      'url': url
    }

    return params
  }

  parametrosInclusaoFavoritosPadrao (index) {
    let params

    if (index === 0) {
      params = {
        'ordem': 1,
        'nome': 'Plenário',
        'url': 'https://www2.camara.leg.br/atividade-legislativa/plenario'
      }

     return params
    }

     if (index === 1) {
      params = {
        'ordem': 1,
        'nome': 'Comissões',
        'url': 'https://www2.camara.leg.br/atividade-legislativa/comissoes'
      }

     return params
    }

    if (index === 2) {
      params = {
        'ordem': 1,
        'nome': 'Revista da Casa',
        'url': 'https://camaranet.camara.leg.br/comunicacao/revista-casa'
      }

     return params
    }

    if (index === 3) {
      params = {
        'ordem': 1,
        'nome': 'Agência Câmara',
        'url': 'https://www.camara.leg.br/noticias'
      }

     return params
    }

    if (index === 4) {
      params = {
        'ordem': 1,
        'nome': 'TV Câmara',
        'url': 'https://www.camara.leg.br/tv'
      }

     return params
    }

    if (index === 5) {
      params = {
        'ordem': 1,
        'nome': 'Senado Federal',
        'url': 'https://www.senado.leg.br/'
      }

     return params
    }

    if (index === 6) {
      params = {
        'ordem': 1,
        'nome': 'TCU',
        'url': 'https://portal.tcu.gov.br/'
      }

     return params
    }
}

  organizandoParametroInclusaoSistema (sigla, idSistema) {
    let params

    params = {
      'ordem': 1,
      'sigla': sigla,
      'idSistema': idSistema
    }

    return params
  }

  parametrosInclusaoSistemasPadraoDepSec (index) {
    let params

    if (index === 0) {
      params = {
        'ordem': 1,
        'sigla': 'SIGESP-CD',
        'idSistema': 241157
    }
    return params
  }

  if (index === 1) {
    params = {
      'ordem': 1,
      'sigla': 'Gabinete Digital',
      'idSistema': 699814
  }
  return params
}
  }

  parametrosInclusaoSistemasPadrao (index) {
    let params

    if (index === 0) {
      params = {
        'ordem': 1,
        'sigla': 'Edoc',
        'idSistema': 241382
    }
    return params
  }

  if (index === 1) {
    params = {
      'ordem': 1,
      'sigla': 'SIGESPNET',
      'idSistema': 241224
  }
  return params
}
  }

  parametrosInclusaoServicosPadraoServidor (index) {
     let params
     let CONTRACHEQUE_QUADRO_EFETIVO = '9dee88ec-e03f-4663-b124-3979103be917'
     let FERIAS_QUADRO_EFETIVO = '3ff3ebce-de92-4eaf-989a-ce3338f62d85'
     let BOLETIM_ADMIN = '8fb853e8-0fad-4d30-9166-08cf737387d6'
     let CATALOGO_AUT = 'fa211f2d-b341-458a-9e2c-9c113e89e2fc'
     let INSCRICOES_CURSOS = 'd51d6f08-58fd-48d9-8beb-ccdf40b7ec1e'
     let MARCACAO_CONSULTAS = '6a13b344-260b-40cc-84cc-7387a85fd2c6'
     let EDUCACAO_FINANCEIRA = 'ff94f823-52cb-473a-996e-0a70a3153218'
     let PONTO_ELETRONICO = 'f8b9951b-aae2-42f6-955e-0371ab40155c'

   if (index === 0) {
    params = {
      'ordem': 1,
      'nome': 'Contracheque - Servidor Efetivo',
      'idServico': CONTRACHEQUE_QUADRO_EFETIVO
  }
  return params
}

if (index === 1) {
  params = {
    'ordem': 1,
    'nome': 'Educação Financeira',
    'idServico': EDUCACAO_FINANCEIRA
}
return params
}

if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Férias',
    'idServico': FERIAS_QUADRO_EFETIVO
}
return params
}

if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Boletim Administrativo',
    'idServico': BOLETIM_ADMIN
}
return params
}

if (index === 4) {
  params = {
    'ordem': 1,
    'nome': 'Catálogo de Autoridades',
    'idServico': CATALOGO_AUT
}
return params
}

if (index === 5) {
  params = {
    'ordem': 1,
    'nome': 'Inscrição em Cursos no Cefor',
    'idServico': INSCRICOES_CURSOS
}
return params
}

if (index === 6) {
  params = {
    'ordem': 1,
    'nome': 'Marcação de Consultas',
    'idServico': MARCACAO_CONSULTAS
}
return params
}

if (index === 7) {
  params = {
    'ordem': 1,
    'nome': 'Ponto Eletrônico',
    'idServico': PONTO_ELETRONICO
}
return params
}
  }

  parametrosInclusaoServicosPadraoSecretario (index) {
    let params
    let CONTRACHEQUE_SECRETARIO = 'bbbe0ab4-3349-475e-a017-e73454da1810'
    let FERIAS_SECRETARIO = '4cdb7268-7208-4399-8793-36819d7956c4'
    let BOLETIM_ADMIN = '8fb853e8-0fad-4d30-9166-08cf737387d6'
    let CATALOGO_AUT = 'fa211f2d-b341-458a-9e2c-9c113e89e2fc'
    let INSCRICOES_CURSOS = 'd51d6f08-58fd-48d9-8beb-ccdf40b7ec1e'
    let MARCACAO_CONSULTAS = '6a13b344-260b-40cc-84cc-7387a85fd2c6'

   if (index === 0) {
    params = {
      'ordem': 1,
      'nome': 'Contracheque - Secretário Parlamentar',
      'idServico': CONTRACHEQUE_SECRETARIO
  }
  return params
}

if (index === 1) {
  params = {
    'ordem': 1,
    'nome': 'Férias - Secretário Parlamentar',
    'idServico': FERIAS_SECRETARIO
}
return params
}

if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Boletim Administrativo',
    'idServico': BOLETIM_ADMIN
}
return params
}

if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Catálogo de Autoridades',
    'idServico': CATALOGO_AUT
}
return params
}

if (index === 4) {
  params = {
    'ordem': 1,
    'nome': 'Inscrição em Cursos no Cefor',
    'idServico': INSCRICOES_CURSOS
}
return params
}

if (index === 5) {
  params = {
    'ordem': 1,
    'nome': 'Marcação de Consultas',
    'idServico': MARCACAO_CONSULTAS
}
return params
}
  }

  parametrosInclusaoServicosPadraoCNE (index) {
    let params
    let CONTRACHEQUE_CNE = '43316711-3cdb-4b5e-973e-a9e6256a91d2'
    let FERIAS_CNE = '99c09fbf-c2c2-4651-a731-479eeef0d20c'
    let BOLETIM_ADMIN = '8fb853e8-0fad-4d30-9166-08cf737387d6'
    let CATALOGO_AUT = 'fa211f2d-b341-458a-9e2c-9c113e89e2fc'
    let INSCRICOES_CURSOS = 'd51d6f08-58fd-48d9-8beb-ccdf40b7ec1e'
    let MARCACAO_CONSULTAS = '6a13b344-260b-40cc-84cc-7387a85fd2c6'
    let PONTO_ELETRONICO = 'f8b9951b-aae2-42f6-955e-0371ab40155c'

   if (index === 0) {
    params = {
      'ordem': 1,
      'nome': 'Contracheque - CNE',
      'idServico': CONTRACHEQUE_CNE
  }
  return params
}

if (index === 1) {
  params = {
    'ordem': 1,
    'nome': 'Férias - CNE',
    'idServico': FERIAS_CNE
}
return params
}

if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Boletim Administrativo',
    'idServico': BOLETIM_ADMIN
}
return params
}

if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Catálogo de Autoridades',
    'idServico': CATALOGO_AUT
}
return params
}

if (index === 4) {
  params = {
    'ordem': 1,
    'nome': 'Inscrição em Cursos no Cefor',
    'idServico': INSCRICOES_CURSOS
}
return params
}

if (index === 5) {
  params = {
    'ordem': 1,
    'nome': 'Marcação de Consultas',
    'idServico': MARCACAO_CONSULTAS
}
return params
}

if (index === 6) {
  params = {
    'ordem': 1,
    'nome': 'Ponto Eletrônico - CNE',
    'idServico': PONTO_ELETRONICO
}
return params
}
  }

  parametrosInclusaoServicosPadraoDeputados (index) {
    let params
    let CONTRACHEQUE_DEPUTADO = '3881285b-7c97-410b-925b-39dbe60004af'
    let BOLETIM_ADMIN = '8fb853e8-0fad-4d30-9166-08cf737387d6'
    let CATALOGO_AUT = 'fa211f2d-b341-458a-9e2c-9c113e89e2fc'
    let MARCACAO_CONSULTAS = '6a13b344-260b-40cc-84cc-7387a85fd2c6'
    let JOURNAL_CAMARA = 'bc3249c7-917a-466f-8f9e-1211137b1cb9'
    let COTA_PARLAMENTAR = '2f5a4c36-7192-4705-bbdc-48cb86486eda'

   if (index === 0) {
    params = {
      'ordem': 1,
      'nome': 'Contracheque - Deputado',
      'idServico': CONTRACHEQUE_DEPUTADO
  }
  return params
}

if (index === 1) {
  params = {
    'ordem': 1,
    'nome': 'Boletim Administrativo',
    'idServico': BOLETIM_ADMIN
}
return params
}
if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Marcação de Consultas',
    'idServico': MARCACAO_CONSULTAS
}
return params
}
if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Catálogo de Autoridades',
    'idServico': CATALOGO_AUT
}
return params
}
if (index === 4) {
  params = {
    'ordem': 1,
    'nome': 'Jornal da Câmara',
    'idServico': JOURNAL_CAMARA
}
return params
}

if (index === 5) {
  params = {
    'ordem': 1,
    'nome': 'Cota Parlamentar - Ceap',
    'idServico': COTA_PARLAMENTAR
}
return params
}
  }

  parametrosInclusaoServicosPadraoInativos (index) {
    let params
    let CONTRACHEQUE_QUADRO_EFETIVO = '9dee88ec-e03f-4663-b124-3979103be917'
    let BOLETIM_ADMIN = '8fb853e8-0fad-4d30-9166-08cf737387d6'
    let MARCACAO_CONSULTAS = '6a13b344-260b-40cc-84cc-7387a85fd2c6'
    let EDUCACAO_FINANCEIRA = 'ff94f823-52cb-473a-996e-0a70a3153218'

   if (index === 0) {
    params = {
      'ordem': 1,
      'nome': 'Contracheque - Servidor Efetivo',
      'idServico': CONTRACHEQUE_QUADRO_EFETIVO
  }
  return params
}

if (index === 1) {
  params = {
    'ordem': 1,
    'nome': 'Boletim Administrativo',
    'idServico': BOLETIM_ADMIN
}
return params
}
if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Marcação de Consultas',
    'idServico': MARCACAO_CONSULTAS
}
return params
}
if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Programa de Educação Financeira',
    'idServico': EDUCACAO_FINANCEIRA
}
return params
}
  }

  parametrosInclusaoServicosPadraoTerceirizados (index) {
    let params
    let JOURNAL_CAMARA = 'bc3249c7-917a-466f-8f9e-1211137b1cb9'
    let RADIO_CAMARA = '9893dd17-b59c-467c-8945-7763141f1e0b'
    let EDUCACAO_FINANCEIRA = 'ff94f823-52cb-473a-996e-0a70a3153218'
    let MANUTENCAO_TEL = '9ac35403-d568-4162-8028-d2bbffd69b7d'
    let EMERGENCIA_MEDICA = '204b1127-8473-4cad-831f-326c318e5ab4'

    if (index === 0) {
       params = {
         'ordem': 1,
         'nome': 'Jornal da Câmara',
         'idServico': JOURNAL_CAMARA
     }
     return params
   }

   if (index === 1) {
    params = {
      'ordem': 1,
      'nome': 'Rádio Câmara',
      'idServico': RADIO_CAMARA
  }
  return params
}

if (index === 2) {
  params = {
    'ordem': 1,
    'nome': 'Programa de Educação Financeira',
    'idServico': EDUCACAO_FINANCEIRA
}
return params
}

if (index === 3) {
  params = {
    'ordem': 1,
    'nome': 'Manutenção Telefônica',
    'idServico': MANUTENCAO_TEL
}
return params
}

if (index === 4) {
  params = {
    'ordem': 1,
    'nome': 'Emergência Médica',
    'idServico': EMERGENCIA_MEDICA
}
return params
}
  }
}
