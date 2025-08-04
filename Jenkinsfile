pipeline {
    agent any

    // Bỏ khối options { wipeout true } đi và thay bằng cách này
    options {
        // Tùy chọn này sẽ ngăn Jenkins tự động checkout code khi bắt đầu
        // để chúng ta có thể kiểm soát hoàn toàn ở stage đầu tiên.
        skipDefaultCheckout true
    }

    environment {
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKERHUB_USER = "duongtuan05"
        // Tên thư mục chứa code của bạn trên Jenkins Workspace
        PROJECT_DIR_NAME = "Dienthoaishop" // <-- Cập nhật lại nếu tên repo của bạn khác
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        // Thêm stage này để dọn dẹp và checkout code một cách tường minh
        stage('Initialize Workspace') {
            steps {
                script {
                    echo "Cleaning up workspace..."
                    // Xóa sạch mọi thứ trong thư mục làm việc cũ
                    cleanWs()
                    
                    echo "Checking out latest code..."
                    // Checkout code mới nhất từ Git
                    checkout scm
                }
            }
        }

        stage('Build and Tag Images') {
            steps {
                script {
                    echo "Building images with tag: ${IMAGE_TAG}"
                    // Lấy tên project từ tên thư mục repo
                    sh "TAG=${IMAGE_TAG} docker-compose -p ${PROJECT_DIR_NAME} build --no-cache"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    def backendImage = "${DOCKERHUB_USER}/dienthoai-shop-backend:${IMAGE_TAG}"
                    def frontendImage = "${DOCKERHUB_USER}/dienthoai-shop-frontend:${IMAGE_TAG}"
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PASS_VAR')]) {
                        echo "Logging in to Docker Hub..."
                        sh "echo ${DOCKER_PASS_VAR} | docker login -u ${DOCKER_USER_VAR} --password-stdin"
                        
                        echo "Tagging and Pushing images..."
                        // Tên image local được docker-compose tạo ra là <thư_mục>_<tên_dịch_vụ>
                        sh "docker tag ${PROJECT_DIR_NAME}_backend ${backendImage}"
                        sh "docker tag ${PROJECT_DIR_NAME}_frontend ${frontendImage}"
                        
                        sh "docker push ${backendImage}"
                        sh "docker push ${frontendImage}"
                    }
                }
            }
        }
        
        stage('Deploy Containers') {
            steps {
                script {
                    echo "Deploying new version: ${IMAGE_TAG}"
                    sh "docker-compose -p ${PROJECT_DIR_NAME} down"
                    sh "TAG=${IMAGE_TAG} docker-compose -p ${PROJECT_DIR_NAME} up -d"
                }
            }
        }
    }
    
    post {
        always {
            echo "Logging out from Docker Hub..."
            sh 'docker logout'
        }
    }
}