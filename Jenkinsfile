pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone repository') {
            steps {
                git url: 'https://github.com/NipunaGamage888/awsjenkins-.git', branch: 'main'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build (optional)') {
            steps {
                echo "No build step needed"
            }
        }

        stage('Start Server') {
            steps {
                sh 'pm2 stop all || true'
                sh 'pm2 start server.js --name awsjenkins-ecommerce'
            }
        }
    }

    post {
        failure {
            echo 'Build failed.'
        }
        success {
            echo 'Build and deployment successful.'
        }
    }
}
