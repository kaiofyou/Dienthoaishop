pipeline {
    agent any

    environment {
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        // Biến này sẽ được sử dụng bởi docker-compose để tìm file config
        PROMETHEUS_CONFIG = "${WORKSPACE}/prometheus.yml"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building images with tag: ${IMAGE_TAG}"
                    // Truyền biến TAG vào docker-compose để nó build image với đúng tag
                    sh "TAG=${IMAGE_TAG} docker-compose build --no-cache"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Lấy tên image đầy đủ từ docker-compose.yml
                    def backendImage = "duongtuan05/dienthoai-shop-backend:${IMAGE_TAG}"
                    def frontendImage = "duongtuan05/dienthoai-shop-frontend:${IMAGE_TAG}"

                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PASS_VAR')]) {
                        echo "Logging in to Docker Hub..."
                        sh "echo ${DOCKER_PASS_VAR} | docker login -u ${DOCKER_USER_VAR} --password-stdin"

                        echo "Pushing images to Docker Hub..."
                        // Không cần tag lại, chỉ cần push
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
                    // Jenkins sẽ tự động truyền các biến trong environment vào
                    // nên PROMETHEUS_CONFIG và TAG sẽ được docker-compose nhận
                    sh "TAG=${IMAGE_TAG} docker-compose down"
                    sh "TAG=${IMAGE_TAG} docker-compose up -d"
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
