pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Xóa không gian làm việc cũ để đảm bảo sạch sẽ
                cleanWs() 
                
                // Chỉ định rõ ràng URL và nhánh 'main'
                git branch: 'main', url: 'https://github.com/kaiofyou/Dienthoaishop.git' 
            }
        }
        stage('Build & Deploy Docker Containers') {
            steps {
                script {
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
