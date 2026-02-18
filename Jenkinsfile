pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "whiteflash/my-react-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Build React App') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                sh 'npm install --no-audit --no-fund'
                sh 'npm test -- --watchAll=false'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo "🚀 Docker image pushed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}