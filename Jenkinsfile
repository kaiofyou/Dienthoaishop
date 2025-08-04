pipeline {
    agent any

    // Thêm khối options này
    options {
        // Tùy chọn này sẽ xóa workspace trước khi build bắt đầu
        // Bằng cách này, Jenkins sẽ luôn checkout code mới nhất
        wipeout true 
    }
    environment {
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        // Cập nhật đúng username Docker Hub của bạn
        DOCKERHUB_USER = "duongtuan05" 
        // Giữ nguyên tên project để tag image local cho đúng
        PROJECT_NAME = "dienthoaishop" 
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building images..."
                    sh "docker-compose build --no-cache"
                }
            }
        }
        
        stage('Tag and Push to Docker Hub') {
            steps {
                script {
                    // Cập nhật lại tên image đầy đủ cho đúng
                    def backendImage = "${DOCKERHUB_USER}/dienthoai-shop-backend:${IMAGE_TAG}"
                    def frontendImage = "${DOCKERHUB_USER}/dienthoai-shop-frontend:${IMAGE_TAG}"
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PASS_VAR')]) {
                        echo "Logging in to Docker Hub..."
                        sh "echo ${DOCKER_PASS_VAR} | docker login -u ${DOCKER_USER_VAR} --password-stdin"
                        
                        echo "Tagging images..."
                        // Tên image local được tạo bởi docker-compose là <thư_mục_gốc>_<tên_dịch_vụ>
                        // Ví dụ: dienthoaishop_deploy_backend
                        // Bạn cần kiểm tra lại tên image local bằng lệnh `docker images` sau khi build
                        sh "docker tag ${PROJECT_NAME}_backend ${backendImage}" 
                        sh "docker tag ${PROJECT_NAME}_frontend ${frontendImage}"
                        
                        echo "Pushing images to Docker Hub..."
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
                    sh "docker-compose -p ${PROJECT_NAME} down"
                    sh "TAG=${IMAGE_TAG} docker-compose -p ${PROJECT_NAME} up -d"
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