pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root'
        }
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install --no-audit --no-fund'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo '✅ Build Successful from Jenkinsfile!'
        }
    }
}