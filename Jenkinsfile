#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
        IMAGEM_DOCKER = 'dockerhub.camara.gov.br/socit/v-menu-suplementar'
        URL_RANCHER = 'https://rancher.camara.gov.br/v2-beta'
        APROVADORES = 'P_999259'
        EMAIL = 'roberio.brito@camara.leg.br'
        URL_JENKINS = 'https://jenkins-teste.camara.gov.br/view/SOCIT/job/v-menu-suplementar/'
        VERSAO_NODE_JS = 'NodeJS8'
        CONFIG_NODE_JS = '211e3b36-ac91-4e95-8e0a-ccc8c6e847c7'
        URL_GIT_REPO_MANIFESTS = 'kubernetes-v-menu-suplementar'
        PATH_OVERLAYS_KUSTOMIZE = 'overlays'
        DEPLOYMENT = 'deployment.yaml'
        NOME_SERVICO = 'v-menu-suplementar'
    }

    stages {
        stage('Git checkout') {
            steps {
                checkout scm
                    script {
                        DEPLOY_EM_PRODUCAO = false
                        def packageJson = readJSON file: 'package.json'
                        def version = packageJson.version
                        VERSAO_IMAGEM = "${version}"
                    }
            }
        }

        stage('Instala as dependencias do projeto') {
            steps {
                sh "npm config set registry https://hub.camara.gov.br/repository/npm-camara/ && npm install"
            }
        }

        stage('Compilação e testes') {
            steps {
                sh "npm run build"
            }
        }

        stage('Imagem Docker') {
            steps {
                    withDockerRegistry([credentialsId: 'c34117dc-5fa1-46f8-8ebb-f1cf0b2254c4', url: 'https://dockerhub.camara.gov.br/']) {
                        script {
                            imagem = docker.build("${env.IMAGEM_DOCKER}:${VERSAO_IMAGEM}")
                            imagem.push()
                      }
                }
            }
        }
        stage('Deploy Test') {
            steps {
                patchKubernetes reponame: "${URL_GIT_REPO_MANIFESTS}", branch: "master", path: "${PATH_OVERLAYS_KUSTOMIZE}/tes-yaml/", file: "${env.DEPLOYMENT}", container: "${NOME_SERVICO}",
                        kind: "Deployment", image: "${env.IMAGEM_DOCKER}", tag: "${VERSAO_IMAGEM}"
            }
        }
        stage('Promover para Produção?') {
            agent none
            when {
            	expression {
                  return ! VERSAO_IMAGEM.contains('SNAPSHOT')
                }
            }
            steps {
                timeout(10) {
                  mail to: "${env.EMAIL}",
                  subject: "Aprovação de Deploy em Produção - Job ${env.JOB_NAME}-${env.BUILD_DISPLAY_NAME}",
                  body: """Deploy em produção aguardando aprovação do módulo '${JOB_NAME}' Build (${BUILD_NUMBER}) \nPainel --> ${env.URL_JENKINS} \nAprovação Direta --> ${JENKINS_URL}job/${JOB_NAME}/${BUILD_NUMBER}/input \nMudanças da Versão --> ${currentBuild.absoluteUrl}"""

                  script {
                      aprovador = input message: 'ATENÇÃO! Deseja fazer o deploy em produção?', ok: 'Sim',
                      submitter: "${env.APROVADORES}", submitterParameter: 'aprovador'
                      echo "Deploy em produção aprovado por ${aprovador}"
                      DEPLOY_EM_PRODUCAO = true
                  }
                }
            }
        }
        stage('Deploy em produção') {
            when {
                expression {
                    return DEPLOY_EM_PRODUCAO
                }
            }
            steps {
                patchKubernetes reponame: "${URL_GIT_REPO_MANIFESTS}", branch: "master", path: "${PATH_OVERLAYS_KUSTOMIZE}/prod-yaml/", file: "${env.DEPLOYMENT}", container: "${NOME_SERVICO}",
                        kind: "Deployment", image: "${env.IMAGEM_DOCKER}", tag: "${VERSAO_IMAGEM}"

                mail to: "${env.EMAIL}, sesap.cenin@camara.leg.br",
                     subject: "Deploy em produção rancher - Job ${env.JOB_NAME}-${env.BUILD_DISPLAY_NAME}",
                     body: """Foi feito deploy em Produção da imagem ${env.IMAGEM_DOCKER}, versão ${VERSAO_IMAGEM} no serviço ${env.SERVICO_PRODUCAO}.
                     Deploy aprovado por ${aprovador}
                     Url do job: ${currentBuild.absoluteUrl}"""

                echo 'Atualizando versão do package.json com o comando "npm version"'
                sshagent(['ssh_git']) {
                  sh "git checkout -f master"
                  sh "git pull"
                  nodejs(configId: env.CONFIG_NODE_JS, nodeJSInstallationName: env.VERSAO_NODE_JS) {
                    sh 'npm version prepatch --preid=SNAPSHOT'
                  }
                  sh "git push origin master"
                }
            }
        }
    }
  }
