pipeline {
    agent any

    options {
        wipeout true 
    }
    
    environment {
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKERHUB_USER = "duongtuan05"
        PROJECT_NAME = "dienthoaishop" 
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Build and Tag Images') { // Đổi tên stage cho rõ ràng
            steps {
                script {
                    echo "Building images with tag: ${IMAGE_TAG}"
                    // Truyền biến TAG ngay lúc build
                    sh "TAG=${IMAGE_TAG} docker-compose -p ${PROJECT_NAME} build --no-cache"
                }
            }
        }
        
        stage('Push to Docker Hub') { // Chỉ cần push, không cần tag lại
            steps {
                script {
                    def backendImage = "${DOCKERHUB_USER}/dienthoai-shop-backend:${IMAGE_TAG}"
                    def frontendImage = "${DOCKERHUB_USER}/dienthoai-shop-frontend:${IMAGE_TAG}"
                    
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PASS_VAR')]) {
                        echo "Logging in to Docker Hub..."
                        sh "echo ${DOCKER_PASS_VAR} | docker login -u ${DOCKER_USER_VAR} --password-stdin"
                        
                        echo "Pushing images to Docker Hub..."
                        // Không cần docker tag nữa
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