pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "whiteflash03/my-react-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
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
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        def image = docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        image.push()
                        image.push('latest')
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