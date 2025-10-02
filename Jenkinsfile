pipeline {
  agent any

  tools {
    nodejs "NodeJs"   // Make sure you've added NodeJS_18 in Jenkins → Global Tool Configuration
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
        echo "Installing npm packages..."
        bat 'npm ci'
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
