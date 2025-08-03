pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kaiofyou/Dienthoaishop.git' // Thay bằng URL repo của bạn
            }
        }
        stage('Build & Deploy') {
            steps {
                script {
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}