pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Thay thế URL này bằng URL repo Git của bạn
                git 'https://github.com/your-username/your-repo.git'
            }
        }
        stage('Build & Deploy Docker Containers') {
            steps {
                script {
                    // Jenkins sẽ chạy các lệnh này trong terminal
                    sh 'docker-compose down' // Dừng các container cũ nếu có
                    sh 'docker-compose build --no-cache' // Build lại image mới
                    sh 'docker-compose up -d' // Khởi động lại ứng dụng
                }
            }
        }
    }
}