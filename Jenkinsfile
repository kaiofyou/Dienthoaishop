pipeline {
    agent any // Chạy pipeline trên bất kỳ agent Jenkins nào

    // Tự động kích hoạt pipeline mỗi khi có sự kiện push từ GitHub
    triggers {
        githubPush()
    }

    // Biến môi trường dùng chung trong toàn pipeline
    environment {
        PROJECT_NAME = 'dienthoaishop' // Tên project dùng cho docker-compose
    }

    stages {
        // Giai đoạn 1: Xóa container cũ để tránh lỗi "container name already in use"
        stage('Clean old containers') {
            steps {
                script {
                    sh '''
                        # Xóa container nếu có tên mssql_server đang chạy hoặc đã dừng
                        docker ps -a --filter "name=mssql_server" --format "{{.ID}}" | xargs -r docker rm -f
                        # Xóa container Prometheus nếu có
                        docker ps -a --filter "name=prometheus" --format "{{.ID}}" | xargs -r docker rm -f
                        # Xóa container Grafana nếu có
                        docker ps -a --filter "name=grafana" --format "{{.ID}}" | xargs -r docker rm -f
                    '''
                }
            }
        }

        // Giai đoạn 2: Build lại image frontend và backend từ Dockerfile
        stage('Build Docker Images') {
            steps {
                script {
                    // build không dùng cache để đảm bảo luôn build mới hoàn toàn
                    sh "docker-compose build --no-cache"
                }
            }
        }

        // Giai đoạn 3: Push các image frontend/backend lên Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Dùng credential đã lưu trên Jenkins để login Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            # Đăng nhập vào Docker Hub
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            # Push image backend đã build
                            docker-compose push backend
                            # Push image frontend đã build
                            docker-compose push frontend
                        '''
                    }
                }
            }
        }

        // Giai đoạn 4: Triển khai lại container từ image mới
        stage('Deploy Containers') {
            steps {
                script {
                    sh '''
                        # Dừng các container đang chạy và xóa container cũ
                        docker-compose -p $PROJECT_NAME down --remove-orphans
                        # Kéo image mới nhất từ Docker Hub
                        docker-compose -p $PROJECT_NAME pull
                        # Chạy lại tất cả container
                        docker-compose -p $PROJECT_NAME up -d
                    '''
                }
            }
        }
    }

    // Luôn logout Docker sau khi pipeline kết thúc (thành công hoặc thất bại)
    post {
        always {
            sh 'docker logout'
        }
    }
}
