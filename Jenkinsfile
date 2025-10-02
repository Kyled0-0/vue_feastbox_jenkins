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
        echo "Building Vue 3 application..."
        bat 'npm run build'
        echo "Build complete. The /dist folder should now be generated."
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
