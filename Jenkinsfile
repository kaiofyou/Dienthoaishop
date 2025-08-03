pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/kaiofyou/Dienthoaishop.git'
      }
    }

    stage('Cleanup Old Containers') {
      steps {
        sh 'docker ps -a -q --filter "name=mssql_server" | xargs -r docker rm -f'
      }
    }

    stage('Build & Deploy Docker Containers') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
      }
    }
  }
}
