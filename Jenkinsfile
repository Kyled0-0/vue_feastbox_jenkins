pipeline {
  agent any

  tools {
    nodejs "NodeJS_18"   // Make sure you've added NodeJS_18 in Jenkins → Global Tool Configuration
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
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        echo "Building Vue 3 application..."
        sh 'npm run build'
        echo "Build complete. The /dist folder should now be generated."
      }
    }

    stage('Run Preview Server') {
      steps {
        echo "Starting preview server on port 4173..."
        sh 'npx serve -s dist -l 4173 &'
        sleep(time: 10, unit: 'SECONDS') // wait for server to start
        echo "Server should now be live on http://<JENKINS_SERVER_IP>:4173"
      }
    }
  }

  post {
    always {
      echo "Pipeline finished."
    }
  }
}
