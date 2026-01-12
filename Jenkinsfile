pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "devops-demo-app"
        CONTAINER_NAME = "devops-app-container"
    }
    
    stages {
        stage('Cleanup') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs()
            }
        }
        
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE}:latest .'
            }
        }
        
        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                sh 'docker stop ${CONTAINER_NAME} || true'
                sh 'docker rm ${CONTAINER_NAME} || true'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:latest'
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh 'sleep 5'
                sh 'curl -f http://localhost:3000/health || exit 1'
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
