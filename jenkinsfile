pipeline {
    agent any

    environment {
        GITLEAKS_PATH = "C:\\gitleaks\\gitleaks.exe"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sachilz/dockerized-mern-app'
            }
        }

        stage('List Files') {
            steps {
                bat 'dir'
            }
        }

         stage('Gitleaks Secret Scan') {
            steps {
                bat "${GITLEAKS_PATH} detect --source . --verbose"
            }
        }
    }
}