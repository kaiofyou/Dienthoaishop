pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/kaiofyou/Dienthoaishop.git'
      }
    }

    stage('Build & Deploy Docker Containers') {
      steps {
        bat 'docker-compose down || exit 0'
        bat 'docker-compose up -d --build'
      }
    }
  }
}
