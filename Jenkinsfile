pipeline {
    agent any
    
    triggers {
        githubPush() // Kích hoạt pipeline mỗi khi có push lên repo
    }
    
    stages {
        stage('Build & Deploy Docker Containers') {
            steps {
                script {
                    // Code đã được Jenkins tự động checkout vào đây rồi
                    
                    // Dừng các container cũ nếu có
                    sh 'docker-compose down' 
                    // Build lại image mới, không dùng cache để đảm bảo lấy code mới nhất
                    sh 'docker-compose build --no-cache' 
                    // Khởi động lại ứng dụng ở chế độ nền
                    sh 'docker-compose up -d' 
                }
            }
        }
    }
}
