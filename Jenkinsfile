pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    // Lệnh này sẽ build cả backend và frontend dựa trên docker-compose.yml
                    sh "docker-compose build --no-cache"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Đảm bảo credentialsId của bạn trong Jenkins là 'dockerhub-credentials'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Đăng nhập vào Docker Hub
                        sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                        
                        // Đẩy cả hai image lên
                        sh 'docker-compose push backend'
                        sh 'docker-compose push frontend'
                    }
                }
            }
        }
        
        stage('Deploy Containers') {
            steps {
                script {
                    def projectName = 'dienthoaishop'
                    sh "docker-compose -p ${projectName} down"
                    // Lệnh pull sẽ kéo về phiên bản image mới nhất từ Docker Hub
                    sh "docker-compose -p ${projectName} pull" 
                    sh "docker-compose -p ${projectName} up -d"
                }
            }
        }
    }
    
    post {
        always {
            // Luôn đăng xuất khỏi Docker Hub sau khi hoàn thành
            sh 'docker logout'
        }
    }
}
