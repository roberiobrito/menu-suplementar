/** Define o profile que será usado, caso nenhum seja passo o padrão é o desenv */
exports.profile = function () {
  let nodeEnv = setNomeCorretoDoAmbiente(process.env.NODE_ENV)
  // Setando congirua confi de ambiente
  if (nodeEnv === 'dev' || nodeEnv === 'tes') {
    return require('./ambientes/dev.json')
  } else if (nodeEnv !== 'dev' & nodeEnv !== 'prod' & nodeEnv !== 'tes') {
    return require('./ambientes/dev.json')
  } else {
    return require('./ambientes/' + nodeEnv + '.json')
  }

  function setNomeCorretoDoAmbiente (variavel) {
    if (variavel === 'testing') {
      return 'tes'
    } else if (variavel === 'development') {
      return 'dev'
    } else if (variavel === 'production') {
      return 'prod'
    }
  }
}
