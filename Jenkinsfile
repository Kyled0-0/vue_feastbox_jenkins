pipeline {
  agent any

  tools {
    nodejs "NodeJs"
  }

   environment {
    SONAR_TOKEN = credentials('HDSIT223')  
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Pulling latest code from GitHub..."
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
          bat 'npm ci'
      }
    }

    stage('Test') {
      steps {
        echo 'Running unit tests with Vitest...'  
        bat 'npm run test:unit'
      }
    }

    stage('Code Quality Analysis') {
      steps {
        withSonarQubeEnv('SonarCloud') {    
        bat 'sonar-scanner'                      
        }
      }
    }

    stage('Build') {
      steps {
        echo "Installing dependencies & building Vue app..."
        bat 'npm ci'
        bat 'npm run build'

        echo "Archiving dist folder as build artefact..."
        archiveArtifacts artifacts: 'dist/**', fingerprint: true

        echo "Building Docker image for deployment..."
        bat 'docker build -t vue-feastbox:latest .'
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
