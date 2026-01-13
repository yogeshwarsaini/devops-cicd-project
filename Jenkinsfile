// pipeline {
//     agent any
    
//     environment {
//         DOCKER_IMAGE = "devops-demo-app"
//         CONTAINER_NAME = "devops-app-container"
//     }
    
//     stages {
//         stage('Cleanup') {
//             steps {
//                 echo 'Cleaning workspace...'
//                 cleanWs()
//             }
//         }
        
//         stage('Checkout') {
//             steps {
//                 echo 'Cloning repository...'
//                 checkout scm
//             }
//         }
        
//         stage('Build Docker Image') {
//             steps {
//                 echo 'Building Docker image...'
//                 sh 'docker build -t ${DOCKER_IMAGE}:latest .'
//             }
//         }
        
//         stage('Stop Old Container') {
//             steps {
//                 echo 'Stopping old container if exists...'
//                 sh 'docker stop ${CONTAINER_NAME} || true'
//                 sh 'docker rm ${CONTAINER_NAME} || true'
//             }
//         }
        
//         stage('Deploy') {
//             steps {
//                 echo 'Deploying application...'
//                 sh 'docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:latest'
//             }
//         }
        
//         stage('Verify Deployment') {
//             steps {
//                 echo 'Verifying deployment...'
//                 sh 'sleep 5'
//                 sh 'curl -f http://localhost:3000/health || exit 1'
//             }
//         }
//     }
    
//     post {
//         success {
//             echo '✅ Pipeline completed successfully!'
//         }
//         failure {
//             echo '❌ Pipeline failed!'
//         }
//     }
// }

pipeline {
    agent any
    
    environment {
        // Project-specific settings (yahan change karo)
        DOCKER_IMAGE = "devops-demo-app"
        CONTAINER_NAME = "devops-app-container"
        APP_PORT = "3000"
        HOST_PORT = "3000"
        
        // Optional settings
        DOCKERFILE_PATH = "."
        HEALTH_CHECK_PATH = "/health"
        WAIT_TIME = "5"
    }
    
    stages {
        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning workspace...'
                cleanWs()
            }
        }
        
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🏗️ Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE}:latest ${DOCKERFILE_PATH}'
            }
        }
        
        stage('Stop Old Container') {
            steps {
                echo '🛑 Stopping old container...'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                sh '''
                    docker run -d \
                    -p ${HOST_PORT}:${APP_PORT} \
                    --name ${CONTAINER_NAME} \
                    ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo '✔️ Verifying deployment...'
                sh 'sleep ${WAIT_TIME}'
                sh 'curl -f http://localhost:${HOST_PORT}${HEALTH_CHECK_PATH} || exit 1'
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            // Slack notification add kar sakte ho
        }
        failure {
            echo '❌ Pipeline failed!'
            sh 'docker logs ${CONTAINER_NAME} || true'
        }
        always {
            echo '🧹 Cleaning up dangling images...'
            sh 'docker image prune -f || true'
        }
    }
}