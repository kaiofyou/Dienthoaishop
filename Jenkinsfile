pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/kaiofyou/Dienthoaishop.git'
      }
    }

    stage('Build & Deploy Docker Containers') {
      steps {
        script {
          // Dừng container nếu có, không lỗi nếu chưa chạy
          sh 'docker-compose down || true'
          // Build và khởi động lại container
          sh 'docker-compose up -d --build'
        }
      }
    }
  }
}
