pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }
     triggers {
        githubPush()
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
                // Add only if you have a build step (e.g., React build)
                // sh 'npm run build'
            }
        }

        stage('Start Server') {
            steps {
                sh 'pm2 stop all || true'
                sh 'pm2 start server.js --name your-app-name'
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
